import { Button, Empty, Pagination, Spin, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userImage from "../user.png";
import NewOrders from "../NewOrders/NewOrders";
import { Modal } from "react-bootstrap";
import CardSkeleton from "../../../components/CardSkeleton./CardSkeleton";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const AllOrder = ({
  table,
  orderType,
  orderStatus,
  search,
  ordersDetailSection,
  viewOrder,
  activeId,
  payOrder,
  cancelOrder,
}) => {
  const dispatch = useDispatch();
  const { isLoading, allOrdersList, changeOrderStatusLoading } = useSelector(
    (state) => state.ordersReducer
  );
  const navigate = useNavigate();
  const { activeStore } = useSelector((state) => state.authenticationReducer);
  const [isNewOrderModalVisible, setIsNewORderModalVisible] = useState(false);
  useEffect(() => {
    console.log(table, orderStatus, orderType, "sadfjlasflakdlfa");
    if (table && orderStatus && orderType) {
      dispatch({
        type: "GET_ALL_ORDERS_REQUEST",
        payload: {
          Page: 1,
          PageSize: 100,
          SearchKeywords: search,
          ExternalFilter: {
            StoreChannelId: ordersDetailSection?.channelWithOrderTypes.find(
              (item) => item.name == "All"
            )?.id,
            OrderStatusId: orderStatus,
            OrderTypeStoreId: orderType,
            TableId: table,
          },
        },
      });
    }
  }, [table, orderStatus, orderType, search]);
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);

    dispatch({
      type: "GET_ALL_ORDERS_REQUEST",
      payload: {
        Page: current,
        PageSize: pageSize,
        SearchKeywords: search,
        ExternalFilter: {
          StoreChannelId: ordersDetailSection?.channelWithOrderTypes.find(
            (item) => item.name == "All"
          )?.id,
          OrderStatusId: orderStatus,
          OrderTypeStoreId: orderType,
          TableId: table,
        },
      },
    });
  }
  return (
    <>
      <Modal
        show={isNewOrderModalVisible}
        onHide={() => {
          setIsNewORderModalVisible(false);
        }}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>New Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewOrders />
        </Modal.Body>
      </Modal>

      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between flex-wrap align-items-center">
            <div className="d-flex align-items-end flex-wrap">
              <div className="mr-md-3 mr-xl-5">
                <h5 className="fw-bold">All Orders</h5>
              </div>
            </div>
            <div className="table_search">
              <a
                onClick={() => {
                  setIsNewORderModalVisible(true);
                }}
                className="btn btn-danger border-0 rounded-0"
                // data-bs-toggle="modal"
                // data-bs-target="#orderlistModal"
              >
                {" "}
                <i className="fas fa-list me-1 " />
                New Orders
              </a>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <CardSkeleton />
      ) : (
        <div className="orderfilter">
          <div className="row  d-flex justify-content-flex-start">
            {allOrdersList?.data?.length > 0 && !isLoading ? (
              allOrdersList?.data?.map((item) => (
                <div
                  className="col-md-3 col-xxl-3 pb-3 grid-margin stretch-card"
                  key={item.orderId}
                >
                  <div className="card h-100 bg-light shadow border-0">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between tablecard_img">
                        <div className="d-flex align-items-center ">
                          <img
                            style={{
                              height: "25px",
                              width: "25px",
                              marginRight: "5px",
                            }}
                            src={userImage}
                            alt=""
                            className="img-fluid"
                          />
                          <label className="text-danger text-center d-flex align-items-center justify-content-center fw-bold">
                            {item.customerName}
                          </label>
                        </div>
                        {item.status == "On Going" && (
                          <Tooltip title="Update Order">
                            <AiFillEdit
                              color="#002059"
                              size={18}
                              style={{ cursor: "pointer" }}
                            />
                          </Tooltip>
                        )}
                      </div>
                      <div className="template-demo">
                        <table className="table mb-0 ">
                          <tbody>
                            <tr>
                              <td className="pe-0 text-start" colSpan={2}>
                                {item.orderNumber}
                              </td>
                            </tr>
                            <tr>
                              <td className="ps-0">Order Date</td>
                              <td className="pe-0 text-end">
                                {item.orderDate}
                              </td>
                            </tr>
                            <tr>
                              <td className="ps-0">Order Status</td>
                              <td className="pe-0 text-end">
                                <span className="badge bg-info text-dark">
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="ps-0">Table Name</td>
                              <td className="pe-0 text-end">
                                {item.tableName}
                              </td>
                            </tr>
                            <tr>
                              <td className="ps-0">Channel</td>
                              <td className="pe-0 text-end">
                                {item.orderChannel}
                              </td>
                            </tr>
                            <tr className="border-dashed bordercolor">
                              <td className="ps-0">Total</td>
                              <td className="pe-0 text-end">
                                {activeStore.currencySymbol} {item.totalAmount}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="mybtn d-flex">
                          <Button
                            style={{ background: "#00205A", color: "#fff" }}
                            className="btn text-white btn-sm bg-theme border-0 w-100 me-2"
                            onClick={() => viewOrder(item.orderId)}
                          >
                            View
                          </Button>
                          {item.status == "Payment Pending" && (
                            <Button
                              type="primary"
                              className="btn btn-success btn-sm bg-green border-0 w-100 me-2"
                              onClick={() => payOrder(item.orderId)}
                            >
                              Pay
                            </Button>
                          )}
                          {item.status == "Payment Pending" && (
                            <Button
                              style={{ background: "#1B9AA5" }}
                              className="btn btn-success btn-sm border-0 w-100 me-2 text-white"
                              onClick={() =>
                                navigate("/pos", {
                                  state: {
                                    orderId: item.orderId,
                                    orderNumber: item.orderNumber,
                                  },
                                })
                              }
                            >
                              Update Order
                            </Button>
                          )}
                          {item.status == "Pending" && (
                            <Button
                              type="danger"
                              loading={
                                activeId == item.orderId &&
                                changeOrderStatusLoading
                              }
                              className="btn btn-danger btn-sm  border-0 w-100 me-2"
                              onClick={() => cancelOrder(item.orderId)}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Empty description="No Orders Found !" />
            )}
          </div>
          <div className="company_footer d-flex justify-content-end mt-3">
            <Pagination
              total={allOrdersList?.total}
              showTotal={(total, range) =>
                `${allOrdersList ? allOrdersList.data?.length : 0} out of ${
                  total ? total : 0
                } items`
              }
              pageSize={100}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={1}
              onChange={onShowSizeChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AllOrder;
