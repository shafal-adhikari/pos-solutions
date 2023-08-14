import React from "react";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
function ViewOrder() {
  const {
    orderDetails: {
      customerUserViewModel,
      orderDetailsViewModel,
      orderPaymentDetailsWithPaymentStatusViewModel,
      productWithPriceDetailsViewModel,
      setMenuWithPriceDetailsViewModel,
    },
    getLoading,
  } = useSelector((state) => state.ordersReducer);
  const {
    activeStore: { currencySymbol },
  } = useSelector((state) => state.authenticationReducer);
  return (
    <div className="vieworder_inner">
      <div className="row">
        <div className="col-md-9">
          <div className="innersec border-bottom border-dashed border-0 ">
            <h6 className="text-theme fw-bold">Customer User</h6>
            <div className="row">
              <div className="col-md-3">
                <p className="fw-bold mb-0">Customer Name</p>
                <span>
                  <small>
                    {getLoading ? <Skeleton /> : customerUserViewModel?.name}
                  </small>
                </span>
              </div>
              <div className="col-md-3">
                <p className="fw-bold mb-0">Email</p>
                <span>
                  <small>
                    {getLoading ? <Skeleton /> : customerUserViewModel?.email}
                  </small>
                </span>
              </div>
              <div className="col-md-3">
                <p className="fw-bold mb-0">Phone</p>
                <span>
                  <small>
                    {getLoading ? (
                      <Skeleton />
                    ) : (
                      customerUserViewModel?.phoneNumber
                    )}
                  </small>
                </span>
              </div>
            </div>
          </div>
          <div className="innersec border-bottom border-dashed border-0 ">
            <h6 className="text-theme fw-bold">Order Details</h6>
            <div className="row">
              <div className="col-md-3">
                <p className="fw-bold mb-0">Order No.</p>
                <span>
                  <small>
                    {getLoading ? (
                      <Skeleton />
                    ) : (
                      orderDetailsViewModel?.orderNumber
                    )}
                  </small>
                </span>
              </div>
              <div className="col-md-3">
                <p className="fw-bold mb-0">Order By</p>
                <span>
                  <small>
                    {getLoading ? (
                      <Skeleton />
                    ) : (
                      orderDetailsViewModel?.orderedBy
                    )}
                  </small>
                </span>
              </div>
              <div className="col-md-3">
                <p className="fw-bold mb-0">Order type</p>
                <span>
                  <small>
                    {getLoading ? (
                      <Skeleton />
                    ) : (
                      orderDetailsViewModel?.orderType
                    )}
                  </small>
                </span>
              </div>
              <div className="col-md-3">
                <p className="fw-bold mb-0">Payment Status</p>
                <span className="badge bg-info text-dark">
                  {getLoading ? (
                    <Skeleton />
                  ) : (
                    orderDetailsViewModel?.orderStatus
                  )}
                </span>
              </div>
              <div className="col-md-3">
                <p className="fw-bold mb-0">Order Channel</p>
                <span>
                  <small>
                    {getLoading ? (
                      <Skeleton />
                    ) : (
                      orderDetailsViewModel?.orderChannel
                    )}
                  </small>
                </span>
              </div>
              <div className="col-md-3">
                <p className="fw-bold mb-0">Table No.</p>
                <span>
                  <small>
                    {getLoading ? (
                      <Skeleton />
                    ) : (
                      orderDetailsViewModel?.tableNumber
                    )}
                  </small>
                </span>
              </div>
              <div className="col-md-3">
                <p className="fw-bold mb-0">Delivery Address</p>
                <span className="badge bg-info text-dark">
                  {getLoading ? (
                    <Skeleton />
                  ) : (
                    orderDetailsViewModel?.deliveryAddress
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="innersec border-bottom border-dashed border-0 ">
            <h6 className="text-theme fw-bold">Amount Details</h6>
            <div className="row bg-light">
              <div className="col-md-3">
                <p className="fw-bold mb-0">Tax Amount</p>
                <span>
                  <small>
                    {getLoading ? <Skeleton /> : currencySymbol}
                    {orderDetailsViewModel?.taxAmount}
                  </small>
                </span>
              </div>
              <div className="col-md-3">
                <p className="fw-bold mb-0">Total Amount</p>
                <span>
                  <small>
                    {getLoading ? <Skeleton /> : currencySymbol}
                    {orderDetailsViewModel?.totalAmount}
                  </small>
                </span>
              </div>
            </div>
          </div>
          <div className="innersec border-bottom border-dashed border-0 ">
            <h6 className="text-theme fw-bold">Product With Price Details</h6>
            {getLoading ? (
              <Skeleton height={50} />
            ) : productWithPriceDetailsViewModel?.length < 1 ? (
              <div className="row bg-light">
                <p>No Data Found</p>
              </div>
            ) : (
              productWithPriceDetailsViewModel?.map((product, i) => {
                return (
                  <div className="row bg-light" key={"product" + i}>
                    <div className="col-md-3">
                      <img
                        src={product.image}
                        alt=""
                        className="img-fluid orderimg"
                      />
                    </div>
                    <div className="col-md-3">
                      <p className="fw-bold mb-0">Name</p>
                      <span>
                        <small>
                          {product.name}
                          {product.isCancelled && (
                            <span className="badge bg-danger ms-1">
                              Cancelled
                            </span>
                          )}
                        </small>
                      </span>
                    </div>
                    <div className="col-md-3">
                      <p className="fw-bold mb-0">Quantity</p>
                      <span>
                        <small>{product.quantity}</small>
                      </span>
                    </div>
                    <div className="col-md-3">
                      <p className="fw-bold mb-0">Total</p>
                      <span>
                        <small>
                          {currencySymbol}
                          {product.total}
                        </small>
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="innersec border-bottom border-dashed border-0 ">
            <h6 className="text-theme fw-bold">Set Menu Price Details</h6>
            {getLoading ? (
              <Skeleton height={50} />
            ) : setMenuWithPriceDetailsViewModel?.length < 1 ? (
              <div className="row bg-light">
                <p>No Data Found</p>
              </div>
            ) : (
              setMenuWithPriceDetailsViewModel?.map((product, i) => {
                return (
                  <div className="row bg-light" key={"setMenu" + i}>
                    <div className="col-md-3">
                      <img
                        src={product.image}
                        alt=""
                        className="img-fluid orderimg"
                      />
                    </div>
                    <div className="col-md-3">
                      <p className="fw-bold mb-0">Name</p>
                      <span>
                        <small>{product.name}</small>
                      </span>
                    </div>
                    <div className="col-md-3">
                      <p className="fw-bold mb-0">Quantity</p>
                      <span>
                        <small>{product.quantity}</small>
                      </span>
                    </div>
                    <div className="col-md-3">
                      <p className="fw-bold mb-0">Total</p>
                      <span>
                        <small>
                          {currencySymbol}
                          {product.total}
                        </small>
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="col-md-3 orderfilter">
          <div className="card bg-color1 shadow border-0">
            {orderPaymentDetailsWithPaymentStatusViewModel?.orderPaymentsDetailsViewModels?.map(
              (paymentDetails, i) => {
                return (
                  <div className="card-body" key={"paymentDetails" + i}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="mb-0">Transaction Status</h6>
                      </div>
                      <div>
                        <span className="badge bg-success">
                          {paymentDetails.paymentStatus}
                        </span>
                      </div>
                    </div>
                    <div className="template-demo">
                      <table className="table mb-0 ">
                        <tbody>
                          <tr>
                            <td className="ps-0">Payment Method</td>
                            <td className="pe-0 text-end">
                              {paymentDetails.paymentMethod}
                            </td>
                          </tr>
                          <tr>
                            <td className="ps-0">Customer Name</td>
                            <td className="pe-0 text-end">
                              {paymentDetails.customerName}
                            </td>
                          </tr>
                          <tr>
                            <td className="ps-0">Holiday Surge Amount</td>
                            <td className="pe-0 text-end">
                              {
                                orderPaymentDetailsWithPaymentStatusViewModel.holidaySurgeAmount
                              }
                            </td>
                          </tr>
                          <tr>
                            <td className="ps-0">Credit Card Surge Amount</td>
                            <td className="pe-0 text-end">
                              {
                                orderPaymentDetailsWithPaymentStatusViewModel.creditCardSurgeAmount
                              }
                            </td>
                          </tr>
                          <tr>
                            <td className="ps-0">Tip Amount</td>
                            <td className="pe-0 text-end">
                              {currencySymbol}
                              {paymentDetails.tipAmount}
                            </td>
                          </tr>
                          <tr>
                            <td className="ps-0">Discount Amount</td>
                            <td className="pe-0 text-end">
                              {" "}
                              {currencySymbol}
                              {
                                orderPaymentDetailsWithPaymentStatusViewModel.discount
                              }
                            </td>
                          </tr>
                          <tr className="border-dashed bordercolor">
                            <td className="ps-0">Total</td>
                            <td className="pe-0 text-end">
                              {" "}
                              {currencySymbol}
                              {paymentDetails.paidAmount}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              }
            )}
            {/* <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="mb-0">Transaction Status</h6>
                </div>
                <div>
                  <span className="badge bg-success">NA</span>
                </div>
              </div>
              <div className="template-demo">
                <table className="table mb-0 ">
                  <tbody>
                    <tr>
                      <td className="ps-0">Payment Method</td>
                      <td className="pe-0 text-end">FPOS</td>
                    </tr>
                    <tr>
                      <td className="ps-0">Customer Name</td>
                      <td className="pe-0 text-end">Anonymous</td>
                    </tr>
                    <tr>
                      <td className="ps-0">Holiday Surge Amount</td>
                      <td className="pe-0 text-end">
                        <span className="badge bg-success">N/A</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-0">Credit Card Surge Amount</td>
                      <td className="pe-0 text-end">N/A</td>
                    </tr>
                    <tr>
                      <td className="ps-0">Tip Amount</td>
                      <td className="pe-0 text-end">$1.00</td>
                    </tr>
                    <tr>
                      <td className="ps-0">Discount Amount</td>
                      <td className="pe-0 text-end">$5.00</td>
                    </tr>
                    <tr className="border-dashed bordercolor">
                      <td className="ps-0">Total</td>
                      <td className="pe-0 text-end">$17.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
