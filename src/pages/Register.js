/** @format */

import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Select, Button } from "antd";
import { Alert } from "react-bootstrap";
import OtpInput from "react-otp-input";

const { Option } = Select;

function Register({ setShowRegisterModal }) {
  const {
    sendOTPLoading,
    success,
    isSendOTPSuccess,
    error,
    storeState,
    storeId,
    countryList,
    resendOTPLoading,
    isResendOTPSuccess,
    countryCitiesList,
    isOperationSuccessful,
    registerUserLoading,
    registerationError,
    isCLearForm,
  } = useSelector((state) => state.authenticationReducer);
  const dispatch = useDispatch();

  const [otpForm] = Form.useForm();
  const [RegisterForm] = Form.useForm();
  const [otp, setOTP] = useState("");

  const [selectedCountry, setSelectedCountry] = useState();

  const onRegisterFormSubmit = (values) => {
    console.log(values);
    dispatch({
      type: "REGISTER_USER_REQUEST",
      payload: {
        OTP: values.verificationCode,
        FullName: values.fullName,
        Password: values.password,
        Email: otpForm.getFieldValue("Email"),
        ConfirmPassword: values.confirmPassword,
        PhoneNumber: values.phone,
        CountryPhoneNumberPrefixId: values.prefix,
        CountryId: values.CountryId,
        CityId: values.CityId,
        StateId: values.StateId,
        IsGoogleLogin: false,
        storeId,
        storeState,
      },
    });
  };
  const onOTPFormSubmit = (values) => {
    dispatch({
      type: "SEND_OTP_REQUEST_REGISTER",
      payload: {
        email: values.Email,
        storeId,
        storeState,
      },
    });
  };
  const onChange = (key) => {
    RegisterForm.resetFields();
    RegisterForm.setFieldValue(
      "CountryId",
      countryCitiesList?.find((country) => country.isSelected)?.id
    );
    RegisterForm.setFieldValue(
      "CountryPhoneNumberPrefixId",
      countryCitiesList?.find((country) => country.isSelected)?.id
    );
  };
  useEffect(() => {
    RegisterForm.setFieldValue("StateId", null);
    RegisterForm.setFieldValue("CityId", null);
  }, [selectedCountry]);
  useLayoutEffect(() => {
    if (countryCitiesList) {
      const selectedCountry = countryCitiesList?.find(
        (country) => country.isSelected
      );
      setSelectedCountry(selectedCountry);
      RegisterForm.setFieldValue("CountryId", selectedCountry?.id);
      RegisterForm.setFieldValue(
        "CountryPhoneNumberPrefixId",
        selectedCountry?.id
      );
      RegisterForm.setFieldValue("prefix", selectedCountry?.id);
    }
  }, [countryCitiesList]);
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 120,
        }}
      >
        {countryCitiesList?.length > 0 &&
          countryCitiesList?.map((item) => (
            <Option value={item.id} key={item.id}>
              {" "}
              <span style={{ fontSize: "14px" }}>
                <img
                  src={item.image}
                  style={{ height: "20px", width: "30px", marginRight: "4px" }}
                />
                {item.additionalValue}
              </span>
            </Option>
          ))}
      </Select>
    </Form.Item>
  );

  useEffect(() => {
    dispatch({
      type: "GET_COUNTRY_CITIES_PREFIX_REQUEST",
    });
  }, []);

  useEffect(() => {
    if (isOperationSuccessful) {
      RegisterForm.resetFields();
    }
  }, [isOperationSuccessful]);

  useEffect(() => {
    if (isCLearForm) {
      RegisterForm.resetFields();
      otpForm.resetFields();
    }
  }, [isCLearForm]);

  return (
    <>
      <div className=" login log1 categoryField">
        <div className="card2 card border-0 px-3 py-3">
          {isSendOTPSuccess && (
            <Form
              className="login"
              name="form"
              onFinish={onRegisterFormSubmit}
              autoComplete="off"
              initialValues={{
                remember: true,
              }}
              form={RegisterForm}
            >
              <div className="row ">
                <div className="  col-md-12 col-lg-12 otp-container">
                  {/* <p className="verification-text ant-label">
                    Enter Verification Code:
                  </p> */}
                  <Alert variant="info">
                    We Have {isResendOTPSuccess && "Re-"} Sent Verifcation Code
                    To Your Email. Please Check And Enter Verification Code Here
                    !{" "}
                    <small
                      className="resend-text"
                      onClick={() => {
                        dispatch({
                          type: "SEND_OTP_REQUEST_REGISTER_RESEND",
                          payload: {
                            email: otpForm.getFieldValue("Email"),
                            storeId,
                            storeState,
                          },
                        });
                      }}
                    >
                      {resendOTPLoading ? "Resending OTP..." : "Resend OTP"}
                    </small>
                  </Alert>
                  {registerationError && (
                    <Alert variant="danger">{registerationError}</Alert>
                  )}

                  <Form.Item
                    label="Verification Code"
                    name="verificationCode"
                    rules={[
                      {
                        required: true,
                        message: "Please input Verification Code !",
                      },
                    ]}
                  >
                    <OtpInput
                      className="verification-container"
                      inputStyle={"ant-input"}
                      value={otp}
                      onChange={(e) => setOTP(e)}
                      numInputs={6}
                    />
                  </Form.Item>
                </div>

                <div className="  col-md-12 col-lg-6">
                  <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your full name!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Full Name"
                      className="form-control"
                    />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <Form.Item
                      label="Country"
                      name="CountryId"
                      rules={[
                        {
                          required: true,
                          message: "Please select country",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select Country"
                        onChange={(e) =>
                          setSelectedCountry(
                            countryCitiesList?.find(
                              (country) => country.id == e
                            )
                          )
                        }
                      >
                        {countryCitiesList?.map((country) => {
                          return (
                            <Select.Option key={country.id} value={country.id}>
                              <img
                                src={country.image}
                                style={{
                                  height: "20px",
                                  width: "20px",
                                  marginRight: "7px",
                                }}
                              />
                              {country.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <Form.Item
                      label="State"
                      name="StateId"
                      rules={[
                        {
                          required: true,
                          message: "Please select state",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select State"
                        options={selectedCountry?.states.map((state) => {
                          return {
                            label: state.value,
                            value: state.id,
                          };
                        })}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <Form.Item
                      label="City"
                      name="CityId"
                      rules={[
                        {
                          required: true,
                          message: "Please select city",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select City"
                        options={selectedCountry?.cities.map((state) => {
                          return {
                            label: state.value,
                            value: state.id,
                          };
                        })}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="  col-md-12 col-lg-12">
                  {" "}
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input
                      addonBefore={prefixSelector}
                      placeholder="Enter Phone"
                      className="form-control"
                    />
                  </Form.Item>
                </div>

                <div className="  col-md-12 col-lg-6">
                  {" "}
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input
                      type={"password"}
                      placeholder="Enter password"
                      className="form-control"
                    />
                  </Form.Item>
                </div>
                <div className=" col-md-12 col-lg-6">
                  {" "}
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input confirm password!",
                      },
                    ]}
                  >
                    <Input
                      type={"password"}
                      placeholder="Enter Confirm Password"
                      className="form-control"
                    />
                  </Form.Item>
                </div>

                <div className=" mb-3  mt-3">
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={registerUserLoading}
                      className="primary-button"
                    >
                      {" "}
                      Register
                    </Button>
                    <Button
                      className="primary-button ms-2"
                      type="danger"
                      onClick={() => {
                        setShowRegisterModal(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          )}
          {!isSendOTPSuccess && (
            <Form
              className="login"
              name="form"
              onFinish={onOTPFormSubmit}
              autoComplete="off"
              initialValues={{
                remember: true,
              }}
              form={otpForm}
            >
              <div className="row">
                <div className="  col-md-12 col-lg-12">
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form.Item
                    label="Email Address"
                    name="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                      {
                        type: "email",
                        message: "Please enter valid email!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter email" className="form-control" />
                  </Form.Item>
                </div>

                <div className=" mb-3  mt-3">
                  <Form.Item>
                    <Button
                      className="primary-button"
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                      loading={sendOTPLoading}
                    >
                      {" "}
                      {sendOTPLoading ? "" : "Send OTP"}
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}

export default Register;
