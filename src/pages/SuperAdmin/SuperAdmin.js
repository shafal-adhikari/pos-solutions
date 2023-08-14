import React from "react";
import { Navigate, Outlet, Route, Routes, Link } from "react-router-dom";
import SIdeBarPage from "../../components/SideBarPage/SIdeBarPage";
import CityList from "./City/CityList";
import StateList from "./State/StateList";
import FranchiseSetting from "./Franchise/FranchiseSetting";
import LanguageSetting from "./Language/LanguageSetting";

const SuperAdmin = () => {
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
                          <span>Super Admin</span>
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
                        name: "Franchise Settings",
                        path: "superadmin/franchise",
                      },
                      {
                        name: "Language Settings",
                        path: "superadmin/language",
                      },
                      {
                        name: "Store Settings",
                        path: "superadmin/store",
                      },

                      {
                        name: "Country Settings",
                        path: "superadmin/country",
                      },

                      {
                        name: "City Settings",
                        path: "superadmin/city",
                      },

                      {
                        name: "State Settings",
                        path: "superadmin/state",
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
                              path="/franchise"
                              element={<FranchiseSetting />}
                            />
                            <Route
                              path="/language"
                              element={<LanguageSetting />}
                            />
                            <Route path="/city" element={<CityList />} />
                            <Route path="/state" element={<StateList />} />
                            <Route
                              path="/*"
                              element={<Navigate to="/404" replace />}
                            />
                          </Routes>
                          {/* <FranchiseSetting /> */}
                          {/* <LanguageSetting /> */}
                        </div>
                        {/* <div
                          className="tab-pane fade"
                          id="v-pills-loyaltysettings"
                          role="tabpanel"
                          aria-labelledby="v-pills-loyaltysettings-tab"
                        ></div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-giftcardsetting"
                          role="tabpanel"
                          aria-labelledby="v-pills-giftcardsetting-tab"
                        ></div>
                        <div
                          className="tab-pane fade"
                          id="v-pills-printersetting"
                          role="tabpanel"
                          aria-labelledby="v-pills-printersetting-tab"
                        ></div> */}
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

export default SuperAdmin;
