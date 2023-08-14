import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import GiftCardImageModal from "../GiftCardImageModal/GiftCardImageModal";
import GiftSearchCustomer from "../GiftSearchCustomer/GiftSearchCustomer";
import ScheduleForFuture from "../ScheduleForFuture/ScheduleForFuture";
import moment from "moment";
import FormItemSkeleton from "../FormItemSkeleton/FormItemSkeleton";
import Skeleton from "react-loading-skeleton";

function AddNewGiftCard() {
  const dispatch = useDispatch();
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const { giftCardSection, isLoading, addLoading, addGiftSuccess } =
    useSelector((state) => state.giftCardReducer);
  const [selectedImage, setSelectedImage] = useState();
  const {
    activeStore: { currencySymbol },
  } = useSelector((state) => state.authenticationReducer);
  const [imageError, setImageError] = useState();
  const [isSenderOpen, setIsSenderOpen] = useState(false);
  const [isReceiverOpen, setIsReceiverOpen] = useState(false);
  const [senderDetails, setSenderDetails] = useState();
  const [receiverDetails, setReceiverDetails] = useState();
  const [futureDate, setFutureDate] = useState();
  const {
    activeStore: { dateFormat },
  } = useSelector((state) => state.authenticationReducer);
  useEffect(() => {
    window.scrollTo(0, 0);
    form.resetFields();
    setScheduleOpen(false);
  }, [addGiftSuccess]);

  useEffect(() => {
    setImageError(null);
  }, [selectedImage]);
  const [form] = Form.useForm();
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
        {giftCardSection?.countries?.length > 0 &&
          giftCardSection?.countries?.map((item, i) => (
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
  const addNewGiftCardHandler = (values) => {
    if (!selectedImage) {
      setImageError("Please select gift card image");
      return;
    }
    const payloadFormat = {
      Id: "",
      Code: values.giftCardNumber,
      Amount: values.amount,
      Message: values.message,
      SenderViewModel: {
        Id: senderDetails ? senderDetails.id : "",
        Name: values.senderName,
        Email: values.senderEmail,
        CountryPhoneNumberPrefixId: values.senderPrefix,
        PhoneNumber: values.senderPhone,
        CountryId: values.senderCountryId,
        postalCode: values.senderPostalCode,
      },
      ReceiverViewModel: {
        Id: receiverDetails ? receiverDetails.id : "",
        Name: values.receiverName,
        Email: values.receiverEmail,
        CountryPhoneNumberPrefixId: values.receiverPrefix,
        PhoneNumber: values.receiverPhone,
        CountryId: values.receiverCountryId,
        postalCode: values.receiverPostalCode,
      },
      GiftCardTemplateImageId: selectedImage.id,
      IsScheduledForFuture: scheduleOpen ? true : false,
      GiftCardScheduledDate: values.date
        ? moment(values.date).format(dateFormat.toUpperCase())
        : "",
    };
    dispatch({ type: "ADD_GIFT_CARD_REQUEST", payload: payloadFormat });
  };
  useEffect(() => {
    if (giftCardSection) {
      form.setFields([
        {
          name: "senderCountryId",
          value: giftCardSection.countries.find((country) => country.isSelected)
            ?.id,
        },
        {
          name: "receiverCountryId",
          value: giftCardSection.countries.find((country) => country.isSelected)
            ?.id,
        },
      ]);
    }
  }, [giftCardSection]);

  useEffect(() => {
    if (senderDetails) {
      form.setFields([
        {
          name: "senderCountryId",
          value: senderDetails.countryId.toLowerCase(),
        },
        {
          name: "senderPostalCode",
          value: senderDetails.postalCode,
        },
      ]);
    }
  }, [senderDetails]);

  useEffect(() => {
    if (receiverDetails) {
      form.setFields([
        {
          name: "receiverCountryId",
          value: receiverDetails.countryId.toLowerCase(),
        },
        {
          name: "receiverPostalCode",
          value: receiverDetails.postalCode,
        },
      ]);
    }
  }, [receiverDetails]);
  const scheduleForFutureHandler = (date) => {
    addNewGiftCardHandler({
      ...form.getFieldsValue(),
      date: date,
    });
  };
  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-newgiftcard"
        role="tabpanel"
        aria-labelledby="v-pills-newgiftcard-tab"
      >
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex align-items-end flex-wrap">
                <div className="mr-md-3 mr-xl-5">
                  <h4 className="fw-bold">New Gift Card</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* add gift card filter */}
        <div className="row">
          <div className="col-md-8">
            <div className="card text-left border">
              {isLoading ? (
                <Form
                  form={form}
                  onFinish={addNewGiftCardHandler}
                  fields={[
                    {
                      name: "giftCardNumber",
                      value: giftCardSection?.code,
                    },
                    {
                      name: "receiverName",
                      value: form.getFieldValue("receiverName")
                        ? form.getFieldValue("receiverName")
                        : receiverDetails?.name,
                    },
                    {
                      name: "receiverEmail",
                      value: form.getFieldValue("receiverEmail")
                        ? form.getFieldValue("receiverEmail")
                        : receiverDetails?.email,
                    },
                    {
                      name: "senderName",
                      value: form.getFieldValue("senderName")
                        ? form.getFieldValue("senderName")
                        : senderDetails?.name,
                    },
                    {
                      name: "senderPhone",
                      value: form.getFieldValue("senderPhone")
                        ? form.getFieldValue("senderPhone")
                        : senderDetails?.phoneNumber,
                    },
                    {
                      name: "receiverPhone",
                      value: form.getFieldValue("receiverPhone")
                        ? form.getFieldValue("receiverPhone")
                        : receiverDetails?.phoneNumber,
                    },
                    {
                      name: "senderEmail",
                      value: form.getFieldValue("senderEmail")
                        ? form.getFieldValue("senderEmail")
                        : senderDetails?.email,
                    },
                    {
                      name: "receiverPrefix",
                      value: receiverDetails
                        ? receiverDetails.countryPhoneNumberPrefixId.toLowerCase()
                        : form.getFieldValue("receiverPrefix")
                        ? form.getFieldValue("receiverPrefix")
                        : giftCardSection?.countries?.[0].id,
                    },
                    {
                      name: "senderPrefix",
                      value: senderDetails
                        ? senderDetails?.countryPhoneNumberPrefixId.toLowerCase()
                        : form.getFieldValue("senderPrefix")
                        ? form.getFieldValue("senderPrefix")
                        : giftCardSection?.countries?.[0].id,
                    },
                  ]}
                >
                  <div className="card-body">
                    <div className="timesheet_filter">
                      <div className="row">
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <FormItemSkeleton />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <FormItemSkeleton />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex align-items-center justify-content-between">
                        <h6 style={{ fontWeight: "bold" }}>
                          <Skeleton width={100} height={30} />
                        </h6>
                        <div className="newsearch">
                          <a
                            href=""
                            data-bs-toggle="modal"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsSenderOpen(true);
                            }}
                            data-bs-target="#searchnowModalCenter"
                          >
                            <Skeleton circle={false} width={30} height={30} />
                          </a>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-lg-6">
                          <div className="form-group categoryField">
                            <FormItemSkeleton />
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6">
                          <div className="form-group categoryField">
                            <FormItemSkeleton />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <FormItemSkeleton />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <FormItemSkeleton />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <FormItemSkeleton />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex align-items-center justify-content-between">
                        <h6 style={{ fontWeight: "bold" }}>
                          <Skeleton width={100} height={30} />
                        </h6>
                        <div className="newsearch">
                          <a
                            href=""
                            data-bs-toggle="modal"
                            data-bs-target="#searchnowModalCenter"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsReceiverOpen(true);
                            }}
                          >
                            <Skeleton circle={false} width={30} height={30} />
                          </a>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-lg-6">
                          <div className="form-group categoryField">
                            <FormItemSkeleton />
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6">
                          <div className="form-group categoryField">
                            <FormItemSkeleton />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <FormItemSkeleton />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <FormItemSkeleton />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <FormItemSkeleton />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12">
                        <div className="form-group categoryField">
                          <FormItemSkeleton />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 col-lg-12 mt-3">
                          <Skeleton width={100} height={40} inline={true} />
                          <Skeleton width={100} height={40} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              ) : (
                <Form
                  form={form}
                  onFinish={addNewGiftCardHandler}
                  fields={[
                    {
                      name: "giftCardNumber",
                      value: giftCardSection?.code,
                    },
                    {
                      name: "receiverName",
                      value: form.getFieldValue("receiverName")
                        ? form.getFieldValue("receiverName")
                        : receiverDetails?.name,
                    },
                    {
                      name: "receiverEmail",
                      value: form.getFieldValue("receiverEmail")
                        ? form.getFieldValue("receiverEmail")
                        : receiverDetails?.email,
                    },
                    {
                      name: "senderName",
                      value: form.getFieldValue("senderName")
                        ? form.getFieldValue("senderName")
                        : senderDetails?.name,
                    },
                    {
                      name: "senderPhone",
                      value: form.getFieldValue("senderPhone")
                        ? form.getFieldValue("senderPhone")
                        : senderDetails?.phoneNumber,
                    },
                    {
                      name: "receiverPhone",
                      value: form.getFieldValue("receiverPhone")
                        ? form.getFieldValue("receiverPhone")
                        : receiverDetails?.phoneNumber,
                    },
                    {
                      name: "senderEmail",
                      value: form.getFieldValue("senderEmail")
                        ? form.getFieldValue("senderEmail")
                        : senderDetails?.email,
                    },
                    {
                      name: "receiverPrefix",
                      value: receiverDetails
                        ? receiverDetails.countryPhoneNumberPrefixId.toLowerCase()
                        : form.getFieldValue("receiverPrefix")
                        ? form.getFieldValue("receiverPrefix")
                        : giftCardSection?.countries?.find(
                            (country) => country.isSelected
                          ).id,
                    },
                    {
                      name: "senderPrefix",
                      value: senderDetails
                        ? senderDetails?.countryPhoneNumberPrefixId.toLowerCase()
                        : form.getFieldValue("senderPrefix")
                        ? form.getFieldValue("senderPrefix")
                        : giftCardSection?.countries?.find(
                            (country) => country.isSelected
                          ).id,
                    },
                  ]}
                >
                  <div className="card-body">
                    <div className="timesheet_filter">
                      <div className="row">
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <Form.Item
                              label="Gift Card No"
                              name="giftCardNumber"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter gift card No",
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                placeholder="Gift Card No"
                                readOnly
                              />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <Form.Item
                              label={`Amount on Gift Card (${currencySymbol})`}
                              name="amount"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter amount",
                                },
                              ]}
                            >
                              <Input type="number" placeholder="Amount" />
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex align-items-center justify-content-between">
                        <h6 style={{ fontWeight: "bold" }}>Sender Details</h6>
                        <div className="newsearch">
                          <a
                            href=""
                            data-bs-toggle="modal"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsSenderOpen(true);
                            }}
                            data-bs-target="#searchnowModalCenter"
                          >
                            <i
                              className="fas fa-search searchIconGift"
                              style={{
                                background: "#00205b",
                                color: "#fff",
                                marginTop: "4px",
                                marginRight: "9px",
                                padding: "6px",
                                borderRadius: "3px",
                                cursor: "pointer",
                              }}
                            />
                          </a>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-lg-6">
                          <div className="form-group categoryField">
                            <Form.Item
                              label="Name"
                              name="senderName"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter sender name",
                                },
                              ]}
                            >
                              <Input type="text" placeholder="Sender Name" />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6">
                          <div className="form-group categoryField">
                            <Form.Item
                              label="Email"
                              name="senderEmail"
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
                              <Input type="text" placeholder="Email" />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <Form.Item
                              label="Phone"
                              name="senderPhone"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter sender phone",
                                },
                              ]}
                            >
                              <Input
                                addonBefore={prefixSelector("senderPrefix")}
                                placeholder="Enter Phone"
                              />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <Form.Item
                              label="Country"
                              name="senderCountryId"
                              rules={[
                                {
                                  required: true,
                                  message: "Please choose country",
                                },
                              ]}
                            >
                              <Select placeholder="Choose Country">
                                {giftCardSection?.countries.map((country) => {
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
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <Form.Item
                              label="Postal Code"
                              name="senderPostalCode"
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
                      </div>
                      <hr />
                      <div className="d-flex align-items-center justify-content-between">
                        <h6 style={{ fontWeight: "bold" }}>Receiver Details</h6>
                        <div className="newsearch">
                          <a
                            href=""
                            data-bs-toggle="modal"
                            data-bs-target="#searchnowModalCenter"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsReceiverOpen(true);
                            }}
                          >
                            <i
                              className="fas fa-search searchIconGift"
                              style={{
                                background: "#00205b",
                                color: "#fff",
                                marginTop: "4px",
                                marginRight: "9px",
                                padding: "6px",
                                borderRadius: "3px",
                                cursor: "pointer",
                              }}
                            />
                          </a>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-lg-6">
                          <div className="form-group categoryField">
                            <Form.Item
                              label="Name"
                              name="receiverName"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter sender name",
                                },
                              ]}
                            >
                              <Input type="text" placeholder="Name" />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6">
                          <div className="form-group categoryField">
                            <Form.Item
                              label="Email"
                              name="receiverEmail"
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
                              <Input type="text" placeholder="Email" />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <Form.Item
                              label="Phone"
                              name="receiverPhone"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter receiver phone",
                                },
                              ]}
                            >
                              <Input
                                addonBefore={prefixSelector("receiverPrefix")}
                                placeholder="Enter Phone"
                              />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <Form.Item
                              label="Country"
                              name="receiverCountryId"
                              rules={[
                                {
                                  required: true,
                                  message: "Please choose country",
                                },
                              ]}
                            >
                              <Select placeholder="Choose Country">
                                {giftCardSection?.countries.map((country) => {
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
                        <div className="col-md-4 col-lg-4">
                          <div className="form-group categoryField">
                            <Form.Item
                              label="Postal Code"
                              name="receiverPostalCode"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter Postal code",
                                },
                              ]}
                            >
                              <Input placeholder="Enter Postal Code" />
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12">
                        <div className="form-group categoryField">
                          <Form.Item
                            label="Message"
                            name="message"
                            rules={[
                              {
                                required: true,
                                message: "Please enter message",
                              },
                            ]}
                          >
                            <TextArea placeholder="Message" rows={3} />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-lg-6 align-items-center my-auto pt-2 ">
                          <Button
                            htmlType="submit"
                            type="primary"
                            loading={addLoading}
                            className="btn btn-danger border-0 rounded-0"
                          >
                            Send
                          </Button>
                          <button
                            type="button"
                            className="btn btn-primary all_btn rounded-0 ms-2"
                            data-bs-toggle="modal"
                            data-bs-target="#futurescheduleModalCenter"
                            onClick={() => {
                              if (!selectedImage) {
                                setImageError("Please select gift card image");
                              }
                              form.validateFields().then(() => {
                                selectedImage && setScheduleOpen(true);
                              });
                            }}
                          >
                            Schedule for Future
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </div>
            {/* ends */}
          </div>
          <div className="col-md-4">
            <div
              className="giftupload"
              style={{ padding: "5px", background: "white" }}
            >
              <img
                src={
                  selectedImage
                    ? selectedImage.image
                    : "assets/images/imagePlaceholder.png"
                }
                alt=""
                className="img-fluid"
              />
            </div>
            <a
              href=""
              className="btn btn-success  bg-theme border-0 mt-2"
              data-bs-toggle="modal"
              data-bs-target="#giftcardModal"
            >
              Choose Gift Card
            </a>
            {imageError && <p style={{ color: "red" }}>{imageError}</p>}
          </div>
        </div>
      </div>
      <GiftCardImageModal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        templateList={giftCardSection?.giftCardTemplatesLists}
      />
      <GiftSearchCustomer
        isSenderOpen={isSenderOpen}
        isReceiverOpen={isReceiverOpen}
        setIsReceiverOpen={setIsReceiverOpen}
        setIsSenderOpen={setIsSenderOpen}
        senderDetails={senderDetails}
        receiverDetails={receiverDetails}
        setReceiverDetails={setReceiverDetails}
        setSenderDetails={setSenderDetails}
      />
      <ScheduleForFuture
        addHandler={scheduleForFutureHandler}
        isOpen={scheduleOpen}
        setOpen={setScheduleOpen}
      />
    </>
  );
}

export default AddNewGiftCard;
