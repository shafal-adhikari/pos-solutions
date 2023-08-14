import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
function ProtectedRoute({ children, isLoginPage, isSubscription }) {
  const {
    isLoggedIn,
    activeStore: { isTrialExpired },
  } = useSelector((state) => state.authenticationReducer);
  const { pathname } = useLocation();
  if (isLoginPage) {
    if (isLoggedIn) {
      return <Navigate to="/" replace={true} />;
    } else {
      return children;
    }
  }
  if (isLoggedIn) {
    if (pathname == "/subscriptions") {
      return children;
    }
    if (
      isTrialExpired &&
      pathname !== "/subscription" &&
      pathname !== "/subscriptions/new-subscription"
    ) {
      return <Navigate to="/subscriptions" replace={true} />;
    }
    return children;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
}

export default ProtectedRoute;
