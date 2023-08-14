import React from "react";
import SIdeBarPage from "../../components/SideBarPage/SIdeBarPage";
import TableBooking from "./TableBooking/TableBooking";
import { Navigate, Outlet, Route, Routes, Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

const Booking = () => {
  return (
    <>
      {/* partial:partials/_navbar.html */}

      {/* partial */}
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
                          <span>Booking</span>
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              {/* order tabs */}
              <div className="menu_inner posbooking">
                <div className="row">
                  <SIdeBarPage
                    pages={[
                      {
                        name: "Table Booking",
                        path: "booking/table-booking",
                      },
                    ]}
                  />
                  {/* end menu left */}
                  {/* start menu right */}
                  <div className="col-md-10 col-xxl-10">
                    <div className="menu_right">
                      <div className="right_top mb-4">
                        <div className="tab-content" id="v-pills-tabContent">
                          <Outlet />
                          <Routes>
                            <Route
                              path="/table-booking"
                              element={<TableBooking />}
                            />
                            <Route
                              path="/*"
                              element={<Navigate to="/404" replace />}
                            />
                          </Routes>
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

      {/* container-scroller */}
      {/* Reserve TableModal */}
    </>
  );
};

export default Booking;
