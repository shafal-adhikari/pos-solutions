import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import FormItemSkeleton from "../../components/FormItemSkeleton/FormItemSkeleton";
import Skeleton from "react-loading-skeleton";
import { useLocation } from "react-router-dom";
function Profile({ image }) {
  const dispatch = useDispatch();
  const { countryList } = useSelector((state) => state.commonReducer);

  const { profileDetails, updateLoading, allLoading, updateSuccess } =
    useSelector((state) => state.userProfileReducer);
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch({
      type: "GET_COUNTRY_STATE_REQUEST",
    });
  }, []);
  const selectedCountry = Form.useWatch("CountryId", form);
  useEffect(() => {
    if (profileDetails) {
      dispatch({
        type: "UPDATE_USER_DETAILS",
        payload: {
          email: profileDetails.email,
          image: profileDetails.image,
          name: profileDetails.name,
          userId: profileDetails.userId,
          phoneNumber: profileDetails.phoneNumber,
        },
      });
      form.setFields([
        {
          name: "CountryId",
          value: profileDetails.countryId,
        },
        {
          name: "CountryPhoneNumberPrefixId",
          value: profileDetails.countryId,
        },
        {
          name: "FullName",
          value: profileDetails.name,
        },
        {
          name: "Email",
          value: profileDetails.email,
        },
        {
          name: "PhoneNumber",
          value: profileDetails.phoneNumber,
        },
        {
          name: "StateId",
          value: profileDetails.stateId,
        },
        {
          name: "CityId",
          value: profileDetails.cityId,
        },
        {
          name: "Address",
          value: profileDetails.address,
        },
        {
          name: "PostalCode",
          value: profileDetails.postalCode,
        },
        {
          name: "IsPushNotificationEnabled",
          value: profileDetails.isPushNotificationEnabled,
        },
      ]);
    }
  }, [profileDetails]);
  const updateProfileHandler = (values) => {
    const formData = new FormData();
    formData.append(
      "Request",
      JSON.stringify({
        ...values,
        Id: profileDetails.id,
      })
    );
    if (image) {
      formData.append("Image", image);
    }
    dispatch({
      type: "UPDATE_USER_PROFILE_REQUEST",
      payload: formData,
    });
  };
  const prefixSelector = (name) => (
    <Form.Item
      name={name}
      noStyle
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Select
        style={{
          width: 80,
        }}
      >
        {countryList?.length > 0 &&
          countryList?.map((item, i) => (
            <Select.Option value={item.id} key={item.id}>
              <span style={{ fontSize: "10px" }}>
                <img
                  src={item.image}
                  style={{ height: "10px", width: "10px", marginRight: "4px" }}
                />
                {item.additionalValue}
              </span>
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );
  return (
    <div className="profile_right">
      <div className="card">
        <div className="card-body">
          <div className="company_head d-flex justify-content-between">
            <div className="header-title">
              <h6 className="font-weight-bold"> Profile Settings</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-3">
        <Form form={form} onFinish={updateProfileHandler}>
          <div className="card-body">
            {allLoading ? (
              <div className="addacc_form">
                <div className="row categoryField">
                  <div className="col-md-6">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <FormItemSkeleton />
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-2">
                    <div className="form-group">
                      <div className=" pt-0">
                        <FormItemSkeleton />
                      </div>
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
              </div>
            ) : (
              <div className="addacc_form">
                <div className="row categoryField">
                  <div className="col-md-6">
                    <div className="form-group">
                      <Form.Item
                        label="Full Name"
                        name="FullName"
                        rules={[
                          {
                            required: true,
                            message: "Please enter full name",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Full Name" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <Form.Item
                        label="Email"
                        name="Email"
                        rules={[
                          {
                            required: true,
                            message: "Please enter email",
                          },
                          {
                            type: "email",
                            mesasge: "Please enter valid email",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Email" />
                      </Form.Item>
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <Form.Item
                        label="Phone"
                        name="PhoneNumber"
                        rules={[
                          {
                            required: true,
                            message: "Please enter phone number",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter Phone Number"
                          addonBefore={prefixSelector(
                            "CountryPhoneNumberPrefixId"
                          )}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  {/* end col */}
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
                        <Select placeholder="Select Country">
                          {countryList?.map((country) => {
                            return (
                              <Select.Option
                                key={country.id}
                                value={country.id}
                              >
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
                  {/* end col */}
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
                          options={countryList
                            ?.find((country) => country.id == selectedCountry)
                            ?.states.map((state) => {
                              return {
                                label: state.value,
                                value: state.id,
                              };
                            })}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  {/* end col */}
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
                          options={countryList
                            ?.find((country) => country.id == selectedCountry)
                            ?.cities.map((state) => {
                              return {
                                label: state.value,
                                value: state.id,
                              };
                            })}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <Form.Item
                        label="Address"
                        name="Address"
                        rules={[
                          {
                            required: true,
                            message: "Please enter address",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Address" />
                      </Form.Item>
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <Form.Item
                        label="Postal Code"
                        name="PostalCode"
                        rules={[
                          {
                            required: true,
                            message: "Please enter postal code",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Postal Code" />
                      </Form.Item>
                    </div>
                  </div>
                  {/* end col */}
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className="pt-0 d-flex align-items-center">
                        <Form.Item
                          name="IsPushNotificationEnabled"
                          valuePropName="checked"
                        >
                          <Switch loading={allLoading} />
                        </Form.Item>
                        <label
                          className="form-check-label ms-2"
                          htmlFor="customSwitchsizelg"
                        >
                          Push Notification
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="justify-content-start col-md-12">
                    <Button
                      type="primary"
                      loading={updateLoading}
                      htmlType="submit"
                      className="btn btn-success rounded-0"
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
              </div>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Profile;
