import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import Skeleton from "react-loading-skeleton";

const ViewCustomerLoyalty = ({ customerId }) => {
  const dispatch = useDispatch();
  const { getCustomerLoyaltyLoading, customerLoyaltyHistory } = useSelector(
    (state) => state.loyaltyReducer
  );
  const { activeStore } = useSelector((state) => state.authenticationReducer);

  useEffect(() => {
    dispatch({
      type: "GET_CUSTOMER_LOYALTY_REQUEST",
      payload: {
        Id: customerId,
      },
    });
  }, [customerId]);
  return (
    <div className="modal-body">
      <div className="loyaltytable">
        <div className="">
          <div className="row">
            <div className="col-md-6">
              <div className="table-body bg-light p-3">
                <h6 className="fw-bold text-theme">Acquired Points</h6>
                <div className="table-responsive">
                  <table
                    className="table table-hover align-middle table-nowrap mb-0 text-center"
                    style={{ overflow: "hidden" }}
                  >
                    <thead className="bg-white">
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Acquired Points</th>
                        <th scope="col">Paid Amount</th>
                      </tr>
                    </thead>
                    {getCustomerLoyaltyLoading ? (
                      <tbody style={{ overflow: "hidden" }}>
                        <tr style={{ overflow: "hidden" }}>
                          <td>
                            <Skeleton />
                          </td>
                          <td>
                            <Skeleton />
                          </td>
                          <td>
                            <Skeleton />
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {customerLoyaltyHistory?.loyaltyAccuiredViewModels
                          ?.length > 0 ? (
                          customerLoyaltyHistory?.loyaltyAccuiredViewModels?.map(
                            (item, index) => (
                              <tr key={index}>
                                <td>{item.date}</td>
                                <td>
                                  {activeStore?.currencySymbol}{" "}
                                  {item.accuiredPoints}
                                </td>
                                <td>{item.paidAmount}</td>
                              </tr>
                            )
                          )
                        ) : (
                          <tr style={{ textAlign: "center" }}>
                            <td colSpan={3}>No Records Found!</td>
                          </tr>
                        )}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="table-body bg-light p-3">
                <h6 className="fw-bold text-theme">Redeem History</h6>
                <div className="table-responsive">
                  <table
                    className="table table-hover align-middle table-nowrap mb-0 text-center"
                    style={{ overflow: "hidden" }}
                  >
                    <thead className="bg-white">
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Redeem Points</th>
                        <th scope="col">Redeem Amount</th>
                      </tr>
                    </thead>
                    {getCustomerLoyaltyLoading ? (
                      <tbody style={{ overflow: "hidden" }}>
                        <tr style={{ overflow: "hidden" }}>
                          <td>
                            <Skeleton />
                          </td>
                          <td>
                            <Skeleton />
                          </td>
                          <td>
                            <Skeleton />
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {customerLoyaltyHistory?.loyaltyReedemHistoryViewModels
                          ?.length > 0 ? (
                          customerLoyaltyHistory?.loyaltyReedemHistoryViewModels?.map(
                            (item, index) => (
                              <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.reedemAmount}</td>
                                <td>
                                  {activeStore?.currencySymbol}{" "}
                                  {item.reedemPoints}
                                </td>
                              </tr>
                            )
                          )
                        ) : (
                          <tr style={{ textAlign: "center" }}>
                            <td colSpan={3}>No Records Found!</td>
                          </tr>
                        )}
                      </tbody>
                    )}
                  </table>
                </div>
                {/* <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mt-3 mb-0">
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
                </nav> */}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <p className="fw-bold">
              Total Acquired Points:
              <span className="d-block text-theme">
                {customerLoyaltyHistory?.totalAccuiredPoints}
              </span>
            </p>
          </div>
          <div className="col-md-3">
            <p className="fw-bold">
              Total Spent Amount:
              <span className="d-block text-theme">
                {activeStore?.currencySymbol}{" "}
                {customerLoyaltyHistory?.totalSpendAmount}
              </span>
            </p>
          </div>
          <div className="col-md-3">
            <p className="fw-bold">
              Total Redeem Points:
              <span className="d-block text-theme">
                {customerLoyaltyHistory?.totalReedemAmount}
              </span>
            </p>
          </div>
          <div className="col-md-3">
            <p className="fw-bold">
              Total Redeem Amount:
              <span className="d-block text-theme">
                {activeStore?.currencySymbol}{" "}
                {customerLoyaltyHistory?.totalReedemPoints}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerLoyalty;
