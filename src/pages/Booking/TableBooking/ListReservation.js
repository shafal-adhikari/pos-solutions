import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Pagination } from "antd";
import { Form, Input, Select, DatePicker, Spin } from "antd";
import { useDispatch } from "react-redux";
import moment from "moment";
import TableSkeleton from "../../../components/Table Skeleton/TableSkeleton";

const ListReservation = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    tableReservationList1,
    tableReservationAddSection,
    confirmReservationLoading,
    isConfirmSuccess,
  } = useSelector((state) => state.bookingReducer);
  const { activeStore } = useSelector((state) => state.authenticationReducer);

  const [form] = Form.useForm();
  const date = Form.useWatch("date", form);
  const order = Form.useWatch("order", form);
  const status = Form.useWatch("status", form);
  const table = Form.useWatch("table", form);
  const search = Form.useWatch("search", form);
  const [bulkSelected, setBulkSelected] = useState([]);
  const [buttonClicked, setButtonClicked] = useState("");

  //   function onShowSizeChange(current, pageSize) {
  //     window.scrollTo(0, 0);

  //     dispatch({
  //       type: "GET_ALL_TABLE_RESERVATION_REQUEST",
  //       payload: {
  //         Page: current,
  //         PageSize: pageSize,
  //         SearchKeywords: search,
  //         ExternalFilter: {
  //           Date: date
  //             ? moment(date).format(
  //                 activeStore.dateFormat.toUpperCase().split(" ")[0]
  //               )
  //             : "",
  //           OrderChannelId: order,
  //           TableId: table,
  //           TableReservationStatusId: status,
  //         },
  //       },
  //     });
  //   }
  useEffect(() => {
    if (table && order) {
      dispatch({
        type: "GET_ALL_TABLE_RESERVATION_REQUEST1",
        payload: {
          Page: 1,
          PageSize: 100,
          SearchKeywords: search,
          isStatusPending: true,
          ExternalFilter: {
            Date: date
              ? moment(date).format(
                  activeStore.dateFormat.toUpperCase().split(" ")[0]
                )
              : "",
            OrderChannelId: order,
            TableId: table,
            TableReservationStatusId:
              tableReservationAddSection?.tableReservationStatus?.[1]?.id,
          },
        },
      });
    }
  }, [date, status, table, order, search]);

  useEffect(() => {
    if (isConfirmSuccess) {
      dispatch({
        type: "GET_ALL_TABLE_RESERVATION_REQUEST1",
        payload: {
          Page: 1,
          PageSize: 10,
          SearchKeywords: search,
          isStatusPending: true,
          ExternalFilter: {
            Date: date
              ? moment(date).format(
                  activeStore.dateFormat.toUpperCase().split(" ")[0]
                )
              : "",
            OrderChannelId: order,
            TableId: table,
            TableReservationStatusId:
              tableReservationAddSection?.tableReservationStatus?.[1]?.id,
          },
        },
      });
      setBulkSelected([]);
    }
  }, [isConfirmSuccess]);
  function onShowSizeChange(current, pageSize) {}

  console.log("bulk selected", bulkSelected);
  return (
    <div className="modal-body ">
      <div className="reservetable_form">
        <div className="card text-left border bg-light-blue">
          <div className="card-body">
            <div className="timesheet_filter">
              <Form
                form={form}
                fields={[
                  {
                    name: "table",
                    value: form.getFieldValue("table")
                      ? form.getFieldValue("table")
                      : tableReservationAddSection?.tables?.[0].id,
                  },
                  {
                    name: "status",
                    value: form.getFieldValue("status")
                      ? form.getFieldValue("status")
                      : tableReservationAddSection?.tableReservationStatus?.[0]
                          .id,
                  },
                  {
                    name: "order",
                    value: form.getFieldValue("order")
                      ? form.getFieldValue("order")
                      : tableReservationAddSection?.orderChannels?.[0].id,
                  },
                ]}
              >
                <div className="row">
                  <div className="col-md-2 col-lg-2">
                    <div className="form-group categoryField">
                      <Form.Item label="Channel" name="order">
                        <Select>
                          {tableReservationAddSection?.orderChannels?.map(
                            (item) => {
                              return (
                                <Select.Option value={item.id} key={item.id}>
                                  {item.value}
                                </Select.Option>
                              );
                            }
                          )}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-2 col-lg-2">
                    <div className="form-group categoryField">
                      <Form.Item label="Table" name="table">
                        <Select>
                          {tableReservationAddSection?.tables?.map((item) => {
                            return (
                              <Select.Option value={item.id} key={item.id}>
                                {item.value}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>

                  <div className="col-md-2 col-lg-2">
                    <div className="form-group categoryField">
                      <Form.Item label="Date" name="date">
                        <DatePicker
                          format={
                            activeStore.dateFormat.toUpperCase()?.split(" ")[0]
                          }
                          style={{ width: "102%" }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-2 col-lg-2">
                    <div className="form-group categoryField">
                      <Form.Item label="Search" name="search">
                        <Input placeholder="Search" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-2 col-lg-2 align-items-center my-auto pt-2 ">
                    <button
                      style={{ marginTop: "7px" }}
                      type="button"
                      className="btn btn-primary all_btn rounded-0"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="card  mt-2 ">
          <div className="card-body">
            <div className="table-body">
              {bulkSelected.length > 0 && (
                <div className="d-flex justify-content-between flex-wrap align-items-center mb-3">
                  <div className="delete_btn">
                    <Button
                      type="primary"
                      loading={
                        buttonClicked == "confirm" && confirmReservationLoading
                      }
                      onClick={() => {
                        setButtonClicked("confirm");
                        dispatch({
                          type: "CONFIRM_RESERVATION_REQUEST",
                          payload: bulkSelected?.map((item) => {
                            return {
                              ReservationId: item.Id,
                              Type: "confirm",
                            };
                          }),
                        });
                      }}
                      style={{ marginRight: "5px" }}
                      className="btn btn-success  bg-theme border-0 rounded-0"
                    >
                      Confirm
                    </Button>
                    <Button
                      loading={
                        buttonClicked == "cancel" && confirmReservationLoading
                      }
                      type="danger"
                      onClick={() => {
                        setButtonClicked("cancel");
                        dispatch({
                          type: "CONFIRM_RESERVATION_REQUEST",
                          payload: bulkSelected?.map((item) => {
                            return {
                              ...item,
                              ReservationId: item.Id,
                              Type: "cancel",
                            };
                          }),
                        });
                      }}
                      className="btn btn-danger border-0 rounded-0"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="table-responsive height-30">
                {isLoading ? (
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
                                tableReservationList1?.data?.length ==
                                bulkSelected.length
                              }
                              value={
                                tableReservationList1?.data?.length ==
                                bulkSelected.length
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelected(
                                    tableReservationList1?.data?.map(
                                      (category) => {
                                        return {
                                          Id: category.id,
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
                        <th>Reservation No.</th>
                        <th>Date From</th>
                        <th>Date To</th>
                        <th>Status</th>
                        <th>Table No.</th>
                        <th>Channel</th>
                        <th>Adult/Children</th>
                      </tr>
                    </thead>

                    <tbody>
                      {tableReservationList1?.data?.length > 0 ? (
                        tableReservationList1?.data?.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <div className="form-check">
                                <input
                                  className="form-check-input mt-2 catcheck"
                                  type="checkbox"
                                  checked={
                                    bulkSelected.find(
                                      (eachPrev) => eachPrev.Id == item.id
                                    )
                                      ? true
                                      : false
                                  }
                                  value={
                                    bulkSelected.find(
                                      (eachPrev) => eachPrev.Id == item.id
                                    )
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => {
                                    if (!e.target.checked) {
                                      setBulkSelected((prev) => {
                                        return prev.filter(
                                          (prevEach) => prevEach.Id != item.id
                                        );
                                      });
                                    } else {
                                      setBulkSelected((prev) => {
                                        return [
                                          ...prev,
                                          {
                                            Id: item.id,
                                          },
                                        ];
                                      });
                                    }
                                  }}
                                  id="defaultCheck1"
                                />
                              </div>
                            </td>
                            <td>{item.customerName}</td>
                            <td>{item.reservationNumber}</td>
                            <td>{item.dateTimeFrom}</td>
                            <td>{item.dateTimeTo}</td>
                            <td>{item.status}</td>
                            <td>{item.tableName}</td>
                            <td>{item.channel}</td>
                            <td>
                              {" "}
                              {item.adult}/{item.child}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td align="center" colSpan={9}>
                            No Records Found !
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="company_footer d-flex justify-content-end mt-3">
                <Pagination
                  total={
                    tableReservationList1?.total
                      ? tableReservationList1?.total
                      : 2
                  }
                  defaultPageSize={100}
                  showTotal={(total, range) =>
                    `${
                      tableReservationList1?.data
                        ? tableReservationList1?.data?.length
                        : 0
                    } out of ${total} items`
                  }
                  showSizeChanger
                  onShowSizeChange={onShowSizeChange}
                  defaultCurrent={1}
                  onChange={onShowSizeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListReservation;
