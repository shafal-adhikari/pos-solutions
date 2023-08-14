import { Button, Form, Input, Select, Spin, Switch } from "antd";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import FormItemSkeleton from "../../../components/FormItemSkeleton/FormItemSkeleton";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";

function AddState({ isOpen, setOpen, isEditClicked }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { editLoading, editData, addLoading } = useSelector(
    (state) => state.stateReducer
  );
  const { isLoading } = useSelector((state) => state.commonReducer);
  const { countryList } = useSelector((state) => state.commonReducer);
  useEffect(() => {
    if (isOpen)
      dispatch({
        type: "GET_COUNTRY_PREFIX_REQUEST",
      });
  }, [isOpen]);
  useEffect(() => {
    if (!isEditClicked && countryList) {
      console.log("values");
      form.setFieldValue(
        "countryId",
        countryList.find((country) => country.isSelected).id
      );
      form.setFieldValue("StateAddViewModel", [
        {
          id: "",
          name: "",
          isActive: true,
        },
      ]);
    }
  }, [countryList, isEditClicked]);
  useEffect(() => {
    if (isEditClicked && editData) {
      form.setFields([
        {
          name: "countryId",
          value: editData.countryId,
        },
        {
          name: "StateAddViewModel",
          value: editData.stateAddViewModel,
        },
      ]);
    }
  }, [isEditClicked, editData]);
  const cityAddHandler = (values) => {
    console.log("values", values);
    dispatch({
      type: "ADD_NEW_STATE_REQUEST",
      payload: {
        ...values,
      },
    });
  };
  return (
    <div className="card p-0">
      <div className="card-body bg-light-blue">
        {editLoading || isLoading ? (
          <Form form={form} onFinish={cityAddHandler}>
            <div className="contact_form categoryField">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <div className="pt-0">
                        <FormItemSkeleton />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <div className="pt-0">
                        <FormItemSkeleton />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-12 mt-3">
                  <Skeleton width={100} height={40} inline={true} />
                  <Skeleton width={100} height={40} />
                </div>
              </div>
            </div>
          </Form>
        ) : (
          <Form form={form} onFinish={cityAddHandler}>
            <div className="contact_form categoryField">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="pt-0">
                      <Form.Item
                        label="Country"
                        name="countryId"
                        rules={[
                          {
                            required: true,
                            message: "Please choose country",
                          },
                        ]}
                      >
                        <Select placeholder="Choose Country">
                          {countryList?.map((country) => {
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
                </div>
                <Form.List name="StateAddViewModel">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => {
                        return (
                          <div key={key} className="row">
                            <div className="col-md-6">
                              <Form.Item
                                {...restField}
                                name={[name, "name"]}
                                label="State Name"
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing Name !",
                                  },
                                ]}
                              >
                                <Input placeholder="Name" />
                              </Form.Item>
                            </div>
                            <div className="col-md-2">
                              <Form.Item
                                {...restField}
                                label="Status"
                                name={[name, "isActive"]}
                                valuePropName="checked"
                              >
                                <Switch />
                              </Form.Item>
                            </div>
                            {!isEditClicked && (
                              <div className="col-md-2 d-flex align-items-center mt-4">
                                <AiFillMinusCircle
                                  size={20}
                                  style={{ cursor: "pointer" }}
                                  color="#ff4d4e"
                                  onClick={() => remove(name)}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {!isEditClicked && (
                        <div className=" mt-3 d-flex align-items-center justify-content-center">
                          <div
                            className="btn"
                            style={{
                              background: "#00205A",
                              paddingLeft: "10px",
                              paddingRight: "10px",
                              paddingTop: "8px",
                              paddingBottom: "8px",
                              color: "#fff",
                            }}
                            onClick={() => add()}
                          >
                            <BsFillPlusCircleFill
                              size={20}
                              color={"#ffffff"}
                              className="me-2"
                            />
                            Add State
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </Form.List>

                {/* <div className="col-md-12">
                  <Form.Item name="Description" label="Description">
                    <Input.TextArea placeholder="Description" />
                  </Form.Item>
                </div> */}
                <div className="col-md-12 mt-3">
                  <Button
                    loading={addLoading}
                    type="primary"
                    htmlType="submit"
                    className="btn btn-success rounded-0"
                  >
                    Save
                  </Button>
                  <Button
                    type="danger"
                    className="btn btn-danger rounded-0 ms-2"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}

export default AddState;
