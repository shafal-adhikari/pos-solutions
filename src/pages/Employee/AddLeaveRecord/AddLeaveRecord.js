import { Button, DatePicker, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import FormItemSkeleton from "../../../components/FormItemSkeleton/FormItemSkeleton";
import SendForApproval from "../../Suppliers/SendForApproval";
import { dayjs } from "../../../helpers/frontendHelper";
function AddLeaveRecord({ editClicked, setIsEditClicked, setIsAddClicked }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "GET_ALL_LEAVE_RECORD_ADD_SECTION_REQUEST",
    });
  }, []);
  const startDate = Form.useWatch("StartDate", form);
  const endDate = Form.useWatch("EndDate", form);
  const { leaveRecordAddSectionList, isLoading, editData } = useSelector(
    (state) => state.leaveRecordsReducer
  );
  const [approvalModal, setApprovalModal] = useState(false);
  const {
    activeStore: { dateFormat },
  } = useSelector((state) => state.authenticationReducer);
  const formatDate =
    dateFormat.split(" ")[0].toUpperCase() +
    " " +
    dateFormat.split(" ")[1].toLowerCase();
  const handleSubmit = (values) => {
    dispatch({
      type: "ADD_LEAVE_RECORD_REQUEST",
      payload: {
        ...values,
        id: editClicked && editData ? editData.id : "",
        StartDate:
          dayjs(values.StartDate).format(formatDate).split(" ")[0] +
          " 00:00:00",
        EndDate:
          dayjs(values.EndDate).format(formatDate).split(" ")[0] + " 00:00:00",
        statusId: leaveRecordAddSectionList?.status.find(
          (status) => status.additionalValue == "Draft"
        ).id,
        // EmailModel: {},
      },
    });
  };
  useEffect(() => {
    if (startDate && endDate) {
      form.setFieldValue("NumberOfDays", dayjs(endDate).diff(startDate, "day"));
    }
  }, [startDate, endDate]);
  useEffect(() => {
    if (editClicked && editData) {
      form.setFields([
        {
          name: "EmployeeId",
          value: editData.employeeId,
        },
        {
          name: "StartDate",
          value: editData.startDate,
        },
        {
          name: "EndDate",
          value: editData.startDate,
        },
        {
          name: "Notes",
          value: editData.notes,
        },
      ]);
    }
  }, [editClicked, editData]);
  return (
    <>
      <SendForApproval
        isOpen={approvalModal}
        setIsOpen={setApprovalModal}
        submitHandler={(emailValues) =>
          handleSubmit({
            ...form.getFieldsValue(),
            EmailModel: emailValues,
          })
        }
      />
      <div className="card text-left border-0">
        <Form form={form} onFinish={handleSubmit}>
          {isLoading ? (
            <div className="card-body categoryField">
              <div className="supplier_filter1">
                <div className="row">
                  <div className="col-md-2">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className=" pt-0">
                        <FormItemSkeleton />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-start">
                <div className="col-md-12 text-right">
                  {/* Split dropright button */}
                  <Skeleton
                    count={0.1}
                    height={30}
                    inline={true}
                    className="ms-2"
                  />

                  <Skeleton
                    count={0.1}
                    height={30}
                    inline={true}
                    className="ms-2"
                  />

                  <Skeleton
                    count={0.1}
                    height={30}
                    inline={true}
                    className="ms-2"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="card-body categoryField">
              <div className="supplier_filter1">
                <div className="row">
                  <div className="col-md-2">
                    <div className="form-group">
                      <Form.Item
                        name="YearId"
                        label="Year"
                        rules={[
                          {
                            required: true,
                            message: "Please select year",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={leaveRecordAddSectionList?.years.map(
                            (year) => {
                              return {
                                label: year.value,
                                value: year.id,
                              };
                            }
                          )}
                          placeholder="Year"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <Form.Item
                        name="EmployeeId"
                        label="Name"
                        rules={[
                          {
                            required: true,
                            message: "Please select employee",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={leaveRecordAddSectionList?.employees.map(
                            (employee) => {
                              return {
                                label: employee.value,
                                value: employee.id,
                              };
                            }
                          )}
                          placeholder="Name"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <Form.Item
                        label="Leave Type"
                        name="LeaveTypeId"
                        rules={[
                          {
                            required: true,
                            message: "Please select leave type",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={leaveRecordAddSectionList?.leaveTypes.map(
                            (leaveType) => {
                              return {
                                label: leaveType.value,
                                value: leaveType.id,
                              };
                            }
                          )}
                          placeholder="Leave Type"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <Form.Item
                        label="Start Date"
                        name="StartDate"
                        rules={[
                          {
                            required: true,
                            message: "Please select start date",
                          },
                        ]}
                      >
                        <DatePicker
                          placeholder="Start Date"
                          className="w-100"
                          format={dateFormat.toUpperCase().split(" ")[0]}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <Form.Item
                        name="EndDate"
                        label="End Date"
                        rules={[
                          {
                            required: true,
                            message: "Please select end date",
                          },
                        ]}
                      >
                        <DatePicker
                          placeholder="End Date"
                          className="w-100"
                          format={dateFormat.toUpperCase().split(" ")[0]}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <Form.Item
                        name="NumberOfDays"
                        label="No. of days"
                        rules={[
                          {
                            required: true,
                            message: "Please enter no of days",
                          },
                        ]}
                      >
                        <Input
                          placeholder="No. of days"
                          type="number"
                          readOnly
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className=" pt-0">
                        <Form.Item name="Comments" label="Comments">
                          <Input.TextArea placeholder="Comments" />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-start">
                <div className="add_btn ">
                  <div className="col-md-12 text-right">
                    {/* Split dropright button */}
                    <div className="btn-group dropdown p-0 approve_btn">
                      <Button
                        type="primary"
                        className="btn btn-primary all_btn rounded-0 ms-2"
                        htmlType="submit"
                      >
                        Save as Draft
                      </Button>
                      <Button
                        style={{ background: "#00205A" }}
                        className=" text-white btn btn-primary all_btn rounded-0 ms-2"
                        onClick={() => setApprovalModal(true)}
                      >
                        Send for Approval
                      </Button>
                      {/* <Button
                      style={{ background: "#00205A" }}
                      className=" text-white btn btn-primary all_btn rounded-0 ms-2"
                    >
                      Approve
                    </Button> */}
                      <Button
                        type="danger"
                        onClick={() => setIsAddClicked(false)}
                        className=" text-white btn btn-primary all_btn rounded-0 ms-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Form>
      </div>
    </>
  );
}

export default AddLeaveRecord;
