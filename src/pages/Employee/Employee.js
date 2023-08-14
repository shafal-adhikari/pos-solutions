/** @format */

import React from "react";
// import SettingsSidebar from "../../components/SettingsSidebar/SettingsSidebar";

import PayrollSettings from "./PayrollSettings";
import SIdeBarPage from "../../components/SideBarPage/SIdeBarPage";
import { Outlet, Routes, Route, Navigate, Link } from "react-router-dom";
import LeaveRecord from "./LeaveRecord/LeaveRecord";
import AddEmployee from "./AddEmployee";
import EmployeeProfile from "./EmployeeProfile";
import Documents from "../Documents/Documents";
import AssignLeave from "./AssignLeave/AssignLeave";
const Employee = () => {
  return (
    <>
      <div className="container-fluid page-body-wrapper1">
        {/* partial:partials/_sidebar.html */}
        {/* Sidebar */}
        {/* End sidebar */}
        {/* partial */}
        <div className=" main_panel_inner">
          <div className="content-wrapper">
            <div className="content">
              {/* main Breadcrumb Area */}
              <div className="row  d-flex justify-content-center">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="breadcrumb_top ">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb breadcrumb-custom">
                        <Link to="/" className="breadcrumb-item fw-bold">
                          Home
                        </Link>
                        <li
                          className="breadcrumb-item active fw-bold"
                          aria-current="page"
                        >
                          <span>Employee</span>
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="menu_inner myvendors">
                <div className="row">
                  {/* <SuppliersSidebar /> */}
                  <SIdeBarPage
                    pages={[
                      {
                        name: "Profile",
                        path: "employee/profile",
                      },
                      {
                        name: "Leave Record",
                        path: "employee/leave-record",
                      },
                      {
                        name: "Upload Documents",
                        path: "employee/documents",
                      },
                      {
                        name: "Payroll Settings",
                        path: "employee/payroll-settings",
                      },
                      {
                        name: "Assign Leave",
                        path: "employee/assign-leave",
                      },
                    ]}
                  />
                  <div className="col-md-10 col-xxl-10">
                    <div className="menu_right">
                      <div className="right_top mb-4">
                        <div className="tab-content" id="v-pills-tabContent">
                          <Outlet />
                          <Routes>
                            <Route
                              element={<LeaveRecord />}
                              path="/leave-record"
                            />
                            <Route
                              element={<PayrollSettings />}
                              path="/payroll-settings"
                            />
                            <Route
                              path="/profile"
                              element={<EmployeeProfile />}
                            />
                            <Route path="/documents" element={<Documents />} />
                            <Route
                              path="/profile/add"
                              element={<AddEmployee />}
                            />
                            <Route
                              path="/assign-leave"
                              element={<AssignLeave />}
                            />
                            <Route
                              path="/*"
                              element={<Navigate to="/404" replace />}
                            />
                          </Routes>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                  {/* end menu left */}
                  {/* start menu right */}
                </div>
              </div>
            </div>
            {/* End Content */}
          </div>
          {/* End Content Wrapper */}
          {/* content-wrapper ends */}
          {/* partial:partials/_footer.html */}
          <footer className="footer">
            <div className="container-fluid clearfix">
              <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
                Copyright @ POSApt 2022
              </span>
            </div>
          </footer>
          {/* partial */}
        </div>
      </div>
    </>
  );
};

export default Employee;
