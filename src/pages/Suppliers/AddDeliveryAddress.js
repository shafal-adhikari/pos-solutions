import { Input, Select, Button, Form } from "antd";
import CompoundedSpace from "antd/lib/space";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddDeliveryAddress({ isOpen, setIsOpen, setSubmit, countryList }) {
  const dispatch = useDispatch();
  const { addLoading, addSuccess } = useSelector(
    (state) => state.supplierReducer
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (addSuccess) {
      navigate("/vendors/purchase-order");
    }
  }, [addSuccess]);
  const [form] = Form.useForm();
  useEffect(() => {
    if (countryList) {
      form.setFieldValue(
        "countryId",
        countryList.find((country) => country.isSelected).id
      );
    }
  }, [countryList]);
  const countryId = Form.useWatch("countryId", form);
  useEffect(() => {
    if (countryId) {
      form.setFieldValue("stateId", null);
      form.setFieldValue("cityId", null);
    }
  }, [countryId]);
  const setAddressHandler = (values) => {
    const selectedCountry = countryList.find(
      (country) => country.id == values.countryId
    );
    const countryName = selectedCountry.value;
    const stateName = selectedCountry.states.find(
      (state) => state.id == values.stateId
    ).value;
    const cityName = selectedCountry.cities.find(
      (city) => city.id == values.cityId
    ).value;
    setSubmit({
      ...values,
      addressLocation:
        values.address +
        ", P O Box " +
        values.postalCode +
        ", " +
        cityName +
        ", " +
        stateName +
        ", " +
        countryName,
    });
    setIsOpen(false);
  };
  return (
    <Modal
      size="lg"
      backdrop="static"
      show={isOpen}
      onHide={() => setIsOpen(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form form={form} onFinish={setAddressHandler}>
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
                            <Select.Option key={country.id} value={country.id}>
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
              <div className="col-md-4">
                <div className="form-group">
                  <div className="pt-0">
                    <Form.Item
                      label="State"
                      name="stateId"
                      rules={[
                        {
                          required: true,
                          message: "Please choose state",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Choose State"
                        options={countryList
                          ?.find((country) => country.id == countryId)
                          ?.states.map((state) => {
                            return {
                              label: state.value,
                              value: state.id,
                            };
                          })}
                      ></Select>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <div className="pt-0">
                    <Form.Item
                      label="City"
                      name="cityId"
                      rules={[
                        {
                          required: true,
                          message: "Please choose city",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Choose City"
                        options={countryList
                          ?.find((country) => country.id == countryId)
                          ?.cities.map((city) => {
                            return {
                              label: city.value,
                              value: city.id,
                            };
                          })}
                      ></Select>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <div className="pt-0">
                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Please enter address",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Address" />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <div className="pt-0">
                    <Form.Item
                      label="Postal Code"
                      name="postalCode"
                      rules={[
                        {
                          required: true,
                          message: "Please enter postal code",
                        },
                      ]}
                    >
                      <Input placeholder="Postal Code" />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-2">
                <Button
                  type="primary"
                  loading={addLoading}
                  htmlType="submit"
                  className="btn btn-success rounded-0"
                >
                  Save
                </Button>
                <Button
                  type="danger"
                  className="btn btn-danger rounded-0 ms-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddDeliveryAddress;
