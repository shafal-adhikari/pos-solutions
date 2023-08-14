import { Button, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "../../../components/Table Skeleton/TableSkeleton";
import { Pagination } from "antd";
const NewOrders = () => {
  const dispatch = useDispatch();
  const {
    allPendingOrdersList,
    ordersDetailSection,
    isOrderStatusChanged,
    changeOrderStatusLoading,
    getPendingOrdersLoading,
  } = useSelector((state) => state.ordersReducer);
  const { activeStore } = useSelector((state) => state.authenticationReducer);
  const [activeStatus, setActiveStatus] = useState("");
  const [bulkSelected, setBulkSelected] = useState([]);
  const [buttonClicked, setButtonClicked] = useState("");
  console.log(allPendingOrdersList, "dsfjadfklsalf");
  useEffect(() => {
    dispatch({
      type: "GET_ALL_ORDERS_REQUEST1",
      payload: {
        Page: 1,
        PageSize: 100,
        isStatusPending: true,
        SearchKeywords: "",
        ExternalFilter: {
          StoreChannelId: "",
          OrderStatusId: ordersDetailSection?.orderStatus?.find(
            (item) => item.value == "Pending"
          )?.id,
          OrderTypeStoreId: "",
          TableId: "",
        },
      },
    });
  }, []);
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);

    dispatch({
      type: "GET_ALL_ORDERS_REQUEST1",
      payload: {
        Page: current,
        PageSize: pageSize,
        isStatusPending: true,
        SearchKeywords: "",
        ExternalFilter: {
          StoreChannelId: "",
          OrderStatusId: ordersDetailSection?.orderStatus?.find(
            (item) => item.value == "Pending"
          )?.id,
          OrderTypeStoreId: "",
          TableId: "",
        },
      },
    });
  }
  useEffect(() => {
    if (isOrderStatusChanged) {
      setBulkSelected([]);
      dispatch({
        type: "GET_ALL_ORDERS_REQUEST1",
        payload: {
          Page: 1,
          PageSize: 1000,
          isStatusPending: true,
          SearchKeywords: "",
          ExternalFilter: {
            StoreChannelId: "",
            OrderStatusId: ordersDetailSection?.orderStatus?.find(
              (item) => item.value == "Pending"
            )?.id,
            OrderTypeStoreId: "",
            TableId: "",
          },
        },
      });
    }
  }, [isOrderStatusChanged]);

  return (
    <div className="modal-body ">
      <div className="ordertable_form">
        <div className="card text-left border bg-light-blue">
          <div className="card-body">
            <div className="timesheet_filter">
              <div className="row">
                <div className="col-md-3 col-lg-3">
                  <div className="form-group">
                    <label className="control-label">Status</label>
                    <select
                      className="form-control form-select"
                      onChange={(e) => setActiveStatus(e.target.value)}
                    >
                      {ordersDetailSection?.orderStatus?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-3 col-lg-3 align-items-center my-auto pt-2 ">
                  {bulkSelected?.length > 0 && (
                    <Button
                      loading={
                        changeOrderStatusLoading && buttonClicked == "update"
                      }
                      onClick={() => {
                        setButtonClicked("update");
                        dispatch({
                          type: "UPDATE_ORDER_STATUS_REQUEST",
                          payload: {
                            OrderStatusId: activeStatus,
                            OrderIds: bulkSelected?.map((item) => item.Id),
                          },
                        });
                      }}
                      style={{
                        marginRight: "5px",
                        marginTop: "5px",
                        backgroundColor: "#12215B",
                        color: "white",
                      }}
                      className="btn btn-primary all_btn rounded-0"
                    >
                      Update
                    </Button>
                  )}
                  {bulkSelected?.length > 0 &&
                    !activeStore.isRetail &&
                    ordersDetailSection?.orderStatus?.find(
                      (item) => item.value == "On Going"
                    )?.id == activeStatus && (
                      <Button
                        type="primary"
                        loading={
                          changeOrderStatusLoading && buttonClicked == "kitchen"
                        }
                        onClick={() => {
                          setButtonClicked("kitchen");
                          dispatch({
                            type: "UPDATE_ORDER_STATUS_REQUEST",
                            payload: {
                              OrderStatusId: activeStatus
                                ? activeStatus
                                : ordersDetailSection?.orderStatus[0].id,
                              OrderIds: bulkSelected?.map((item) => item.Id),
                            },
                          });
                        }}
                        style={{ marginRight: "5px", marginTop: "5px" }}
                        className="btn btn-primary all_btn rounded-0"
                      >
                        Print To Kitchen
                      </Button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card  mt-2 ">
          <div className="card-body">
            <div className="table-body">
              <div className="table-responsive height-30">
                {getPendingOrdersLoading ? (
                  <TableSkeleton />
                ) : (
                  <table className="table table-hover text-center align-middle table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>
                          <div className="form-check">
                            <input
                              className="form-check-input mt-2 catcheck"
                              type="checkbox"
                              checked={
                                allPendingOrdersList?.data?.length ==
                                bulkSelected.length
                              }
                              value={
                                allPendingOrdersList?.data?.length ==
                                bulkSelected.length
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelected(
                                    allPendingOrdersList?.data?.map(
                                      (category) => {
                                        return {
                                          Id: category.orderId,
                                        };
                                      }
                                    )
                                  );
                                } else {
                                  setBulkSelected([]);
                                }
                              }}
                              id="defaultCheck1"
                            />
                          </div>
                        </th>
                        <th>Name</th>
                        <th>Order No.</th>
                        <th>Order Date</th>
                        <th>Order Status</th>
                        <th>Table Name</th>
                        <th>Order Channel</th>
                        <th>Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPendingOrdersList?.data?.length > 0 ? (
                        allPendingOrdersList?.data?.map((item) => (
                          <tr key={item.orderId}>
                            <td>
                              <div className="form-check">
                                <input
                                  className="form-check-input mt-2 catcheck"
                                  type="checkbox"
                                  value={
                                    bulkSelected.find(
                                      (eachPrev) => eachPrev.Id == item.orderId
                                    )
                                      ? true
                                      : false
                                  }
                                  checked={
                                    bulkSelected.find(
                                      (eachPrev) => eachPrev.Id == item.orderId
                                    )
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => {
                                    if (!e.target.checked) {
                                      setBulkSelected((prev) => {
                                        return prev.filter(
                                          (prevEach) =>
                                            prevEach.Id != item.orderId
                                        );
                                      });
                                    } else {
                                      setBulkSelected((prev) => {
                                        return [
                                          ...prev,
                                          {
                                            Id: item.orderId,
                                          },
                                        ];
                                      });
                                    }
                                  }}
                                  id="defaultCheck1"
                                />
                              </div>
                            </td>
                            <td>-</td>
                            <td>{item.orderNumber}</td>
                            <td>{item.orderDate}</td>
                            <td>{item.status}</td>
                            <td>{item.tableName}</td>
                            <td>{item.orderChannel}</td>
                            <td>
                              {activeStore.currencySymbol} {item.totalAmount}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td align="center" colSpan={8}>
                            No Records Found !
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="company_footer d-flex justify-content-end mt-3">
        <Pagination
          total={allPendingOrdersList?.total}
          pageSize={100}
          showTotal={(total, range) =>
            `${
              allPendingOrdersList ? allPendingOrdersList.data?.length : 0
            } out of ${total ? total : 0} items`
          }
          defaultPageSize={100}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={1}
          onChange={onShowSizeChange}
        />
      </div>
    </div>
  );
};

export default NewOrders;
