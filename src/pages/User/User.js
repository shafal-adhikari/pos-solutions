import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Routes, Route, Link } from "react-router-dom";
import PasswordAndSecurity from "./PasswordAndSecurity";
import UserSubscription from "./UserSubscription";
import { AiFillCamera } from "react-icons/ai";
import Profile from "./Profile";
import { Tooltip } from "antd";
function User() {
  const dispatch = useDispatch();
  const {
    userDetails: { userId },
  } = useSelector((state) => state.authenticationReducer);
  const { profileDetails, allLoading, updateSuccess } = useSelector(
    (state) => state.userProfileReducer
  );
  useEffect(() => {
    if (userId) {
      dispatch({
        type: "GET_USER_PROFILE_REQUEST",
        payload: userId,
      });
    }
  }, [userId, updateSuccess]);
  const [imagePreview, setImagePreview] = useState();
  const [image, setImage] = useState();
  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [image]);
  return (
    <div className="container-fluid page-body-wrapper1">
      {/* partial */}
      <div className="">
        <div className="content-wrapper">
          <div className="content">
            {/* User Profile */}
            {/* user details */}
            <div className="user_inner">
              <div className="row">
                {allLoading ? (
                  <div className="col-md-3">
                    <div className="card myprofile p-3">
                      <div className="">
                        <Skeleton
                          circle
                          count={0.2}
                          height={65}
                          className="ms-2 mb-3"
                          inline={true}
                        />
                        <Skeleton
                          count={0.7}
                          className="mt-2 ms-3"
                          height={40}
                        />
                      </div>
                      <Skeleton count={1} height={30} />
                      <Skeleton count={1} height={30} className="mt-4" />
                      <Skeleton count={1} height={30} className="mt-4 mb-3" />
                    </div>
                  </div>
                ) : (
                  <div className="col-md-3">
                    <div className="card myprofile">
                      <div className="media med1">
                        <div className="image-upload">
                          <img
                            src={
                              imagePreview
                                ? imagePreview
                                : profileDetails?.image
                                ? profileDetails?.image
                                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            }
                            className="me-3  rounded-circle"
                          />
                          <input
                            type="file"
                            id="uploadImage"
                            hidden
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                          <Tooltip title="Upload Image">
                            <label
                              htmlFor="uploadImage"
                              className="profileImageUploadButton"
                            >
                              <AiFillCamera size={14} />
                            </label>
                          </Tooltip>
                        </div>
                        <div className="media-body">
                          <h6
                            className="mt-1 mb-0"
                            style={{ fontSize: "18px" }}
                          >
                            {profileDetails?.name}
                          </h6>
                          <span className="text-muted">
                            {profileDetails?.address}
                          </span>
                          <Link
                            to="/user/profile"
                            className="pt-1 d-block"
                            style={{ color: "#333" }}
                          >
                            Edit profile
                          </Link>
                        </div>
                      </div>
                      <Link to="/user/profile">
                        <div
                          className="d-flex flex-row justify-content-between align-items-center p-3 mx-3 a1"
                          style={{ color: "#333" }}
                        >
                          <div className="d-flex flex-row align-items-center active">
                            <i className="fas fa-user" />
                            <div className="d-flex flex-row align-items-start ms-3">
                              <span>My Profile</span>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mt-2">
                            <i className="fas fa-angle-right" />
                          </div>
                        </div>
                      </Link>
                      <Link to="/user/security">
                        <div
                          className="d-flex flex-row justify-content-between align-items-center p-3 mx-3 sample a1"
                          style={{ color: "#333" }}
                        >
                          <div className="d-flex flex-row align-items-center">
                            <i className="fas fa-bell preview" />
                            <div className="d-flex flex-row align-items-start ms-3">
                              <span>Password and Security</span>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mt-2">
                            <i className="fas fa-angle-right preview" />
                          </div>
                        </div>
                      </Link>
                      <Link to="/user/subscription">
                        <div
                          className="d-flex flex-row justify-content-between align-items-center p-3 mx-3 a1"
                          style={{ color: "#333" }}
                        >
                          <div className="d-flex flex-row align-items-center">
                            <i className="fas fa-money-bill-wave-alt" />
                            <div className="d-flex flex-row align-items-start ms-3">
                              <span>Subscription</span>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mt-2">
                            <i className="fas fa-angle-right" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
                <div className="col-md-9">
                  <Outlet />
                  <Routes>
                    <Route
                      path="/profile"
                      element={<Profile image={image} />}
                    />
                    <Route path="/security" element={<PasswordAndSecurity />} />
                    <Route
                      path="/subscription"
                      element={<UserSubscription />}
                    />
                  </Routes>
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
  );
}

export default User;
