import React, { useEffect, useState } from "react";
import { Button, Tabs } from "antd";
import { Form, Input, Spin, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import FormItemSkeleton from "../../components/FormItemSkeleton/FormItemSkeleton";
import Skeleton from "react-loading-skeleton";

const GetStarted = ({ activeItem }) => {
  const dispatch = useDispatch();
  const [connectForm] = Form.useForm();
  const [contactSettingForm] = Form.useForm();
  const [chartOfAcountForm] = Form.useForm();

  const {
    isLoading,
    accountingPlatformConnection,
    isOperatioSuccessful,
    getAccountingPlatformLoading,
    accountingChartList,
    saveLoading,
  } = useSelector((state) => state.integerationReducer);
  const [activeKey, setActiveKey] = useState(1);

  useEffect(() => {
    if (activeKey == 1) {
      dispatch({
        type: "GET_ACCOUNTING_PLATFORM_CONNECTION_REQUEST",
        payload: activeItem?.id,
      });
    }

    if (activeKey == 2) {
      dispatch({
        type: "GET_ACCOUNTING_CHART_REQUEST",
        payload: activeItem?.id,
      });
    }
  }, [activeItem, activeKey]);

  const onChange = (key) => {
    setActiveKey(key);
  };
  const onConnectFinishHandler = (values) => {
    console.log("value ", values);

    dispatch({
      type: "UPDATE_ACCOUNTING_PLATFORM_CONNECTION_REQUEST",
      payload: {
        Id: accountingPlatformConnection?.id,
        AccountingPlatFormId:
          accountingPlatformConnection?.accountingPlatFormId,
        AccountingPlatformConnectionCredentials: {
          KeyOrId: values.clientId,
          Secret: values.clientSecret,
        },
      },
    });
  };

  useEffect(() => {
    if (isOperatioSuccessful) {
      dispatch({
        type: "GET_ACCOUNTING_PLATFORM_CONNECTION_REQUEST",
        payload: activeItem?.id,
      });
      dispatch({
        type: "GET_ACCOUNTING_CHART_REQUEST",
        payload: activeItem?.id,
      });
    }
  }, [isOperatioSuccessful]);
  const onContactFinishHandler = (values) => {
    console.log("value ", values);
  };
  const onChartOfAcountFormHandler = (values) => {
    dispatch({
      type: "UPDATE_CHART_OF_ACCOUNT_REQUEST",
      payload: values.accountingChartList,
    });
  };
  return (
    <div>
      <Tabs
        onChange={onChange}
        type="card"
        title="dsa"
        items={[
          {
            label: `Connect ${activeItem.name}`,
            key: 1,
            children: (
              <>
                {getAccountingPlatformLoading ? (
                  <Form
                    style={{ margin: "10px" }}
                    className="categoryField"
                    form={connectForm}
                    onFinish={onConnectFinishHandler}
                    fields={[
                      {
                        name: "clientId",
                        value:
                          accountingPlatformConnection
                            ?.accountingPlatformConnectionCredentials?.keyOrId,
                      },
                      {
                        name: "clientSecret",
                        value:
                          accountingPlatformConnection
                            ?.accountingPlatformConnectionCredentials?.secret,
                      },
                    ]}
                  >
                    <FormItemSkeleton />
                    <FormItemSkeleton />
                    <Skeleton
                      style={{ marginTop: "10px" }}
                      width={150}
                      height={35}
                    />
                  </Form>
                ) : (
                  <Form
                    style={{ margin: "10px" }}
                    className="categoryField"
                    form={connectForm}
                    onFinish={onConnectFinishHandler}
                    fields={[
                      {
                        name: "clientId",
                        value:
                          accountingPlatformConnection
                            ?.accountingPlatformConnectionCredentials?.keyOrId,
                      },
                      {
                        name: "clientSecret",
                        value:
                          accountingPlatformConnection
                            ?.accountingPlatformConnectionCredentials?.secret,
                      },
                    ]}
                  >
                    <Form.Item
                      label="Xero Client ID"
                      name="clientId"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Client ID !",
                        },
                      ]}
                    >
                      <Input placeholder="Xero Client ID" />
                    </Form.Item>
                    <Form.Item
                      style={{ marginTop: "10px" }}
                      label="Xero Client Secret"
                      name="clientSecret"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Client Secret !",
                        },
                      ]}
                    >
                      <Input placeholder="Xero Client Secret" />
                    </Form.Item>
                    <Form.Item style={{ marginTop: "20px" }}>
                      <Button
                        loading={saveLoading}
                        htmlType="submit"
                        type="primary"
                        className="btn btn-success btn-lg bg-theme border-0"
                      >
                        Save
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </>
            ),
          },
          {
            label: `Chart Of Account Mappings`,
            key: 2,
            children: (
              <>
                {getAccountingPlatformLoading ? (
                  <Form
                    style={{ margin: "10px" }}
                    className="categoryField"
                    form={chartOfAcountForm}
                    onFinish={onChartOfAcountFormHandler}
                    fields={[
                      {
                        name: "accountingChartList",
                        value: accountingChartList ? accountingChartList : [],
                      },
                    ]}
                  >
                    <Form.List name="accountingChartList">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => {
                            return (
                              <div
                                key={key}
                                align="baseline"
                                className="categoryField"
                              >
                                <Skeleton
                                  count={0.47}
                                  height={27}
                                  inline={true}
                                />
                                <Skeleton
                                  count={0.47}
                                  height={27}
                                  inline={true}
                                  style={{ marginTop: "10px" }}
                                />
                              </div>
                            );
                          })}
                        </>
                      )}
                    </Form.List>
                    <Skeleton
                      style={{ marginTop: "10px" }}
                      width={70}
                      height={30}
                    />
                  </Form>
                ) : (
                  <Form
                    style={{ margin: "10px" }}
                    className="categoryField"
                    form={chartOfAcountForm}
                    onFinish={onChartOfAcountFormHandler}
                    fields={[
                      {
                        name: "accountingChartList",
                        value: accountingChartList ? accountingChartList : [],
                      },
                    ]}
                  >
                    <Form.List name="accountingChartList">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => {
                            return (
                              <div
                                key={key}
                                style={{
                                  display: "flex",
                                  gap: "20px",
                                  marginTop: "10px",
                                }}
                              >
                                <Form.Item
                                  style={{ width: "50%" }}
                                  {...restField}
                                  name={[name, "name"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing Name !",
                                    },
                                  ]}
                                >
                                  <Input readOnly={true} placeholder="Name" />
                                </Form.Item>
                                <Form.Item
                                  style={{ width: "50%" }}
                                  {...restField}
                                  name={[name, "codes"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing code !",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Code" />
                                </Form.Item>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </Form.List>
                    <Form.Item style={{ marginTop: "20px" }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={saveLoading}
                        className="btn btn-success btn-lg bg-theme border-0"
                      >
                        Save
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </>
            ),
          },
          {
            label: `Contact Settings`,
            key: 3,
            children: (
              <Form
                style={{ margin: "10px" }}
                className="categoryField"
                form={contactSettingForm}
                onFinish={onContactFinishHandler}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Name !",
                    },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>

                <Form.Item style={{ marginTop: "20px" }}>
                  <button className="btn btn-success btn-lg bg-theme border-0">
                    Save
                  </button>
                </Form.Item>
              </Form>
            ),
          },
        ]}
      />
      {/* <img
        src={activeItem?.image}
        alt=""
        height="100px"
        width="100px"
        className="int_logo"
      /> */}
    </div>
  );
};

export default GetStarted;
