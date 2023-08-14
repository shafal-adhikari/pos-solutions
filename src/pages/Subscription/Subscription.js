import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
function Subscription() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "GET_ALL_SUBSCRIPTION_PLAN_REQUEST",
    });
  }, []);
  const { allSubscriptionPlan, allLoading } = useSelector(
    (state) => state.billingReducer
  );
  const navigate = useNavigate();
  const {
    activeStore: { currencySymbol },
  } = useSelector((state) => state.authenticationReducer);
  console.log("allSubscription", allSubscriptionPlan);
  return (
    <div className="container-fluid page-body-wrapper1">
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
                        <span>Subscription Plans</span>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            {/* <div className="alert alert-danger" role="alert">
              You are not subscribed to use the POS. Please Subscribe to use it.
            </div>
            <div className="alert alert-danger" role="alert">
              Your Trial Has Been Expired.
            </div> */}
            {/* order tabs */}
            <div className="menu_inner subscribe_plan">
              <div className="card mb-3 bg-light-green border-0 p-1">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="assets/images/noproduct.png"
                      className="img-fluid rounded-start no_product"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title mb-2">
                        Your subscription has expired. Please renew to use POS.
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pricing mb-3">
                {allLoading ? (
                  <div>
                    <Skeleton count={0.25} height={250} inline={true} />
                    <Skeleton
                      count={0.25}
                      height={250}
                      inline={true}
                      className="ms-3"
                    />
                    <Skeleton
                      count={0.25}
                      height={250}
                      inline={true}
                      className="ms-3"
                    />
                  </div>
                ) : (
                  <div className="row justify-content-center">
                    {allSubscriptionPlan?.map((plan) => {
                      return (
                        <div className="col-lg-3" key={plan.subscriptionPlanId}>
                          <div className="price-box">
                            <div className="">
                              <div className="price-label basic">
                                {plan.subscriptionPlanName}
                              </div>
                              <div className="price">
                                {currencySymbol + " "}
                                {plan.amount}
                              </div>
                              <div className="price-info">Per Month, loc.</div>
                            </div>
                            <div className="info">
                              <ul>
                                {plan.planItems.map((item, i) => {
                                  return (
                                    <li key={i + item}>
                                      <i className="fas fa-check" />
                                      {item}
                                    </li>
                                  );
                                })}
                              </ul>
                              <a
                                className="plan-btn"
                                onClick={() =>
                                  navigate("new-subscription", {
                                    state: {
                                      subscriptionPlanId:
                                        plan.subscriptionPlanId,
                                      price: plan.amount,
                                    },
                                  })
                                }
                              >
                                Join Plan
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
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
    </div>
  );
}

export default Subscription;
