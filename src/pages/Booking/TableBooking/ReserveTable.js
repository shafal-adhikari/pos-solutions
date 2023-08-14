import React, { useEffect } from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import moment from "moment";
const ReserveTable = ({ isEditOpen, activeId, setIsReserveOpen }) => {
  const [reserveTableForm] = Form.useForm();
  const dispatch = useDispatch();
  const { activeStore } = useSelector((state) => state.authenticationReducer);
  const {
    isLoading,
    tableReservationList,

    tableReservationAddSection,
    getTableRservationAddSectionLoading,
    makeReservationLoading,
    getIndividualTableReservationLoading,
    individualTableReservation,
  } = useSelector((state) => state.bookingReducer);

  const onReserveTableHandler = (values) => {
    dispatch({
      type: "MAKE_RESERVATION_REQUEST",
      payload: {
        id: isEditOpen ? activeId : "",
        ReservationNumber: values.reservationNo,
        Adult: values.adult,
        Child: values.child,
        OrderChannelId: values.order,
        TableId: values.tableNo,
        DateTimeFrom: values.dateTimeFrom
          ? moment(values.dateTimeFrom).format(
              activeStore.dateFormat.toUpperCase()
            )
          : "",
        DateTimeTo: values.dateTimeTo
          ? moment(values.dateTimeTo).format(
              activeStore.dateFormat.toUpperCase()
            )
          : "",
        CustomerViewModel: {
          Id: "",
          Name: values.name,
          Email: values.email,
          PhoneNumber: values.phone,
          CountryId: values.country,
          CountryPhoneNumberPrefixId: values.phonePrefix,
        },
      },
    });
  };
  const prefixSelector = (name) => (
    <Form.Item
      name={name}
      noStyle
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Select
        style={{
          width: 80,
        }}
      >
        {tableReservationAddSection?.countries?.length > 0 &&
          tableReservationAddSection?.countries?.map((item, i) => (
            <Select.Option value={item.id} key={item.id}>
              <span style={{ fontSize: "12px" }}>
                <img
                  src={item.image}
                  style={{ height: "10px", width: "10px", marginRight: "4px" }}
                />
                {item.additionalValue}
              </span>
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );

  useEffect(() => {
    if (isEditOpen) {
      reserveTableForm.setFields([
        {
          name: "reservationNo",
          value: individualTableReservation?.reservationNumber,
        },
        {
          name: "name",
          value: individualTableReservation?.customerViewModel?.name,
        },
        {
          name: "phone",
          value: individualTableReservation?.customerViewModel?.phoneNumber,
        },
        {
          name: "email",
          value: individualTableReservation?.customerViewModel?.email,
        },
        {
          name: "country",
          value: individualTableReservation?.customerViewModel?.countryId,
        },
        {
          name: "tableNo",
          value: individualTableReservation?.tableId,
        },
        {
          name: "dateTimeFrom",
          value: moment(individualTableReservation?.dateTimeFrom),
        },
        {
          name: "dateTimeTo",
          value: moment(individualTableReservation?.dateTimeTo),
        },
        {
          name: "adult",
          value: individualTableReservation?.adult,
        },
        {
          name: "child",
          value: individualTableReservation?.child,
        },
        {
          name: "order",
          value: individualTableReservation?.orderChannelId,
        },
        {
          name: "phonePrefix",
          value:
            individualTableReservation?.customerViewModel
              ?.countryPhoneNumberPrefixId,
        },
      ]);
    }
  }, [isEditOpen, individualTableReservation, activeId]);

  return (
    <>
      <Form
        form={reserveTableForm}
        onFinish={onReserveTableHandler}
        fields={[
          {
            name: ["phonePrefix"],
            value: reserveTableForm.getFieldValue("phonePrefix")
              ? reserveTableForm.getFieldValue("phonePrefix")
              : tableReservationAddSection?.countries?.find(
                  (item) => item.isSelected
                )?.id,
          },
          {
            name: ["country"],
            value: reserveTableForm.getFieldValue("country")
              ? reserveTableForm.getFieldValue("country")
              : tableReservationAddSection?.countries?.find(
                  (item) => item.isSelected
                )?.id,
          },
          {
            name: "reservationNo",
            value: tableReservationAddSection.reservationNumber,
          },
        ]}
      >
        <div className="modal-body ">
          <div className="reservetable_form">
            <div className="card">
              <div className="card-body bg-light-blue">
                <div className="row">
                  <div className="col-md-4 col-lg-4">
                    <div className="form-group categoryField">
                      <Form.Item
                        label="Reservation No"
                        name="reservationNo"
                        rules={[
                          {
                            required: "true",
                            message: "Please enter Reservation No !",
                          },
                        ]}
                      >
                        <Input readOnly placeholder="Reservation No" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-4">
                    <div className="form-group categoryField">
                      <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                          {
                            required: "true",
                            message: "Please enter Name !",
                          },
                        ]}
                      >
                        <Input placeholder="Name" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-4">
                    <div className="form-group categoryField">
                      <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                          {
                            required: "true",
                            message: "Please enter Phone !",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Phone"
                          addonBefore={prefixSelector("phonePrefix")}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-4">
                    <div className="form-group categoryField">
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: "true",
                            message: "Please enter Email !",
                          },
                          {
                            type: "email",
                            message: "Please enter Valid Email !",
                          },
                        ]}
                      >
                        <Input placeholder="Email" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-4">
                    <div className="form-group categoryField">
                      <Form.Item
                        label="Country"
                        name="country"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Country !",
                          },
                        ]}
                      >
                        <Select>
                          {tableReservationAddSection?.countries?.map(
                            (item) => {
                              return (
                                <Select.Option value={item.id} key={item.id}>
                                  <img
                                    src={item.image}
                                    style={{
                                      height: "20px",
                                      width: "20px",
                                      marginRight: "7px",
                                    }}
                                  />
                                  {item.name}
                                </Select.Option>
                              );
                            }
                          )}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>

                  <div className="col-md-4 col-lg-4">
                    <div className="form-group categoryField">
                      <Form.Item
                        label="Table No."
                        name="tableNo"
                        rules={[
                          {
                            required: "true",
                            message: "Please enter Table Number !",
                          },
                        ]}
                      >
                        <Select>
                          {tableReservationAddSection?.tables
                            ?.slice(1)
                            ?.map((item) => {
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
                  <div className="col-md-4 col-lg-4">
                    <div className="form-group categoryField">
                      <Form.Item
                        rules={[
                          {
                            required: "true",
                            message: "Please enter Date Time From !",
                          },
                        ]}
                        label="Date Time From"
                        name="dateTimeFrom"
                      >
                        <DatePicker
                          showTime
                          format={
                            activeStore.dateFormat
                              .split(" ")[0]
                              ?.toUpperCase() +
                            " " +
                            "HH:mm:ss"
                          }
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-4">
                    <div className="form-group categoryField">
                      <Form.Item
                        label="Date Time To"
                        name="dateTimeTo"
                        rules={[
                          {
                            required: "true",
                            message: "Please enter Date Time To !",
                          },
                        ]}
                      >
                        <DatePicker
                          showTime
                          format={
                            activeStore.dateFormat
                              .split(" ")[0]
                              ?.toUpperCase() +
                            " " +
                            "HH:mm:ss"
                          }
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-4">
                    <div className="form-group">
                      <label
                        className="control-label"
                        style={{ marginBottom: "0px" }}
                      >
                        No. of Customers
                      </label>
                      <div className="row">
                        <div className="col-md-6">
                          <Form.Item
                            style={{ marginTop: "9px" }}
                            name="adult"
                            rules={[
                              {
                                required: "true",
                                message: "Required !",
                              },
                            ]}
                          >
                            <Input placeholder="Adult" />
                          </Form.Item>
                        </div>
                        <div className="col-md-6">
                          <Form.Item name="child" style={{ marginTop: "9px" }}>
                            <Input placeholder="Child" />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-4">
                    <div className="form-group categoryField">
                      <Form.Item
                        label="Channel"
                        name="order"
                        rules={[
                          {
                            required: "true",
                            message: "Please enter Channel !",
                          },
                        ]}
                      >
                        <Select>
                          {tableReservationAddSection?.orderChannels
                            ?.slice(1)
                            ?.map((item) => {
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
                  <div className="col-md-12">
                    <Button
                      loading={makeReservationLoading}
                      style={{
                        background: "#0AB39C",
                        color: "white",
                        height: "37px",
                      }}
                      htmlType="submit"
                      className="btn btn-success  bg-theme  rounded-0 me-2 "
                    >
                      {isEditOpen ? "Update" : "Book Now"}
                    </Button>
                    <button
                      onClick={() => {
                        setIsReserveOpen(false);
                      }}
                      type="button"
                      className="btn btn-danger rounded-0 "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default ReserveTable;
