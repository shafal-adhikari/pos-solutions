import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Input, Switch } from "antd";
function UpdatePrice({ setIsOpen, isOpen }) {
  const { editPriceData, updatePriceLoading } = useSelector(
    (state) => state.inventoryReducer
  );
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (editPriceData) {
      setActiveTab(editPriceData[0]);
    }
  }, [editPriceData]);
  useEffect(() => {
    if (editPriceData) {
      const format = {
        name: "updatePrice",
        value: editPriceData,
      };
      form.setFields([format]);
    }
  }, [editPriceData]);
  const editPriceHandler = (values) => {
    dispatch({
      type: "UPDATE_PRODUCT_PRICE_REQUEST",
      payload: values.updatePrice,
    });
  };
  return (
    <Modal size="md" show={isOpen} onHide={() => setIsOpen(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "20px" }}>Update Price</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row project-tabs">
          <div className="col-md-12">
            <nav>
              <div className="nav nav-tabs pb-0" id="nav-tab">
                {editPriceData?.map((eachType) => {
                  let className = "nav-item";
                  if (eachType.channelStoreId == activeTab?.channelStoreId) {
                    className = "nav-item nav-link active";
                  } else {
                    className = "nav-item";
                  }
                  return (
                    <a
                      className={className}
                      key={eachType.channelStoreId}
                      onClick={() => setActiveTab(eachType)}
                    >
                      {eachType.channelName}
                    </a>
                  );
                })}
              </div>
            </nav>
            <Form form={form} onFinish={editPriceHandler}>
              <Form.List name="updatePrice">
                {(fields) => {
                  return fields.map(({ key, name }, index) => {
                    if (
                      editPriceData[index].channelStoreId ==
                      activeTab.channelStoreId
                    ) {
                      return (
                        <div id="nav-tabContent" key={key}>
                          <div>
                            <div className="table-responsive">
                              <table className="table table-hover  align-middle table-nowrap mb-0 text-center table-borderless table_variance">
                                <colgroup>
                                  <col span="1" style={{ width: "35%" }} />
                                  <col span="1" style={{ width: "35%" }} />
                                  <col span="1" style={{ width: "30%" }} />
                                </colgroup>
                                <thead>
                                  <tr className="table-light">
                                    <th> Variation</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>

                                <Form.List
                                  name={[
                                    name,
                                    "productVariationsPriceViewModel",
                                  ]}
                                >
                                  {(fields, { add, remove }) => {
                                    return (
                                      <tbody>
                                        {fields.map(
                                          (
                                            { key, name, ...restField },
                                            index
                                          ) => (
                                            <tr key={key + name}>
                                              <td className="fw-bold">
                                                {
                                                  activeTab
                                                    .productVariationsPriceViewModel[
                                                    index
                                                  ].name
                                                }
                                              </td>
                                              <td>
                                                <Form.Item
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        "Please enter price",
                                                    },
                                                  ]}
                                                  name={[name, "price"]}
                                                >
                                                  <Input
                                                    type="number"
                                                    placeholder="Price"
                                                  />
                                                </Form.Item>
                                              </td>

                                              <td>
                                                <div
                                                  className="form-check form-switch form-switch-lg"
                                                  dir="ltr"
                                                >
                                                  <Form.Item
                                                    name={[name, "isActive"]}
                                                    valuePropName="checked"
                                                  >
                                                    <Switch />
                                                  </Form.Item>
                                                </div>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    );
                                  }}
                                </Form.List>
                              </table>
                              <div className="d-flex align-items-center justify-content-between mt-2">
                                <div>
                                  <Button
                                    type="primary"
                                    loading={updatePriceLoading}
                                    htmlType="submit"
                                    className="btn btn-success  bg-theme"
                                  >
                                    Save
                                  </Button>
                                  <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="btn btn-danger ms-1"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  });
                }}
              </Form.List>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default UpdatePrice;
