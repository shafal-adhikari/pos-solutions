/** @format */

import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import "./Navbar.css";
import Pos from "./pages/Pos";
import { Provider } from "react-redux";
import Orders from "./pages/Orders/Orders";
import Store from "./Redux/store";
import Inventory from "./pages/Inventory/Inventory";
import EmailConfirmation from "./pages/EmailConfirmation";
import Layout from "./Layouts/Layout";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import "./index.css";
import Settings from "./pages/Settings/Settings";
import "antd/dist/antd.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Subscription from "./pages/Subscription/Subscription";
import TwoFactorAuthentication from "./pages/TwoFactorAuthentication";
import GiftCard from "./pages/GiftCard";
import Integeration from "./pages/Integeration/Integeration";
import SuperAdmin from "./pages/SuperAdmin/SuperAdmin";
import Suppliers from "./pages/Suppliers";
import Booking from "./pages/Booking/Booking";
import LoyaltyVoucher from "./pages/LoyaltyVoucher/LoyaltyVoucher";
import Customer from "./pages/Customer/Customer";
import NoInternetConnection from "./components/NoInternet/NoInternet";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Reports from "./pages/Reports/Reports";
import User from "./pages/User/User";
import NewSubscription from "./NewSubscription/NewSubscription";
import EOD from "./pages/EOD/EOD";
import Employee from "./pages/Employee/Employee";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Sync from "./pages/Sync";
import AddOrganisation from "./pages/AddOrganisation";
function App() {
  return (
    <Provider store={Store()}>
      <NoInternetConnection>
        <div className="container-scroller">
          <Router>
            <React.Suspense fallback={<LoadingScreen />}>
              <Layout>
                <Routes>
                  <Route path="*" element={<Navigate to="/404" replace />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pos"
                    element={
                      <ProtectedRoute>
                        <Pos />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orders/*"
                    element={
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/loyalty/*"
                    element={
                      <ProtectedRoute>
                        <LoyaltyVoucher />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/customers/all-customers"
                    element={
                      <ProtectedRoute>
                        <Customer />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/inventory"
                    element={
                      <>
                        <Inventory />
                      </>
                    }
                  />
                  <Route path="/integration" element={<Integeration />} />

                  <Route
                    path="/login"
                    element={
                      <ProtectedRoute isLoginPage={true}>
                        <Login />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/sync"
                    element={
                      <ProtectedRoute>
                        <Sync />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/account/emailconfirmation"
                    element={<EmailConfirmation />}
                  />
                  <Route
                    path="/account/forgotpassword"
                    element={<ForgotPassword />}
                  />
                  <Route path="/2fa" element={<TwoFactorAuthentication />} />
                  <Route
                    path="/settings/*"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/user/*"
                    element={
                      <ProtectedRoute>
                        <User />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/superadmin/*"
                    element={
                      <ProtectedRoute>
                        <SuperAdmin />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/inventory/*"
                    element={
                      <ProtectedRoute>
                        <Inventory />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/booking/*"
                    element={
                      <ProtectedRoute>
                        <Booking />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/vendors/*"
                    element={
                      <ProtectedRoute>
                        <Suppliers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports/*"
                    element={
                      <ProtectedRoute>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/subscriptions"
                    element={
                      <ProtectedRoute isSubscription={true}>
                        <Subscription />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/subscriptions/new-subscription"
                    element={
                      <ProtectedRoute>
                        <NewSubscription />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/eod/*"
                    element={
                      <ProtectedRoute>
                        <EOD />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/employee/*"
                    element={
                      <ProtectedRoute>
                        <Employee />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/404" element={<PageNotFound />} />
                  <Route path="/giftcards/*" element={<GiftCard />} />
                  <Route
                    path="/add-organisation"
                    element={<AddOrganisation />}
                  />
                </Routes>
              </Layout>
            </React.Suspense>
          </Router>
        </div>
      </NoInternetConnection>
    </Provider>
  );
}

export default App;
