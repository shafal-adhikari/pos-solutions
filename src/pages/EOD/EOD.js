import React from "react";

import CashInCashOut from "./CashInCashOut";
import SIdeBarPage from "../../components/SideBarPage/SIdeBarPage";

import EndOfDay from "./EndOfDay";
import { Outlet, Routes, Route, Navigate, Link } from "react-router-dom";
const EOD = () => {
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
                          <span>EOD</span>
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
                        name: "End of Day",
                        path: "eod/end-of-day",
                      },
                      {
                        name: "Cash In / Cash Out",
                        path: "eod/cash-in-cash-out",
                      },
                    ]}
                  />
                  <div className="col-md-10 col-xxl-10">
                    <div className="menu_right">
                      <div className="right_top mb-4">
                        <div className="tab-content" id="v-pills-tabContent">
                          <Outlet />
                          <Routes>
                            <Route element={<EndOfDay />} path="/end-of-day" />
                            <Route
                              element={<CashInCashOut />}
                              path="/cash-in-cash-out"
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

export default EOD;
