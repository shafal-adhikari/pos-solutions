import { Form, Switch, Input, Button, Spin } from "antd";
import Skeleton from "react-loading-skeleton";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function PaymentMethodSettings() {
  const dispatch = useDispatch();

  const { paymentMethodList, isLoading, updateLoading, updateSuccess } =
    useSelector((state) => state.paymentSettingsReducer);
  useEffect(() => {
    dispatch({
      type: "GET_PAYMENT_METHODS_REQUEST",
      payload: {
        Page: 1,
        PageSize: 10,
        ExternalFilter: { Id: "", Name: "" },
      },
    });
  }, []);
  const [form] = Form.useForm();
  const updatePaymentMethodHandler = (values) => {
    form.resetFields();
    dispatch({
      type: "UPDATE_PAYMENT_METHOD_REQUEST",
      payload: [
        {
          Id: values.Id,
          IsActive: values.isActive,
          PaymentCredentials: {
            KeyOrId: values.KeyOrId,
            Secret: values.Secret,
          },
        },
      ],
    });
  };
  return (
    <>
      <div className="row align-items-center justify-content-center">
        <div className="col-md-12">
          <div className="row ">
            {isLoading ? (
              <>
                <div className="col-12 col-md-6">
                  <div className="card px-2 py-3 p-md-4 border-0 ">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-12 col-md-12">
                        <Skeleton count={0.05} height={30} inline={true} />
                        <Skeleton
                          count={0.9}
                          height={30}
                          style={{ marginLeft: "10px" }}
                          inline={true}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="payment_filter">
                      <div className="row">
                        <div className="col-md-12 col-lg-12">
                          <div className="form-group categoryField">
                            <Skeleton count={0.1} />
                            <Skeleton count={1} height={30} />
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-12">
                          <div className="form-group categoryField">
                            <div className="form-group categoryField">
                              <Skeleton count={0.1} />
                              <Skeleton count={1} height={30} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Skeleton inline={true} count={0.1} height={30} />
                      <Skeleton
                        count={0.1}
                        height={30}
                        style={{ marginLeft: "10px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card px-2 py-3 p-md-4 border-0 ">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-12 col-md-12">
                        <Skeleton count={0.05} height={30} inline={true} />
                        <Skeleton
                          count={0.9}
                          height={30}
                          style={{ marginLeft: "10px" }}
                          inline={true}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="payment_filter">
                      <div className="row">
                        <div className="col-md-12 col-lg-12">
                          <div className="form-group categoryField">
                            <Skeleton count={0.1} />
                            <Skeleton count={1} height={30} />
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-12">
                          <div className="form-group categoryField">
                            <div className="form-group categoryField">
                              <Skeleton count={0.1} />
                              <Skeleton count={1} height={30} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Skeleton inline={true} count={0.1} height={30} />
                      <Skeleton
                        count={0.1}
                        height={30}
                        style={{ marginLeft: "10px" }}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              paymentMethodList?.map((method, i) => {
                return (
                  <div className="col-12 col-md-6" key={method.id}>
                    <div className="card px-2 py-3 p-md-4 border-0 ">
                      <Form
                        onFinish={updatePaymentMethodHandler}
                        form={form}
                        name={`updateForm${i}`}
                        fields={[
                          {
                            name: ["Id"],
                            value: method.id,
                          },
                          {
                            name: ["isActive"],
                            value: method.isActive,
                          },
                          {
                            name: ["KeyOrId"],
                            value: method.paymentCredentials.keyOrId
                              ? method.paymentCredentials.keyOrId
                              : "",
                          },
                          {
                            name: ["Secret"],
                            value: method.paymentCredentials.secret
                              ? method.paymentCredentials.secret
                              : "",
                          },
                        ]}
                      >
                        <div className="row align-items-center justify-content-center">
                          <div className="col-12 col-md-12">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center justify-content-center">
                                <img
                                  src="assets/images/stripe.png"
                                  alt=""
                                  height="25px"
                                  width="25px"
                                  className="int_logo"
                                  data-pagespeed-url-hash={1276925937}
                                />
                                <h6 className="fw-bold mb-0 ms-2">
                                  {method.paymentMethodName} Credentials Setting
                                </h6>
                                {method.isActive ? (
                                  <span className="badge bg-success mt-1 ms-2">
                                    Active
                                  </span>
                                ) : (
                                  <span className="badge bg-warning mt-1 ms-2">
                                    Inactive
                                  </span>
                                )}
                              </div>
                              <Form.Item hidden="true" name="Id">
                                <Input type="text" />
                              </Form.Item>
                              <div
                                className="form-check form-switch form-switch-lg text-center d-flex align-items-center justify-content-center"
                                dir="ltr"
                              >
                                {/* <input
                                type="checkbox"
                                className="form-check-input"
                                id="customSwitchsizelg"
                                defaultChecked=""
                              /> */}
                                <Form.Item
                                  valuePropName="checked"
                                  name="isActive"
                                >
                                  <Switch defaultChecked={true} />
                                </Form.Item>
                              </div>
                            </div>
                            <hr />
                            <div className="payment_filter">
                              <div className="row">
                                <div className="col-md-12 col-lg-12">
                                  <div className="form-group categoryField">
                                    <Form.Item
                                      label="Key"
                                      name="KeyOrId"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please Enter Key",
                                        },
                                      ]}
                                    >
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Key"
                                      />
                                    </Form.Item>
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-12">
                                  <div className="form-group categoryField">
                                    <Form.Item
                                      label="Secret Key"
                                      name="Secret"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please Enter Secret Key",
                                        },
                                      ]}
                                    >
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Secret Key"
                                      />
                                    </Form.Item>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Button
                              htmlType="submit"
                              type="primary"
                              loading={updateLoading}
                              style={{ backgroundColor: "#09B29C" }}
                              className="btn btn-success btn-lg bg-theme border-0"
                            >
                              Save
                            </Button>
                            <Button
                              type="danger"
                              className="btn btn-success btn-lg bg-danger border-0 ms-2"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentMethodSettings;
