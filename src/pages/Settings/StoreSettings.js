/** @format */

import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../../helpers/frontendHelper";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Select, Spin, Tooltip } from "antd";
import { Modal } from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";
import { useSelector } from "react-redux";
import Royalty from "./Royalty";
import DeliveryDistance from "./DeliveryDistance";
import OpeningHours from "./OpeningHours";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import Skeleton from "react-loading-skeleton";
import { AiOutlineCopy, AiFillInfoCircle } from "react-icons/ai";
import ColorSettings from "./ColorSettings";

const StoreSettings = () => {
  const [form] = Form.useForm();
  const urlValue = Form.useWatch("url", form);
  const {
    storeAddSectionList,
    editStoreSectionList,
    isLoading,
    isOperatioSuccessful,
    updateStoreLoading,
  } = useSelector((state) => state.storeSettingsReducer);
  const [copyText, setCopyText] = useState("Copy to Clipboard");
  const [imagePreview, setImagePreview] = useState();
  const [previewModalOpen, setPreviewModalOpen] = useState();
  const {
    activeStore: { storeId },
  } = useSelector((state) => state.authenticationReducer);
  const [storeImage, setStoreImage] = useState("");
  useEffect(() => {
    if (storeImage) {
      const objectUrl = URL.createObjectURL(storeImage);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [storeImage]);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (storeId) {
      dispatch({
        type: "GET_STORE_ADD_SECTION_REQUEST",
        payload: {
          storeId,
        },
      });

      dispatch({
        type: "GET_EDIT_STORE_SECTION_LIST_REQUEST",
        payload: {
          storeId,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (isOperatioSuccessful) {
      dispatch({
        type: "GET_STORE_ADD_SECTION_REQUEST",
        payload: {
          storeId,
        },
      });

      dispatch({
        type: "GET_EDIT_STORE_SECTION_LIST_REQUEST",
        payload: {
          storeId,
        },
      });
    }
  }, [isOperatioSuccessful]);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const updateStoreSettingsHandler = (values) => {
    // console.log("values from the fomr", values);
    let myDataform = new FormData();
    const request = {
      Id: getLocalStorage("activeStores").id,
      Name: values.storeName,
      Email: values.email,
      Url: values.url,
      LanguageId: values.language,
      HolidaySurgePercentage: values.holidaySurcharge,
      PhoneNumber: values.phone,
      Address: value?.label,
      BusinessTypeId: values.businessType,
      StoreTypeId: values.storeType,
      DateFormatId: values.dateFormat,
      CityId: values.city,
      TaxExclusiveInclusiveTypeId: values.tax,
      CountryId: values.country,
      TemplateId: values.template,
      FranchiseId: values.franchise,
      TimeZoneId: values.timeZone,
      Latitude: values.latitude,
      Longitude: values.longitude,
      ABNNumber: values.abnNumber,
      description: values.description,
      LoyaltySettingsAddViewModels:
        editStoreSectionList.loyaltySettingsAddViewModels,
      LoyaltyClaimsSettingsAddViewModel:
        editStoreSectionList.loyaltyClaimsSettingsAddViewModel,
      DeliveryDistanceCostSettingsAddViewModels:
        editStoreSectionList.deliveryDistanceCostSettingsAddViewModels,
      LoyaltySettingsDeletedIds: [],
      DeliveryDistanceCostSettingsDeletedIds: [],
      PickUpHoursSettingsAddViewModels:
        editStoreSectionList.pickUpHoursSettingsAddViewModels,
      DeliveryHoursSettingsAddViewModels:
        editStoreSectionList.deliveryHoursSettingsAddViewModels,
    };
    console.log(request);
    myDataform.append("Request", JSON.stringify(request));
    myDataform.append("Image", storeImage);
    dispatch({
      type: "UDPATE_STORE_DETAIL_REQUEST",
      payload: myDataform,
    });
  };
  useEffect(() => {
    if (editStoreSectionList) {
      form.setFields([
        {
          name: "storeName",
          value: editStoreSectionList?.name,
        },
        {
          name: ["abnNumber"],
          value: editStoreSectionList?.abnNumber,
        },
        {
          name: ["email"],
          value: editStoreSectionList?.email,
        },
        {
          name: ["phone"],
          value: editStoreSectionList?.phoneNumber,
        },
        {
          name: ["url"],
          value: editStoreSectionList?.url,
        },
        {
          name: ["holidaySurcharge"],
          value: editStoreSectionList?.holidaySurgePercentage,
        },
        // {
        //   name: ["address"],
        //   value: editStoreSectionList?.address,
        // },
        {
          name: ["latitude"],
          value: editStoreSectionList?.latitude,
        },
        {
          name: ["longitude"],
          value: editStoreSectionList?.longitude,
        },
        {
          name: ["description"],
          value: editStoreSectionList?.description,
        },
        {
          name: ["language"],
          value: editStoreSectionList?.languageId,
        },
        {
          name: ["franchise"],
          value: editStoreSectionList?.franchiseId,
        },
        {
          name: ["template"],
          value: editStoreSectionList?.templateId,
        },
        {
          name: ["businessType"],
          value: editStoreSectionList?.businessTypeId,
        },
        {
          name: ["websiteUrl"],
          value: editStoreSectionList?.websiteUrl,
        },
        {
          name: ["storeType"],
          value: editStoreSectionList?.storeTypeId,
        },
        {
          name: ["country"],
          value: editStoreSectionList?.countryId,
        },
        {
          name: ["city"],
          value: editStoreSectionList?.cityId,
        },
        {
          name: ["tax"],
          value: editStoreSectionList?.taxExclusiveInclusiveTypeId,
        },
        {
          name: ["dateFormat"],
          value: editStoreSectionList?.dateFormatId,
        },
        {
          name: ["description"],
          value: editStoreSectionList?.description,
        },
        {
          name: ["timeZone"],
          value: editStoreSectionList?.timeZoneId,
        },
      ]);

      setImagePreview(editStoreSectionList?.imagePath);
      setValue({
        label: editStoreSectionList?.address,
        value: { place_id: null },
      });
    }
    if (editStoreSectionList.imagePath) {
      dispatch({
        type: "UPDATE_STORE_DETAILS",
        payload: {
          imageUrl: editStoreSectionList.imagePath,
        },
      });
    }
  }, [editStoreSectionList]);
  return (
    <>
      <Modal
        size="lg"
        show={previewModalOpen}
        onHide={() => setPreviewModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={imagePreview}
            alt="Image Preview"
            style={{ width: "100%" }}
          />
        </Modal.Body>
      </Modal>
      <div className="possetting">
        <div className="row project-tabs">
          <div className="col-md-12">
            <nav>
              <div
                className="nav nav-tabs border-0"
                id="nav-tab"
                role="tablist"
              >
                <a
                  className="nav-item nav-link active"
                  id="nav-general-tab"
                  data-bs-toggle="tab"
                  href="#nav-general"
                  role="tab"
                  aria-controls="nav-general"
                  aria-selected="true"
                >
                  General
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-royalty-tab"
                  data-bs-toggle="tab"
                  href="#nav-royalty"
                  role="tab"
                  aria-controls="nav-royalty"
                  aria-selected="false"
                >
                  Loyalty ($)
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-deliverydistance-tab"
                  data-bs-toggle="tab"
                  href="#nav-deliverydistance"
                  role="tab"
                  aria-controls="nav-deliverydistance"
                  aria-selected="false"
                >
                  Delivery Distance
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-openinghours-tab"
                  data-bs-toggle="tab"
                  href="#nav-openinghours"
                  role="tab"
                  aria-controls="nav-openinghours"
                  aria-selected="false"
                >
                  Opening Hours
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-colorsettings-tab"
                  data-bs-toggle="tab"
                  href="#nav-colorsettings"
                  role="tab"
                  aria-controls="nav-colorsettings"
                  aria-selected="false"
                >
                  Color Settings
                </a>
              </div>
            </nav>

            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade active show"
                id="nav-general"
                role="tabpanel"
                aria-labelledby="nav-general-tab"
              >
                {isLoading ? (
                  <Form onFinish={updateStoreSettingsHandler} form={form}>
                    {/* store general */}
                    <div className="card text-left border">
                      <div className="card-body">
                        <div className="supplier_filter1">
                          <div className="row">
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label={<Skeleton width={100} />}
                                  name="storeName"
                                >
                                  <Skeleton height={32} />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label={<Skeleton width={100} />}
                                  name="storeName"
                                >
                                  <Skeleton height={32} />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label={<Skeleton width={100} />}
                                  name="storeName"
                                >
                                  <Skeleton height={32} />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label={<Skeleton width={100} />}
                                  name="storeName"
                                >
                                  <Skeleton height={32} />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label={<Skeleton width={100} />}
                                  name="storeName"
                                >
                                  <Skeleton height={32} />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label={<Skeleton width={100} />}
                                  name="storeName"
                                >
                                  <Skeleton height={32} />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label={<Skeleton width={100} />}
                                  name="storeName"
                                >
                                  <Skeleton height={32} />
                                </Form.Item>
                              </div>
                            </div>

                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label={<Skeleton width={100} />}
                                    name="storeName"
                                  >
                                    <Skeleton height={32} />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label={<Skeleton width={100} />}
                                    name="storeName"
                                  >
                                    <Skeleton height={32} />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label={<Skeleton width={100} />}
                                    name="storeName"
                                  >
                                    <Skeleton height={32} />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label={<Skeleton width={100} />}
                                    name="storeName"
                                  >
                                    <Skeleton height={32} />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label={<Skeleton width={100} />}
                                    name="storeName"
                                  >
                                    <Skeleton height={32} />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label={<Skeleton width={100} />}
                                    name="storeName"
                                  >
                                    <Skeleton height={32} />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label={<Skeleton width={100} />}
                                  name="storeName"
                                >
                                  <Skeleton height={32} />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label={<Skeleton width={100} />}
                                  name="storeName"
                                >
                                  <Skeleton height={32} />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label={<Skeleton width={100} />}
                                  name="storeName"
                                >
                                  <Skeleton height={32} />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label={<Skeleton width={100} />}
                                    name="storeName"
                                  >
                                    <Skeleton height={32} />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label={<Skeleton width={100} />}
                                    name="storeName"
                                  >
                                    <Skeleton height={32} />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label={<Skeleton width={100} />}
                                    name="storeName"
                                  >
                                    <Skeleton height={32} />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label={<Skeleton width={100} />}
                                  name="storeName"
                                >
                                  <Skeleton height={32} />
                                </Form.Item>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <label className="control-label fw-bold">
                                {<Skeleton width={100} />}
                              </label>
                              <div className="">
                                <Skeleton height={40} />
                              </div>
                            </div>
                            <div className="col-md-12 col-lg-12 mt-3">
                              <Skeleton height={32} width={80} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                ) : (
                  <Form onFinish={updateStoreSettingsHandler} form={form}>
                    {/* store general */}
                    <div className="card text-left border">
                      <div className="card-body">
                        <div className="supplier_filter1">
                          <div className="row">
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label="Store Name"
                                  name="storeName"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please Enter Store Name !",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="Store Name"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label="ABN Number"
                                  name="abnNumber"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please Enter ABN Number !",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="ABN Number"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label={
                                    <>
                                      <span>Business Email</span>
                                      <Tooltip title="Please enter your valid email address. All your email will be received on this email.">
                                        <AiFillInfoCircle
                                          className="ms-1"
                                          size={18}
                                          style={{ color: "#00205A" }}
                                        />
                                      </Tooltip>
                                    </>
                                  }
                                  name="email"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please Enter email !",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label="Phone"
                                  name="phone"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please Enter Phone Number !",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="Phone Number"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label={
                                    <>
                                      <span>Online Url</span>
                                      <Tooltip title={copyText}>
                                        <AiOutlineCopy
                                          className="ms-2"
                                          onMouseLeave={() =>
                                            setTimeout(
                                              () =>
                                                setCopyText(
                                                  "Copy To Clipboard"
                                                ),
                                              [150]
                                            )
                                          }
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            navigator.clipboard.writeText(
                                              urlValue
                                            );
                                            setCopyText("Copied!");
                                          }}
                                        />
                                      </Tooltip>
                                    </>
                                  }
                                  name="url"
                                >
                                  <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="Online URL"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label={
                                    <>
                                      <span>Website Url</span>
                                      <Tooltip title={copyText}>
                                        <AiOutlineCopy
                                          className="ms-2"
                                          onMouseLeave={() =>
                                            setTimeout(
                                              () =>
                                                setCopyText(
                                                  "Copy To Clipboard"
                                                ),
                                              [150]
                                            )
                                          }
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            navigator.clipboard.writeText(
                                              urlValue
                                            );
                                            setCopyText("Copied!");
                                          }}
                                        />
                                      </Tooltip>
                                    </>
                                  }
                                  name="WebsiteUrl"
                                >
                                  <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="Website URL"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label="Language"
                                  name="language"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please Enter Language !",
                                    },
                                  ]}
                                >
                                  <Select>
                                    {storeAddSectionList?.languages?.map(
                                      (item) => {
                                        return (
                                          <Select.Option
                                            value={item.id}
                                            key={item.id}
                                          >
                                            {item.name}
                                          </Select.Option>
                                        );
                                      }
                                    )}
                                  </Select>
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label="Holiday Surcharge (%)"
                                  name="holidaySurcharge"
                                >
                                  <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="Holiday Surcharge"
                                  />
                                </Form.Item>
                              </div>
                            </div>

                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item label="Franchise" name="franchise">
                                    <Select>
                                      {storeAddSectionList?.franchises?.map(
                                        (item) => {
                                          return (
                                            <Select.Option
                                              value={item.id}
                                              key={item.id}
                                            >
                                              {item.name}
                                            </Select.Option>
                                          );
                                        }
                                      )}
                                    </Select>
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label="Template"
                                    name="template"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Enter Template !",
                                      },
                                    ]}
                                  >
                                    <Select>
                                      {storeAddSectionList?.templates?.map(
                                        (item) => {
                                          return (
                                            <Select.Option
                                              value={item.id}
                                              key={item.id}
                                            >
                                              {item.name}
                                            </Select.Option>
                                          );
                                        }
                                      )}
                                    </Select>
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label="Business Type"
                                    name="businessType"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Enter Business Type !",
                                      },
                                    ]}
                                  >
                                    <Select>
                                      {storeAddSectionList?.businessType?.map(
                                        (item) => {
                                          return (
                                            <Select.Option
                                              value={item.id}
                                              key={item.id}
                                            >
                                              {item.name}
                                            </Select.Option>
                                          );
                                        }
                                      )}
                                    </Select>
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label="Store Type"
                                    name="storeType"
                                  >
                                    <Select>
                                      {storeAddSectionList?.storeTypes?.map(
                                        (item) => {
                                          return (
                                            <Select.Option
                                              value={item.id}
                                              key={item.id}
                                            >
                                              {item.name}
                                            </Select.Option>
                                          );
                                        }
                                      )}
                                    </Select>
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label="Country"
                                    name="country"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Enter Country !",
                                      },
                                    ]}
                                  >
                                    <Select>
                                      {storeAddSectionList?.countries?.map(
                                        (item) => {
                                          return (
                                            <Select.Option
                                              value={item.id}
                                              key={item.id}
                                            >
                                              <img
                                                src={item.image}
                                                style={{
                                                  height: "20px",
                                                  width: "20px",
                                                  marginRight: "7px",
                                                }}
                                              />
                                              {item.name}
                                            </Select.Option>
                                          );
                                        }
                                      )}
                                    </Select>
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label="City"
                                    name="city"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Enter City !",
                                      },
                                    ]}
                                  >
                                    <Select>
                                      {storeAddSectionList?.cities?.map(
                                        (item) => {
                                          return (
                                            <Select.Option
                                              value={item.id}
                                              key={item.id}
                                            >
                                              {item.name}
                                            </Select.Option>
                                          );
                                        }
                                      )}
                                    </Select>
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label="Address"
                                  // rules={[
                                  //   {
                                  //     required: true,
                                  //     message: "Please Enter Address !",
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
                                        // setValue(val);
                                        geocodeByAddress(val.label)
                                          .then((results) =>
                                            getLatLng(results[0])
                                          )
                                          .then(({ lat, lng }) => {
                                            if (lat && lng) {
                                              form.setFieldValue(
                                                "latitude",
                                                lat
                                              );
                                              form.setFieldValue(
                                                "longitude",
                                                lng
                                              );
                                            }
                                            setValue({
                                              ...val,
                                            });
                                          })
                                          .catch(() => {
                                            setValue({
                                              ...val,
                                            });
                                          });
                                      },
                                    }}
                                  />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item label="Longitude" name="longitude">
                                  <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="Longitude"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item label="Latitude" name="latitude">
                                  <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="Latitude"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label="Timezone"
                                    name="timeZone"
                                    value={value.latitude}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Enter Time Zone !",
                                      },
                                    ]}
                                  >
                                    <Select
                                      showSearch
                                      optionFilterProp="children"
                                      filterOption={(input, option) =>
                                        (option?.children ?? "").includes(input)
                                      }
                                    >
                                      {storeAddSectionList?.timeZones?.map(
                                        (item) => {
                                          return (
                                            <Select.Option
                                              value={item.id}
                                              key={item.id}
                                            >
                                              {item.value}
                                            </Select.Option>
                                          );
                                        }
                                      )}
                                    </Select>
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label="Tax"
                                    name="tax"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Enter Tax !",
                                      },
                                    ]}
                                  >
                                    <Select>
                                      {storeAddSectionList?.taxExclusiveInclusiveTypes?.map(
                                        (item) => {
                                          return (
                                            <Select.Option
                                              value={item.id}
                                              key={item.id}
                                            >
                                              {item.name}
                                            </Select.Option>
                                          );
                                        }
                                      )}
                                    </Select>
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <div className="pt-0">
                                  <Form.Item
                                    label="Date Format"
                                    name="dateFormat"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Enter Date Format !",
                                      },
                                    ]}
                                  >
                                    <Select>
                                      {storeAddSectionList?.dateFormats?.map(
                                        (item) => {
                                          return (
                                            <Select.Option
                                              value={item.id}
                                              key={item.id}
                                            >
                                              {item.value}
                                            </Select.Option>
                                          );
                                        }
                                      )}
                                    </Select>
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3">
                              <div className="form-group categoryField">
                                <Form.Item
                                  label="Description"
                                  name="description"
                                >
                                  <Input.TextArea
                                    type="text"
                                    className="form-control"
                                    placeholder="Description"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                            {/* <div className="row"></div> */}
                            <div className="col-md-6">
                              <label className="control-label fw-bold">
                                Store Image (jpg, jpeg, png)
                                {imagePreview && (
                                  <>
                                    <AiFillEye
                                      size={20}
                                      color="#ff0017"
                                      className="ms-1"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => setPreviewModalOpen(true)}
                                    />
                                    <i
                                      className="fa fa-trash ms-2 trash-icon"
                                      onClick={() => {
                                        setStoreImage(null);
                                        setImagePreview(null);
                                        setIsImageDeleted(true);
                                      }}
                                    />
                                  </>
                                )}
                              </label>

                              <div className="file-drop-area ">
                                {/* {editStoreSectionList?.imagePath && (
                                  <img src={editStoreSectionList?.imagePath} />
                                )} */}
                                <span className="choose-file-button">
                                  Choose Files
                                </span>
                                <span className="file-message">
                                  or drag and drop files here
                                </span>
                                <input
                                  //   value={storeImage}
                                  onChange={(e) =>
                                    setStoreImage(e.target.files[0])
                                  }
                                  type="file"
                                  className="file-input"
                                  //   accept=".jfif,.jpg,.jpeg,.png,.gif"
                                  //   multiple=""
                                />
                              </div>
                            </div>
                            <div className="col-md-12 col-lg-12 mt-3">
                              <Button
                                loading={updateStoreLoading}
                                htmlType="submit"
                                type="primary"
                                className="btn btn-primary all_btn rounded-0"
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </div>
              <div
                className="tab-pane fade"
                id="nav-colorsettings"
                role="tabpanel"
                aria-labelledby="nav-colorsettings-tab"
              >
                <ColorSettings
                  storeAddSectionList={storeAddSectionList}
                  editStoreSectionList={editStoreSectionList}
                  isLoading={updateStoreLoading}
                  getStoreLoading={isLoading}
                />
              </div>
              <div
                className="tab-pane fade"
                id="nav-royalty"
                role="tabpanel"
                aria-labelledby="nav-royalty-tab"
              >
                <Royalty
                  storeAddSectionList={storeAddSectionList}
                  editStoreSectionList={editStoreSectionList}
                  isLoading={updateStoreLoading}
                  getStoreLoading={isLoading}
                />
              </div>
              <div
                className="tab-pane fade"
                id="nav-deliverydistance"
                role="tabpanel"
                aria-labelledby="nav-deliverydistance-tab"
              >
                <DeliveryDistance
                  storeAddSectionList={storeAddSectionList}
                  editStoreSectionList={editStoreSectionList}
                  isLoading={updateStoreLoading}
                  isOperatioSuccessful={isOperatioSuccessful}
                  getStoreLoading={isLoading}
                />
              </div>
              <div
                className="tab-pane fade"
                id="nav-openinghours"
                role="tabpanel"
                aria-labelledby="nav-openinghours-tab"
              >
                <OpeningHours
                  storeAddSectionList={storeAddSectionList}
                  editStoreSectionList={editStoreSectionList}
                  isLoading={updateStoreLoading}
                  getStoreLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreSettings;
