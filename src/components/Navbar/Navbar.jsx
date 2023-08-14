import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeStore, storeDetails, userDetails } = useSelector(
    (state) => state.authenticationReducer
  );

  return (
    <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
        <Link className="navbar-brand brand-logo" to="/">
          <img
            src={
              activeStore?.imageUrl
                ? activeStore?.imageUrl
                : "/assets/images/logo.png"
            }
            alt="logo"
          />
        </Link>
        <Link className="navbar-brand brand-logo-mini" to="/">
          <img
            src={
              activeStore?.imageUrl
                ? activeStore?.imageUrl
                : "/assets/images/logo.png"
            }
            alt="logo"
          />
        </Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center">
        <ul className="navbar-nav mr-lg-4 w-100 align-items-center">
          <li className="nav-item dropdown mr-1">
            <a
              className="nav-link text-white dropdown-toggle d-flex justify-content-center align-items-center my_company"
              href="#"
              data-bs-toggle="dropdown"
            >
              <p className="mb-0">{activeStore?.name}</p>
            </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown mt-0 pb-0">
              {storeDetails &&
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
                          {stores?.name}
                        </h6>
                      </div>
                    </a>
                  );
                })}
              <Link to="/add-organisation">Add Organisation</Link>
            </div>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link count-indicator"
              id="notificationDropdown"
              href="#"
              data-bs-toggle="dropdown"
            >
              <i className="mdi mdi-bell-outline"></i>
              <span className="count">7</span>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0"
              aria-labelledby="notificationDropdown"
            >
              <a className="dropdown-item py-3 border-bottom">
                <p className="mb-0 font-weight-medium float-left">
                  You have 4 new notifications{" "}
                </p>
                <span className="badge badge-pill badge-primary float-right">
                  View all
                </span>
              </a>
              <a className="dropdown-item preview-item py-3">
                <div className="preview-thumbnail">
                  <i className="mdi mdi-alert m-auto text-primary"></i>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-normal text-dark mb-1">
                    Application Error
                  </h6>
                  <p className="font-weight-light small-text mb-0">
                    {" "}
                    Just now{" "}
                  </p>
                </div>
              </a>
              <a className="dropdown-item preview-item py-3">
                <div className="preview-thumbnail">
                  <i className="mdi mdi-settings m-auto text-primary"></i>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-normal text-dark mb-1">
                    Settings
                  </h6>
                  <p className="font-weight-light small-text mb-0">
                    {" "}
                    Private message{" "}
                  </p>
                </div>
              </a>
              <a className="dropdown-item preview-item py-3">
                <div className="preview-thumbnail">
                  <i className="mdi mdi-airballoon m-auto text-primary"></i>
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject font-weight-normal text-dark mb-1">
                    New user registration
                  </h6>
                  <p className="font-weight-light small-text mb-0">
                    {" "}
                    2 days ago{" "}
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="nav-item dropdown d-none d-xl-inline-block user-dropdown">
            <a
              className="nav-link dropdown-toggle d-flex align-items-center"
              id="UserDropdown"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                className="img-xs rounded-circle"
                src={
                  userDetails?.image
                    ? userDetails?.image
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="Profile image"
              />
              <span className="ms-2" style={{ fontSize: "13px" }}>
                {userDetails?.name?.split(" ")?.[0]}
              </span>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="UserDropdown"
            >
              <div className="dropdown-header text-center">
                <img
                  className="img-md rounded-circle profileImage"
                  src={
                    userDetails?.image
                      ? userDetails?.image
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="Profile image"
                />
                <p className="mb-1 mt-3 font-weight-semibold">
                  {userDetails?.name}
                </p>
                <p className="font-weight-light text-muted mb-0">
                  {userDetails?.email}
                </p>
              </div>
              <Link className="dropdown-item" to="/user/profile">
                My Profile
                <span className="badge badge-pill badge-danger">1</span>
                <i className="dropdown-item-icon ti-dashboard"></i>
              </Link>
              <a className="dropdown-item">
                Activity<i className="dropdown-item-icon ti-location-arrow"></i>
              </a>
              <a
                className="dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({
                    type: "LOGOUT",
                  });
                }}
              >
                Sign Out<i className="dropdown-item-icon ti-power-off"></i>
              </a>
            </div>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
