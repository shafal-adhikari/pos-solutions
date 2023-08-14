import { Button, Form, Input } from "antd";
import Skeleton from "react-loading-skeleton";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function ChangePlan({ isOpen, setIsOpen, StoreSubscriptionPlanId }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const noOfPos = Form.useWatch("NumberofPOSLocation", form);
  const {
    allSubscriptionPlan,
    subscriptionSuccess,
    allLoading,
    changeSubscriptionLoading,
  } = useSelector((state) => state.billingReducer);
  const {
    activeStore: { currencySymbol },
  } = useSelector((state) => state.authenticationReducer);

  useEffect(() => {
    if (isOpen) {
      dispatch({
        type: "GET_ALL_SUBSCRIPTION_PLAN_REQUEST",
      });
    }
  }, [isOpen]);
  useEffect(() => {
    if (subscriptionSuccess) {
      setIsOpen(false);
    }
  }, [subscriptionSuccess]);
  const changePlanHandler = () => {
    dispatch({
      type: "CHANGE_SUBSCRIPTION_PLAN_REQUEST",
      payload: {
        StoreSubscriptionPlanId: StoreSubscriptionPlanId,
        SubscripitonPlanId: selectedPlan.subscriptionPlanId,
        NumberofPOSLocation: noOfPos,
      },
    });
  };

  const [selectedPlan, setSelectedPlan] = useState();
  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Select to Change Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="menu_inner subscribe_plan_modal">
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
              <div className="row">
                {allSubscriptionPlan?.map((plan) => {
                  const isActive =
                    plan.subscriptionPlanId == selectedPlan?.subscriptionPlanId;
                  return (
                    <div
                      className={`col-lg-3 ${
                        isActive ? "borderSelected" : "borderNotSelected"
                      }`}
                      key={plan.subscriptionPlanId}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      <div className="price-box border">
                        <div className="">
                          <div className="price-label basic">
                            {plan.subscriptionPlanName}
                          </div>
                          <div className="price">
                            {currencySymbol} {" " + plan.amount}
                          </div>
                          <div className="price-info">Per Month, loc.</div>
                        </div>
                        <div className="info">
                          <ul>
                            {plan.planItems?.map((planItem) => {
                              return (
                                <li>
                                  <i className="fas fa-check" />
                                  {planItem}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer> */}
      <div className="w-100 bg-light p-2 ps-4 pe-4">
        <Form form={form} onFinish={changePlanHandler}>
          <div className="row">
            <div className="col-md-3 categoryField">
              <div className="form-group">
                <div className=" pt-0">
                  <Form.Item
                    name="NumberofPOSLocation"
                    rules={[
                      {
                        required: true,
                        message: "Please enter number of POS Devices",
                      },
                    ]}
                    label="No of POS"
                  >
                    <Input
                      min={1}
                      type="number"
                      placeholder="No of POS Devices"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <div className=" pt-0">
                  <label className="mb-0 d-flex align-items-center">
                    Total Amount:
                  </label>
                  <span className="fw-bold fs-5">
                    {currencySymbol + " "}
                    {selectedPlan
                      ? noOfPos
                        ? noOfPos * selectedPlan.amount
                        : selectedPlan.amount
                      : 0}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-center">
              <Button
                type="danger"
                loading={changeSubscriptionLoading}
                htmlType="submit"
                className="btn text-white btn-danger border-0"
              >
                Change Plan
              </Button>
            </div>
          </div>
        </Form>
      </div>
      {/* </Modal.Footer> */}
    </Modal>
  );
}

export default ChangePlan;
