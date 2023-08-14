/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { Pagination, Tooltip, Popconfirm } from "antd";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";
import { useNavigate } from "react-router-dom";

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employessList, employeeLoading, isOperationSuccessful } = useSelector(
    (state) => state.settingsReducer
  );
  const [activeId, setActiveId] = useState(null);
  useEffect(() => {
    dispatch({
      type: "GET_EMPLOYEE_REQUEST",
      payload: {
        Page: 1,
        PageSize: 10,
        SearchKeywords: "",
        ExternalFilter: {},
      },
    });
  }, []);
  useEffect(() => {
    if (isOperationSuccessful) {
      dispatch({
        type: "GET_EMPLOYEE_REQUEST",
        payload: {
          Page: 1,
          PageSize: 10,
          SearchKeywords: "",
          ExternalFilter: {},
        },
      });
    }
  }, [isOperationSuccessful]);
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);

    dispatch({
      type: "GET_EMPLOYEE_REQUEST",
      payload: {
        Page: current,
        PageSize: pageSize,
        SearchKeywords: "",
        ExternalFilter: {},
      },
    });
  }

  const navigateToEditHandler = (activeId) => {
    dispatch({
      type: "GET_EDIT_EMPLOYEE_REQUEST",
      payload: activeId,
    });
    navigate("/employee/profile/add");
  };
  return (
    <div>
      <div
        className="tab-pane fade show active"
        id="v-pills-employeeprofile"
        role="tabpanel"
        aria-labelledby="v-pills-employeeprofile-tab"
      >
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex align-items-end flex-wrap">
                <div className="mr-md-3 mr-xl-5">
                  <h4 className="fw-bold">Employee Profile</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ?table */}
        <div className="card">
          <div className="card-body">
            <div className="table_card d-flex justify-content-between mb-3">
              <div className="add_btn ">
                <div className="row">
                  <div className="col-md-12">
                    <Link
                      onClick={() => {
                        dispatch({
                          type: "CLEAR_EDIT_DATA",
                        });
                      }}
                      to={"/employee/profile/add"}
                      className="btn btn-primary all_btn rounded-0"
                    >
                      <i className="fas fa-plus mr-1" />
                      Add New Employees
                    </Link>
                  </div>
                </div>
              </div>
              <div className="table_search">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="search">
                      <i className="mdi mdi-magnify" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Items Here"
                    aria-label="search"
                    aria-describedby="search"
                    spellCheck="false"
                    data-ms-editor="true"
                  />
                </div>
              </div>
            </div>
            {employeeLoading ? (
              <TableSkeleton />
            ) : (
              <div className="table-body">
                <div className="table-responsive">
                  <table className="table table-hover  align-middle table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Employee Id</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email Address</th>
                        <th scope="col">Job Title</th>
                        <th scope="col">Employment Type</th>
                        <th scope="col">Postal Code</th>
                        <th scope="col">Location</th>
                        <th scope="col">Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employessList?.data?.length > 0 ? (
                        employessList?.data?.map((employee) => {
                          return (
                            <tr key={employee.id}>
                              <td>{employee.employeeCode}</td>
                              <td>{employee.fullName}</td>
                              <td>{employee.phoneNumber}</td>
                              <td>{employee.email}</td>
                              <td>{employee.jobTitle}</td>
                              <td>{employee.employmentType}</td>
                              <td>{employee.postalCode}</td>
                              <td>{employee.location}</td>
                              <td>
                                <span className="badge bg-danger">
                                  Inactive
                                </span>
                              </td>
                              <td>
                                <Tooltip title="Edit Employee">
                                  <a
                                    className="btn btn-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="left"
                                    onClick={(e) => {
                                      navigateToEditHandler(employee.id);
                                    }}
                                    style={{ marginRight: "5px" }}
                                    data-bs-original-title="Edit"
                                  >
                                    <i
                                      className="fas fa-edit"
                                      aria-hidden="true"
                                    />
                                  </a>
                                </Tooltip>
                                <Popconfirm
                                  okText="Yes"
                                  onConfirm={() => {
                                    dispatch({
                                      type: "DELETE_EMPLOYEE_REQUEST",
                                      payload: [
                                        {
                                          Id: employee.id,
                                          Name: employee.fullName,
                                        },
                                      ],
                                    });
                                  }}
                                  cancelText="No"
                                  title="Are you sure you want to delete?"
                                >
                                  <Tooltip title="Delete Banner">
                                    <a
                                      className="btn btn-danger btn-sm"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="left"
                                      title=""
                                      onClick={(e) => e.preventDefault()}
                                      data-bs-original-title="Delete"
                                    >
                                      <i
                                        className="fas fa-trash-alt"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </Tooltip>
                                </Popconfirm>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td align="center" colSpan={6}>
                            {" "}
                            No Records Found !
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="company_footer d-flex justify-content-between mt-3">
                  <div className="table_btn">
                    <button
                      type="button"
                      className="btn btn- all_btn text-white me-2"
                    >
                      Print PDF
                    </button>
                    <button
                      type="button"
                      className="btn btn- all_btn text-white  me-2"
                    >
                      Print Printer
                    </button>
                    <button
                      type="button"
                      className="btn btn- all_btn text-white  me-2"
                    >
                      Export to Excel
                    </button>
                    <button
                      type="button"
                      className="btn btn- all_btn text-white  me-2"
                    >
                      Export to CSV
                    </button>
                    <button
                      type="button"
                      className="btn btn- all_btn text-white  me-2"
                    >
                      Import
                    </button>
                  </div>
                  <Pagination
                    total={
                      parseInt(employessList.total)
                        ? parseInt(employessList.total)
                        : 10
                    }
                    showTotal={(total, range) =>
                      `${
                        employessList.total ? employessList.total : 0
                      } out of ${total ? total : 0} items`
                    }
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={1}
                    onChange={onShowSizeChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
