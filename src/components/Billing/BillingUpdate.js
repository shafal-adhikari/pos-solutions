import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PlaceOrder from "../PlaceOrder/PlaceOrder";
import { Alert, Button, Form, Input, Spin } from "antd";
import { Modal } from "react-bootstrap";
import axios from "axios";
// import Receipt from "../Receipt/Receipt";
import { Buffer } from "buffer";
import {
  render,
  Printer,
  Text,
  Row,
  Br,
  Line,
  Cut,
} from "react-thermal-printer";
import PlaceOrderPos from "../PlaceOrder/PlaceOrderPos";
function BillingUpdate({ orderTypeId }) {
  const dispatch = useDispatch();
  const { cartProducts, cartSetMenu } = useSelector(
    (state) => state.updateCartReducer
  );
  const { storeTaxSettings, orderData, isOrderLoading } = useSelector(
    (state) => state.menuReducer
  );
  const {
    activeStore: { currencySymbol, isRetail },
  } = useSelector((state) => state.authenticationReducer);
  const { state } = useLocation();
  const { paymentMethodList } = useSelector((state) => state.paymentReducer);
  const [itemsSubTotal, setItemsSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedPOSDevice, setSelectedPOSDevice] = useState();
  const [orderDescription, setOrderDescription] = useState("");
  const [placeClicked, setPlaceClicked] = useState(false);
  useEffect(() => {
    dispatch({
      type: "CUSTOMER_SECTION_LIST_REQUEST",
    });
  }, []);
  useEffect(() => {
    if (cartProducts && cartSetMenu) {
      let total = 0;
      let tax = 0;
      cartProducts?.map((product) => {
        let taxPercentageValue = parseFloat(product.Tax) / 100;
        if (storeTaxSettings?.taxExclusiveInclusiveType == "TaxInclusive") {
          let eachProductTax =
            (taxPercentageValue / (1 + taxPercentageValue)) * product.Total;
          tax = tax + eachProductTax;
        } else if (storeTaxSettings?.taxExclusiveInclusiveType == "Exclusive") {
          let eachProductTax = taxPercentageValue * product.Total;
          tax = tax + eachProductTax;
        }
        total = total + product.Total;
      });
      cartSetMenu?.map((product) => {
        let taxPercentageValue = parseFloat(product.Tax) / 100;

        if (storeTaxSettings?.taxExclusiveInclusiveType == "TaxInclusive") {
          let eachProductTax =
            (taxPercentageValue / (1 + taxPercentageValue)) *
            parseFloat(product.TotalSetMenuPrice);
          tax = tax + eachProductTax;
        } else if (storeTaxSettings?.taxExclusiveInclusiveType == "Exclusive") {
          let eachProductTax =
            taxPercentageValue * parseFloat(product.TotalSetMenuPrice);
          tax = tax + eachProductTax;
        }
        total = total + parseFloat(product.TotalSetMenuPrice);
      });
      setItemsSubTotal(total);
      setTax(tax);
    }
  }, [cartProducts, storeTaxSettings, cartSetMenu]);
  const { staffs, tables, posDevices } = useSelector(
    (state) => state.menuReducer
  );
  useEffect(() => {
    if (orderData) {
      setIsCustomerNameModalOpen(false);
      setOpenDrawer(true);
    }
  }, [orderData]);
  useEffect(() => {
    if (staffs && staffs.length > 0) {
      setSelectedStaff(staffs[0].id);
    }
  }, [staffs]);
  const placeOrderHandler = (sendToKitchen = false, customerName) => {
    if (!selectedPOSDevice && !sendToKitchen) {
      setPlaceClicked(true);
      return;
    }
    setPlaceClicked(false);
    dispatch({
      type: "PLACE_ORDER_REQUEST",
      payload: {
        OrderId: state?.orderId ? state?.orderId : "",
        POSDeviceId: selectedPOSDevice,
        TableId: selectedTable ? selectedTable : "",
        CustomerName: customerName,
        StaffId: selectedStaff ? selectedStaff : "",
        TaxAmount: tax.toString(),
        TotalAmount: (itemsSubTotal + tax).toString(),
        TotalWithoutTaxAmount: itemsSubTotal.toString(),
        Description: orderDescription,
        IsRetail: isRetail,
        IsSendToKitchen: sendToKitchen,
        OrderDetails: cartProducts
          ? cartProducts?.map((product) => {
              const {
                ProductId,
                ProductName,
                Description,
                ProductPrice,
                Quantity,
                ProductVariationId,
                Total,
              } = product;
              return {
                ProductId,
                ProductName,
                Description,
                ProductPrice: ProductPrice.toString(),
                Quantity: Quantity.toString(),
                ProductVariationId,
                Total: Total.toString(),
              };
            })
          : [],
        SetMenuOrderDetails: cartSetMenu
          ? cartSetMenu?.map((setMenu) => {
              return {
                ...setMenu,
                TotalSetMenuPrice: setMenu.TotalSetMenuPrice.toString(),
                SetMenuQuantity: setMenu.SetMenuQuantity.toString(),
              };
            })
          : [],
        OrderTypeStoreId: orderTypeId,
      },
    });
  };
  const [isCustomerNameModalOpen, setIsCustomerNameModalOpen] = useState(false);
  const [form] = Form.useForm();
  return (
    <>
      <Modal
        show={isCustomerNameModalOpen}
        backdrop="static"
        onHide={() => setIsCustomerNameModalOpen(false)}
      >
        <Modal.Header closeButton>Add Customer Name</Modal.Header>
        <Modal.Body className="categoryField">
          <Form
            form={form}
            onFinish={(values) => placeOrderHandler(true, values.CustomerName)}
          >
            <Form.Item label="Customer Name" name="CustomerName">
              <Input placeholder="Customer Name" />
            </Form.Item>
            <div className="mt-3">
              <Button type="primary" htmlType="submit">
                Send To Kitchen
              </Button>
              <Button
                type="danger"
                className="ms-2"
                onClick={() => {
                  setIsCustomerNameModalOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <PlaceOrderPos
        open={openDrawer}
        setOpen={setOpenDrawer}
        paymentMethodList={paymentMethodList}
        storeTaxSettings={storeTaxSettings}
        itemsSubTotal={itemsSubTotal}
        tax={tax}
        products={
          cartProducts
            ? cartProducts?.map((product) => {
                return {
                  ProductImage: product.ProductImage,
                  ProductName: product.ProductName,
                  ProductQuantity: product.Quantity,
                  ProductPrice: product.ProductPrice,
                };
              })
            : []
        }
        setMenu={
          cartSetMenu
            ? cartSetMenu?.map((product) => {
                return {
                  SetMenuImage: product.SetMenuImage,
                  SetMenuName: product.SetMenuName,
                  SetMenuQuantity: product.SetMenuQuantity,
                  SetMenuPrice: product.SetMenuPrice,
                };
              })
            : []
        }
      >
        <div
          className="innersec border-bottom border-dashed border-0"
          style={{ height: "50%", overflowY: "auto", overflowX: "hidden" }}
        >
          <h6 className="text-theme fw-bold">Order Details</h6>
          {cartSetMenu &&
            cartSetMenu?.map((product, i) => {
              return (
                <div className="row bg-light" key={"product" + i}>
                  <div className="col-md-3">
                    <img
                      src={product.SetMenuImage}
                      alt=""
                      className="img-fluid orderimg"
                    />
                  </div>
                  <div className="col-md-4">
                    <p className="fw-bold mb-0">Name</p>
                    <span>
                      <small>{product.SetMenuName}</small>
                    </span>
                  </div>
                  <div className="col-md-2">
                    <p className="fw-bold mb-0">Qty</p>
                    <span>
                      <small>{product.SetMenuQuantity}</small>
                    </span>
                  </div>
                  <div className="col-md-3">
                    <p className="fw-bold mb-0">Total</p>
                    <span>
                      <small>
                        {currencySymbol}
                        {product.SetMenuPrice}
                      </small>
                    </span>
                  </div>
                </div>
              );
            })}
          {cartProducts &&
            cartProducts?.map((product, i) => {
              return (
                <div className="row bg-light" key={"setMenu" + i}>
                  <div className="col-md-3">
                    <img
                      src={product.ProductImage}
                      alt=""
                      className="img-fluid orderimg"
                    />
                  </div>
                  <div className="col-md-3">
                    <p className="fw-bold mb-0">Name</p>
                    <span>
                      <small>{product.ProductName}</small>
                    </span>
                  </div>
                  <div className="col-md-3">
                    <p className="fw-bold mb-0">Quantity</p>
                    <span>
                      <small>{product.Quantity}</small>
                    </span>
                  </div>
                  <div className="col-md-3">
                    <p className="fw-bold mb-0">Total</p>
                    <span>
                      <small>
                        {currencySymbol}
                        {product.ProductPrice}
                      </small>
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </PlaceOrderPos>
      <div className="col-md-4 col-xxl-3 ">
        <div className="card">
          <Spin spinning={isOrderLoading}>
            <div className="card-body">
              <div className="mybtn mb-3 postop">
                <div className="row">
                  {!selectedPOSDevice && placeClicked && (
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#ff0000",
                        textAlign: "center",
                      }}
                    >
                      Please select POS Device
                    </span>
                  )}
                  <div className="col-md-12 mb-2">
                    <select
                      className="form-control form-select"
                      value={selectedPOSDevice}
                      onChange={(e) => setSelectedPOSDevice(e.target.value)}
                    >
                      <option value={null}>Select POS Device</option>
                      {posDevices?.map((posDevice) => {
                        return (
                          <option key={posDevice.id} value={posDevice.id}>
                            {posDevice.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-control form-select"
                      value={selectedTable}
                      onChange={(e) => setSelectedTable(e.target.value)}
                    >
                      <option value="">Table Number</option>
                      {tables?.map((table) => {
                        return (
                          <option key={table.id} id={table.id}>
                            {table.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-control form-select"
                      value={selectedStaff}
                      onChange={(e) => {
                        setSelectedStaff(e.target.value);
                      }}
                    >
                      {staffs?.map((staff, i) => {
                        return (
                          <option key={staff.id} value={staff.id}>
                            {staff.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              {storeTaxSettings?.taxExclusiveInclusiveType == "Exclusive" && (
                <div className="total-price border-0 d-flex align-items-start justify-content-between">
                  <span className="text-dark-white fw-700">
                    Items subtotal:
                  </span>
                  <span className="text-dark-white fw-700">
                    {currencySymbol}
                    {itemsSubTotal.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="total-price  d-flex align-items-start justify-content-between">
                {" "}
                <span className="text-dark-white fw-700">
                  {storeTaxSettings?.taxExclusiveInclusiveType == "Exclusive"
                    ? "Tax:"
                    : "Tax included in Total:"}
                </span>
                <span className="text-dark-white fw-700">
                  {currencySymbol}
                  {tax.toFixed(2)}
                </span>
              </div>
              <div className="total-price  d-flex align-items-start justify-content-between">
                {" "}
                <span className="text-danger fw-bold">Grand Total:</span>
                <span className="text-danger fw-bold">
                  {currencySymbol}
                  {storeTaxSettings?.taxExclusiveInclusiveType == "Exclusive"
                    ? (itemsSubTotal + tax).toFixed(2)
                    : itemsSubTotal.toFixed(2)}
                </span>
              </div>
              <div className="textbox">
                <textarea
                  className="form-control border-0"
                  value={orderDescription}
                  onChange={(e) => setOrderDescription(e.target.value)}
                  id="exampleFormControlTextarea1"
                  rows={1}
                  placeholder="Order Description"
                />
              </div>
              <div className="mybtn d-flex align-items-center justify-content-center mt-2">
                {!isRetail && (
                  <button
                    className="btn btn-success btn-sm bg-theme border-0"
                    disabled={
                      cartProducts?.length < 1 && cartSetMenu?.length < 1
                    }
                    onClick={async () => {
                      const receipt = await render(
                        <Printer type="epson" width={42}>
                          <Text size={{ width: 2, height: 2 }} align="center">
                            POSApt
                          </Text>
                          <Text bold={true}>Melbourne, Australia</Text>
                          <Br />
                          <Line />
                          <Row left="Momo" right="$123" />
                          <Row left="Chowmein" right="$456" />
                          <Row left="Pizza" right="$434" />
                          <Row left="Burger" right="$921" />
                          <Line />
                          <Row left="Subtotal" right="$1230" />
                          {/* <Text>옵션1(500)/옵션2/메모</Text> */}
                          <Row left="Tax" right="$123" />
                          <Br />
                          <Line />
                          <Line />
                          <Br />
                          <Text align="center">
                            Wifi: some-wifi / PW: 123123
                          </Text>
                          <Cut />
                        </Printer>
                      );
                      const bufferData = Buffer.from(receipt);
                      axios
                        .post("http://localhost:8000/printKitchen", {
                          name: "safal",
                          bufferData: bufferData.toString(),
                        })
                        .then(() => {
                          alert("printed successfully");
                        });
                    }}
                    role="button"
                  >
                    Send to Kitchen
                  </button>
                )}

                {/* <a className="btn btn-danger btn-sm  border-0">Print Kitchen</a> */}
                <button
                  className="btn btn-danger btn-sm bg-theme border-0 ms-2"
                  data-bs-toggle="offcanvas"
                  href=""
                  role="button"
                  disabled={cartProducts?.length < 1 && cartSetMenu?.length < 1}
                  onClick={() => placeOrderHandler(false)}
                >
                  Place a Order
                </button>
              </div>

              <div className="d-flex align-items-center justify-content-between mt-2">
                {state?.orderId ? (
                  <Alert type="success" message={state?.orderNumber}></Alert>
                ) : (
                  <h6
                    className="offcanvas-title fw-bold"
                    id="placeorderCanvasLabel"
                  >
                    New Order Bill
                  </h6>
                )}
              </div>
              <div className="">
                <div className="details_inner">
                  {cartProducts &&
                    cartProducts?.map((product) => {
                      return (
                        <div
                          className="cartdetails"
                          key={product.ProductVariationId}
                        >
                          <div className="card">
                            <div className="card-body">
                              <div className="card-details  widget-cart-item">
                                <div className="row d-flex">
                                  <div className="col-md-2">
                                    <img
                                      src={product.ProductImage}
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <h6 className="mb-0">
                                      {product.ProductName}
                                    </h6>
                                    <p>
                                      {currencySymbol}
                                      {product.ProductPrice}
                                      {`(${product.VariationName})`}
                                    </p>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="quantity d-flex align-items-center">
                                      <i
                                        className="fa fa-minus"
                                        onClick={() => {
                                          dispatch({
                                            type: "SUBTRACT_QUANTITY_ITEM",
                                            payload: product,
                                          });
                                        }}
                                      />
                                      <span className="qty">
                                        {product.Quantity}
                                      </span>
                                      <i
                                        className="fa fa-plus"
                                        onClick={() => {
                                          dispatch({
                                            type: "ADD_QUANTITY_ITEM",
                                            payload: product,
                                          });
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="textbox d-flex align-items-center justify-content-between">
                                  <textarea
                                    className="form-control border-0"
                                    id="exampleFormControlTextarea1"
                                    rows={1}
                                    placeholder="eg: Please, Just a little bit spicy."
                                  />
                                  <i
                                    className="fas fa-trash ms-2 text-danger p-2 bg-light-blue rounded-3"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      dispatch({
                                        type: "REMOVE_ITEM_CART",
                                        payload: {
                                          ProductVariationId:
                                            product.ProductVariationId,
                                        },
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {cartSetMenu &&
                    cartSetMenu?.map((setMenu) => {
                      return (
                        <div className="cartdetails" key={setMenu.SetMenuId}>
                          <div className="card">
                            <div className="card-body">
                              <div className="card-details  widget-cart-item">
                                {/* <button
                                  className="btn-close text-danger"
                                  type="button"
                                  onClick={() => {
                                    dispatch({
                                      type: "REMOVE_SET_MENU_CART",
                                      payload: {
                                        SetMenuId: setMenu.SetMenuId,
                                      },
                                    });
                                  }}
                                  aria-label="Remove"
                                >
                                  <span aria-hidden="true">×</span>
                                </button> */}
                                <div className="row d-flex">
                                  <div className="col-md-2">
                                    <img
                                      src={setMenu.SetMenuImage}
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <h6 className="mb-0">
                                      {setMenu.SetMenuName}
                                    </h6>
                                    <p>
                                      {currencySymbol}
                                      {setMenu.SetMenuPrice}
                                    </p>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="quantity d-flex align-items-center">
                                      <i
                                        className="fa fa-minus"
                                        onClick={() => {
                                          dispatch({
                                            type: "SUBTRACT_QUANTITY_SET_MENU",
                                            payload: setMenu,
                                          });
                                        }}
                                      />
                                      <span className="qty">
                                        {setMenu.SetMenuQuantity}
                                      </span>
                                      <i
                                        className="fa fa-plus"
                                        onClick={() => {
                                          dispatch({
                                            type: "ADD_QUANTITY_SET_MENU",
                                            payload: setMenu,
                                          });
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="textbox d-flex align-items-center justify-content-between">
                                  <textarea
                                    className="form-control border-0"
                                    id="exampleFormControlTextarea1"
                                    rows={1}
                                    placeholder="eg: Please, Just a little bit spicy."
                                  />
                                  <i
                                    className="fas fa-trash ms-2 text-danger p-2 bg-light-blue rounded-3"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      dispatch({
                                        type: "REMOVE_SET_MENU_CART",
                                        payload: {
                                          SetMenuId: setMenu.SetMenuId,
                                        },
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </Spin>
        </div>
      </div>
    </>
  );
}

export default React.memo(BillingUpdate);
