/** @format */

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Space, Spin, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { getLocalStorage } from "../../helpers/frontendHelper";
import { useDispatch, useSelector } from "react-redux";
import FormItemSkeleton from "../../components/FormItemSkeleton/FormItemSkeleton";
import Skeleton from "react-loading-skeleton";

const DeliveryDistance = ({
  storeAddSectionList,
  editStoreSectionList,
  isLoading,
  getStoreLoading,
}) => {
  const [deliveryDistanceForm] = Form.useForm();
  const dispatch = useDispatch();
  const storeId = getLocalStorage("storeDetailsUser")?.[0]?.id;

  const deliveryDistanceFormHandler = (values) => {
    let myDataform = new FormData();

    const deletedIds =
      editStoreSectionList?.deliveryDistanceCostSettingsAddViewModels
        ?.filter((loyalty) => {
          const foundData =
            values.deliveryDistanceCostSettingsAddViewModels?.find(
              (data) => loyalty.id == data.id
            );
          if (foundData) {
            return false;
          } else {
            return true;
          }
        })
        .map((data) => data.id);

    myDataform.append(
      "Request",
      JSON.stringify({
        ...editStoreSectionList,
        Id: getLocalStorage("activeStores").id,
        DeliveryDistanceCostSettingsDeletedIds: deletedIds,
        deliveryDistanceCostSettingsAddViewModels:
          values.deliveryDistanceCostSettingsAddViewModels?.map((item) => {
            return {
              ...item,
              mileKmId: values.distanceType,
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
      deliveryDistanceForm.setFields([
        {
          name: "distanceType",
          value:
            editStoreSectionList?.deliveryDistanceCostSettingsAddViewModels?.[0]
              ?.mileKmId,
        },
        {
          name: "deliveryDistanceCostSettingsAddViewModels",
          value:
            editStoreSectionList?.deliveryDistanceCostSettingsAddViewModels,
        },
      ]);
    }
  }, [editStoreSectionList]);
  return (
    <Form form={deliveryDistanceForm} onFinish={deliveryDistanceFormHandler}>
      <div>
        {" "}
        <div className="card text-left border">
          <div className="card-body">
            <div className="supplier_filter1">
              <div className="row">
                <div className="col-md-3 col-lg-3">
                  <div className="form-group categoryField">
                    {getStoreLoading ? (
                      <FormItemSkeleton />
                    ) : (
                      <Form.Item
                        label="Distance Type"
                        name="distanceType"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Distance Type !",
                          },
                        ]}
                      >
                        <Select>
                          {storeAddSectionList?.distanceKmsMiles?.map(
                            (item) => {
                              return (
                                <Select.Option value={item.id} key={item.id}>
                                  {item.name}
                                </Select.Option>
                              );
                            }
                          )}
                        </Select>
                      </Form.Item>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-body">
            <div className="newsupplier_form bg-light p-3">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  {getStoreLoading ? (
                    <Form.List name="deliveryDistanceCostSettingsAddViewModels">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Space
                              key={key}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                              className="categoryField"
                            >
                              <FormItemSkeleton width={160} />
                              <FormItemSkeleton width={160} />
                              <FormItemSkeleton width={160} />
                            </Space>
                          ))}
                          <Form.Item>
                            <Skeleton height={30} />
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  ) : (
                    <Form.List name="deliveryDistanceCostSettingsAddViewModels">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Space
                              key={key}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                              className="categoryField"
                            >
                              <Form.Item
                                label={"Distance From"}
                                {...restField}
                                name={[name, "distanceFrom"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing Distance From",
                                  },
                                ]}
                              >
                                <Input
                                  type="number"
                                  placeholder="Distance From"
                                />
                              </Form.Item>
                              <Form.Item
                                label={"Distance To"}
                                {...restField}
                                name={[name, "distanceTo"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing Distance To",
                                  },
                                ]}
                              >
                                <Input
                                  type="number"
                                  placeholder="Distance To"
                                />
                              </Form.Item>
                              <Form.Item
                                label={"Amount"}
                                {...restField}
                                name={[name, "price"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing amount",
                                  },
                                ]}
                              >
                                <Input type="number" placeholder="Amount" />
                              </Form.Item>
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
                            </Space>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Delivery Distance
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  )}

                  <div className="col-md-12 col-lg-12 mt-3">
                    <Button
                      type="primary"
                      loading={isLoading}
                      htmlType="submit"
                      className="btn btn-primary all_btn rounded-0"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default DeliveryDistance;
