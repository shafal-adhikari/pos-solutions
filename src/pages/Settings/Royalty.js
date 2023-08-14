import React, { useEffect, useState } from "react";
import { Form, Input, Button, Space, Spin } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { getLocalStorage } from "../../helpers/frontendHelper";
import { useDispatch, useSelector } from "react-redux";
import FormItemSkeleton from "../../components/FormItemSkeleton/FormItemSkeleton";
import Skeleton from "react-loading-skeleton";

const Royalty = ({
  storeAddSectionList,
  editStoreSectionList,
  isLoading,
  getStoreLoading,
}) => {
  const [formRoyalty] = Form.useForm();
  const dispatch = useDispatch();
  const storeId = getLocalStorage("storeDetailsUser")?.[0]?.id;
  const { isOperatioSuccessful } = useSelector(
    (state) => state.storeSettingsReducer
  );
  const [loyaltySettingsAddViewModels, setloyaltySettingsAddViewModels] =
    useState();

  useEffect(() => {
    setloyaltySettingsAddViewModels(
      editStoreSectionList?.loyaltySettingsAddViewModels
    );
  }, [editStoreSectionList]);
  const royaltyFormHandler = (values) => {
    let myDataform = new FormData();

    const deletedIds = editStoreSectionList?.loyaltySettingsAddViewModels
      ?.filter((loyalty) => {
        const foundData = values.LoyaltySettingsAddViewModels?.find(
          (data) => loyalty.id == data.id
        );
        if (foundData) {
          return false;
        } else {
          return true;
        }
      })
      .map((data) => data.id);
    console.log(deletedIds);
    myDataform.append(
      "Request",
      JSON.stringify({
        ...editStoreSectionList,
        Id: getLocalStorage("activeStores").id,
        loyaltySettingsAddViewModels: values.LoyaltySettingsAddViewModels,
        LoyaltySettingsDeletedIds: deletedIds,
        loyaltyClaimsSettingsAddViewModel: {
          ...editStoreSectionList.loyaltyClaimsSettingsAddViewModel,
          maxClaimPoint: values.maxClaimPoint,
          maxClaimAmount: values.maxClaimAmount,
        },
      })
    );
    dispatch({
      type: "UDPATE_STORE_DETAIL_REQUEST",
      payload: myDataform,
    });
  };

  return (
    <Form
      form={formRoyalty}
      onFinish={royaltyFormHandler}
      fields={[
        {
          name: "maxClaimPoint",
          value: formRoyalty.getFieldValue("maxClaimPoint")
            ? formRoyalty.getFieldValue("maxClaimPoint")
            : editStoreSectionList?.loyaltyClaimsSettingsAddViewModel
                ?.maxClaimPoint,
        },
        {
          name: "maxClaimAmount",
          value: formRoyalty.getFieldValue("maxClaimAmount")
            ? formRoyalty.getFieldValue("maxClaimAmount")
            : editStoreSectionList?.loyaltyClaimsSettingsAddViewModel
                ?.maxClaimAmount,
        },
        {
          name: "LoyaltySettingsAddViewModels",
          value: formRoyalty.getFieldValue("LoyaltySettingsAddViewModels")
            ? formRoyalty.getFieldValue("LoyaltySettingsAddViewModels")
            : loyaltySettingsAddViewModels,
        },
      ]}
    >
      <div>
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
                        label="Max Claim Points"
                        name="maxClaimPoint"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Max Claim Points !",
                          },
                        ]}
                      >
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Min Claim Points"
                        />
                      </Form.Item>
                    )}
                  </div>
                </div>
                <div className="col-md-3 col-lg-3">
                  <div className="form-group categoryField">
                    {getStoreLoading ? (
                      <FormItemSkeleton />
                    ) : (
                      <Form.Item
                        label="Max Claim Amount"
                        name="maxClaimAmount"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Max Claim Amount !",
                          },
                        ]}
                      >
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Max Claim Points"
                        />
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
                    <Form.List name="LoyaltySettingsAddViewModels">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }, index) => (
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

                          <Skeleton height={30} />
                        </>
                      )}
                    </Form.List>
                  ) : (
                    <Form.List name="LoyaltySettingsAddViewModels">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }, index) => (
                            <Space
                              key={key}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                              className="categoryField"
                            >
                              <Form.Item
                                label={"Amount From ($)"}
                                {...restField}
                                name={[name, "amountFrom"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing Amount From",
                                  },
                                ]}
                              >
                                <Input placeholder="Amount From" />
                              </Form.Item>
                              <Form.Item
                                label={"Amount To ($)"}
                                {...restField}
                                name={[name, "amountTo"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing Amount To",
                                  },
                                ]}
                              >
                                <Input placeholder="Amount To" />
                              </Form.Item>
                              <Form.Item
                                label={"Points"}
                                {...restField}
                                name={[name, "points"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing Points",
                                  },
                                ]}
                              >
                                <Input placeholder="Points" />
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
                              Add Loyalty
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  )}

                  <div className="col-md-12 col-lg-12 mt-3">
                    <Button
                      htmlType="submit"
                      loading={isLoading}
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
        </div>
      </div>
    </Form>
  );
};

export default Royalty;
