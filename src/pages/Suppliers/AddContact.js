import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Form, Input, Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import FormItemSkeleton from "../../components/FormItemSkeleton/FormItemSkeleton";
import Skeleton from "react-loading-skeleton";
// import TextArea from "antd/lib/input/TextArea";

const AddContact = ({ isEdit, setIsOpen }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [postalClicked, setPostalClicked] = useState(false);
  const { isLoading, editData, getEditSupplierLoading } = useSelector(
    (state) => state.supplierReducer
  );
  const [selectedStreetCountry, setSelectedStreetCountry] = useState();
  const [selectedPostalCountry, setSelectedPostalCountry] = useState();
  useEffect(() => {
    dispatch({ type: "GET_SUPPLIER_SECTION_REQUEST" });
  }, []);
  const { supplierSectionList, addLoading } = useSelector(
    (state) => state.supplierReducer
  );

  useEffect(() => {
    if (supplierSectionList) {
      const foundData = supplierSectionList.countryWithCityStateViewModels.find(
        (country) => country.isSelected
      );
      form.setFieldValue(
        "StreetCountryId",
        supplierSectionList.countryWithCityStateViewModels.indexOf(foundData)
      );
      form.setFieldValue(
        "PostalCountryId",
        supplierSectionList.countryWithCityStateViewModels.indexOf(foundData)
      );
      setSelectedPostalCountry(foundData);
      setSelectedStreetCountry(foundData);
    }
  }, [supplierSectionList]);
  // useEffect(() => {
  //   form.setFieldValue("StreetStateId", null);
  //   form.setFieldValue("StreetCityId", null);
  // }, [selectedStreetCountry]);
  // useEffect(() => {
  //   if (!postalClicked) {
  //     form.setFieldValue("PostalStateId", null);
  //     form.setFieldValue("PostalCityId", null);
  //   }
  // }, [selectedPostalCountry, postalClicked]);
  const onAddSupplierHandler = (values) => {
    dispatch({
      type: "ADD_SUPPLIER_REQUEST",
      payload: {
        Id: isEdit && editData ? editData.id : "",
        Name: values.Name,
        Code: values.Code,
        Email: values.Email,
        PhoneNumber: values.PhoneNumber,
        WebsiteUrl: "",
        GstNumber: values.GstNumber,
        ABNNumber: values.ABNNumber,
        ContactPersonName: "",
        StreetAddressAddViewModel: {
          CountryId: selectedStreetCountry?.id,
          CityId: values.StreetCityId,
          StateId: values.StreetStateId,
          PostalCode: values.StreetZipCode,
          Address: values.StreetAddress,
        },
        PostalAddressAddViewModel: {
          CountryId: selectedPostalCountry?.id,
          CityId: values.PostalCityId,
          StateId: values.PostalStateId,
          PostalCode: values.PostalZipCode,
          Address: values.PostalAddress,
        },
      },
    });
  };
  useEffect(() => {
    if (isEdit && editData) {
      const { streetAddressAddViewModel, postalAddressAddViewModel } = editData;
      const streetCountry =
        supplierSectionList?.countryWithCityStateViewModels.find(
          (country) => country.id == streetAddressAddViewModel.countryId
        );
      const postalCountry =
        supplierSectionList?.countryWithCityStateViewModels.find(
          (country) => country.id == postalAddressAddViewModel.countryId
        );
      form.setFields([
        {
          name: "Name",
          value: editData.name,
        },
        {
          name: "Code",
          value: editData.code,
        },
        {
          name: "Email",
          value: editData.email,
        },
        {
          name: "PhoneNumber",
          value: editData.phoneNumber,
        },
        {
          name: "ABNNumber",
          value: editData.abnNumber,
        },
        {
          name: "GstNumber",
          value: editData.gstNumber,
        },
        {
          name: "StreetAddress",
          value: streetAddressAddViewModel.address,
        },
        {
          name: "StreetCountryId",
          value: streetCountry
            ? supplierSectionList?.countryWithCityStateViewModels.indexOf(
                streetCountry
              )
            : null,
        },
        {
          name: "StreetStateId",
          value: streetAddressAddViewModel.stateId,
        },
        {
          name: "StreetCityId",
          value: streetAddressAddViewModel.cityId,
        },
        {
          name: "StreetZipCode",
          value: streetAddressAddViewModel.postalCode,
        },
        {
          name: "PostalAddress",
          value: postalAddressAddViewModel.address,
        },
        {
          name: "PostalCountryId",
          value: postalCountry
            ? supplierSectionList?.countryWithCityStateViewModels.indexOf(
                postalCountry
              )
            : null,
        },
        {
          name: "PostalStateId",
          value: postalAddressAddViewModel.stateId,
        },
        {
          name: "PostalCityId",
          value: postalAddressAddViewModel.cityId,
        },
        {
          name: "PostalZipCode",
          value: postalAddressAddViewModel.postalCode,
        },
      ]);
      setSelectedPostalCountry(postalCountry);
      setSelectedStreetCountry(streetCountry);
    }
  }, [isEdit, editData]);
  const sameAsPostalClickHandler = () => {
    setPostalClicked(true);
    form.setFields([
      {
        name: "PostalAddress",
        value: form.getFieldValue("StreetAddress"),
      },
      {
        name: "PostalCountryId",
        value: form.getFieldValue("StreetCountryId"),
      },
      {
        name: "PostalZipCode",
        value: form.getFieldValue("StreetZipCode"),
      },
      {
        name: "PostalCityId",
        value: form.getFieldValue("StreetCityId"),
      },
      {
        name: "PostalStateId",
        value: form.getFieldValue("StreetStateId"),
      },
    ]);
    setSelectedPostalCountry(
      supplierSectionList?.countryWithCityStateViewModels[
        form.getFieldValue("StreetCountryId")
      ]
    );
    setPostalClicked(false);
  };
  return (
    <div className="card p-0">
      <div className="card-body bg-light-blue categoryField">
        {getEditSupplierLoading && isLoading ? (
          <Form form={form} onFinish={onAddSupplierHandler}>
            <div className="contact_form">
              <div className="mr-md-3 mr-xl-5">
                <h4 className="fw-bold">
                  <Skeleton width={250} />
                </h4>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 bt-2 bb-2">
                  <h6 className="mb-2 fw-bold">
                    {" "}
                    <Skeleton width={250} />
                  </h6>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <FormItemSkeleton />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <FormItemSkeleton />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <FormItemSkeleton />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <FormItemSkeleton />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className=" pt-0">
                          <FormItemSkeleton />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* postal address */}
                <div className="col-md-12 bt-2 bb-2 border-top-0">
                  <div className="form-group d-flex  mb-0">
                    <h6 className=" fw-bold mb-0 d-flex align-items-center">
                      <Skeleton width={250} />
                    </h6>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <FormItemSkeleton />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <FormItemSkeleton />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <FormItemSkeleton />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <FormItemSkeleton />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className=" pt-0">
                          <FormItemSkeleton />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-12 mt-3">
                      <Skeleton width={100} height={40} inline={true} />
                      <Skeleton width={100} height={40} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        ) : (
          <Form form={form} onFinish={onAddSupplierHandler}>
            <div className="contact_form">
              <div className="mr-md-3 mr-xl-5">
                <h4 className="fw-bold">Company Information</h4>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <Form.Item
                        label="Supplier Code"
                        name="Code"
                        initialValue={supplierSectionList?.code}
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Supplier Code !",
                          },
                        ]}
                      >
                        <Input
                          type="text"
                          readOnly
                          className="form-control"
                          placeholder="Supplier Code"
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <Form.Item
                        label="Supplier Name"
                        name="Name"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Supplier Name !",
                          },
                        ]}
                      >
                        <Input type="text" placeholder="Supplier Name" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <Form.Item
                        label="Supplier Email"
                        name="Email"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Supplier Email !",
                          },
                          {
                            type: "email",
                            message: "Please enter valid email !",
                          },
                        ]}
                      >
                        <Input type="text" placeholder="Supplier Email" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <Form.Item label="Phone" name="PhoneNumber">
                        <Input type="text" placeholder="Phone" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <Form.Item label="Website" name="Website">
                        <Input type="text" placeholder="Website" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <Form.Item
                        label="Contact Person Name"
                        name="ContactPersonName"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please Enter Supplier Phone !",
                        //   },
                        // ]}
                      >
                        <Input type="text" placeholder="Contact Person Name" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <Form.Item label="ABN Number" name="ABNNumber">
                        <Input type="text" placeholder="ABN Number" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <div className=" pt-0">
                      <Form.Item label="GST Number" name="GstNumber">
                        <Input type="text" placeholder="GST Number" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 bt-2 bb-2">
                  <h6 className="mb-2 fw-bold">Street Address</h6>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <Form.Item label="Country" name="StreetCountryId">
                            <Select
                              placeholder="Choose Country"
                              onChange={(val) =>
                                setSelectedStreetCountry(
                                  supplierSectionList
                                    ?.countryWithCityStateViewModels[val]
                                )
                              }
                            >
                              {supplierSectionList?.countryWithCityStateViewModels?.map(
                                (country, ind) => {
                                  return (
                                    <Select.Option key={country.id} value={ind}>
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
                                }
                              )}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <Form.Item label="State" name="StreetStateId">
                            <Select placeholder="Choose State">
                              {selectedStreetCountry?.states.map((state) => {
                                return (
                                  <Select.Option
                                    key={state.id}
                                    value={state.id}
                                  >
                                    {state.name}
                                  </Select.Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <Form.Item label="City" name="StreetCityId">
                            <Select placeholder="Choose city">
                              {selectedStreetCountry?.cities.map((city) => {
                                return (
                                  <Select.Option key={city.id} value={city.id}>
                                    {city.name}
                                  </Select.Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <Form.Item label="Postal Code" name="StreetZipCode">
                            <Input
                              type="text"
                              placeholder="Enter Postal Code"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className=" pt-0">
                          <Form.Item label="Address" name="StreetAddress">
                            <Input.TextArea
                              type="text"
                              placeholder="Enter Address"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* postal address */}
                <div className="col-md-12 bt-2 bb-2 border-top-0">
                  <div className="form-group d-flex  mb-0">
                    <h6 className=" fw-bold mb-0 d-flex align-items-center">
                      Postal Address
                    </h6>
                    <a
                      onClick={sameAsPostalClickHandler}
                      className="ms-3 fw-bold underlined"
                    >
                      <u>Same as Street Address</u>
                    </a>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <Form.Item label="Country" name="PostalCountryId">
                            <Select
                              placeholder="Choose Country"
                              onChange={(val) =>
                                setSelectedPostalCountry(
                                  supplierSectionList
                                    ?.countryWithCityStateViewModels?.[val]
                                )
                              }
                            >
                              {supplierSectionList?.countryWithCityStateViewModels?.map(
                                (country, ind) => {
                                  return (
                                    <Select.Option key={country.id} value={ind}>
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
                                }
                              )}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <Form.Item label="State" name="PostalStateId">
                            <Select placeholder="Choose State">
                              {selectedPostalCountry?.states.map((state) => {
                                return (
                                  <Select.Option
                                    key={state.id}
                                    value={state.id}
                                  >
                                    {state.name}
                                  </Select.Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <Form.Item label="City" name="PostalCityId">
                            <Select placeholder="Choose city">
                              {selectedPostalCountry?.cities.map((city) => {
                                return (
                                  <Select.Option key={city.id} value={city.id}>
                                    {city.name}
                                  </Select.Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <div className=" pt-0">
                          <Form.Item label="Postal Code" name="PostalZipCode">
                            <Input
                              type="text"
                              placeholder="Enter Postal Code"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className=" pt-0">
                          <Form.Item label="Address" name="PostalAddress">
                            <Input.TextArea
                              type="text"
                              placeholder="Enter Address"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-12 mt-2">
                      <Button
                        type="primary"
                        loading={addLoading}
                        htmlType="submit"
                        className="btn btn-primary all_btn rounded-0"
                        style={{ marginRight: "5px" }}
                      >
                        Save
                      </Button>
                      <button
                        className="btn btn-primary all_btn btn_red rounded-0"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default AddContact;
