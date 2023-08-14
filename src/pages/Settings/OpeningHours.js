/** @format */

import React, { useEffect, useState } from "react";
import { Form, Button, Select, Switch, Checkbox } from "antd";
import { getLocalStorage } from "../../helpers/frontendHelper";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Skeleton from "react-loading-skeleton";

const OpeningHours = ({
  storeAddSectionList,
  editStoreSectionList,
  isLoading,
  getStoreLoading,
}) => {
  const [pickUpForm] = Form.useForm();
  const [pickupHoursSettingsViewModal, setPickupHoursSettingsViewModal] =
    useState(false);
  const [deliveryHoursSettingsViewModal, setDeliveryHoursSettingsViewModal] =
    useState(false);
  const [isChangeAllCheckedPickup, setIsChangeAllCheckedPickup] =
    useState(false);
  const [isChangeAllCheckedDelivery, setIsChangeAllCheckedDelivery] =
    useState(false);

  const [changedTimeOpen, setChangedTimeOpen] = useState(undefined);
  const [changedTimeClose, setChangedTimeClose] = useState(undefined);
  const [isOpen, setIsOpen] = useState(undefined);
  const [changedTimeOpenDelivery, setChangedTimeOpenDelivery] =
    useState(undefined);
  const [changedTimeCloseDelivery, setChangedTimeCloseDelivery] =
    useState(undefined);
  const [isOpenDelivery, setIsOpenDelivery] = useState(undefined);

  const dispatch = useDispatch();

  const pickUpHourFormHandler = (values) => {
    let myDataform = new FormData();
    myDataform.append(
      "Request",
      JSON.stringify({
        ...editStoreSectionList,
        Id: getLocalStorage("activeStores").id,
        pickUpHoursSettingsAddViewModels:
          values.pickUpHoursSettingsAddViewModels?.map((item) => {
            return {
              ...item,
              openHour: item.openHour,
              closeHour: item.closeHour,
            };
          }),

        deliveryHoursSettingsAddViewModels:
          values.deliveryHoursSettingsAddViewModels?.map((item) => {
            return {
              ...item,
              openHour: item.openHour,
              closeHour: item.closeHour,
            };
          }),
      })
    );
    dispatch({
      type: "UDPATE_STORE_DETAIL_REQUEST",
      payload: myDataform,
    });
  };
  useEffect(() => {
    if (editStoreSectionList) {
      pickUpForm.setFields([
        {
          name: "pickUpHoursSettingsAddViewModels",
          value: editStoreSectionList?.pickUpHoursSettingsAddViewModels?.map(
            (item) => {
              return {
                ...item,
                closeHour: item.closeHour,
                openHour: item.openHour,
              };
            }
          ),
        },
        {
          name: "deliveryHoursSettingsAddViewModels",
          value: editStoreSectionList?.deliveryHoursSettingsAddViewModels?.map(
            (item) => {
              return {
                ...item,
                closeHour: item.closeHour,
                openHour: item.openHour,
              };
            }
          ),
        },
      ]);
    }
  }, [editStoreSectionList, storeAddSectionList]);

  useEffect(() => {
    if (isChangeAllCheckedPickup && changedTimeOpen != undefined) {
      pickUpForm.setFieldValue(
        "pickUpHoursSettingsAddViewModels",
        pickUpForm
          .getFieldValue("pickUpHoursSettingsAddViewModels")
          .map((item) => {
            return {
              ...item,
              openHour: changedTimeOpen,
            };
          })
      );
    }
    if (isChangeAllCheckedPickup && changedTimeClose != undefined) {
      pickUpForm.setFieldValue(
        "pickUpHoursSettingsAddViewModels",
        pickUpForm
          .getFieldValue("pickUpHoursSettingsAddViewModels")
          ?.map((item) => {
            return {
              ...item,
              closeHour: changedTimeClose,
            };
          })
      );
    }
    if (isChangeAllCheckedPickup && isOpen != undefined) {
      pickUpForm.setFieldValue(
        "pickUpHoursSettingsAddViewModels",
        pickUpForm
          .getFieldValue("pickUpHoursSettingsAddViewModels")
          ?.map((item) => {
            return {
              ...item,
              isOpened: isOpen,
            };
          })
      );
    }
  }, [changedTimeClose, changedTimeOpen, isChangeAllCheckedPickup, isOpen]);
  useEffect(() => {
    if (isChangeAllCheckedDelivery && changedTimeCloseDelivery != undefined) {
      pickUpForm.setFieldValue(
        "deliveryHoursSettingsAddViewModels",
        pickUpForm
          .getFieldValue("deliveryHoursSettingsAddViewModels")
          .map((item) => {
            return {
              ...item,
              openHour: changedTimeOpenDelivery,
            };
          })
      );
    }
    if (isChangeAllCheckedDelivery && changedTimeCloseDelivery != undefined) {
      pickUpForm.setFieldValue(
        "deliveryHoursSettingsAddViewModels",
        pickUpForm
          .getFieldValue("deliveryHoursSettingsAddViewModels")
          ?.map((item) => {
            return {
              ...item,
              closeHour: changedTimeCloseDelivery,
            };
          })
      );
    }
    if (isChangeAllCheckedDelivery && isOpenDelivery != undefined) {
      pickUpForm.setFieldValue(
        "deliveryHoursSettingsAddViewModels",
        pickUpForm
          .getFieldValue("deliveryHoursSettingsAddViewModels")
          ?.map((item) => {
            return {
              ...item,
              isOpened: isOpenDelivery,
            };
          })
      );
    }
  }, [
    changedTimeCloseDelivery,
    changedTimeOpenDelivery,
    isChangeAllCheckedDelivery,
    isOpenDelivery,
  ]);

  return (
    <div>
      {" "}
      <Form form={pickUpForm} onFinish={pickUpHourFormHandler}>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold text-theme">Pick Up hours</h5>
                  <div>
                    <Checkbox
                      checked={isChangeAllCheckedPickup}
                      onChange={(e) =>
                        setIsChangeAllCheckedPickup(e.target.checked)
                      }
                    />
                    <label className="ms-2">Change All</label>
                  </div>
                </div>
                <hr />
                <div className="row mt-2">
                  <div className="col-md-4">
                    <h6 className="fw-bold text-theme">Day</h6>
                  </div>
                  <div className="col-md-3">
                    <h6 className="fw-bold text-theme">Open Time</h6>
                  </div>
                  <div className="col-md-3">
                    <h6 className="fw-bold text-theme">Close Time</h6>
                  </div>
                  <div className="col-md-2">
                    <h6 className="fw-bold text-theme">Open</h6>
                  </div>
                </div>
                {getStoreLoading ? (
                  <Form.List name="pickUpHoursSettingsAddViewModels">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => {
                          return (
                            <div className="row mt-2" key={key}>
                              <div className="col-md-4">
                                <Skeleton height={27} />
                              </div>
                              <div className="col-md-3">
                                <Skeleton height={27} />
                              </div>
                              <div className="col-md-3">
                                <Skeleton height={27} />
                              </div>
                              <div className="col-md-2">
                                <Skeleton height={27} />
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </Form.List>
                ) : (
                  <Form.List name="pickUpHoursSettingsAddViewModels">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => {
                          return (
                            <div className="row mt-2" key={key}>
                              <div className="col-md-4">
                                <Form.Item
                                  {...restField}
                                  name={[name, "weekDayName"]}
                                >
                                  <input
                                    className="delivery-input"
                                    readOnly={true}
                                  />
                                </Form.Item>
                              </div>
                              <div className="col-md-3">
                                <Form.Item
                                  {...restField}
                                  name={[name, "openHour"]}
                                >
                                  <Select
                                    onChange={(e) => {
                                      setChangedTimeOpen(e);
                                    }}
                                    options={storeAddSectionList?.timeRanges?.map(
                                      (time) => {
                                        return {
                                          value: time.id,
                                          label: time.value,
                                        };
                                      }
                                    )}
                                  />
                                </Form.Item>
                              </div>
                              <div className="col-md-3">
                                <Form.Item
                                  {...restField}
                                  name={[name, "closeHour"]}
                                >
                                  <Select
                                    onChange={(e) => {
                                      setChangedTimeClose(e);
                                    }}
                                    options={storeAddSectionList?.timeRanges?.map(
                                      (time) => {
                                        return {
                                          value: time.id,
                                          label: time.value,
                                        };
                                      }
                                    )}
                                  />
                                </Form.Item>
                              </div>
                              <div className="col-md-2">
                                <Form.Item
                                  {...restField}
                                  name={[name, "isOpened"]}
                                  valuePropName="checked"
                                >
                                  <Switch
                                    onChange={(e) => setIsOpen(e)}
                                    defaultChecked={true}
                                  />
                                </Form.Item>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </Form.List>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold text-theme">Delivery hours</h5>
                  <div>
                    <Checkbox
                      checked={isChangeAllCheckedDelivery}
                      onChange={(e) =>
                        setIsChangeAllCheckedDelivery(e.target.checked)
                      }
                    />
                    <label className="ms-2">Change All</label>
                  </div>
                </div>
                <hr />
                <div className="row mt-2">
                  <div className="col-md-4">
                    <h6 className="fw-bold text-theme">Day</h6>
                  </div>
                  <div className="col-md-3">
                    <h6 className="fw-bold text-theme">Open Time</h6>
                  </div>
                  <div className="col-md-3">
                    <h6 className="fw-bold text-theme">Close Time</h6>
                  </div>
                  <div className="col-md-2">
                    <h6 className="fw-bold text-theme">Open</h6>
                  </div>
                </div>
                {getStoreLoading ? (
                  <Form.List name="pickUpHoursSettingsAddViewModels">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => {
                          return (
                            <div className="row mt-2" key={key}>
                              <div className="col-md-4">
                                <Skeleton height={27} />
                              </div>
                              <div className="col-md-3">
                                <Skeleton height={27} />
                              </div>
                              <div className="col-md-3">
                                <Skeleton height={27} />
                              </div>
                              <div className="col-md-2">
                                <Skeleton height={27} />
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </Form.List>
                ) : (
                  <Form.List name="deliveryHoursSettingsAddViewModels">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => {
                          return (
                            <div className="row mt-2" key={key}>
                              <div className="col-md-4">
                                <Form.Item
                                  {...restField}
                                  name={[name, "weekDayName"]}
                                >
                                  <input
                                    className="delivery-input"
                                    readOnly={true}
                                  />
                                </Form.Item>
                              </div>
                              <div className="col-md-3">
                                <Form.Item
                                  {...restField}
                                  name={[name, "openHour"]}
                                >
                                  <Select
                                    onChange={(e) =>
                                      setChangedTimeOpenDelivery(e)
                                    }
                                    options={storeAddSectionList?.timeRanges?.map(
                                      (time) => {
                                        return {
                                          value: time.id,
                                          label: time.value,
                                        };
                                      }
                                    )}
                                  />
                                </Form.Item>
                              </div>
                              <div className="col-md-3">
                                <Form.Item
                                  {...restField}
                                  name={[name, "closeHour"]}
                                >
                                  <Select
                                    onChange={(e) =>
                                      setChangedTimeCloseDelivery(e)
                                    }
                                    options={storeAddSectionList?.timeRanges?.map(
                                      (time) => {
                                        return {
                                          value: time.id,
                                          label: time.value,
                                        };
                                      }
                                    )}
                                  />
                                </Form.Item>
                              </div>
                              <div className="col-md-2">
                                <Form.Item
                                  {...restField}
                                  name={[name, "isOpened"]}
                                  valuePropName="checked"
                                >
                                  <Switch
                                    onChange={(e) => setIsOpenDelivery(e)}
                                    defaultChecked={true}
                                  />
                                </Form.Item>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </Form.List>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-12 mt-3">
          <Button
            loading={isLoading}
            htmlType="submit"
            type="primary"
            className="btn btn-primary all_btn rounded-0"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default OpeningHours;
