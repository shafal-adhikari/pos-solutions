import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Alert, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import TwoFA from "./TwoFA";
function Login({ setLoginModalOpen, setSize }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [openTwoFA, setOpenTwoFa] = useState(false);
  const loginSubmitHandler = (values) => {
    dispatch({
      type: "LOGIN_REQUEST",
      payload: values,
    });
  };
  const [form] = Form.useForm();
  const { is2FaEnabled, error, isLoading, loginSuccess } = useSelector(
    (state) => state.authenticationReducer
  );

  useEffect(() => {
    if (loginSuccess) {
      setLoginModalOpen(false);
      window.location.reload();
    }
  }, [loginSuccess]);
  useEffect(() => {
    if (is2FaEnabled) {
      setSize("lg");
      setOpenTwoFa(true);
    }
  }, [is2FaEnabled]);
  return (
    <>
      {openTwoFA ? (
        <div className="p-3">
          <TwoFA setOpenTwoFa={setOpenTwoFa} />
        </div>
      ) : (
        <div className="col-12 col-md-4 h-100 w-100 loginPage text-center">
          <div className="card shadow">
            <div className="card-body ">
              <img
                src="assets/images/poslogo.png"
                className="w-80 img-fluid"
                alt=""
              />
              <h4 className="card-title mt-4 text-center mb-4">Login to POS</h4>
              {/* <Alert
                type="error"
                message={"Your session has expired!"}
                className="mb-3"
              ></Alert> */}
              <Alert
                message={error ? error : "Your session has expired"}
                type="error"
                //   showIcon
                //   icon={<InfoCircleOutlined />}
                style={{
                  fontSize: "13px",
                  margin: "15px 0",
                  textAlign: "left",
                }}
              />
              <Form
                name="form"
                form={form}
                autoComplete="off"
                initialValues={{
                  remember: true,
                }}
                onFinish={loginSubmitHandler}
              >
                <Form.Item
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
                  <Input
                    addonBefore={
                      <div className="input-group-prepend">
                        <span className="input-group-text h-100">
                          <i className="fa fa-envelope" />
                        </span>
                      </div>
                    }
                    placeholder="Enter Email"
                  />
                </Form.Item>
                <Form.Item
                  name="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    addonBefore={
                      <div className="input-group-prepend">
                        <span className="input-group-text h-100">
                          <i className="fa fa-lock" />
                        </span>
                      </div>
                    }
                    type="password"
                    placeholder="Enter Password"
                  />
                </Form.Item>
                {/* <p className="d-flex justify-content-end fw-bold">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setModalOpen(true);
                    }}
                    className="text-danger"
                  >
                    <small>Forgot Password?</small>
                  </a>
                </p> */}

                <Form.Item>
                  <Button
                    className="btn btn-success btn-block w-100"
                    htmlType="submit"
                    loading={isLoading}
                    style={{
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src="assets/images/logo1.png"
                      width={50}
                      className="img-fluid loginlogo"
                      alt=""
                    ></img>
                    Login
                  </Button>
                </Form.Item>
                <button
                  className="btn btn-danger w-100"
                  onClick={() => {
                    setLoginModalOpen(false);
                    dispatch({
                      type: "LOGOUT",
                    });
                  }}
                >
                  Logout
                </button>
              </Form>
              <p className="text-center"></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
