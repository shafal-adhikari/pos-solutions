import { Button, Form, Input, Select, Spin, Switch } from "antd";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import FormItemSkeleton from "../../components/FormItemSkeleton/FormItemSkeleton";

function AddCustomer({
  isOpen,
  setOpen,
  isEditClicked,
  isOrderCustomer = false,
  getCustomerDetails,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { addGetLoading, editData, customerAddSection, addLoading } =
    useSelector((state) => state.customerReducer);

  useEffect(() => {
    if (isOpen) {
      dispatch({
        type: "GET_CUSTOMER_ADD_SECTION_REQUEST",
      });
    }
  }, [isOpen]);
  useEffect(() => {
    if (!isEditClicked && customerAddSection) {
      form.setFieldValue(
        "customerTypeId",
        customerAddSection.customerType[0]?.id
      );
      form.setFieldValue(
        "countryId",
        customerAddSection.countries.find((country) => country.isSelected).id
      );
      form.setFieldValue(
        "countryPhoneNumberPrefixId",
        customerAddSection.countries.find((country) => country.isSelected).id
      );
    }
  }, [customerAddSection, isEditClicked]);
  useEffect(() => {
    if (isEditClicked && editData) {
      form.setFields([
        {
          name: "customerTypeId",
          value: editData.customerTypeId,
        },
        {
          name: "countryId",
          value: editData.countryId,
        },
        {
          name: "countryPhoneNumberPrefixId",
          value: editData.countryPhoneNumberPrefixId,
        },
        {
          name: "name",
          value: editData.name,
        },
        {
          name: "email",
          value: editData.email,
        },
        {
          name: "phoneNumber",
          value: editData.phoneNumber,
        },
        {
          name: "postalCode",
          value: editData.postalCode,
        },
        {
          name: "isLoyaltyEnabled",
          value: editData.isLoyaltyEnabled,
        },
        {
          name: "isMarketingPromotionEnabled",
          value: editData.isMarketingPromotionEnabled,
        },
      ]);
    }
  }, [isEditClicked, editData]);
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
        {customerAddSection?.countries?.length > 0 &&
          customerAddSection?.countries?.map((item, i) => (
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
  const customerAddHandler = (values) => {
    if (isOrderCustomer) {
      getCustomerDetails(values);
      return;
    }
    dispatch({
      type: "ADD_NEW_CUSTOMER_REQUEST",
      payload: {
        ...values,
        id: editData && isEditClicked ? editData.id : "",
      },
    });
  };
  return (
    <div className="card p-0">
      <div className="card-body bg-light-blue">
        {addGetLoading ? (
          <Form
            form={form}
            onFinish={customerAddHandler}
            fields={[
              {
                name: "isLoyaltyEnabled",
                value: form.getFieldValue("isLoyaltyEnabled")
                  ? form.getFieldValue("isLoyaltyEnabled")
                  : true,
              },
              {
                name: "isMarketingPromotionEnabled",
                value: form.getFieldValue("isMarketingPromotionEnabled")
                  ? form.getFieldValue("isMarketingPromotionEnabled")
                  : true,
              },
            ]}
          >
            <div className="contact_form categoryField">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <div className="pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-lg-4">
                  <Form.Item
                    label={<Skeleton width={200} />}
                    name="isMarketingPromotionEnabled"
                    valuePropName="checked"
                  >
                    <Skeleton width={80} height={30} borderRadius={10} />
                  </Form.Item>
                </div>
                <div className="col-md-4 col-lg-4">
                  <Form.Item
                    label={<Skeleton width={200} />}
                    name="isMarketingPromotionEnabled"
                    valuePropName="checked"
                  >
                    <Skeleton width={80} height={30} borderRadius={10} />
                  </Form.Item>
                </div>
                <div className="col-md-12 col-lg-12 mt-3">
                  <Skeleton width={100} height={40} inline={true} />
                  <Skeleton width={100} height={40} />
                </div>
              </div>
            </div>
          </Form>
        ) : (
          <Form
            form={form}
            onFinish={customerAddHandler}
            initialValues={{
              isMarketingPromotionEnabled: true,
              isLoyaltyEnabled: true,
            }}
          >
            <div className="contact_form categoryField">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="pt-0">
                      <Form.Item
                        label="Customer Type"
                        name="customerTypeId"
                        rules={[
                          {
                            required: true,
                            message: "Please choose customer type",
                          },
                        ]}
                      >
                        <Select placeholder="Select Customer Type">
                          {customerAddSection?.customerType.map((type) => {
                            return (
                              <Select.Option value={type.id} key={type.id}>
                                {type.value}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="pt-0">
                      <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter Customer name",
                          },
                        ]}
                      >
                        <Input placeholder="Name" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="pt-0">
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please enter email",
                          },
                          {
                            type: "email",
                            message: "Please enter valid email",
                          },
                        ]}
                      >
                        <Input placeholder="Email" />
                      </Form.Item>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <div className="pt-0">
                      <Form.Item
                        label="Phone"
                        name="phoneNumber"
                        rules={[
                          {
                            required: true,
                            message: "Please enter phone number",
                          },
                        ]}
                      >
                        <Input
                          addonBefore={prefixSelector(
                            "countryPhoneNumberPrefixId"
                          )}
                          placeholder="Enter Phone Number"
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="pt-0">
                      <Form.Item
                        label="Country"
                        name="countryId"
                        rules={[
                          {
                            required: true,
                            message: "Please choose country",
                          },
                        ]}
                      >
                        <Select placeholder="Choose Country">
                          {customerAddSection?.countries.map((country) => {
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
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="pt-0">
                      <Form.Item
                        label="Postal Code"
                        name="postalCode"
                        rules={[
                          {
                            required: true,
                            message: "Please enter postal code",
                          },
                        ]}
                      >
                        <Input placeholder="Postal Code" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-lg-4">
                  <Form.Item
                    label="Marketing Promotion Allowed"
                    name="isMarketingPromotionEnabled"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked={true} />
                  </Form.Item>
                </div>
                <div className="col-md-4 col-lg-4">
                  <Form.Item
                    label="Enable Loyalty"
                    name="isLoyaltyEnabled"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked={true} />
                  </Form.Item>
                </div>
                <div className="col-md-12 mt-2">
                  <Button
                    loading={addLoading}
                    type="primary"
                    htmlType="submit"
                    className="btn btn-success rounded-0"
                  >
                    Save
                  </Button>
                  <Button
                    type="danger"
                    className="btn btn-danger rounded-0 ms-2"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}

export default AddCustomer;
