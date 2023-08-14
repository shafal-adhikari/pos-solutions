import { DatePicker, Empty } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select } from "antd";
import userImage from "./user.png";
import moment from "moment";
import ReserveTable from "./ReserveTable";
import { Modal } from "react-bootstrap";
import { Popconfirm, Button, Pagination } from "antd";
import ListReservation from "./ListReservation";
import CardSkeleton from "../../../components/CardSkeleton./CardSkeleton";
import { AiOutlineReload } from "react-icons/ai";

const TableBooking = () => {
  const dispatch = useDispatch();
  const { activeStore } = useSelector((state) => state.authenticationReducer);
  const [form] = Form.useForm();
  const date = Form.useWatch("date", form);
  const order = Form.useWatch("order", form);
  const status = Form.useWatch("status", form);
  const table = Form.useWatch("table", form);
  const search = Form.useWatch("search", form);
  const [activeId, setActiveId] = useState("");
  const [isEditOpen, setIsEditOpen] = useState();
  const [isListReservationOpen, setIsListReservationOpen] = useState(false);
  const [current, setCurrent] = useState(1);

  const [isReserveOpen, setIsReserveOpen] = useState(false);

  const {
    isLoading,
    tableReservationList,
    tableReservationList1,
    tableReservationAddSection,
    confirmReservationLoading,
    cancelReservationLoading,
    isConfirmSuccess,
    isMakeReservationSuccess,
  } = useSelector((state) => state.bookingReducer);

  useEffect(() => {
    if (isMakeReservationSuccess) {
      setIsReserveOpen(false);
      dispatch({
        type: "GET_ALL_TABLE_RESERVATION_REQUEST",
        payload: {
          Page: 1,
          PageSize: 100,
          SearchKeywords: search,
          ExternalFilter: {
            Date: date
              ? moment(date).format(
                  activeStore.dateFormat.toUpperCase().split(" ")[0]
                )
              : "",
            OrderChannelId: order,
            TableId: table,
            TableReservationStatusId: status,
          },
        },
      });
    }
    setIsEditOpen(false);
  }, [isMakeReservationSuccess]);
  useEffect(() => {
    dispatch({
      type: "GET_ALL_TABLE_RESERVATION_ADD_SECTION_REQUEST",
    });
  }, []);

  useEffect(() => {
    if (status && table && order) {
      dispatch({
        type: "GET_ALL_TABLE_RESERVATION_REQUEST",
        payload: {
          Page: 1,
          PageSize: 100,
          SearchKeywords: search,
          ExternalFilter: {
            Date: date
              ? moment(date).format(
                  activeStore.dateFormat.toUpperCase().split(" ")[0]
                )
              : "",
            OrderChannelId: order,
            TableId: table,
            TableReservationStatusId: status,
          },
        },
      });
    }
  }, [date, status, table, order, search]);

  useEffect(() => {
    if (isConfirmSuccess) {
      dispatch({
        type: "GET_ALL_TABLE_RESERVATION_REQUEST",
        payload: {
          Page: 1,
          PageSize: 100,
          SearchKeywords: search,
          ExternalFilter: {
            Date: date
              ? moment(date).format(
                  activeStore.dateFormat.toUpperCase().split(" ")[0]
                )
              : "",
            OrderChannelId: order,
            TableId: table,
            TableReservationStatusId: status,
          },
        },
      });
    }
  }, [isConfirmSuccess]);

  useEffect(() => {
    if (isEditOpen && activeId) {
      dispatch({
        type: "GET_INDIVIDUAL_TABLE_RESERVATION_REQUEST",
        payload: {
          id: activeId,
        },
      });
    }
  }, [activeId]);
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);
    setCurrent(current);
    dispatch({
      type: "GET_ALL_TABLE_RESERVATION_REQUEST",
      payload: {
        Page: current,
        PageSize: pageSize,
        SearchKeywords: search,
        ExternalFilter: {
          Date: date
            ? moment(date).format(
                activeStore.dateFormat.toUpperCase().split(" ")[0]
              )
            : "",
          OrderChannelId: order,
          TableId: table,
          TableReservationStatusId: status,
        },
      },
    });
  }
  const onRefreshClick = () => {
    form.setFields([
      {
        name: "date",
        value: "",
      },
      {
        name: "status",
        value: tableReservationAddSection?.tableReservationStatus?.[0].id,
      },
      {
        name: "table",
        value: tableReservationAddSection?.tables?.[0].id,
      },
      {
        name: "order",
        value: tableReservationAddSection?.orderChannels?.[0].id,
      },
    ]);
  };
  return (
    <div
      className="tab-pane fade show active"
      id="v-pills-productlist"
      role="tabpanel"
      aria-labelledby="v-pills-productlist-tab"
    >
      <Modal
        show={isListReservationOpen}
        onHide={() => {
          setIsListReservationOpen(false);
        }}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>
            Bookings{" "}
            {tableReservationList1?.total
              ? "(" + tableReservationList1.total + ")"
              : ""}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListReservation />
        </Modal.Body>
      </Modal>
      <Modal
        show={isReserveOpen}
        onHide={() => {
          setIsReserveOpen(false);
          setIsEditOpen(false);
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>
            {isEditOpen ? "Edit Reservation" : "Make Reservation"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReserveTable
            setIsReserveOpen={setIsReserveOpen}
            isEditOpen={isEditOpen}
            activeId={activeId}
          />
        </Modal.Body>
      </Modal>
      <div className="card text-left border">
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
                    <Form.Item label="Status" name="status">
                      <Select>
                        {tableReservationAddSection?.tableReservationStatus?.map(
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
                <div className="col-md-2 col-lg-2 d-flex align-items-center">
                  <Button
                    className="bg-theme br-2"
                    style={{ marginTop: "14px" }}
                    onClick={onRefreshClick}
                  >
                    <AiOutlineReload style={{ color: "#fff" }} />
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <div className="table_card d-flex justify-content-end ">
            <div className=" mb-3">
              <div className="vendor_con">
                <a
                  style={{ marginRight: "5px" }}
                  onClick={() => {
                    setIsListReservationOpen(true);
                  }}
                  className="btn btn-danger border-0 rounded-0"
                >
                  {" "}
                  <i className="fas fa-list me-1 "></i>New Bookings
                </a>
                <a
                  onClick={() => {
                    setIsReserveOpen(true);
                  }}
                  className="btn btn-primary all_btn rounded-0"
                >
                  <i className="fas fa-plus me-1" />
                  Reserve Now
                </a>
              </div>
            </div>
          </div>
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <div className="posbooking_inner">
              <div className="orderfilter">
                <div className="row  d-flex justify-content-flex-start">
                  {!tableReservationList ||
                  tableReservationList?.data?.length < 1 ? (
                    <Empty description="No Bookings Found!" />
                  ) : (
                    tableReservationList?.data?.map((item) => (
                      <div
                        className="col-md-3 grid-margin stretch-card"
                        key={item.id}
                      >
                        <div className="card bg-light shadow border-0">
                          <div className="card-body">
                            <div className="template-demo">
                              <div className="d-flex align-items-center tablecard_img">
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
                              <table className="table mb-0 ">
                                <tbody>
                                  <tr>
                                    <td className="pe-0 text-start" colSpan={2}>
                                      {item.reservationNumber}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ps-0"> Date From</td>
                                    <td className="pe-0 text-end">
                                      {item.dateTimeFrom}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ps-0"> Date To</td>
                                    <td className="pe-0 text-end">
                                      {item.dateTimeTo}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ps-0"> Status</td>
                                    <td className="pe-0 text-end">
                                      {item.status == "Pending" ? (
                                        <span className="badge bg-danger">
                                          {item.status}
                                        </span>
                                      ) : (
                                        <span className="badge bg-success">
                                          {item.status}
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ps-0">Table Name</td>
                                    <td className="pe-0 text-end">
                                      {item.tableName}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ps-0"> Channel</td>
                                    <td className="pe-0 text-end">
                                      {item.channel}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ps-0"> Adult/Children</td>
                                    <td className="pe-0 text-end">
                                      {item.adult}/{item.child}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="mybtn d-flex">
                                {item.status != "Confirmed" && (
                                  <Popconfirm
                                    okText="Yes"
                                    onConfirm={() => {
                                      dispatch({
                                        type: "CONFIRM_RESERVATION_REQUEST",
                                        payload: [
                                          {
                                            Type: "confirm",
                                            ReservationId: item.id,
                                          },
                                        ],
                                      });
                                    }}
                                    cancelText="No"
                                    title="Are you sure you want to Confirm?"
                                  >
                                    <Button
                                      onClick={() => {
                                        setActiveId(item.id);
                                      }}
                                      type="primary"
                                      style={{ backgroundColor: "#12215B" }}
                                      loading={
                                        activeId == item.id &&
                                        confirmReservationLoading
                                          ? true
                                          : false
                                      }
                                      className="btn text-white btn-sm bg-theme border-0 w-100 me-2"
                                    >
                                      {confirmReservationLoading &&
                                      activeId == item.id
                                        ? ""
                                        : "Confirm"}
                                    </Button>
                                  </Popconfirm>
                                )}

                                <Button
                                  onClick={() => {
                                    setIsEditOpen(true);
                                    setIsReserveOpen(true);
                                    setActiveId(item.id);
                                  }}
                                  type="primary"
                                  className="btn btn-success btn-sm  bg-theme border-0 w-100 me-2"
                                >
                                  Edit
                                </Button>
                                {item.status != "Cancelled" && (
                                  <Popconfirm
                                    okText="Yes"
                                    onConfirm={() => {
                                      dispatch({
                                        type: "CONFIRM_RESERVATION_REQUEST1",
                                        payload: [
                                          {
                                            Type: "cancel",
                                            ReservationId: item.id,
                                          },
                                        ],
                                      });
                                    }}
                                    cancelText="No"
                                    title="Are you sure you want to Cancel?"
                                  >
                                    <Button
                                      onClick={() => {
                                        setActiveId(item.id);
                                      }}
                                      type="danger"
                                      loading={
                                        activeId == item.id &&
                                        cancelReservationLoading
                                          ? true
                                          : false
                                      }
                                      className="btn text-white btn-sm bg-theme border-0 w-100 me-2"
                                    >
                                      {cancelReservationLoading &&
                                      activeId == item.id
                                        ? ""
                                        : "Cancel"}
                                    </Button>
                                  </Popconfirm>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="company_footer d-flex justify-content-end mt-3">
                  <Pagination
                    total={tableReservationList?.total}
                    defaultPageSize={100}
                    showTotal={(total, range) =>
                      `${
                        tableReservationList?.data
                          ? tableReservationList?.data?.length
                          : 0
                      } out of ${total} items`
                    }
                    showSizeChanger
                    current={current}
                    defaultCurrent={1}
                    onShowSizeChange={onShowSizeChange}
                    onChange={onShowSizeChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableBooking;
