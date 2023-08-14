/** @format */

import React, { useEffect, useState, useLayoutEffect } from "react";
import { Empty, Pagination, Spin, Input } from "antd";
import { useDispatch } from "react-redux";
import { Button, Tabs, Form, Select, Switch } from "antd";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import Table from "react-bootstrap/Table";
import RolesAndPermission from "./RolesAndPermission";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";
const { Search } = Input;

const UserManagement = () => {
  const dispatch = useDispatch();
  const [isAddBannerModalOpen, setIsAddBannerModalOpen] = useState(false);
  const { isLoading, usersList, isOperatioSuccessful, userAddSectionList } =
    useSelector((state) => state.userManagement);
  const { activeUser } = useSelector((state) => state.userManagement);
  const [bulkSelected, setBulkSelected] = useState([]);
  const [searchkeyword, setSearchKeyword] = useState("");
  const [isPreviewImageoPne, setIsPreviewImageOpen] = useState();
  const [activeImage, setActiveImage] = useState(null);
  const [activeKey, setActiveKey] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState();
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const imageRef = React.useRef();
  const [imageName, setImageName] = useState("");
  const [activeId, setActiveId] = useState();
  const [isEditOpen, setIsEditOpen] = useState();

  useEffect(() => {
    dispatch({
      type: "GET_ADD_USER_SECTION_LIST_REQUEST",
    });
  }, []);

  useEffect(() => {
    if (isOperatioSuccessful) {
      dispatch({
        type: "GET_USERMANAGEMENT_REQUEST",
        payload: {
          Page: 1,
          PageSize: 10,
          SearchKeywords: "",
          ExternalFilter: { UserType: "" },
        },
      });
      setIsAddBannerModalOpen(false);
      setBulkSelected([]);
    }
  }, [isOperatioSuccessful]);
  useEffect(() => {
    dispatch({
      type: "GET_USERMANAGEMENT_REQUEST",
      payload: {
        Page: 1,
        PageSize: 10,
        SearchKeywords: searchkeyword,
        ExternalFilter: { UserType: "" },
      },
    });
  }, [searchkeyword]);

  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);

    dispatch({
      type: "GET_USERMANAGEMENT_REQUEST",
      payload: {
        Page: current,
        pageSize: pageSize,
        ExternalFilter: { UserType: "" },
        SearhcKeywords: searchkeyword,
      },
    });
  }
  const onChange = (key) => {
    setIsEditOpen(false);
    setActiveKey(key);
    setActiveId(null);
    form.resetFields();
    form.setFieldValue(
      "CountryId",
      userAddSectionList?.countryCityStates?.find(
        (country) => country.isSelected
      )?.id
    );
    form.setFieldValue(
      "CountryPhoneNumberPrefixId",
      userAddSectionList?.countryCityStates?.find(
        (country) => country.isSelected
      )?.id
    );
  };
  useEffect(() => {
    form.setFieldValue("StateId", null);
    form.setFieldValue("CityId", null);
  }, [selectedCountry]);
  useLayoutEffect(() => {
    if (userAddSectionList?.countryCityStates) {
      const selectedCountry = userAddSectionList?.countryCityStates?.find(
        (country) => country.isSelected
      );
      setSelectedCountry(selectedCountry);
      form.setFieldValue("CountryId", selectedCountry?.id);
      form.setFieldValue("CountryPhoneNumberPrefixId", selectedCountry?.id);
    }
  }, [userAddSectionList?.countryCityStates]);

  const onAddUserformSubmit = (values) => {
    let myDataform = new FormData();
    myDataform.append("Image", image);
    myDataform.append(
      "Request",
      JSON.stringify({
        Id: activeId ? activeId : "",
        FullName: values.FullName,
        PhoneNumber: values.PhoneNumber,
        CountryPhoneNumberPrefixId: values.CountryPhoneNumberPrefixId,
        Email: values.Email,
        CountryId: values.CountryId,
        CityId: values.CityId,
        StateId: values.StateId,
        Address: values.Address,
        PostalCode: values.PostalCode,
        // Password: values.password,
        // ConfirmPassword: values.confirmPassword,
        UserTypeId: values.userType,
        RoleId: values.userRole,
        IsPushNotificationEnabled: values.IsPushNotificationEnabled,
        ChannelPlatform: "POSMobile",
      })
    );

    dispatch({
      type: "ADD_USER_REQUEST",
      payload: myDataform,
    });
  };
  useEffect(() => {
    if (isOperatioSuccessful) {
      form.resetFields();
      setImageName("");
      form.setFieldValue(
        "CountryId",
        userAddSectionList?.countryCityStates?.find(
          (country) => country.isSelected
        )?.id
      );
      form.setFieldValue(
        "CountryPhoneNumberPrefixId",
        userAddSectionList?.countryCityStates?.find(
          (country) => country.isSelected
        )?.id
      );
    }
  }, [isOperatioSuccessful]);
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
          width: 120,
        }}
      >
        {userAddSectionList?.countryCityStates?.length > 0 &&
          userAddSectionList?.countryCityStates?.map((item, i) => (
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

  useEffect(() => {
    if (activeId) {
      dispatch({
        type: "GET_USER_BY_ID_REQUEST",
        payload: activeId,
      });
    }
    console.log("active User", activeUser);
  }, [activeId]);

  useEffect(() => {
    if (isEditOpen) {
      form.setFields([
        {
          name: "FullName",
          value: activeUser.name,
        },
        {
          name: "Email",
          value: activeUser.email,
        },
        {
          name: "PhoneNumber",
          value: activeUser.phoneNumber,
        },
        {
          name: "userType",
          value: activeUser.userTypeId,
        },
        {
          name: "CountryId",
          value: activeUser.countryId,
        },
        {
          name: "StateId",
          value: activeUser.stateId,
        },
        {
          name: "CityId",
          value: activeUser.cityId,
        },
        {
          name: "Address",
          value: activeUser.address,
        },
        {
          name: "PostalCode",
          value: activeUser.postalCode,
        },
        {
          name: "IsPushNotificationEnabled",
          value: activeUser.isPushNotificationEnabled,
        },
        {
          name: "userRole",
          value: activeUser.roleId,
        },
      ]);
    } else {
    }
  }, [activeUser, isEditOpen, selectedCountry]);
  return (
    <>
      <Modal
        show={isPreviewImageoPne}
        onHide={() => {
          setIsPreviewImageOpen(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Preview Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={activeImage}
            style={{ margin: "auto", height: "400px", width: "100%" }}
          />
        </Modal.Body>
      </Modal>

      <div className="card">
        <div className="card-body">
          <div className="table-body" style={{ overflow: "auto" }}>
            <div className="table-responsive">
              <Tabs
                onChange={onChange}
                activeKey={activeKey}
                style={{ overflowY: "hidden" }}
                type="card"
                title="dsa"
                items={[
                  {
                    label: `User Management`,
                    key: 1,
                    children: (
                      <>
                        {" "}
                        <div
                          style={{
                            display: "flex",
                            margin: "0",
                            justifyContent: "flex-end",
                            marginBottom: "15px",
                          }}
                        >
                          <Search
                            style={{ width: "28%" }}
                            placeholder="Search For User"
                            onSearch={() => {}}
                            onChange={(e) => {
                              setSearchKeyword(e.target.value);
                            }}
                            enterButton="Search"
                          />
                        </div>
                        {isLoading ? (
                          <TableSkeleton />
                        ) : (
                          <Table bordered hover>
                            <thead>
                              <tr style={{ background: "#EFEFEE" }}>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Image</th>
                                <th>Phone Number</th>
                                <th>User Type</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {usersList?.data?.length > 0 ? (
                                usersList?.data?.map((user) => {
                                  return (
                                    <tr key={user.id}>
                                      <td>{user.fullName}</td>
                                      <td>{user.email}</td>
                                      <td>
                                        <img
                                          style={{
                                            height: "50px",
                                            width: "50px",
                                          }}
                                          src={user.image}
                                          onClick={() => {
                                            setIsPreviewImageOpen(true);
                                            setActiveImage(user.image);
                                          }}
                                        />
                                      </td>
                                      <td>{user.phoneNumber}</td>
                                      <td>{user.userType}</td>
                                      <td>
                                        <Tooltip title="Edit User">
                                          <a
                                            className="btn btn-info btn-sm"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="left"
                                            onClick={(e) => {
                                              setIsEditOpen(true);
                                              setActiveId(user.id);
                                              setActiveKey(2);
                                            }}
                                            style={{ marginRight: "5px" }}
                                            data-bs-original-title="Edit"
                                          >
                                            <i
                                              className="fas fa-edit"
                                              aria-hidden="true"
                                            />
                                          </a>
                                        </Tooltip>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td align="center" colSpan={6}>
                                    {" "}
                                    No Records Found !
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        )}
                        <div className="company_footer d-flex justify-content-end mt-3">
                          <Pagination
                            total={usersList?.total ? usersList?.total : 2}
                            showSizeChanger
                            onShowSizeChange={onShowSizeChange}
                            defaultCurrent={1}
                            onChange={onShowSizeChange}
                          />
                        </div>
                      </>
                    ),
                  },
                  {
                    label: `Add Users`,
                    key: 2,
                    children: (
                      <>
                        <div className="">
                          <Form form={form} onFinish={onAddUserformSubmit}>
                            <div className="card-body">
                              <div className="" style={{ border: "none" }}>
                                <div className="row categoryField">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <Form.Item
                                        label="Full Name"
                                        name="FullName"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter full name",
                                          },
                                        ]}
                                      >
                                        <Input placeholder="Enter Full Name" />
                                      </Form.Item>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <Form.Item
                                        label="Email"
                                        name="Email"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter email",
                                          },
                                          {
                                            type: "email",
                                            mesasge: "Please enter valid email",
                                          },
                                        ]}
                                      >
                                        <Input placeholder="Enter Email" />
                                      </Form.Item>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <Form.Item
                                        label="Phone"
                                        name="PhoneNumber"
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              "Please enter phone number",
                                          },
                                        ]}
                                      >
                                        <Input
                                          placeholder="Enter Phone Number"
                                          addonBefore={prefixSelector(
                                            "CountryPhoneNumberPrefixId"
                                          )}
                                        />
                                      </Form.Item>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <Form.Item
                                        label="User Type"
                                        name="userType"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter user type",
                                          },
                                        ]}
                                      >
                                        <Select
                                          placeholder="Select User Type"
                                          options={userAddSectionList?.userTypes?.map(
                                            (state) => {
                                              return {
                                                label: state.value,
                                                value: state.id,
                                              };
                                            }
                                          )}
                                        />
                                      </Form.Item>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <Form.Item
                                        label="User Role"
                                        name="userRole"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter user role",
                                          },
                                        ]}
                                      >
                                        <Select
                                          placeholder="Select User Role"
                                          options={userAddSectionList?.roles?.map(
                                            (role) => {
                                              return {
                                                label: role.value,
                                                value: role.id,
                                              };
                                            }
                                          )}
                                        />
                                      </Form.Item>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <Form.Item
                                        label="Country"
                                        name="CountryId"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please select country",
                                          },
                                        ]}
                                      >
                                        <Select
                                          placeholder="Select Country"
                                          onChange={(e) =>
                                            setSelectedCountry(
                                              userAddSectionList?.countryCityStates?.find(
                                                (country) => country.id == e
                                              )
                                            )
                                          }
                                        >
                                          {userAddSectionList?.countryCityStates?.map(
                                            (country) => {
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
                                            }
                                          )}
                                        </Select>
                                      </Form.Item>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <Form.Item
                                        label="State"
                                        name="StateId"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please select state",
                                          },
                                        ]}
                                      >
                                        <Select
                                          placeholder="Select State"
                                          options={selectedCountry?.states.map(
                                            (state) => {
                                              return {
                                                label: state.value,
                                                value: state.id,
                                              };
                                            }
                                          )}
                                        />
                                      </Form.Item>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <Form.Item
                                        label="City"
                                        name="CityId"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please select city",
                                          },
                                        ]}
                                      >
                                        <Select
                                          placeholder="Select City"
                                          options={selectedCountry?.cities.map(
                                            (state) => {
                                              return {
                                                label: state.value,
                                                value: state.id,
                                              };
                                            }
                                          )}
                                        />
                                      </Form.Item>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <Form.Item
                                        label="Address"
                                        name="Address"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter address",
                                          },
                                        ]}
                                      >
                                        <Input placeholder="Enter Address" />
                                      </Form.Item>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <Form.Item
                                        label="Postal Code"
                                        name="PostalCode"
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
                                  {/* <div className="col-md-6">
                                    <div className="form-group">
                                      <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                          {
                                            required: isEditOpen ? false : true,
                                            message: "Please enter password",
                                          },
                                        ]}
                                      >
                                        <Input.Password placeholder="Enter password" />
                                      </Form.Item>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <Form.Item
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        rules={[
                                          {
                                            required: isEditOpen ? false : true,
                                            message:
                                              "Please enter confirm password",
                                          },
                                        ]}
                                      >
                                        <Input.Password placeholder="Enter confirm password" />
                                      </Form.Item>
                                    </div>
                                  </div> */}
                                  <div
                                    className="col-md-6"
                                    style={{
                                      marginTop: "0.8rem",
                                      marginBottom: "1rem",
                                    }}
                                  >
                                    <label className="control-label fw-bold">
                                      Add Image
                                    </label>
                                    <div
                                      className="file-drop-area "
                                      style={{ marginTop: "5px" }}
                                    >
                                      <span className="choose-file-button">
                                        Choose Files
                                      </span>
                                      <span className="file-message">
                                        {imageName
                                          ? imageName
                                          : "or drag and drop files here"}{" "}
                                      </span>
                                      <input
                                        type="file"
                                        className="file-input"
                                        ref={imageRef}
                                        onChange={(e) => {
                                          setImageName(e.target.files[0].name);
                                          setImage(e.target.files[0]);
                                        }}
                                        accept=".jfif,.jpg,.jpeg,.png,.gif"
                                        multiple=""
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <div className="">
                                        <Form.Item
                                          valuePropName="checked"
                                          label="Push Notification"
                                          name="IsPushNotificationEnabled"
                                        >
                                          <Switch
                                            defaultChecked={
                                              isEditOpen
                                                ? activeUser.isPushNotificationEnabled
                                                : false
                                            }
                                          />
                                        </Form.Item>
                                      </div>
                                    </div>
                                  </div>

                                  {isFormSubmitted && !imageName && (
                                    <span style={{ color: "red" }}>
                                      Image is required !
                                    </span>
                                  )}
                                  <div className="justify-content-start col-md-12">
                                    <Button
                                      type="primary"
                                      loading={isLoading}
                                      htmlType="submit"
                                      className="btn btn-success rounded-0"
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      type="danger"
                                      onClick={() => onChange(1)}
                                      className="btn btn-danger rounded-0 border-0 ms-2"
                                      data-dismiss="modal"
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              {/* )} */}
                            </div>
                          </Form>
                        </div>
                      </>
                    ),
                  },
                  {
                    label: `Roles And Permissions`,
                    key: 3,
                    children: (
                      <>
                        <RolesAndPermission />
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
