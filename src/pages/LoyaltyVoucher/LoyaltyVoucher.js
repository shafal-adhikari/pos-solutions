/** @format */

import React, { useEffect } from "react";
import { Outlet, Routes, Route, Navigate, Link } from "react-router-dom";
import SIdeBarPage from "../../components/SideBarPage/SIdeBarPage";

import Loyalty from "./Loyalty";
import Voucher from "./Voucher";

const LoyaltyVoucher = () => {
  return (
    <div className="container-fluid page-body-wrapper1">
      {/* partial:partials/_sidebar.html */}
      {/* Sidebar */}
      {/* End sidebar */}
      {/* partial */}
      <div className=" main_panel_inner">
        <div className="content-wrapper">
          <div className="content">
            {/* main Breadcrumb Area */}
            <div className="row  ">
              <div className="col-md-8 grid-margin stretch-card">
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
                        <span>Loyalty</span>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            {/* order tabs */}
            <div className="menu_inner myorders">
              <div className="row">
                <SIdeBarPage
                  pages={[
                    {
                      name: "Loyalty",
                      path: "loyalty/all",
                    },
                    {
                      name: "Voucher",
                      path: "loyalty/voucher",
                    },
                  ]}
                />
                {/* end menu left */}
                {/* start menu right */}
                <div className="col-md-10 col-xxl-10">
                  <div className="menu_right">
                    <div className="right_top mb-4">
                      <div className="card mt-2">
                        <div className="card-body">
                          <div className="tab-content" id="v-pills-tabContent">
                            <Outlet />
                            <Routes>
                              <Route path="/all" element={<Loyalty />} />
                              <Route path="/voucher" element={<Voucher />} />
                              <Route
                                path="/*"
                                element={<Navigate to="/404" replace />}
                              />
                              {/* <Route
                                path="/voucher/group"
                                element={
                                  <>
                                    {" "}
                                    <Group />
                                  </>
                                }
                              /> */}
                            </Routes>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                Copyright © POSApt 2022
              </span>
            </div>
          </footer>
          {/* partial */}
        </div>
        {/* main-panel ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>
  );
};

export default LoyaltyVoucher;
