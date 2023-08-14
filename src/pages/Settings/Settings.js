/** @format */

import React, { Suspense } from "react";
import { Navigate, Outlet, Route, Routes, Link } from "react-router-dom";
import SIdeBarPage from "../../components/SideBarPage/SIdeBarPage";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import PopupSettings from "./PopupSettings/PopupSettings";
import GeneralSettings from "./GeneralSettings";
import POSDeviceSettings from "./POSDeviceSettings";
import StoreSettings from "./StoreSettings";
import BannerSettings from "./BannerSettings/BannerSettings";
import UserManagement from "./UserManagement";
import PaymentMethodSettings from "../../components/PaymentMethodSettings/PaymentMethodSettings";
import PageSettings from "./PageSettings/PageSettings";
function Settings() {
  // const GeneralSettings = React.lazy(() => import("./GeneralSettings"));
  // const POSDeviceSettings = React.lazy(() => import("./POSDeviceSettings"));
  // const StoreSettings = React.lazy(() => import("./StoreSettings"));
  // const UserManagement = React.lazy(() => import("./UserManagement"));
  // const BannerSettings = React.lazy(() =>
  //   import("./BannerSettings/BannerSettings")
  // );
  // const PaymentMethodSettings = React.lazy(() =>
  //   import("../../components/PaymentMethodSettings/PaymentMethodSettings")
  // );
  return (
    <>
      <div className="container-fluid page-body-wrapper1">
        <div className=" main_panel_inner">
          <div className="content-wrapper">
            <div className="content">
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
                          <span>Settings</span>
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
                        name: "General Settings",
                        path: "settings/general",
                      },
                      {
                        name: "User Management",
                        path: "settings/user-management",
                      },
                      {
                        name: "Store Settings",
                        path: "settings/store",
                      },
                      {
                        name: "Payment Method Settings",
                        path: "settings/payment",
                      },
                      {
                        name: "POS Device Settings",
                        path: "settings/pos-device-settings",
                      },
                      {
                        name: "Banner Settings",
                        path: "settings/banner",
                      },
                      {
                        name: "Popup Settings",
                        path: "settings/popup",
                      },
                      {
                        name: "Page Settings",
                        path: "settings/page-settings",
                      },
                    ]}
                  />
                  <div className="col-md-10 col-xxl-10">
                    <div className="menu_right">
                      <div className="right_top mb-4">
                        <div className="tab-content">
                          <Outlet />
                          <Suspense fallback={<LoadingScreen />}>
                            <Routes>
                              <Route
                                path="/general"
                                element={<GeneralSettings />}
                              />
                              <Route
                                path="/pos-device-settings"
                                element={<POSDeviceSettings />}
                              />
                              <Route
                                path="/store"
                                element={<StoreSettings />}
                              />
                              <Route
                                path="/banner"
                                element={<BannerSettings />}
                              />
                              <Route
                                path="/payment"
                                element={<PaymentMethodSettings />}
                              />
                              <Route
                                path="/user-management"
                                element={<UserManagement />}
                              />
                              <Route
                                path="/popup"
                                element={<PopupSettings />}
                              />
                              <Route
                                path="/page-settings"
                                element={<PageSettings />}
                              />
                              <Route
                                path="/*"
                                element={<Navigate to="/404" replace />}
                              />
                            </Routes>
                          </Suspense>
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

      {/* <AddCategory
        isOpen={isCategoryModalOpen}
        setIsOpen={setIsCategoryModalOpen}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <AddTableLocations
        isOpen={isTableLocationModalOpen}
        setIsOpen={setIsTableLocationModalOpen}
      />
      <AddBrand isOpen={isBrandModalOpen} setIsOpen={setIsBrandModalOpen} />
      <AddTable
        isOpen={isTableModalOpen}
        setIsOpen={setIsTableModalOpen}
        selectedImage={selectedImage}
      />
      <AddOrderType
        isOpen={isOrderTypeModalOpen}
        setIsOpen={setIsOrderTypeModalOpen}
      />
      <AddTax isOpen={isTaxModalOpen} setIsOpen={setIsTaxModalOpen} /> */}
    </>
  );
}

export default Settings;
