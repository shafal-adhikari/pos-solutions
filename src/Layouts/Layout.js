import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { API } from "../helpers/baseURL";
import { getLocalStorage } from "../helpers/frontendHelper";
import Login from "../components/Login";
import { openNotificationWithIcon } from "../components/Notification/Notification.tsx";
function Layout({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { activeStore } = useSelector((state) => state.authenticationReducer);
  const { releaseVersion } = useSelector((state) => state.commonReducer);
  const [serverError, setServerError] = useState(false);
  API.interceptors.request.use(
    async (config) => {
      const token = getLocalStorage("token");
      const storeId = activeStore
        ? activeStore.id
        : getLocalStorage("storeDetailsUser")[0]?.storeId;
      const userId = getLocalStorage("userDetails")?.userId;

      config.headers = Object.assign(
        {
          Authorization: `Bearer ${token}`,
          storeId,
          userId,
        },
        config.headers
      );
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  API.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (error?.response?.status === 401) {
        setLoginModalOpen(true);
      }
      if (error?.response?.status === 503) {
        setServerError(true);
      }
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    dispatch({ type: "GET_RELEASE_VERSION_REQUEST" });
  }, [location.pathname]);
  useEffect(() => {
    if (serverError) openNotificationWithIcon("error", "Server Error! ");
  }, [serverError]);
  const path = location.pathname.split("/")[1];
  useEffect(() => {
    if (releaseVersion)
      if (localStorage.getItem(`releaseVersion`) !== releaseVersion) {
        function deleteAllCookies() {
          var cookies = document.cookie.split(";");
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
          }
        }
        deleteAllCookies();
        dispatch({
          type: "LOGOUT",
        });
        localStorage.clear();

        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
        localStorage.setItem("releaseVersion", releaseVersion);
      }
  }, [releaseVersion, location.pathname]);
  const [size, setSize] = useState("md");
  return (
    <>
      <Modal
        centered
        show={loginModalOpen}
        backdropClassName="loginBackdrop"
        size={size}
      >
        <Login setLoginModalOpen={setLoginModalOpen} setSize={setSize} />
      </Modal>
      {path == "account" ||
      path == "404" ||
      path == "2fa" ||
      path == "login" ||
      path == "add-organisation" ||
      path == "register" ? (
        ""
      ) : (
        <Navbar />
      )}
      {children}
    </>
  );
}

export default Layout;
