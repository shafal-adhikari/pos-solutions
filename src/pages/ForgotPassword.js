import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Spin, Alert, Input } from "antd";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const { data, error, isLoading, isChangePasswordSuccess } = useSelector(
    (state) => state.emailConfirmationReducer
  );
  const code = query.get("code");
  const email = query.get("email");

  const onChangePasswordFormSubmit = (values) => {
    dispatch({
      type: "CHANGE_PASSWORD_REQUEST",
      payload: {
        Email: email,
        Code: code,
        Password: values.newPassword,
        ConfirmPassword: values.confirmPassword,
      },
    });
  };
  useEffect(() => {
    if (isChangePasswordSuccess) {
      form.resetFields();
    }
  }, [isChangePasswordSuccess]);
  return (
    <div
      className="forgot-password forgotPassword"
      style={{ display: "flex", justifyContent: "center", marginTop: "4rem" }}
    >
      <Spin spinning={isLoading}>
        <Form
          name="form"
          onFinish={onChangePasswordFormSubmit}
          autoComplete="off"
          form={form}
          className="forgot-password-form"
          style={{
            width: "27vw",
            boxShadow:
              "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
            padding: "20px",
            marginBottom: "5rem",
          }}
        >
          {error && <Alert message={error} type="error" showIcon={true} />}
          {isChangePasswordSuccess && (
            <Alert
              message=" Your Password has been Changed Successfully !"
              type="success"
              showIcon={true}
            />
          )}
          <h2 style={{ fontWeight: "bold", fontSize: "24px" }}>
            Create New Password
          </h2>
          <p style={{ color: "#A3A7B0" }}>
            Your New Password Must be different from previous used passwords !
          </p>
          <Form.Item
            hasFeedback
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter New Password"
              class="form-control"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Enter Confirm Password"
              class="form-control"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                borderRadius: "5px",
                marginTop: "15px",
                width: "100%",
                height: "35px",
                background: "#1B9AA5",
                border: "none",
              }}
            >
              Reset Password
            </Button>
            <Button
              type="danger"
              onClick={() => navigate("/login")}
              style={{
                borderRadius: "5px",
                marginTop: "10px",
                width: "100%",
                height: "35px",
                border: "none",
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default ForgotPassword;
