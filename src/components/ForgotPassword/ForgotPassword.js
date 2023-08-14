import { Form, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Alert } from "antd";

const ForgotPassword = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { isLoading, success, error } = useSelector(
    (state) => state.emailConfirmationReducer
  );

  const onForgotPasswordFromSubmit = (values) => {
    dispatch({
      type: "FORGOT_PASSWORD_REQUEST",
      payload: values,
    });
  };

  useEffect(() => {
    if (success) {
      form.resetFields();
    }
  }, [success]);
  return (
    <div className="forgotPassword">
      <Form
        className="login"
        name="form"
        onFinish={onForgotPasswordFromSubmit}
        autoComplete="off"
        initialValues={{
          remember: true,
        }}
        form={form}
      >
        {success && (
          <Alert
            message="Password change link has been sent to you mail !"
            type="success"
            showIcon={true}
          />
        )}
        {error && <Alert message={error} type="error" showIcon={true} />}
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
          <Input placeholder="Enter Your Email" class="form-control" />
        </Form.Item>

        <Button
          // data-bs-dismiss={isLoggedIn ? "modal" : ""}
          type="primary"
          htmlType="submit"
          loading={isLoading}
          style={{
            minWidth: "6vw",
            height: "35px",
            background: "#0DB19C",
            border: "none",
            marginTop: "0.4rem",
          }}
        >
          Submit
        </Button>
        <Button
          type="danger"
          onClick={() => setModalOpen(false)}
          style={{
            width: "6vw",
            height: "35px",
            marginLeft: "10px",
            border: "none",
            marginTop: "0.4rem",
          }}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
