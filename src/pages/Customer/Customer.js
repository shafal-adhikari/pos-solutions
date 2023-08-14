import React from "react";
import { Outlet, Route, Routes, Link } from "react-router-dom";
import SIdeBarPage from "../../components/SideBarPage/SIdeBarPage";
import CustomerList from "./CustomerList";
const Customer = () => {
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
                          <span>Customer</span>
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="menu_inner myvendors">
                <div className="row">
                  <SIdeBarPage
                    pages={[
                      {
                        name: "Customers",
                        path: "customers/all-customers",
                      },
                    ]}
                  />
                  <div className="col-md-10 col-xxl-10">
                    <div className="menu_right">
                      <div className="right_top mb-4">
                        <div className="tab-content" id="v-pills-tabContent">
                          <CustomerList />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="container-fluid clearfix">
              <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
                Copyright © POSApt 2022
              </span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Customer;
