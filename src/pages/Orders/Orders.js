import React, { useEffect, useState } from "react";
import {
  Outlet,
  Routes,
  Route,
  useLocation,
  Link,
  Navigate,
} from "react-router-dom";
import SIdeBarPage from "../../components/SideBarPage/SIdeBarPage";
import AllOrder from "./AllOrder/AllOrder";
import OnlineOrder from "./Online Order/OnlineOrder";
import POS from "./POS/POS";
import { useDispatch, useSelector } from "react-redux";
import { Form, Select, Input, Button } from "antd";
import { Modal } from "react-bootstrap";
import ViewOrder from "./ViewOrder";
import PlaceOrder from "../../components/PlaceOrder/PlaceOrder";

const Orders = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { ordersDetailSection, isLoading, changeOrderStatusLoading } =
    useSelector((state) => state.ordersReducer);
  const {
    activeStore: { currencySymbol },
  } = useSelector((state) => state.authenticationReducer);
  const {
    orderDetails: {
      orderDetailsViewModel,
      storeTaxSettings,
      productWithPriceDetailsViewModel,
      setMenuWithPriceDetailsViewModel,
    },
  } = useSelector((state) => state.ordersReducer);
  const table = Form.useWatch("table", form);
  const orderStatus = Form.useWatch("status", form);
  const orderType = Form.useWatch("orderType", form);
  const search = Form.useWatch("search", form);
  const orderChannel = Form.useWatch("orderChannel", form);
  const location = useLocation();
  const [viewOrderModal, setViewOrderModal] = useState(false);
  const [activeId, setActiveId] = useState();
  const currentLocation = location.pathname.split("/")[2];
  const [payOpen, setPayOpen] = useState(false);
  useEffect(() => {
    dispatch({
      type: "GET_ORDERS_DETAIL_SECTION_LIST_REQUEST",
    });
    dispatch({
      type: "PAYMENT_SECTION_LIST_REQUEST",
    });
  }, []);
  const viewOrder = (id) => {
    dispatch({
      type: "GET_ORDER_DETAIL_BY_ID_REQUEST",
      payload: id,
    });
    setViewOrderModal(true);
  };
  const payOrder = (id) => {
    setActiveId(id);
    dispatch({
      type: "PAY_ORDER_DETAIL_BY_ID_REQUEST",
      payload: id,
    });
    setPayOpen(true);
  };
  const cancelOrder = (id) => {
    setActiveId(id);
    dispatch({
      type: "UPDATE_ORDER_STATUS_REQUEST",
      payload: {
        OrderStatusId: ordersDetailSection?.orderStatus?.find(
          (status) => status?.additionalValue == "Cancel"
        )?.id,
        OrderIds: [id],
      },
    });
  };
  const pages = ordersDetailSection?.channelWithOrderTypes?.map((type) => {
    return {
      name: type.channelName,
      path: "orders/" + type.channelName.toLowerCase().split(" ").join("-"),
    };
  });

  const foundData = ordersDetailSection?.channelWithOrderTypes?.find((type) => {
    if (currentLocation == "pos") {
      console.log("type", type.channelName);
      return type.channelName.toLowerCase() == "pos";
    }
    if (currentLocation == "online-order") {
      return type.channelName.toLowerCase() == "online order";
    } else {
      return type.channelName.toLowerCase() == "all";
    }
  });
  useEffect(() => {
    form.setFields([
      {
        name: "table",
        value: ordersDetailSection?.tables?.[0].id,
      },
      {
        name: "status",
        value: ordersDetailSection?.orderStatus?.[0].id,
      },
      {
        name: "orderType",
        value: foundData?.orderTypes?.[0]?.id,
      },
    ]);
  }, [currentLocation, foundData]);
  const [viewOrderStatus, setViewOrderStatus] = useState();

  useEffect(() => {
    if (ordersDetailSection && orderDetailsViewModel) {
      if (orderDetailsViewModel?.orderStatus == "Payment Completed") {
        setViewOrderStatus(
          ordersDetailSection?.orderStatus?.find(
            (staus) => staus.additionalValue == "OnTheWay"
          )
        );
      } else {
        setViewOrderStatus(ordersDetailSection?.orderStatus?.[1]);
      }
    }
  }, [ordersDetailSection, orderDetailsViewModel]);
  return (
    <div className="container-fluid page-body-wrapper1">
      <Modal
        size="xl"
        show={viewOrderModal}
        onHide={() => setViewOrderModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>View Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewOrder />
        </Modal.Body>
        <Modal.Footer>
          <label htmlFor="">Change Status: </label>
          <div className="select_variance mt-2 mb-2 w-20">
            <Select
              className="form-control form-select w-100"
              value={viewOrderStatus}
              onChange={(val) => setViewOrderStatus(val)}
              options={ordersDetailSection?.orderStatus
                ?.filter(
                  (status) => status.additionalValue !== "PaymentCompleted"
                )
                .filter((status) => {
                  console.log(status.additionalValue);
                  if (
                    orderDetailsViewModel?.orderStatus == "Payment Completed"
                  ) {
                    return (
                      status.additionalValue == "OnTheWay" ||
                      status.additionalValue == "Delivered"
                    );
                  }
                  return true;
                })
                .map((status) => {
                  return {
                    label: status.value,
                    value: status.id,
                  };
                })}
            ></Select>
          </div>
          <Button
            type="primary"
            loading={changeOrderStatusLoading}
            onClick={() => {
              dispatch({
                type: "UPDATE_ORDER_STATUS_REQUEST",
                payload: {
                  OrderStatusId: viewOrderStatus,
                  OrderIds: [orderDetailsViewModel?.orderId],
                },
              });
            }}
            className="btn btn-primary all_btn rounded-0"
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <PlaceOrder
        open={payOpen}
        staffId={orderDetailsViewModel?.staffId}
        tableId={orderDetailsViewModel?.tableId}
        orderTypeId={orderDetailsViewModel?.orderTypeId}
        setOpen={setPayOpen}
        orderId={activeId}
        tax={orderDetailsViewModel?.taxAmount}
        itemsSubTotal={parseFloat(orderDetailsViewModel?.totalAmount)}
        storeTaxSettings={storeTaxSettings}
        products={
          productWithPriceDetailsViewModel
            ? productWithPriceDetailsViewModel
                ?.map((product) => {
                  return {
                    Id: product.id,
                    isCancelled: product.isCancelled ? true : false,
                    ProductId: product.productId,
                    Description: product.description,
                    ProductVariationId: product.productVariationId,
                    ProductImage: product.image,
                    ProductName: product.name,
                    ProductQuantity: parseFloat(product.quantity),
                    ProductPrice:
                      parseFloat(product.total) / parseFloat(product.quantity),
                    Total: parseFloat(product.total),
                    Tax: parseFloat(product.taxExclusiveInclusiveValue),
                  };
                })
                .filter((pr) => {
                  if (pr.isCancelled) {
                    return false;
                  } else {
                    return true;
                  }
                })
            : []
        }
        setMenu={
          setMenuWithPriceDetailsViewModel
            ? setMenuWithPriceDetailsViewModel
                ?.filter((pr) => !pr.isCancelled)
                .map((product) => {
                  return {
                    Id: product.id,
                    isCancelled: product.isCancelled ? true : false,
                    SetMenuId: product.setMenuId,
                    Description: product.Description,
                    SetMenuImage: product.image,
                    SetMenuName: product.setMenuName,
                    SetMenuQuantity: parseFloat(product.quantity),
                    SetMenuPrice:
                      parseFloat(product.total) / parseFloat(product.quantity),
                    TotalSetMenuPrice: parseFloat(product.total),
                    Tax: parseFloat(product.taxExclusiveInclusiveValue),
                  };
                })
            : []
        }
      ></PlaceOrder>
      <div className=" main_panel_inner">
        <div className="content-wrapper">
          <div className="content">
            {/* main Breadcrumb Area */}
            <div className="row  ">
              <div className="col-md-8 grid-margin stretch-card">
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
                        <span>Order</span>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <div className="col-md-4 text-end">
                <Link
                  to="/pos"
                  className="btn btn-success btn-sm bg-theme border-0"
                >
                  View Menu
                </Link>
              </div>
            </div>
            {/* order tabs */}
            <div className="menu_inner myorders">
              <div className="row">
                <SIdeBarPage pages={pages} loading={isLoading} />
                <div className="col-md-10 col-xxl-10">
                  <div className="menu_right">
                    <div className="right_top mb-4">
                      <div className="card text-left border">
                        <div className="card-body">
                          <div className="timesheet_filter">
                            <Form form={form}>
                              <div className="row">
                                <div className="col-md-2 col-lg-2">
                                  <div className="form-group categoryField">
                                    <Form.Item
                                      label="Order Type"
                                      placeholder="Order Type"
                                      name="orderType"
                                    >
                                      <Select>
                                        {foundData?.orderTypes?.map((item) => {
                                          return (
                                            <Select.Option
                                              value={item.id}
                                              key={item.id}
                                            >
                                              {item.value}
                                            </Select.Option>
                                          );
                                        })}
                                      </Select>
                                    </Form.Item>
                                  </div>
                                </div>
                                <div className="col-md-2 col-lg-2">
                                  <div className="form-group categoryField">
                                    <Form.Item label="Table" name="table">
                                      <Select>
                                        {ordersDetailSection?.tables?.map(
                                          (item) => {
                                            return (
                                              <Select.Option
                                                value={item.id}
                                                key={item.id}
                                              >
                                                {item.value}
                                              </Select.Option>
                                            );
                                          }
                                        )}
                                      </Select>
                                    </Form.Item>
                                  </div>
                                </div>
                                <div className="col-md-2 col-lg-2">
                                  <div className="form-group categoryField">
                                    <Form.Item label="Status" name="status">
                                      <Select>
                                        {ordersDetailSection?.orderStatus?.map(
                                          (item) => {
                                            return (
                                              <Select.Option
                                                value={item.id}
                                                key={item.id}
                                              >
                                                {item.value}
                                              </Select.Option>
                                            );
                                          }
                                        )}
                                      </Select>
                                    </Form.Item>
                                  </div>
                                </div>

                                <div className="col-md-2 col-lg-2">
                                  <div className="form-group categoryField">
                                    <Form.Item label="Search" name="search">
                                      <Input placeholder="Search" />
                                    </Form.Item>
                                  </div>
                                </div>
                              </div>
                            </Form>
                          </div>
                        </div>
                      </div>
                      <div className="card mt-2">
                        <div className="card-body">
                          <div className="tab-content" id="v-pills-tabContent">
                            <Outlet />
                            <Routes>
                              <Route
                                path="/all"
                                element={
                                  <AllOrder
                                    orderStatus={orderStatus}
                                    orderChannel={orderChannel}
                                    ordersDetailSection={ordersDetailSection}
                                    table={table}
                                    orderType={orderType}
                                    viewOrder={viewOrder}
                                    cancelOrder={cancelOrder}
                                    payOrder={payOrder}
                                    search={search}
                                    activeId={activeId}
                                    foundData={foundData}
                                  />
                                }
                              />
                              <Route
                                path="/online-order"
                                element={
                                  <OnlineOrder
                                    orderStatus={orderStatus}
                                    table={table}
                                    orderType={orderType}
                                    search={search}
                                    viewOrder={viewOrder}
                                    activeId={activeId}
                                    cancelOrder={cancelOrder}
                                    payOrder={payOrder}
                                    foundData={foundData}
                                  />
                                }
                              />
                              <Route
                                path="/pos"
                                element={
                                  <POS
                                    orderStatus={orderStatus}
                                    table={table}
                                    orderType={orderType}
                                    search={search}
                                    viewOrder={viewOrder}
                                    cancelOrder={cancelOrder}
                                    payOrder={payOrder}
                                    foundData={foundData}
                                  />
                                }
                              />
                              <Route
                                path="/*"
                                element={<Navigate to="/404" replace />}
                              />
                            </Routes>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="container-fluid clearfix">
              <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
                Copyright @ POSApt 2022
              </span>
            </div>
          </footer>
          {/* partial */}
        </div>
        {/* main-panel ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>
  );
};

export default Orders;
