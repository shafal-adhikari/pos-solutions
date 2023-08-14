import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";
import ChangePlan from "./ChangePlan";

function UserSubscription() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "GET_ALL_SUBSCRIPTION_REQUEST",
    });
  }, []);
  const { allCards, subscriptionPlan, isLoading } = useSelector(
    (state) => state.billingReducer
  );
  const [changeModal, setChangeModal] = useState(false);
  return (
    <>
      <ChangePlan
        isOpen={changeModal}
        setIsOpen={setChangeModal}
        StoreSubscriptionPlanId={subscriptionPlan?.storeSubscriptionPlanId}
      />
      <div className="row project-tabs">
        <div className="col-md-12">
          <nav>
            <div className="nav nav-tabs border-0" id="nav-tab" role="tablist">
              <a
                className="nav-item nav-link active"
                id="nav-purchasesubscription-tab"
                data-bs-toggle="tab"
                href="#nav-purchasesubscription"
                role="tab"
                aria-controls="nav-purchasesubscription"
                aria-selected="true"
              >
                Purchase a new subscription
              </a>
              {/* <a class="nav-item nav-link" id="nav-royalty-tab" data-bs-toggle="tab" href="#nav-editpayment" role="tab" aria-controls="nav-editpayment" aria-selected="false">Edit your payment</a> */}
              <a
                className="nav-item nav-link"
                id="nav-viewinvoice-tab"
                data-bs-toggle="tab"
                href="#nav-viewinvoice"
                role="tab"
                aria-controls="nav-viewinvoice"
                aria-selected="false"
              >
                View Invoice
              </a>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade active show"
              id="nav-purchasesubscription"
              role="tabpanel"
              aria-labelledby="nav-purchasesubscription-tab"
            >
              <div className="subscribenow pt-2">
                <div className="row ">
                  <div className="col-md-6">
                    <div className="subscribepayment ">
                      <div className="card mt-50 mb-50  border-0 rounded-3">
                        <div className="card-body">
                          <div className=" d-flex align-items-center justify-content-between">
                            <h6 className="fw-bold">Registered Cards</h6>
                            <a
                              href=""
                              className="btn  text-white btn-sm all_btn border-0"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#addnewcardCanvas"
                              aria-controls="addnewcardCanvas"
                            >
                              <i className="fas fa-plus me-1" /> Add New Card
                            </a>
                          </div>
                          <div className="newcard_details mt-3">
                            <div className="table-responsive">
                              {isLoading ? (
                                <TableSkeleton row={2} column={4} />
                              ) : (
                                <table className="table table-hover  align-middle table-nowrap mb-0">
                                  <thead>
                                    <tr className="table-light">
                                      <th />
                                      <th> Card Type</th>
                                      <th>Card No.</th>
                                      <th>Expiry Date</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {allCards && allCards.length > 0 ? (
                                      allCards.map((card, i) => {
                                        return (
                                          <tr key={card.cardNumber + i}>
                                            <td>
                                              <div className="round d-flex align-items-center mt-1">
                                                <input
                                                  type="checkbox"
                                                  defaultChecked=""
                                                  id="checkbox"
                                                />
                                                <label htmlFor="checkbox" />
                                                <i className="fas fa-credit-card ms-3 mt-1" />
                                              </div>
                                            </td>
                                            <td>{card.cardType}</td>
                                            <td>{card.cardNumber}</td>
                                            <td>
                                              {card.expiryMonth +
                                                "/" +
                                                card.expiryYear}
                                            </td>
                                          </tr>
                                        );
                                      })
                                    ) : (
                                      <tr style={{ textAlign: "center" }}>
                                        <td colSpan={4}>No Cards Found</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card mt-50 mb-50 h-100 border-0 rounded-3 mt-3">
                        <div className="card-body">
                          <div className=" d-flex align-items-center justify-content-between">
                            <h6 className="fw-bold">My Subscription</h6>
                            <Link
                              to="/subscriptions"
                              className="btn btn-success btn-sm bg-theme text-white border-0"
                            >
                              Subscription List
                            </Link>
                          </div>
                          <hr />
                          <div className="newcard_details mt-3">
                            {isLoading ? (
                              <div>
                                <Skeleton count={0.3} height={20} />
                                <Skeleton
                                  count={0.5}
                                  height={40}
                                  className="mt-3"
                                />
                                <Skeleton
                                  count={1}
                                  height={30}
                                  className="mt-3"
                                />
                              </div>
                            ) : (
                              <div className="price-box">
                                <div className="">
                                  <div className="price-label basic">
                                    {subscriptionPlan?.planName}
                                  </div>
                                  <div className="price">
                                    {subscriptionPlan?.amount}
                                  </div>
                                  <div className="price-info">
                                    Per Month, Inlc GST.
                                  </div>
                                </div>
                                <div className="info">
                                  {/* <p>
                                For all individuals and starters who want to
                                start with domaining.
                              </p> */}
                                  <a
                                    onClick={() => setChangeModal(true)}
                                    className="plan-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#changeplanModal"
                                  >
                                    Change Plan
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-viewinvoice"
              role="tabpanel"
              aria-labelledby="nav-viewinvoice-tab"
            >
              <div className="viewinvoice">
                <div className="card">
                  <div className="card-body">
                    <div className="">
                      <table className="table table-hover  align-middle table-nowrap mb-0">
                        <thead>
                          <tr className="table-light">
                            <th>Date</th>
                            <th>Invoice No.</th>
                            <th>Bolling Period</th>
                            <th>Payment Method</th>
                            <th>Amount</th>
                            <th>Date Due</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>001</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              {/* Example single danger button */}
                              <div className="btn-group subscribeaction">
                                <button
                                  type="button"
                                  className="btn btn-transparent dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="mdi mdi-dots-vertical align-middle" />
                                </button>
                                <div className="dropdown-menu">
                                  <a
                                    className="dropdown-item"
                                    href="invoice.html"
                                  >
                                    View Invoice
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href="invoice.html"
                                  >
                                    Export to PDF
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href=""
                                    data-bs-toggle="modal"
                                    data-bs-target="#requestrefund"
                                  >
                                    Request Refund
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end mt-3">
                          <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex={-1}>
                              Previous
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              2
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              3
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              Next
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    // <div className="col-md-9">
  );
}

export default UserSubscription;
