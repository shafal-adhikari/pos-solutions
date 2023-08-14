/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Select, Popconfirm, Input, Button } from "antd";
import TableSkeleton from "../../../components/Table Skeleton/TableSkeleton";

function AssignLeave() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const financialYear = Form.useWatch("financialYear", form);
  const leaveType = Form.useWatch("leaveType", form);
  const [noOfDays, setNoOfDays] = useState();

  const [employeeAssignedList, setEmployeeAssignedList] = useState([]);
  const {
    assignLeaveSectionList,
    isOperationSuccessful,
    employeeAssignedLists,
    isLoading,
    updateAssignLeaveLoading,
  } = useSelector((state) => state.assignLeaveReducer);

  useEffect(() => {
    setEmployeeAssignedList(employeeAssignedLists);
  }, [employeeAssignedLists]);
  useEffect(() => {
    if (financialYear && leaveType) {
      dispatch({
        type: "GET_ALL_EMPLOYEE_ASSIGNED_LEAVE_REQUEST",
        payload: {
          YearId: financialYear,
          LeaveTypeId: leaveType,
          Year: assignLeaveSectionList?.years?.find(
            (item) => item.id == financialYear
          )?.value,
          LeaveType: assignLeaveSectionList?.leaveTypes?.find(
            (item) => item.id == leaveType
          )?.value,
        },
      });
    }
  }, [financialYear, leaveType]);

  useEffect(() => {
    dispatch({
      type: "GET_ASSIGN_LEAVE_SECTION_LIST_REQUEST",
    });
  }, []);
  useEffect(() => {
    if (isOperationSuccessful) {
      dispatch({
        type: "GET_ALL_EMPLOYEE_ASSIGNED_LEAVE_REQUEST",
        payload: {
          YearId: financialYear,
          LeaveTypeId: leaveType,
          Year: assignLeaveSectionList?.years?.find(
            (item) => item.id == financialYear
          )?.value,
          LeaveType: assignLeaveSectionList?.leaveTypes?.find(
            (item) => item.id == leaveType
          )?.value,
        },
      });
    }
  }, [isOperationSuccessful]);
  console.log("emplo", employeeAssignedList);
  return (
    <div className="menu_right">
      <>
        <div className="right_top mb-4">
          <div className="card text-left border">
            <div className="card-body">
              <Form form={form}>
                <div className="timesheet_filter categoryField">
                  <div className="row">
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                        <Form.Item label="Financial Year" name="financialYear">
                          <Select placeholder="Select Financial Year">
                            {assignLeaveSectionList?.years?.map((category) => {
                              return (
                                <Select.Option
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.value}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                        <Form.Item label="Leave Type" name="leaveType">
                          <Select placeholder="Select Leave Type">
                            {assignLeaveSectionList?.leaveTypes?.map(
                              (supplier) => {
                                return (
                                  <Select.Option
                                    key={supplier.id}
                                    value={supplier.id}
                                  >
                                    {supplier.value}
                                  </Select.Option>
                                );
                              }
                            )}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-md-2 col-lg-2 align-items-center  my-auto pt-3 ">
                      <button
                        type="button"
                        className="btn btn-primary all_btn rounded-0"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <div className="table_card d-flex justify-content-end mb-3">
                <div
                  className=""
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                    width: "23%",
                  }}
                >
                  <Input
                    placeholder="No. Of Days"
                    value={noOfDays}
                    onChange={(e) => setNoOfDays(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      if (noOfDays) {
                        setEmployeeAssignedList((prev) => {
                          return prev.map((item) => {
                            return {
                              ...item,
                              numberOfDays: noOfDays,
                            };
                          });
                        });
                      }
                    }}
                    type="button"
                    className="btn btn-primary all_btn rounded-0"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="table-responsive product-table">
                {isLoading ? (
                  <TableSkeleton />
                ) : (
                  <table className="table table-hover  align-middle table-nowrap mb-0">
                    <thead>
                      <tr className="table-light">
                        <th> Name</th>
                        <th>Year</th>
                        <th>Leave Type</th>
                        <th>No Of Days</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeAssignedList &&
                      employeeAssignedList.length > 0 ? (
                        employeeAssignedList?.map((employee, index) => {
                          return (
                            <tr key={employee.employeeId + index}>
                              <td>{employee.employeeName}</td>
                              <td>{employee.year}</td>
                              <td>{employee.leaveType}</td>
                              <td>
                                <Input
                                  style={{ width: "30%" }}
                                  onChange={(e) => {
                                    setEmployeeAssignedList((prev) => {
                                      return prev.map((item) => {
                                        if (
                                          item.employeeId == employee.employeeId
                                        ) {
                                          console.log("this is running");
                                          return {
                                            ...item,
                                            numberOfDays: e.target.value,
                                          };
                                        } else {
                                          console.log("this is running");

                                          return {
                                            ...item,
                                          };
                                        }
                                      });
                                    });
                                  }}
                                  value={employee.numberOfDays}
                                />
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr style={{ textAlign: "center" }}>
                          <td colSpan={4}>No Records Found !</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                <Button
                  loading={updateAssignLeaveLoading}
                  style={{ marginTop: "1rem" }}
                  type="primary"
                  htmlType="submit"
                  className="btn btn-primary all_btn rounded-0 me-2"
                  onClick={() => {
                    dispatch({
                      type: "UPDATE_ASSIGNED_LEAVE_REQUEST",
                      payload: employeeAssignedList,
                    });
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default AssignLeave;
