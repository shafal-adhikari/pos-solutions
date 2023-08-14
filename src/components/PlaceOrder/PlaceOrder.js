import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Drawer,
  Empty,
  Popconfirm,
  Switch,
  Tooltip,
} from "antd";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PaymentReceipt from "../PaymentReceipt/PaymentReceipt";
import AddCustomer from "../../pages/Customer/AddCustomer";
import { BsFillPlusCircleFill } from "react-icons/bs";
// import { useLocation } from "react-router-dom";
function PlaceOrder({
  open,
  orderId,
  setOpen,
  products,
  staffId,
  orderTypeId,
  tableId,
  storeTaxSettings,
  setMenu,
}) {
  const [publicHolidaySurcharge, setPublicHolidaySurchage] = useState(0);
  const [isPublicHoliday, setIsPublicHoliday] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [holidayTax, setHolidayTax] = useState(0);
  const [cardTax, setCardTax] = useState(0);
  const [discountTax, setDiscountTax] = useState(0);
  const [cardCharge, setCardCharge] = useState(0);
  const [isCardCharge, setIsCardCharge] = useState(false);
  const [cardChargeValue, setCardChargeValue] = useState(0);
  const [activePaymentMethod, setActivePaymentMethod] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [giftCardSearchValue, setGiftCardSearchValue] = useState("");
  const [totalTipPaid, setTotalTipPaid] = useState(0);
  const [orderDetails, setOrderDetails] = useState();
  const [setMenuDetails, setSetMenuDetails] = useState();
  const [tax, setTax] = useState("");
  const [itemsSubTotal, setItemsSubTotal] = useState("");

  const { paymentMethodList } = useSelector((state) => state.paymentReducer);
  const { deleteSuccess } = useSelector((state) => state.updateCartReducer);
  const { updateSuccess, isOrderLoading } = useSelector(
    (state) => state.menuReducer
  );
  useEffect(() => {
    if (updateSuccess) {
      setOrderChanged(false);
      setOrderDetails((orderDetails) => {
        return orderDetails.filter((item) => !item.isCancelled);
      });
      setSetMenuDetails((setMenuDetails) => {
        return setMenuDetails.filter((item) => !item.isCancelled);
      });
      dispatch({ type: "REMOVE_UPDATE_SUCCESS" });
    }
  }, [updateSuccess]);
  useEffect(() => {
    if (deleteSuccess) {
      updateOrderHandler();
    }
  }, [deleteSuccess]);
  const updateOrderHandler = () => {
    dispatch({
      type: "PLACE_ORDER_REQUEST",
      payload: {
        isUpdate: true,
        OrderId: orderId,
        POSDeviceId: null,
        TableId: tableId,
        CustomerName: null,
        StaffId: staffId,
        TaxAmount: tax.toString(),
        TotalAmount: (itemsSubTotal + tax).toString(),
        TotalWithoutTaxAmount: itemsSubTotal.toString(),
        Description: "",
        IsRetail: false,
        IsSendToKitchen: false,
        OrderDetails: orderDetails
          ? orderDetails?.map((product) => {
              const {
                ProductId,
                ProductName,
                Description,
                ProductPrice,
                ProductQuantity,
                ProductVariationId,
                Total,
                isCancelled,
              } = product;
              return {
                ProductId,
                ProductName,
                isCancelled,
                Description,
                ProductPrice: ProductPrice.toString(),
                Quantity: ProductQuantity.toString(),
                ProductVariationId,
                Total: Total.toString(),
              };
            })
          : [],
        SetMenuOrderDetails: setMenuDetails
          ? setMenuDetails?.map((setMenu) => {
              return {
                ...setMenu,
                TotalSetMenuPrice: setMenu.TotalSetMenuPrice.toString(),
                SetMenuPrice: setMenu.SetMenuPrice.toString(),
                Tax: setMenu.Tax.toString(),
                SetMenuQuantity: setMenu.SetMenuQuantity.toString(),
              };
            })
          : [],
        OrderTypeStoreId: orderTypeId,
      },
    });
  };

  useEffect(() => {
    if (products) {
      setOrderDetails(
        [...products]
          .filter((product) => {
            if (product.isCancelled) {
              return false;
            } else {
              return true;
            }
          })
          .map((pr) => {
            return {
              ...pr,
            };
          })
      );
    }
  }, [products]);
  useEffect(() => {
    if (orderDetails && setMenuDetails) {
      let total = 0;
      let tax = 0;
      orderDetails?.map((product) => {
        let taxPercentageValue = parseFloat(product.Tax) / 100;
        if (storeTaxSettings?.taxExclusiveInclusiveType == "TaxInclusive") {
          let eachProductTax =
            (taxPercentageValue / (1 + taxPercentageValue)) *
            product.ProductPrice *
            product.ProductQuantity;
          tax = tax + eachProductTax;
        } else if (storeTaxSettings?.taxExclusiveInclusiveType == "Exclusive") {
          let eachProductTax = taxPercentageValue * product.Total;
          tax = tax + eachProductTax;
        }
        total = total + product.Total;
      });
      setMenuDetails?.map((product) => {
        let taxPercentageValue = parseFloat(product.Tax) / 100;

        if (storeTaxSettings?.taxExclusiveInclusiveType == "TaxInclusive") {
          let eachProductTax =
            (taxPercentageValue / (1 + taxPercentageValue)) *
            product.TotalSetMenuPrice;
          tax = tax + eachProductTax;
        } else if (storeTaxSettings?.taxExclusiveInclusiveType == "Exclusive") {
          let eachProductTax = taxPercentageValue * product.TotalSetMenuPrice;
          tax = tax + eachProductTax;
        }
        total = total + product.TotalSetMenuPrice;
      });
      setItemsSubTotal(total);
      setTax(tax);
    }
  }, [orderDetails, storeTaxSettings, setMenuDetails]);
  useEffect(() => {
    if (setMenu) {
      setSetMenuDetails(
        [...setMenu].map((setMenu) => {
          return {
            ...setMenu,
          };
        })
      );
    }
  }, [setMenu]);
  const { customerError, orderPaymentData, customer } = useSelector(
    (state) => state.paymentReducer
  );
  const {
    activeStore: { currencySymbol },
  } = useSelector((state) => state.authenticationReducer);
  const [totalPayableAmount, setPayableAmount] = useState(0);
  const [paymentData, setPaymentData] = useState({
    PaidAmount: 0,
    TipAmount: 0,
  });
  const [loyaltyEnabled, setLoyaltyEnabled] = useState(true);
  useEffect(() => {
    if (customer) {
      setLoyaltyEnabled(customer.loyaltyEnabled);
    }
  }, [customer]);
  const { orderData } = useSelector((state) => state.menuReducer);
  const dispatch = useDispatch();
  const { uniqueCodeData, uniqueCodeError } = useSelector(
    (state) => state.commonReducer
  );
  useEffect(() => {});
  useEffect(() => {
    if (orderPaymentData && !orderPaymentData.isPaymentCompleted) {
      setTotalTipPaid((prev) => prev + paymentData.TipAmount);
      setPaymentData((prev) => {
        return {
          TipAmount: 0,
          PaidAmount: Number(orderPaymentData.remainingAmount),
        };
      });
      setPayableAmount(Number(orderPaymentData.remainingAmount));
    }
    if (orderPaymentData && orderPaymentData.isPaymentCompleted) {
      dispatch({
        type: "GET_ORDER_INVOICE_REQUEST",
        payload: orderPaymentData.orderId,
      });
    }
  }, [orderPaymentData]);
  useEffect(() => {
    setPayableAmount(grandTotal);
    setPaymentData((prevData) => {
      return {
        ...prevData,
        PaidAmount: grandTotal,
      };
    });
  }, [grandTotal]);
  // console.log(orderId);
  const payOrderHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "ORDER_PAYMENT_REQUEST",
      payload: {
        OrderId: orderId ? orderId : orderData.orderId,
        PaymentMethodId: activePaymentMethod.id,
        PaymentTipAmount: paymentData.TipAmount.toString(),
        PaidAmount: paymentData.PaidAmount.toString(),
        TotalPaymentAmount: totalPayableAmount.toFixed(2).toString(),
        DiscountAmount:
          storeTaxSettings?.taxExclusiveInclusiveType == "TaxInclusive"
            ? (discount - discountTax).toFixed(2).toString()
            : discount.toString(),
        DiscountAmountWithTax: discount.toString(),
        TaxAmount: (tax - discountTax + holidayTax + cardTax)
          .toFixed(2)
          .toString(),
        FinalTotalAmount: (
          grandTotal +
          totalTipPaid +
          paymentData.TipAmount
        ).toString(),
        PublicHolidaySurChargeAmount:
          storeTaxSettings?.taxExclusiveInclusiveType == "TaxInclusive"
            ? (publicHolidaySurcharge - holidayTax).toFixed(2).toString()
            : publicHolidaySurcharge.toFixed(2).toString(),
        PublicHolidaySurChargeAmoutWithTax: publicHolidaySurcharge
          .toFixed(2)
          .toString(),
        CreditCardSurChargeAmount:
          storeTaxSettings?.taxExclusiveInclusiveType == "TaxInclusive"
            ? (cardChargeValue - cardTax).toFixed(2).toString()
            : cardChargeValue.toFixed(2).toString(),
        CreditCardSurChargeAmountWithTax: cardChargeValue.toFixed(2).toString(),
        CreditCardSurchargePercentage: cardCharge.toString(),
        ReedemCode:
          activePaymentMethod?.additionalValue == "GiftCard" && uniqueCodeData
            ? uniqueCodeData?.uniqueCode
            : undefined,
        CustomerViewModel: customer
          ? {
              Id: customer.id,
            }
          : customerViewModal,
      },
    });
  };
  const [customerModalOpen, setCustomerModalOPen] = useState(false);
  useEffect(() => {
    if (isCardCharge) {
      let chargeAmount =
        (cardCharge * (itemsSubTotal - discount + publicHolidaySurcharge)) /
        100;
      setCardChargeValue(chargeAmount);
      setCardTax((chargeAmount * tax) / itemsSubTotal);
    } else {
      setCardCharge(0);
    }
  }, [
    isCardCharge,
    itemsSubTotal,
    discount,
    cardCharge,
    publicHolidaySurcharge,
  ]);
  useEffect(() => {
    if (isPublicHoliday) {
      let chargeAmount =
        (Number(storeTaxSettings.holidaySurgePercentage) *
          (itemsSubTotal - discount)) /
        100;
      setPublicHolidaySurchage(chargeAmount);
      setHolidayTax((chargeAmount * tax) / itemsSubTotal);
    } else {
      setPublicHolidaySurchage(0);
    }
  }, [isPublicHoliday, itemsSubTotal, storeTaxSettings, discount]);
  useEffect(() => {
    if (paymentMethodList) {
      setActivePaymentMethod(
        paymentMethodList?.find((method) => method.isSelected)
      );
    }
  }, [paymentMethodList]);
  const searchCustomerHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "SEARCH_CUSTOMER_REQUEST",
      payload: {
        PhoneNumber: searchValue,
      },
    });
  };
  console.log(orderDetails);

  const searchGiftCardHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "SEARCH_UNIQUE_CODE_REQUEST",
      payload: {
        UniqueCode: giftCardSearchValue,
        PaymentMethodId: activePaymentMethod?.id,
      },
    });
  };
  useEffect(() => {
    if (storeTaxSettings?.taxExclusiveInclusiveType == "TaxInclusive") {
      setGrandTotal(
        itemsSubTotal - discount + publicHolidaySurcharge + cardChargeValue
      );
    } else {
      setGrandTotal(
        tax -
          discountTax +
          holidayTax +
          cardTax +
          itemsSubTotal -
          discount +
          publicHolidaySurcharge +
          cardChargeValue
      );
    }
  }, [
    itemsSubTotal,
    discountTax,
    holidayTax,
    cardTax,
    cardChargeValue,
    discount,
    tax,
    publicHolidaySurcharge,
    storeTaxSettings,
  ]);
  useEffect(() => {
    discount
      ? setDiscountTax((discount * tax) / itemsSubTotal)
      : setDiscountTax(0);
  }, [discount]);
  const [customerViewModal, setCustomerViewModal] = useState();
  const getCustomerDetailsHandler = (values) => {
    setCustomerViewModal({
      id: "",
      ...values,
    });
    setCustomerModalOPen(false);
  };
  useEffect(() => {
    if (uniqueCodeData) {
      if (!uniqueCodeData?.isDiscount) {
        setPaymentData((prev) => {
          if (uniqueCodeData?.amount > totalPayableAmount)
            return {
              ...prev,
              PaidAmount: totalPayableAmount,
            };
          else {
            return {
              ...prev,
              PaidAmount: uniqueCodeData?.amount,
            };
          }
        });
      }
    }
  }, [uniqueCodeData]);
  const [orderChanged, setOrderChanged] = useState(false);
  return (
    <>
      <Modal
        size="lg"
        show={customerModalOpen}
        className="customer-modal-pos"
        backdropClassName="customer-backdrop"
        onHide={() => setCustomerModalOPen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCustomer
            getCustomerDetails={getCustomerDetailsHandler}
            isOrderCustomer={true}
            isOpen={customerModalOpen}
            setIsOpen={setCustomerModalOPen}
            isEditClicked={false}
          />
        </Modal.Body>
      </Modal>
      <Drawer
        open={open}
        closable={false}
        key="left"
        width={"920px"}
        style={{
          margin: 0,
          padding: 0,
          zIndex: 2500,
        }}
      >
        {/* {paymentInvoice ? ( */}
        {/* <PaymentReceipt setOpen={setOpen} invoice={paymentInvoice} /> */}
        {/* <span>Order Completed</span> */}
        {/*  ) : ( */}
        <>
          <div className="offcanvas-header m-0 pb-0">
            <h5 className="offcanvas-title" id="placeorderCanvasLabel">
              Payment
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={() => {
                dispatch({
                  type: "REMOVE_ORDER_REQUEST",
                });
                setOpen(false);
              }}
            />
          </div>
          <hr />
          <div className="p-4" style={{ overflow: "auto", height: "90%" }}>
            <div className="row h-100">
              <div className="col-md-6 d-flex flex-column justify-content-between">
                <div
                  className="innersec border-bottom border-dashed border-0"
                  style={{
                    maxHeight: "60%",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <h6 className="text-theme fw-bold">Order Details</h6>
                  {orderDetails?.map((product, i) => {
                    return (
                      <div className="row bg-light" key={"product" + i}>
                        <div className="col-md-8">
                          {/* <p className="fw-bold mb-0">Items</p> */}
                          <div className="d-flex align-items-center">
                            <img
                              src={product.ProductImage}
                              alt=""
                              className="img-fluid orderimg"
                            />
                            <span>
                              <small style={{ fontSize: "13px" }}>
                                {product.ProductName}
                              </small>
                              <div className="quantity quantity-place-order d-flex align-items-center">
                                <i
                                  className="fa fa-minus"
                                  onClick={() => {
                                    setOrderChanged(true);
                                    setOrderDetails((prevOrderDetails) => {
                                      const tempOrderDetails = [
                                        ...prevOrderDetails,
                                      ];
                                      if (product.ProductQuantity > 1)
                                        tempOrderDetails[i].ProductQuantity--;
                                      tempOrderDetails[i].Total =
                                        tempOrderDetails[i].ProductQuantity *
                                        tempOrderDetails[i].ProductPrice;
                                      return [...tempOrderDetails];
                                    });
                                  }}
                                />
                                <span className="qty">
                                  {Math.round(product.ProductQuantity)}
                                </span>
                                <i
                                  className="fa fa-plus"
                                  onClick={() => {
                                    setOrderChanged(true);
                                    setOrderDetails((prevOrderDetails) => {
                                      const tempOrderDetails = [
                                        ...prevOrderDetails,
                                      ];
                                      tempOrderDetails[i].ProductQuantity++;
                                      tempOrderDetails[i].Total =
                                        tempOrderDetails[i].ProductQuantity *
                                        tempOrderDetails[i].ProductPrice;
                                      return [...tempOrderDetails];
                                    });
                                  }}
                                />
                              </div>
                            </span>
                          </div>
                        </div>
                        <div className="col-md-4">
                          {/* <p className="fw-bold mb-0">Total</p> */}
                          <Popconfirm
                            title="Are you sure you want to remove item?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                              setOrderDetails((prevOrderDetails) => {
                                let tempOrderDetails = [...prevOrderDetails];
                                tempOrderDetails[i].isCancelled = true;
                                return [...tempOrderDetails];
                              });
                              dispatch({
                                type: "DELETE_ITEM_ORDER_REQUEST",
                                payload: {
                                  OrderId: orderId,
                                  Type: "OrderItems",
                                  OrderItemsIdOrsetMenuOrderId: product.Id,
                                },
                              });
                            }}
                          >
                            <span className="d-flex align-items-center">
                              <small style={{ fontSize: "13px" }}>
                                {currencySymbol}
                                {product.Total}
                                {orderId && (
                                  <i
                                    className="fas fa-trash ms-2 text-danger p-2 bg-light-blue rounded-3"
                                    style={{ cursor: "pointer" }}
                                  />
                                )}
                              </small>
                            </span>
                          </Popconfirm>
                        </div>
                      </div>
                    );
                  })}
                  {setMenuDetails?.map((product, i) => {
                    return (
                      <div className="row bg-light" key={"product" + i}>
                        <div className="col-md-8">
                          {/* <p className="fw-bold mb-0">Items</p> */}
                          <div className="d-flex align-items-center">
                            <img
                              src={product.SetMenuImage}
                              alt=""
                              className="img-fluid orderimg"
                            />
                            <span>
                              <small style={{ fontSize: "13px" }}>
                                {product.SetMenuName}
                              </small>
                              <div className="quantity quantity-place-order d-flex align-items-center">
                                <i
                                  className="fa fa-minus"
                                  onClick={() => {
                                    setOrderChanged(true);
                                    setSetMenuDetails((prevOrderDetails) => {
                                      const tempOrderDetails = [
                                        ...prevOrderDetails,
                                      ];
                                      if (product.SetMenuQuantity > 1)
                                        tempOrderDetails[i].SetMenuQuantity--;
                                      tempOrderDetails[i].TotalSetMenuPrice =
                                        tempOrderDetails[i].SetMenuQuantity *
                                        tempOrderDetails[i].SetMenuPrice;
                                      return [...tempOrderDetails];
                                    });
                                  }}
                                />
                                <span className="qty">
                                  {Math.round(product.SetMenuQuantity)}
                                </span>
                                <i
                                  className="fa fa-plus"
                                  onClick={() => {
                                    setOrderChanged(true);
                                    setSetMenuDetails((prevOrderDetails) => {
                                      const tempOrderDetails = [
                                        ...prevOrderDetails,
                                      ];
                                      tempOrderDetails[i].SetMenuQuantity++;
                                      tempOrderDetails[i].TotalSetMenuPrice =
                                        tempOrderDetails[i].SetMenuQuantity *
                                        tempOrderDetails[i].SetMenuPrice;
                                      return [...tempOrderDetails];
                                    });
                                  }}
                                />
                              </div>
                            </span>
                          </div>
                        </div>
                        <div className="col-md-4">
                          {/* <p className="fw-bold mb-0">Total</p> */}
                          <Popconfirm
                            title="Are you sure you want to remove item?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                              dispatch({
                                type: "DELETE_ITEM_ORDER_REQUEST",
                                payload: {
                                  OrderId: orderId,
                                  Type: "setMenu",
                                  OrderItemsIdOrsetMenuOrderId: product.Id,
                                },
                              });
                            }}
                          >
                            <span>
                              <small style={{ fontSize: "13px" }}>
                                {currencySymbol}
                                {product.TotalSetMenuPrice}
                                <i
                                  className="fas fa-trash ms-2 text-danger p-2 bg-light-blue rounded-3"
                                  style={{ cursor: "pointer" }}
                                />
                              </small>
                            </span>
                          </Popconfirm>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="pos_sender_details">
                  {orderChanged ? (
                    <div className="d-flex flex-column">
                      <div className="total-price border-0 d-flex align-items-start justify-content-between">
                        <span className="text-dark-white fw-700">
                          Items subtotal:
                        </span>
                        <span className="text-dark-white fw-700">
                          ${itemsSubTotal}
                        </span>
                      </div>
                      <div className="total-price  d-flex align-items-start justify-content-between">
                        <span className="text-dark-white fw-700">
                          {storeTaxSettings?.taxExclusiveInclusiveType ==
                          "Exclusive"
                            ? "Tax:"
                            : "Tax included in Total:"}
                        </span>
                        <span className="text-dark-white fw-700">
                          $
                          {(tax - discountTax + holidayTax + cardTax).toFixed(
                            2
                          )}
                        </span>
                      </div>
                      <Button
                        type="primary"
                        loading={isOrderLoading}
                        onClick={updateOrderHandler}
                        className="w-100"
                      >
                        Update Order
                      </Button>
                    </div>
                  ) : (
                    <div className="card">
                      <div className="card-body bg-light ">
                        <div className="d-flex align-items justify-content-between">
                          <h6
                            className="offcanvas-title fw-bold"
                            id="placeorderCanvasLabel"
                          >
                            Billing
                          </h6>
                        </div>
                        <hr />
                        <div className="item-total border-0">
                          <div className="bg-light">
                            <div className="total-price border-0 d-flex align-items-start justify-content-between">
                              <span className="text-dark-white fw-700">
                                Discount
                              </span>
                              <input
                                type="number"
                                className="form-control w-20 discount-input"
                                value={discount}
                                onChange={(e) => {
                                  setDiscount(Number(e.target.value));
                                }}
                                placeholder=""
                              />
                            </div>
                            <div className="total-price border-0 d-flex align-items-start justify-content-between">
                              <div className="form-check">
                                <input
                                  className="form-check-input mt-2"
                                  type="checkbox"
                                  checked={isPublicHoliday}
                                  onChange={() => {
                                    setIsPublicHoliday(!isPublicHoliday);
                                  }}
                                  id="defaultCheck1"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  Public Holiday Surcharge
                                </label>
                              </div>
                              <span className="text-dark-white fw-700">
                                ${publicHolidaySurcharge.toFixed(2)}
                              </span>
                            </div>
                            <div className="total-price border-0 d-flex align-items-start justify-content-between">
                              <div className="form-check d-flex">
                                <input
                                  className="form-check-input mt-2"
                                  type="checkbox"
                                  id="defaultCheck2"
                                  checked={isCardCharge}
                                  onChange={() => {
                                    setIsCardCharge(!isCardCharge);
                                  }}
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor="defaultCheck2"
                                >
                                  Credit Card Surcharge(%)
                                </label>
                                <input
                                  type="number"
                                  className="form-control w-20 text-center ms-2 discount-input"
                                  placeholder=""
                                  value={cardCharge}
                                  onChange={(e) => {
                                    setCardCharge(Number(e.target.value));
                                  }}
                                />
                                %
                              </div>
                              <span className="text-dark-white fw-700">
                                ${cardChargeValue.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          {storeTaxSettings?.taxExclusiveInclusiveType ==
                            "Exclusive" && (
                            <div className="total-price border-0 d-flex align-items-start justify-content-between">
                              <span className="text-dark-white fw-700">
                                Items subtotal:
                              </span>
                              <span className="text-dark-white fw-700">
                                ${itemsSubTotal}
                              </span>
                            </div>
                          )}

                          <div className="total-price  d-flex align-items-start justify-content-between">
                            <span className="text-dark-white fw-700">
                              {storeTaxSettings?.taxExclusiveInclusiveType ==
                              "Exclusive"
                                ? "Tax:"
                                : "Tax included in Total:"}
                            </span>
                            <span className="text-dark-white fw-700">
                              $
                              {(
                                tax -
                                discountTax +
                                holidayTax +
                                cardTax
                              ).toFixed(2)}
                            </span>
                          </div>
                          <div className="total-price  d-flex align-items-start justify-content-between">
                            {" "}
                            <span className="text-danger fw-bold">
                              Grand Total:
                            </span>
                            <span className="text-danger fw-bold">
                              ${grandTotal.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="btn-group btn1 paybtn">
                  {paymentMethodList?.map((paymentMethod) => {
                    return (
                      <a
                        key={paymentMethod.id}
                        onClick={() => setActivePaymentMethod(paymentMethod)}
                        className={`btn btn-primary all_btn ${
                          paymentMethod.id == activePaymentMethod?.id
                            ? "active"
                            : "btn_red"
                        } rounded-3`}
                        aria-current="page"
                      >
                        <img
                          src={paymentMethod.image}
                          className="paymentImage"
                        />
                        <span>{paymentMethod.value}</span>
                      </a>
                    );
                  })}
                </div>
                <div className="card mt-3">
                  <div className="card-body">
                    <div className="table_card d-flex justify-content-between mb-3">
                      <div className="table_search w-100 d-flex align-items-center justify-content-between">
                        <form onSubmit={searchCustomerHandler}>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text  h-100 rounded-0"
                                id="search"
                              >
                                <i className="fas fa-search" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Customers"
                              value={searchValue}
                              onChange={(e) => {
                                setSearchValue(e.target.value);
                              }}
                              aria-label="search"
                              aria-describedby="search"
                              spellCheck="false"
                              data-ms-editor="true"
                            />
                          </div>
                        </form>
                        <Tooltip title="Add Customer">
                          <div
                            onClick={() => setCustomerModalOPen(true)}
                            style={{ cursor: "pointer" }}
                          >
                            <BsFillPlusCircleFill
                              size={18}
                              style={{ cursor: "pointer" }}
                            />

                            <span className="ms-1" style={{ fontSize: "12px" }}>
                              Add Customers
                            </span>
                          </div>
                        </Tooltip>
                      </div>
                      {customerError && (
                        <Alert
                          type="error"
                          style={{ fontSize: "12px" }}
                          message={customerError}
                        />
                      )}
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover  align-middle table-nowrap mb-0">
                        <thead>
                          <tr className="table-light">
                            <th>Customer Name</th>
                            <th>Loyalty Point</th>
                            <th>Eligible Loyalty Point</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customer ? (
                            <tr>
                              <td>{customer.customerName}</td>
                              <td>{customer.accquiredLoyaltyPoints}</td>
                              <td>{customer.eligibleLoyaltyPoints}</td>
                            </tr>
                          ) : (
                            <tr style={{ textAlign: "center" }}>
                              <td colSpan={3}>No Records</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="text-danger fw-bold">
                          {customer?.message && (
                            <small>{customer?.message}</small>
                          )}
                        </p>
                        <div className="mt-2">
                          <Switch
                            checked={loyaltyEnabled}
                            onChange={(val) => setLoyaltyEnabled(val)}
                            className="me-2"
                          />
                          Enable Loyalty
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {activePaymentMethod?.additionalValue == "GiftCard" && (
                  <div className="sender_details mt-2">
                    <form onSubmit={searchGiftCardHandler}>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text  h-100 rounded-0"
                            id="search"
                          >
                            <i className="fas fa-search" />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Gift Card Number"
                          value={giftCardSearchValue}
                          onChange={(e) => {
                            setGiftCardSearchValue(e.target.value);
                          }}
                          aria-label="search"
                          aria-describedby="search"
                          spellCheck="false"
                          data-ms-editor="true"
                        />
                      </div>
                    </form>
                    {!uniqueCodeData && uniqueCodeError && (
                      <Alert type="error" message={uniqueCodeError} />
                    )}
                    {!uniqueCodeError && uniqueCodeData && (
                      <div className="card giftcard-text">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <h6 className="text-theme fw-bold">
                                Sender Details
                              </h6>
                              <p>Name: {uniqueCodeData.senderName}</p>
                              <p> Phone: {uniqueCodeData.senderPhoneNumber}</p>
                            </div>
                            <div className="col-md-6">
                              <h6 className="text-theme fw-bold">
                                Receiver Details
                              </h6>
                              <p>Name: {uniqueCodeData.receiverName}</p>
                              <p>
                                {" "}
                                Phone: {uniqueCodeData.receiverPhoneNumber}
                              </p>
                            </div>
                          </div>
                          <div className="text-center">
                            <h5 className="text-danger">
                              Code: {uniqueCodeData.uniqueCode}
                            </h5>
                            <p className="fw-bold">
                              Discount/Amount: {currencySymbol}
                              {uniqueCodeData.amount}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="card bg-theme mt-3 ">
                  <div className="card-body">
                    <h6 className="text-white">EFTPOS</h6>
                    <hr className="bg-white" />
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label text-white">
                            Paid Amount
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={paymentData.PaidAmount}
                            onChange={(e) => {
                              setPaymentData((prevData) => {
                                return {
                                  ...prevData,
                                  PaidAmount: Number(e.target.value),
                                };
                              });
                            }}
                            placeholder="eg.$10"
                            spellCheck="false"
                            data-ms-editor="true"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label text-white">
                            Tip Amount
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={paymentData.TipAmount}
                            placeholder="eg.$10"
                            spellCheck="false"
                            onChange={(e) => {
                              setPaymentData((prevData) => {
                                return {
                                  ...prevData,
                                  TipAmount: Number(e.target.value),
                                };
                              });
                            }}
                            data-ms-editor="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row d-flex align-items-center">
                      <div className="col-md-12">
                        <div className="d-flex align-items-center justify-content-between fw-bold">
                          <label className="control-label text-white">
                            Total Payable Amount
                          </label>
                          <label className="control-label text-white">
                            {"$" + totalPayableAmount.toFixed(2)}
                          </label>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="d-flex align-items-center justify-content-center mt-3">
                          <button
                            className="btn btn-primary btn-warning rounded-3 border-0 w-50"
                            aria-current="page"
                            disabled={orderChanged}
                            role="button"
                            onClick={payOrderHandler}
                          >
                            Pay Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        {/* )} */}
      </Drawer>
    </>
  );
}

export default PlaceOrder;
