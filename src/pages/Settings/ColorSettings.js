/** @format */

import { Form, Button, Input, Space } from "antd";
import React, { useEffect } from "react";
import {
  MinusCircleFilled,
  PlusOutlined,
  MinusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import InputColor from "./InputColor";
import { Modal } from "antd";
import { getLocalStorage } from "../../helpers/frontendHelper";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

const ColorSettings = ({
  storeAddSectionList,
  editStoreSectionList,
  isLoading,
  getStoreLoading,
}) => {
  const [colorForm] = Form.useForm();
  const dispatch = useDispatch();
  const resetColorLoading = useSelector(
    (state) => state.storeSettingsReducer.resetColorLoading
  );

  const onFinsihColorHandler = (values) => {
    const deletedIds = editStoreSectionList?.onlineThemeColorSettingsViewModels
      ?.filter((loyalty) => {
        const foundData = values.OnlineThemeColorSettingsViewModels?.find(
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

    let myDataform = new FormData();
    myDataform.append(
      "Request",
      JSON.stringify({
        ...editStoreSectionList,
        Id: getLocalStorage("activeStores").id,
        onlineThemeColorSettingsDeletedIds: deletedIds,
        onlineThemeColorSettingsViewModels:
          values.OnlineThemeColorSettingsViewModels?.map((item) => {
            return {
              ...item,
              name: item.name,
              value: item.value,
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
      colorForm.setFields([
        {
          name: "OnlineThemeColorSettingsViewModels",
          value: editStoreSectionList?.onlineThemeColorSettingsViewModels,
        },
      ]);
    }
  }, [editStoreSectionList, storeAddSectionList]);
  return (
    <div>
      <Form
        form={colorForm}
        style={{ marginTop: "1rem" }}
        onFinish={onFinsihColorHandler}
      >
        <div className="card mt-3">
          <div className="card-body">
            <div className="newsupplier_form bg-light p-3">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  <div className="d-flex justify-content-end">
                    <Button
                      loading={resetColorLoading}
                      type="primary"
                      onClick={() => {
                        dispatch({
                          type: "RESET_COLOR_SETTINGS_REQUEST",
                          payload: { Id: getLocalStorage("activeStores").id },
                        });
                      }}
                    >
                      Reset Color Settings
                    </Button>
                  </div>
                  {getStoreLoading ? (
                    <Form.List name="OnlineThemeColorSettingsViewModels">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }, index) => (
                            <Space
                              key={key}
                              style={{
                                display: "flex",
                                marginBottom: 8,
                                width: "60%",
                              }}
                              align="baseline"
                              className="categoryField"
                            >
                              {" "}
                              <Form.Item
                                style={{ marginRight: 30 }}
                                label={"Color Name"}
                                {...restField}
                                name={[name, "name"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing Color Name",
                                  },
                                ]}
                              >
                                <Skeleton height={27} width={200} />
                              </Form.Item>
                              <Form.Item
                                label={"Color Code"}
                                {...restField}
                                name={[name, "value"]}
                              >
                                <Skeleton height={27} width={200} />
                              </Form.Item>
                            </Space>
                          ))}

                          <Form.Item>
                            <Skeleton height={27} />
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  ) : (
                    <Form.List name="OnlineThemeColorSettingsViewModels">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }, index) => (
                            <Space
                              key={key}
                              style={{
                                display: "flex",
                                marginBottom: 8,
                                width: "60%",
                              }}
                              align="baseline"
                              className="categoryField"
                            >
                              {" "}
                              <Form.Item
                                style={{ marginRight: 30 }}
                                label={"Color Name"}
                                {...restField}
                                name={[name, "name"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing Color Name",
                                  },
                                ]}
                              >
                                <Input
                                  style={{ height: "43px" }}
                                  placeholder="Color Name"
                                />
                              </Form.Item>
                              <Form.Item
                                label={"Color Code"}
                                {...restField}
                                name={[name, "value"]}
                              >
                                <InputColor
                                  originalColor={
                                    editStoreSectionList
                                      ?.onlineThemeColorSettingsViewModels?.[
                                      index
                                    ]?.value
                                  }
                                />
                              </Form.Item>
                            </Space>
                          ))}
                        </>
                      )}
                    </Form.List>
                  )}

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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ColorSettings;
