import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GooglePlacesAutocomplete, {
  getLatLng,
  geocodeByAddress,
} from "react-google-places-autocomplete";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function AddOrganisation() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "GET_ON_BOARD_ADD_SECTION_REQUEST",
    });
  }, []);
  const [value, setValue] = useState();
  const { onBoardCountries, businessTypes, timeZones, addLoading } =
    useSelector((state) => state.authenticationReducer);
  const selectedCountryId = Form.useWatch("countryId", form);
  useEffect(() => {
    if (onBoardCountries) {
      form.setFields([
        {
          name: "countryPhoneNumberPrefixId",
          value: onBoardCountries.find((country) => country.isSelected).id,
        },
        {
          name: "countryId",
          value: onBoardCountries.find((country) => country.isSelected).id,
        },
      ]);
    }
  }, [onBoardCountries]);
  const selectedCountry = onBoardCountries?.find(
    (country) => country.id == selectedCountryId
  );
  const navigate = useNavigate();
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
        {onBoardCountries?.length > 0 &&
          onBoardCountries?.map((item, i) => (
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
  const addOrganisationHandler = (values) => {
    dispatch({
      type: "ADD_NEW_ORGANISATION_REQUEST",
      payload: {
        ...values,
        address: value.label,
        ChannelType: selectedChannel,
        IsTermsAndConditionsAccepted: true,
        IsPrivacyPolicyAccepted: true,
      },
    });
  };
  const [selectedChannel, setSelectedChannel] = useState("POS");
  return (
    <section className="mt-5 mb-5">
      <div className="posregister regform ">
        <div className="container">
          <Form form={form} onFinish={addOrganisationHandler}>
            <div className="row  justify-content-center align-items-center d-flex-row">
              <div className="col-md-8">
                <div className="ab">
                  <div className="card   p-3  rounded-0 border-0 shadow">
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="fw-bold">Add your Organisation</h5>
                      <Link to="/" className="btn btn-success">
                        Back to Home
                      </Link>
                    </div>
                    <hr />
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-5 bg-light m-4">
                        <div className="round d-flex   selectpos align-items-center mt-1 ">
                          <input
                            type="checkbox"
                            checked={selectedChannel == "POS"}
                            onChange={() => setSelectedChannel("POS")}
                            id="checkbox"
                          />
                          <label htmlFor="checkbox" />
                          <img
                            src="assets/images/pos.png"
                            className="img-fluid m-auto"
                            alt=""
                          />
                        </div>
                        <h6 className="d-block fw-bold text-theme text-center mt-4">
                          Point of Sale
                        </h6>
                      </div>
                      <div className="col-md-5 bg-light m-4">
                        <div className="round d-flex selectpos  align-items-center mt-1 ">
                          <input
                            type="checkbox"
                            id="checkbox1"
                            checked={selectedChannel == "OnlineOrder"}
                            onChange={() => setSelectedChannel("OnlineOrder")}
                          />
                          <label htmlFor="checkbox1" />
                          <img
                            src="assets/images/order.jpg"
                            className="img-fluid m-auto"
                            alt=""
                          />
                        </div>
                        <h6 className="d-block fw-bold text-theme text-center mt-4">
                          Online Ordering System
                        </h6>
                      </div>
                    </div>
                    <div className="row categoryField">
                      <div className="form-group col-md-6 col-lg-4">
                        <Form.Item
                          label="Business Name"
                          name="name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter business name",
                            },
                          ]}
                        >
                          <Input type="text" placeholder="Name" />
                        </Form.Item>
                        {/* <label htmlFor="inputEmail">
                            Business Name <span>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputEmail"
                            name="youremail"
                            spellCheck="false"
                            data-ms-editor="true"
                          /> */}
                      </div>
                      <div className="form-group col-md-6 col-lg-4">
                        <Form.Item
                          label="Business Phone Number"
                          name="phoneNumber"
                          rules={[
                            {
                              required: true,
                              message: "Please enter business phone number",
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
                      <div className="form-group col-md-6 col-lg-4">
                        <Form.Item
                          label="Business Email Address"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Please enter business email",
                            },
                          ]}
                        >
                          <Input type="text" placeholder="Email" />
                        </Form.Item>
                      </div>
                      <div className="form-group col-md-6 col-lg-4">
                        <Form.Item
                          label="Business Type"
                          name="businessTypeId"
                          rules={[
                            {
                              required: true,
                              message: "Please select business type",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            placeholder="Select Business Type"
                            options={businessTypes?.map((type) => {
                              return {
                                value: type.id,
                                label: type.value,
                              };
                            })}
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          />
                        </Form.Item>
                      </div>
                      <div className="form-group col-md-6 col-lg-4">
                        <Form.Item
                          label="Time Zone"
                          name="timeZoneId"
                          rules={[
                            {
                              required: true,
                              message: "Please select timezone",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select Timezone"
                            showSearch
                            options={timeZones?.map((timeZone) => {
                              return {
                                label: timeZone.value,
                                value: timeZone.id,
                              };
                            })}
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          />
                        </Form.Item>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <Form.Item
                          label="Country"
                          name="countryId"
                          rules={[
                            {
                              required: true,
                              message: "Please select country",
                            },
                          ]}
                        >
                          <Select placeholder="Select Country">
                            {onBoardCountries?.map((country) => {
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
                      <div className="form-group col-md-6 col-lg-4">
                        <Form.Item
                          label="Address"
                          name="address"
                          // rules={[
                          //   {
                          //     validator: () => {
                          //       if (value != null) {
                          //         return Promise.resolve();
                          //       }
                          //       return Promise.reject("Please enter message");
                          //     },
                          //     message: "Please enter address",
                          //   },
                          // ]}
                        >
                          <GooglePlacesAutocomplete
                            apiKey="AIzaSyDqRwktb0WF6d7KbMg-208CyZi1h99gSMg"
                            className="form-control"
                            selectProps={{
                              value: value,
                              placeholder: "Choose address",
                              onChange: (val) => {
                                setValue(val);
                                // geocodeByAddress(val.label)
                                //   .then((results) => getLatLng(results[0]))
                                //   .then(({ lat, lng }) => {
                                //     if (lat && lng) {
                                //       form.setFieldValue("latitude", lat);
                                //       form.setFieldValue("longitude", lng);
                                //     }
                                //     setValue({
                                //       ...val,
                                //     });
                                //   })
                                //   .catch(() => {
                                //     setValue({
                                //       ...val,
                                //     });
                                //   });
                              },
                            }}
                          />
                        </Form.Item>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <Form.Item
                          label="City"
                          name="cityId"
                          rules={[
                            {
                              required: true,
                              message: "Please select city",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select City"
                            showSearch
                            options={selectedCountry?.cities.map((city) => {
                              return {
                                value: city.id,
                                label: city.value,
                              };
                            })}
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          />
                        </Form.Item>
                      </div>
                      <div className="form-group col-md-6 col-lg-4">
                        <Form.Item
                          label="ABN Number"
                          name="aBNNumber"
                          rules={[
                            {
                              required: true,
                              message: "Please enter ABN Number",
                            },
                          ]}
                        >
                          <Input type="text" placeholder="ABN Number" />
                        </Form.Item>
                      </div>
                      <div className="mt-1">
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={addLoading}
                          className="me-2"
                        >
                          Free Trial
                        </Button>
                        <Button
                          type="danger"
                          className="me-2"
                          onClick={() => navigate("/")}
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
    </section>
  );
}

export default AddOrganisation;
