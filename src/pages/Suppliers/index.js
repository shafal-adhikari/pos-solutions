import React from "react";
// import SettingsSidebar from "../../components/SettingsSidebar/SettingsSidebar";
import Suppliers from "./Suppliers";
import { Navigate, Outlet, Route, Routes, Link } from "react-router-dom";
import SIdeBarPage from "../../components/SideBarPage/SIdeBarPage";
import PurchaseOrder from "./PurchaseOrder";
import PurchaseCredit from "./PurchaseCredit/PurchaseCredit";
const SuppliersPage = () => {
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
                          <span>Suppliers</span>
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
                        name: "Suppliers",
                        path: "vendors/all-suppliers",
                      },
                      {
                        name: "Purchase Order",
                        path: "vendors/purchase-order",
                      },
                      {
                        name: "Purchase Order Credit Note",
                        path: "vendors/purchase-order-credit-note",
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
                              element={<Suppliers />}
                              path="/all-suppliers"
                            />
                            <Route
                              element={<PurchaseOrder />}
                              path="/purchase-order"
                            />
                            <Route
                              element={<PurchaseCredit />}
                              path="/purchase-order-credit-note"
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
                Copyright © POSApt 2022
              </span>
            </div>
          </footer>
          {/* partial */}
        </div>
      </div>
    </>
  );
};

export default SuppliersPage;
