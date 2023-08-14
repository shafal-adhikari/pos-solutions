import React, { useEffect, useState } from "react";
import { Form, Input, Button, Switch } from "antd";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import Password from "antd/lib/input/Password";
import FormItemSkeleton from "../../components/FormItemSkeleton/FormItemSkeleton";
function PasswordAndSecurity() {
  const [form] = Form.useForm();
  const {
    profileDetails,
    updateLoading,
    updateSuccess,
    switchLoading,
    allLoading,
  } = useSelector((state) => state.userProfileReducer);
  const [is2FaEnabled, setIs2FaEnabled] = useState(false);
  useEffect(() => {
    if (profileDetails) {
      setIs2FaEnabled(profileDetails?.isTwoFAEnabled);
    }
  }, [profileDetails]);
  const change2FAHandler = (val) => {
    setIs2FaEnabled(val);
    dispatch({
      type: "ENABLE_DISABLE_2FA_REQUEST",
      payload: {
        Email: profileDetails?.email,
        IsEnable: val,
      },
    });
  };
  const dispatch = useDispatch();
  const changePasswordHandler = (values) => {
    dispatch({
      type: "CHANGE_USER_PASSWORD_REQUEST",
      payload: {
        ...values,
      },
    });
  };
  useEffect(() => {
    if (updateSuccess) {
      form.setFields([
        {
          name: "OldPassword",
          value: "",
        },
        {
          name: "NewPassword",
          value: "",
        },
        {
          name: "ConfirmNewPassword",
          value: "",
        },
      ]);
    }
  }, [updateSuccess]);
  return (
    <>
      <div className="row">
        <h6 className="fw-bold">Password and Security</h6>
      </div>
      <Form
        form={form}
        onFinish={changePasswordHandler}
        fields={[
          {
            name: "Email",
            value: profileDetails?.email,
          },
        ]}
      >
        <div className="card mt-3 categoryField">
          <div className="card-body">
            {allLoading ? (
              <div className="addacc_form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  {/* end col */}
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-3">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-3">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  <div className="justify-content-start col-md-12">
                    <Skeleton count={0.08} height={30} inline={true} />
                    <Skeleton
                      count={0.08}
                      height={30}
                      inline={true}
                      className="ms-2"
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-12 ">
                    <Skeleton count={0.6} />
                    <div className="form-group">
                      <div className=" pt-0">
                        <Skeleton count={0.08} height={20} />
                      </div>
                    </div>
                  </div>
                  {/* end col */}
                </div>
              </div>
            ) : (
              <div className="addacc_form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <Form.Item label="Email" name="Email">
                        <Input placeholder="Enter Email" readOnly={true} />
                      </Form.Item>
                    </div>
                  </div>
                  {/* end col */}
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <Form.Item
                        label="Old Password"
                        name="OldPassword"
                        rules={[
                          {
                            required: true,
                            message: "Please enter old password",
                          },
                        ]}
                      >
                        <Password placeholder="Enter Old Password" />
                      </Form.Item>
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-3">
                    <div className="form-group">
                      <Form.Item
                        label="New Password"
                        name="NewPassword"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please enter old password",
                          },
                        ]}
                      >
                        <Password placeholder="Enter New Password" />
                      </Form.Item>
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-3">
                    <div className="form-group">
                      <Form.Item
                        label="Confirm New Password"
                        name="ConfirmNewPassword"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("NewPassword") === value
                              ) {
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
                        <Password placeholder="Confirm New Password" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="justify-content-start col-md-12">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={updateLoading}
                      className="btn btn-primary all_btn rounded-0"
                    >
                      Save
                    </Button>
                    <Button
                      type="danger"
                      className="btn btn-danger rounded-0 border-0 ms-2"
                      data-dismiss="modal"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-12 ">
                    <p>
                      Your account is ready.If you want to make your account
                      more secure,Enable 2FA.
                    </p>
                    <div className="form-group">
                      <div className=" pt-0">
                        <Switch
                          checked={is2FaEnabled}
                          loading={switchLoading}
                          onChange={(e) => change2FAHandler(e)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* end col */}
                </div>
              </div>
            )}
          </div>
        </div>
      </Form>
      <div className="card mt-3">
        <div className="card-body">
          <a
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
            className="advanced"
          >
            Log Entries <i className="fa fa-angle-down" />
          </a>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <div className="list-group list-group-flush border-bottom scrollarea">
                  <a
                    href="#"
                    className="list-group-item list-group-item-action active py-3 lh-tight"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">New User Verification</strong>
                      <small>Wed, 10/11/2022</small>
                    </div>
                    <div className="col-10 mb-1 small text-uppercase">
                      User Verification done Successfully
                    </div>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action py-3 lh-tight"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">2fa Enabled</strong>
                      <small className="text-muted">Wed, 10/11/2022</small>
                    </div>
                    <div className="col-10 mb-1 small text-uppercase">
                      Enable 2FA Successfully.
                    </div>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action py-3 lh-tight"
                  >
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">Password Changes</strong>
                      <small className="text-muted">Wed, 10/11/2022</small>
                    </div>
                    <div className="col-10 mb-1 small text-uppercase">
                      Password Changed Successfully
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordAndSecurity;
