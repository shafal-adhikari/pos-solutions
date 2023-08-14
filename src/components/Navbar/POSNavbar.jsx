import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
function POSNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeStore, storeDetails } = useSelector(
    (state) => state.authenticationReducer
  );
  const {
    activeStore: { isTrialExpired },
  } = useSelector((state) => state.authenticationReducer);
  return (
    <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
        <Link className="navbar-brand brand-logo" to="/">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
            alt="logo"
          />
        </Link>
        <Link className="navbar-brand brand-logo-mini" to="/">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
            alt="logo"
          />
        </Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center">
        {/* open sidebar menu */}
        <div className="categories_wrap mr-3">
          <div
            className="offcanvas offcanvas-start"
            tabIndex={-1}
            id="innercanvasmenu"
            aria-labelledby="innercanvasmenuLabel"
          >
            <button
              type="button"
              className="btn-close text-reset ms-auto"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
            <div className="offcanvas-body sidebar">
              <ul className="nav">
                {/* <li className="nav-item nav-category">Main Menu</li> */}
                <li className="nav-item">
                  <a className="nav-link active" href="index.html">
                    <i className="fas fa-home" />
                    <span className="menu-title">Dashboard</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="pos.html">
                    <i className="fas fa-cash-register" />
                    <span className="menu-title">POS</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="order.html">
                    <i className="fas fa-cloud-meatball" />
                    <span className="menu-title">Orders</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="inventory.html">
                    <i className="fas fa-money-bill" />
                    <span className="menu-title">Inventory</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="vendors.html">
                    <i className="fas fa-store" />
                    <span className="menu-title">Suppliers</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="customers.html">
                    <i className="fas fa-users" />
                    <span className="menu-title">Customers</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="employees.html">
                    <i className="fas fa-user-tie" />
                    <span className="menu-title">Employees</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="reports.html">
                    <i className="fas fa-file-invoice" />
                    <span className="menu-title">Reports</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="loyalty.html">
                    <i className="fas fa-hands" />
                    <span className="menu-title">Loyalty</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="endofday.html">
                    <i className="fas fa-exchange-alt" />
                    <span className="menu-title">EOD</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="booking.html">
                    <i className="fas fa-exchange-alt" />
                    <span className="menu-title">Booking</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="sync.html">
                    <i className="fas fa-exchange-alt" />
                    <span className="menu-title">sync</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="integration.html">
                    <i className="fab fa-mixer" />
                    <span className="menu-title">Integration</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="giftcards.html">
                    <i className="fas fa-gift" />
                    <span className="menu-title">Gift Cards</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="settings.html">
                    <i className="fas fa-cog" />
                    <span className="menu-title">Settings</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <a
          className="btn btn-primary"
          data-bs-toggle="offcanvas"
          href="#innercanvasmenu"
          role="button"
          aria-controls="innercanvasmenu"
        >
          <span className="mdi mdi-menu" />
        </a>
        <ul className="navbar-nav mr-lg-4 w-100 align-items-center">
          <li className="nav-item dropdown mr-1">
            <a
              className="nav-link text-white dropdown-toggle d-flex justify-content-center align-items-center my_company"
              href="#"
              data-bs-toggle="dropdown"
            >
              <p className="mb-0">{activeStore.name}</p>
            </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown mt-0 pb-0">
              {storeDetails.length > 0 &&
                storeDetails?.map((stores) => {
                  return (
                    <a
                      key={stores.id}
                      onClick={() => {
                        dispatch({
                          type: "ACTIVATE_STORE_REQUEST",
                          payload: {
                            StoreId: stores.id,
                          },
                        });
                      }}
                      className="dropdown-item d-flex align-items-center border-bottom"
                    >
                      <div className="item-content flex-grow">
                        <h6 className="ellipsis1 font-weight-normal theme-color1 font-weight-bold mb-0">
                          {stores.name}
                        </h6>
                      </div>
                    </a>
                  );
                })}
            </div>
          </li>
        </ul>

        {isTrialExpired ? (
          <div
            className="me-2 d-flex fs-6 fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch({
                type: "LOGOUT",
              });
            }}
          >
            <AiOutlineLogout size={30} />
            <span className="ms-2">Logout</span>
          </div>
        ) : (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link count-indicator"
                id="notificationDropdown"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i className="mdi mdi-bell-outline" />
                <span className="count">7</span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0"
                aria-labelledby="notificationDropdown"
              >
                <a className="dropdown-item py-3 border-bottom">
                  <p className="mb-0 font-weight-medium float-left">
                    You have 4 new notifications
                  </p>
                  <span className="badge badge-pill badge-primary float-right">
                    View all
                  </span>
                </a>
                <a className="dropdown-item preview-item py-3">
                  <div className="preview-thumbnail">
                    <i className="mdi mdi-alert m-auto text-primary" />
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal text-dark mb-1">
                      Application Error
                    </h6>
                    <p className="font-weight-light small-text mb-0">
                      Just now
                    </p>
                  </div>
                </a>
                <a className="dropdown-item preview-item py-3">
                  <div className="preview-thumbnail">
                    <i className="mdi mdi-settings m-auto text-primary" />
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal text-dark mb-1">
                      Settings
                    </h6>
                    <p className="font-weight-light small-text mb-0">
                      Private message
                    </p>
                  </div>
                </a>
                <a className="dropdown-item preview-item py-3">
                  <div className="preview-thumbnail">
                    <i className="mdi mdi-airballoon m-auto text-primary" />
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal text-dark mb-1">
                      New user registration
                    </h6>
                    <p className="font-weight-light small-text mb-0">
                      2 days ago
                    </p>
                  </div>
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="btn btn-primary bg-theme border-0">
                <span className="badge badge-pill badge-danger addtocart">
                  1
                </span>
                <span className="mdi mdi-cart" />
              </a>
            </li>
            <li className="nav-item dropdown d-none d-xl-inline-block user-dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="UserDropdown"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="img-xs rounded-circle"
                  src={process.env.PUBLIC_URL + "assets/images/faces/face8.jpg"}
                  alt="Profile image"
                />
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown"
                aria-labelledby="UserDropdown"
              >
                <div className="dropdown-header text-center">
                  <img
                    className="img-md rounded-circle"
                    src={
                      process.env.PUBLIC_URL + "assets/images/faces/face8.jpg"
                    }
                    alt="Profile image"
                  />
                  <p className="mb-1 mt-3 font-weight-semibold">Allen Moreno</p>
                  <p className="font-weight-light text-muted mb-0">
                    allenmoreno@gmail.com
                  </p>
                </div>
                <Link className="dropdown-item" to="/user/profile">
                  My Profile
                  <span className="badge badge-pill badge-danger">1</span>
                  <i className="dropdown-item-icon ti-dashboard" />
                </Link>
                <a className="dropdown-item">
                  Messages
                  <i className="dropdown-item-icon ti-comment-alt" />
                </a>
                <a className="dropdown-item">
                  Activity
                  <i className="dropdown-item-icon ti-location-arrow" />
                </a>
                <a className="dropdown-item">
                  FAQ
                  <i className="dropdown-item-icon ti-help-alt" />
                </a>
                <a
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: "LOGOUT" });
                  }}
                >
                  Sign Out
                  <i className="dropdown-item-icon ti-power-off" />
                </a>
              </div>
            </li>
          </ul>
        )}
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="mdi mdi-menu" />
        </button>
      </div>
    </nav>
  );
}

export default POSNavbar;
