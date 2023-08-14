import { Button, Form, Input, Select } from "antd";
import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import SIdeBarPage from "../components/SideBarPage/SIdeBarPage";
function NewSubscription() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { state, pathname } = useLocation();
  console.log(state);
  const { countryList } = useSelector((state) => state.commonReducer);
  const { subscriptionSuccess, newSubscriptionLoading } = useSelector(
    (state) => state.billingReducer
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (subscriptionSuccess) {
      navigate("/");
    }
  }, [subscriptionSuccess]);
  useEffect(() => {
    if (!state?.price) {
      navigate("/subscriptions");
    }
  }, [state, pathname]);
  const noOfPos = Form.useWatch("NumberofPOSLocation", form);
  const {
    activeStore: { currencySymbol },
  } = useSelector((state) => state.authenticationReducer);
  useEffect(() => {
    dispatch({
      type: "GET_COUNTRY_STATE_REQUEST",
    });
  }, []);
  const submitHandler = (values) => {
    const {
      NameOnCard,
      CardNumber,
      CVCNumber,
      ExpiryMonth,
      ExpiryYear,
      CountryId,
      CityId,
      StateId,
      Street,
      PostCode,
    } = values;
    const bodyPayload = {
      IsTermsAndConditionAccepted: true,
      SubscriptionPlanId: state.subscriptionPlanId,
      NumberofPOSLocation: values.NumberofPOSLocation,
      CreditCardDetails: {
        NameOnCard,
        CardNumber,
        CVCNumber,
        ExpiryMonth,
        ExpiryYear,
        Email: "gajurel.ram01@gmail.com",
      },
      BillingAddressDetails: {
        CountryId,
        CityId,
        StateId,
        Street,
        PostCode,
      },
    };
    dispatch({
      type: "NEW_SUBSCRIPTION_REQUEST",
      payload: bodyPayload,
    });
  };
  useLayoutEffect(() => {
    if (countryList) {
      const selectedCountry = countryList?.find(
        (country) => country.isSelected
      );
      setSelectedCountry(selectedCountry);
      form.setFieldValue("CountryId", selectedCountry?.id);
    }
  }, [countryList]);
  const [selectedCountry, setSelectedCountry] = useState();
  return (
    <>
      <div className="container-fluid page-body-wrapper1">
        <div className=" main_panel_inner">
          <div className="content-wrapper categoryField">
            <div className="content">
              <div className="row  d-flex justify-content-center">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="breadcrumb_top ">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb breadcrumb-custom">
                        <Link to="/" className="breadcrumb-item fw-bold">
                          Home
                        </Link>
                        <li
                          className="breadcrumb-item active fw-bold"
                          aria-current="page"
                        >
                          <span>New Subscription</span>
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="menu_inner myvendors">
                <div className="row">
                  <SIdeBarPage
                    pages={[
                      {
                        name: "New Subscription",
                        path: "subscriptions/new-subscription",
                      },
                    ]}
                  />
                  <div className="col-md-10 col-xxl-10">
                    <div className="menu_right">
                      <div className="right_top mb-4">
                        <div className="tab-content" id="v-pills-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="v-pills-newsubscription"
                            role="tabpanel"
                            aria-labelledby="v-pills-newsubscription-tab"
                          >
                            <Form form={form} onFinish={submitHandler}>
                              <div className="row">
                                <div className="col-md-6 categoryField">
                                  <div className="card rounded-3 border-0 p-2">
                                    <div className="form-card p-2">
                                      <h5 className="fw-bold mb-0">
                                        Payment Method
                                      </h5>
                                      <hr />
                                      <Form.Item
                                        label="Name on Card"
                                        name="NameOnCard"
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              "Please enter name on card",
                                          },
                                        ]}
                                      >
                                        <Input placeholder="Name on Card" />
                                      </Form.Item>
                                      <div className="row">
                                        <div className="col-8 col-md-6">
                                          <Form.Item
                                            label="Card Number"
                                            name="CardNumber"
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Please enter card number",
                                              },
                                            ]}
                                          >
                                            <Input
                                              type="text"
                                              placeholder="XXXX XXXX XXXX XXXX"
                                            />
                                          </Form.Item>
                                        </div>
                                        <div className="col-4 col-md-6">
                                          <Form.Item
                                            label="CVC"
                                            name="CVCNumber"
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Please enter CVC Number",
                                              },
                                            ]}
                                          >
                                            <Input
                                              type="number"
                                              placeholder="CVC Number"
                                            />
                                          </Form.Item>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <Form.Item
                                            label="Expiration Month"
                                            name="ExpiryMonth"
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Please enter expiration month",
                                              },
                                            ]}
                                          >
                                            <Input
                                              type="number"
                                              maxLength={2}
                                              placeholder="mm"
                                            />
                                          </Form.Item>
                                        </div>
                                        <div className="col-md-6">
                                          <Form.Item
                                            label="Expiration Year"
                                            name={"ExpiryYear"}
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Please enter expiration year",
                                              },
                                            ]}
                                          >
                                            <Input
                                              type="number"
                                              maxLength={2}
                                              placeholder="yy"
                                            />
                                          </Form.Item>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card mt-3 p-2 border-0">
                                    <div className="card-body p-1 ">
                                      <div className="row">
                                        <div className="col-md-5">
                                          <div className="form-group">
                                            <div className=" pt-0">
                                              <Form.Item
                                                label="No of POS"
                                                name="NumberofPOSLocation"
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      "Please enter no of POS",
                                                  },
                                                ]}
                                              >
                                                <Input
                                                  type="number"
                                                  min={1}
                                                  placeholder="No. of POS"
                                                />
                                              </Form.Item>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-7">
                                          <div className="form-group">
                                            <div className=" pt-0">
                                              <label className="mb-0 d-flex align-items-center">
                                                Total Amount:
                                              </label>
                                              <span className="fw-bold fs-5">
                                                {currencySymbol}{" "}
                                                {noOfPos
                                                  ? state?.price * noOfPos
                                                  : state?.price}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="card rounded-3 border-0 p-2">
                                    <div className="form-card p-2">
                                      <h5 className="fw-bold mb-0">
                                        Billing Address
                                      </h5>
                                      <hr />
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="form-group">
                                            <div className=" pt-0">
                                              <Form.Item
                                                label="Address"
                                                name="Street"
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      "Please enter address",
                                                  },
                                                ]}
                                              >
                                                <Input
                                                  type="text"
                                                  placeholder="Address"
                                                />
                                              </Form.Item>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-group">
                                            <div className=" pt-0">
                                              <Form.Item
                                                label="Country"
                                                name="CountryId"
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      "Please select country",
                                                  },
                                                ]}
                                              >
                                                <Select
                                                  placeholder="Select Country"
                                                  onChange={(e) =>
                                                    setSelectedCountry(
                                                      countryList?.find(
                                                        (country) =>
                                                          country.id == e
                                                      )
                                                    )
                                                  }
                                                >
                                                  {countryList?.map(
                                                    (country) => {
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
                                                              marginRight:
                                                                "7px",
                                                            }}
                                                          />
                                                          {country.name}
                                                        </Select.Option>
                                                      );
                                                    }
                                                  )}
                                                </Select>
                                              </Form.Item>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-group">
                                            <div className=" pt-0">
                                              <Form.Item
                                                label="State"
                                                name="StateId"
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      "Please select state",
                                                  },
                                                ]}
                                              >
                                                <Select
                                                  placeholder="Select State"
                                                  options={selectedCountry?.states.map(
                                                    (state) => {
                                                      return {
                                                        label: state.value,
                                                        value: state.id,
                                                      };
                                                    }
                                                  )}
                                                />
                                              </Form.Item>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-group">
                                            <div className=" pt-0">
                                              <Form.Item
                                                label="City"
                                                name="CityId"
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      "Please select city",
                                                  },
                                                ]}
                                              >
                                                <Select
                                                  placeholder="Select City"
                                                  options={selectedCountry?.cities.map(
                                                    (state) => {
                                                      return {
                                                        label: state.value,
                                                        value: state.id,
                                                      };
                                                    }
                                                  )}
                                                />
                                              </Form.Item>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-group">
                                            <div className=" pt-0">
                                              {" "}
                                              <Form.Item
                                                label="Postal Code"
                                                name="PostCode"
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      "Please enter postal code",
                                                  },
                                                ]}
                                              >
                                                <Input
                                                  type="text"
                                                  placeholder="Postal Code"
                                                />
                                              </Form.Item>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-12 mt-2">
                                          <Button
                                            type="primary"
                                            loading={newSubscriptionLoading}
                                            htmlType="submit"
                                          >
                                            Save
                                          </Button>
                                          <Button
                                            type="danger"
                                            className="ms-2"
                                            onClick={() =>
                                              navigate("/subscriptions")
                                            }
                                          >
                                            Cancel
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="container-fluid clearfix">
              <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
                Copyright © POSApt 2022
              </span>
            </div>
          </footer>
        </div>
      </div>

      {/* <AddCategory
        isOpen={isCategoryModalOpen}
        setIsOpen={setIsCategoryModalOpen}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <AddTableLocations
        isOpen={isTableLocationModalOpen}
        setIsOpen={setIsTableLocationModalOpen}
      />
      <AddBrand isOpen={isBrandModalOpen} setIsOpen={setIsBrandModalOpen} />
      <AddTable
        isOpen={isTableModalOpen}
        setIsOpen={setIsTableModalOpen}
        selectedImage={selectedImage}
      />
      <AddOrderType
        isOpen={isOrderTypeModalOpen}
        setIsOpen={setIsOrderTypeModalOpen}
      />
      <AddTax isOpen={isTaxModalOpen} setIsOpen={setIsTaxModalOpen} /> */}
    </>
  );
}

export default NewSubscription;
