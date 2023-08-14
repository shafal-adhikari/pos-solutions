/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Alert, Spin, Modal } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import Register from "./Register";
import { Modal as BootStrapModal } from "react-bootstrap";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const loginSubmitHandler = (values) => {
    dispatch({
      type: "LOGIN_REQUEST",
      payload: values,
    });
  };
  const [form] = Form.useForm();

  const {
    data,
    userId,
    is2FaEnabled,
    error,
    isLoading,
    isLoggedIn,
    isOperationSuccessful,
  } = useSelector((state) => state.authenticationReducer);

  useEffect(() => {
    if (isLoggedIn) {
      window.location.replace("/");
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (is2FaEnabled) {
      if (data) {
        navigate(`/2fa`);
      } else {
        navigate(`/2fa`);
      }
    }
  }, [is2FaEnabled]);
  useEffect(() => {
    if (isOperationSuccessful) {
      setShowRegisterModal(false);
    }
  }, [isOperationSuccessful]);

  return (
    <div className="container-scroller h100 loginPage">
      <Modal
        title="Forgot Password ?"
        open={modalOpen}
        footer={null}
        maskClosable={false}
        width="35vw"
        onCancel={() => {
          setModalOpen(false);
          dispatch({
            type: "REMOVE_MESSAGE",
          });
        }}
        style={{ top: "2rem" }}
      >
        <ForgotPassword setModalOpen={setModalOpen} />
      </Modal>
      <BootStrapModal
        backdrop="static"
        show={showRegisterModal}
        footer={null}
        title="Register Now"
        className="register"
        onHide={() => {
          setShowRegisterModal(false);
          dispatch({
            type: "CLEAR_FORM",
          });
        }}
        // width={"50vw"}
        style={{ top: "2rem", padding: "15px" }}
      >
        <BootStrapModal.Header closeButton>
          <BootStrapModal.Title id="example-modal-sizes-title-lg">
            Register Now
          </BootStrapModal.Title>
        </BootStrapModal.Header>
        <Register setShowRegisterModal={setShowRegisterModal} />
      </BootStrapModal>
      {/* partial */}
      <div className="container pt-4">
        <section className="">
          <div className="row  justify-content-center align-items-center d-flex-row text-center h-100">
            <div className="col-12 col-md-4  ">
              <div className="card shadow">
                <div className="card-body ">
                  <img
                    src="assets/images/poslogo.png"
                    className="w-80 img-fluid"
                    alt=""
                  />

                  <h4 className="card-title mt-4 text-center mb-4">
                    Login to POS
                  </h4>

                  {error && (
                    <Alert
                      message={error}
                      type="error"
                      //   showIcon
                      //   icon={<InfoCircleOutlined />}
                      style={{
                        fontSize: "13px",
                        margin: "15px 0",
                        textAlign: "left",
                      }}
                    />
                  )}
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
                    <p className="d-flex justify-content-end fw-bold">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setModalOpen(true);
                        }}
                        className="text-danger"
                      >
                        <small>Forgot Password?</small>
                      </a>
                    </p>

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
                  </Form>
                  <p className="text-center">
                    Have an account?
                    <a
                      onClick={() => {
                        setShowRegisterModal(true);
                      }}
                    >
                      Register
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* page-body-wrapper ends */}
    </div>
  );
}

export default Login;
