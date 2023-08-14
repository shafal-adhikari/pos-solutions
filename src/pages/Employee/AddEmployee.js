/** @format */

import React, { useEffect, useState, useLayoutEffect } from "react";
import { Form, Input, Select, Button, DatePicker, Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import AddEmployeeSkeleton from "./AddEmployeeSkeleton";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [employeeForm] = Form.useForm();
  const [administrationForm] = Form.useForm();
  const [taxForm] = Form.useForm();
  const { activeStore } = useSelector((state) => state.authenticationReducer);

  const [imageError, setImageError] = useState();
  const [image, setImage] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const [current, setCurrent] = useState(0);

  const {
    employeeLoading,
    addEmployementSectionList,
    isOperationSuccessful,
    addEmployeeLoading,
    editEmployeeData,
  } = useSelector((state) => state.settingsReducer);
  const onChange = (value) => {
    if (current == 0) {
      employeeForm.validateFields().then(() => {
        setCurrent(value);
      });
    }
    if (current == 1) {
      if (value == 0) {
        setCurrent(value);
      } else {
        administrationForm.validateFields().then(() => {
          setCurrent(value);
        });
      }
    }
    if (current == 2) {
      if (value == 1 || value == 0) {
        setCurrent(value);
      } else {
        taxForm.validateFields().then(() => {
          setCurrent(value);
        });
      }
    }
  };
  useEffect(() => {
    dispatch({
      type: "GET_EMPLOYEE_ADD_SECTION_REQUEST",
    });
  }, []);
  useLayoutEffect(() => {
    employeeForm.setFieldValue(
      "employeeNo",
      addEmployementSectionList?.employeeCode
    );
    if (addEmployementSectionList?.countryStateCities) {
      const selectedCountry =
        addEmployementSectionList?.countryStateCities?.find(
          (country) => country.isSelected
        );
      setSelectedCountry(selectedCountry?.id);
      employeeForm.setFieldValue("country", selectedCountry?.id);
    }
  }, [addEmployementSectionList?.countryStateCities]);
  const handleImageUpload = (e) => {
    setImageError(null);
    setImage(e.target.files[0]);
  };
  const onAddEmployeeHandler = (values) => {
    let myDataform = new FormData();
    const request = {
      Id: editEmployeeData.id ? editEmployeeData.id : "",
      GeneralInformationAddViewModel: {
        EmployeeCode: employeeForm.getFieldValue("employeeNo"),
        EmployeeJobTitle: employeeForm.getFieldValue("jobTitle"),
        FirstName: employeeForm.getFieldValue("firstName"),
        MiddleName: employeeForm.getFieldValue("middleName"),
        LastName: employeeForm.getFieldValue("lastName"),
        PreferredName: employeeForm.getFieldValue("prefferedName"),
        MobileNo: employeeForm.getFieldValue("mobile"),
        PhoneNo: employeeForm.getFieldValue("phoneNumber"),
        Email: employeeForm.getFieldValue("email"),
        Address: employeeForm.getFieldValue("address"),
        StateId: employeeForm.getFieldValue("state"),
        CityId: employeeForm.getFieldValue("city"),
        CountryId: employeeForm.getFieldValue("country"),
        Gender: employeeForm.getFieldValue("gender"),
        PostalCode: employeeForm.getFieldValue("zipCode"),
        ReportingEmployeeId: employeeForm.getFieldValue("employeeCategory"),
        PayScaleLevelId: employeeForm.getFieldValue("payScale"),
        Annualsalary: employeeForm.getFieldValue("annualSalary"),
        HourlyRate: employeeForm.getFieldValue("hourlyRate"),
        EmergencyContactName: employeeForm.getFieldValue(
          "emergencyContactName"
        ),
        RelationShip: employeeForm.getFieldValue("relationship"),
        EmergencyPhoneNumber: employeeForm.getFieldValue("phone"),
        EmergencyEmail: employeeForm.getFieldValue("email"),
      },
      AdministrationInformationAddViewModel: {
        EmploymentDate:
          moment(administrationForm.getFieldValue("employmentDate"))
            .format(activeStore.dateFormat.toUpperCase())
            .split(" ")[0] + " 00:00:00",
        LsLCommencementDate:
          moment(administrationForm.getFieldValue("lslComencementDate"))
            .format(activeStore.dateFormat.toUpperCase())
            .split(" ")[0] + " 00:00:00",
        InActiveDate:
          moment(administrationForm.getFieldValue("inactivityDate"))
            .format(activeStore.dateFormat.toUpperCase())
            .split(" ")[0] + " 00:00:00",
        TerminationDate:
          moment(administrationForm.getFieldValue("terminationDate"))
            .format(activeStore.dateFormat.toUpperCase())
            .split(" ")[0] + " 00:00:00",
        BirthDate:
          moment(administrationForm.getFieldValue("birthDate"))
            .format(activeStore.dateFormat.toUpperCase())
            .split(" ")[0] + " 00:00:00",
        ServiceMonths: administrationForm.getFieldValue("serviceMonth"),
        ServiceDays: administrationForm.getFieldValue("serviceDays"),
        AgeMonths: administrationForm.getFieldValue("ageMonth"),
        AgeDays: administrationForm.getFieldValue("ageDays"),
      },
      TaxInformationAddViewModel: {
        TaxFileNumber: taxForm.getFieldValue("taxFileNumber"),
        TFNExcemptionId: taxForm.getFieldValue("tfnExepmtion"),
        EmployementTypeId: taxForm.getFieldValue("employmentType"),
        SuperAnnunationfundName: taxForm.getFieldValue(
          "superAnnuationFundName"
        ),
        PayrollTaxStateId: taxForm.getFieldValue("payrollTaxState"),
      },
    };
    myDataform.append("Request", JSON.stringify(request));
    myDataform.append("Image", image);

    taxForm.validateFields().then(() => {
      dispatch({
        type: "ADD_EMPLOYEE_REQUEST",
        payload: myDataform,
      });
    });
  };
  const next = () => {
    if (current == 0) {
      employeeForm.validateFields().then(() => {
        setCurrent(current + 1);
      });
    }
    if (current == 1) {
      administrationForm.validateFields().then(() => {
        setCurrent(current + 1);
      });
    }
    if (current == 2) {
      taxForm.validateFields().then(() => {
        setCurrent(current + 1);
      });
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    if (isOperationSuccessful) {
      navigate("/employee/profile");
      dispatch({
        type: "MAKE_IS_OPERATION_FALSE",
      });
      employeeForm.resetFields();
      taxForm.resetFields();
      administrationForm.resetFields();
    }
  }, [isOperationSuccessful]);

  useEffect(() => {
    employeeForm.setFieldValue(
      "employeeNo",
      editEmployeeData?.generalInformationAddViewModel?.employeeCode
    );
    employeeForm.setFieldValue(
      "jobTitle",
      editEmployeeData?.generalInformationAddViewModel?.employeeJobTitle
    );
    employeeForm.setFieldValue(
      "firstName",
      editEmployeeData?.generalInformationAddViewModel?.firstName
    );
    employeeForm.setFieldValue(
      "middleName",
      editEmployeeData?.generalInformationAddViewModel?.middleName
    );
    employeeForm.setFieldValue(
      "lastName",
      editEmployeeData?.generalInformationAddViewModel?.lastName
    );
    employeeForm.setFieldValue(
      "prefferedName",
      editEmployeeData?.generalInformationAddViewModel?.preferredName
    );
    employeeForm.setFieldValue(
      "mobile",
      editEmployeeData?.generalInformationAddViewModel?.mobileNo
    );
    employeeForm.setFieldValue(
      "phoneNumber",
      editEmployeeData?.generalInformationAddViewModel?.phoneNo
    );
    employeeForm.setFieldValue(
      "email",
      editEmployeeData?.generalInformationAddViewModel?.email
    );
    employeeForm.setFieldValue(
      "address",
      editEmployeeData?.generalInformationAddViewModel?.address
    );
    employeeForm.setFieldValue(
      "state",
      editEmployeeData?.generalInformationAddViewModel?.stateId
    );
    employeeForm.setFieldValue(
      "city",
      editEmployeeData?.generalInformationAddViewModel?.cityId
    );
    employeeForm.setFieldValue(
      "country",
      editEmployeeData?.generalInformationAddViewModel?.countryId
    );
    employeeForm.setFieldValue(
      "gender",
      editEmployeeData?.generalInformationAddViewModel?.gender
    );
    employeeForm.setFieldValue(
      "zipCode",
      editEmployeeData?.generalInformationAddViewModel?.postalCode
    );
    employeeForm.setFieldValue(
      "employeeCategory",
      editEmployeeData?.generalInformationAddViewModel?.reportingEmployeeId
    );
    employeeForm.setFieldValue(
      "payScale",
      editEmployeeData?.generalInformationAddViewModel?.payScaleLevelId
    );
    employeeForm.setFieldValue(
      "annualSalary",
      editEmployeeData?.generalInformationAddViewModel?.annualsalary
    );
    employeeForm.setFieldValue(
      "hourlyRate",
      editEmployeeData?.generalInformationAddViewModel?.hourlyRate
    );
    employeeForm.setFieldValue(
      "emergencyContactName",
      editEmployeeData?.generalInformationAddViewModel?.emergencyContactName
    );
    employeeForm.setFieldValue(
      "relationship",
      editEmployeeData?.generalInformationAddViewModel?.relationShip
    );
    employeeForm.setFieldValue(
      "phone",
      editEmployeeData?.generalInformationAddViewModel?.emergencyPhoneNumber
    );
    employeeForm.setFieldValue(
      "email",
      editEmployeeData?.generalInformationAddViewModel?.emergencyEmail
    );
    administrationForm.setFieldValue(
      "birthDate",
      moment(editEmployeeData?.administrationInformationAddViewModel?.birthDate)
    );
    administrationForm.setFieldValue(
      "employmentDate",
      moment(
        editEmployeeData?.administrationInformationAddViewModel?.employmentDate
      )
    );
    administrationForm.setFieldValue(
      "lslComencementDate",
      moment(
        editEmployeeData?.administrationInformationAddViewModel
          ?.lsLCommencementDate
      )
    );
    administrationForm.setFieldValue(
      "inactivityDate",
      moment(
        editEmployeeData?.administrationInformationAddViewModel?.inActiveDate
      )
    );
    administrationForm.setFieldValue(
      "terminationDate",
      moment(
        editEmployeeData?.administrationInformationAddViewModel?.terminationDate
      )
    );
    administrationForm.setFieldValue(
      "serviceMonth",
      editEmployeeData?.administrationInformationAddViewModel?.serviceMonths
    );
    administrationForm.setFieldValue(
      "serviceDays",
      editEmployeeData?.administrationInformationAddViewModel?.serviceDays
    );
    administrationForm.setFieldValue(
      "ageDays",
      editEmployeeData?.administrationInformationAddViewModel?.ageDays
    );
    administrationForm.setFieldValue(
      "ageMonth",
      editEmployeeData?.administrationInformationAddViewModel?.ageMonth
    );
    taxForm.setFieldValue(
      "taxFileNumber",
      editEmployeeData?.taxInformationAddViewModel?.taxFileNumber
    );
    taxForm.setFieldValue(
      "tfnExepmtion",
      editEmployeeData?.taxInformationAddViewModel?.tfnExcemptionId
    );
    taxForm.setFieldValue(
      "employmentType",
      editEmployeeData?.taxInformationAddViewModel?.employementTypeId
    );
    taxForm.setFieldValue(
      "superAnnuationFundName",
      editEmployeeData?.taxInformationAddViewModel?.superAnnunationfundName
    );
    taxForm.setFieldValue(
      "payrollTaxState",
      editEmployeeData?.taxInformationAddViewModel?.payrollTaxStateId
    );
  }, [editEmployeeData]);

  return (
    <div className="content categoryField">
      {/* main Breadcrumb Area */}

      <div className="newemployee">
        {/* Form tab start */}
        <div className="row  d-flex justify-content-center">
          <div className="col-sm-12">
            <Steps
              size="small"
              style={{ marginBottom: "1.5rem" }}
              responsive={true}
              current={current}
              onChange={onChange}
              items={[
                {
                  title: "Employee Information",
                },
                {
                  title: "Admininstration",
                },
                {
                  title: "Tax Information",
                },
              ]}
            />

            {current == 0 &&
              (employeeLoading ? (
                <AddEmployeeSkeleton />
              ) : (
                <Form form={employeeForm}>
                  <div className="card mt-2">
                    <div className="card-body bg-light-blue">
                      <div className="contact_form">
                        <div className="mr-md-3 mr-xl-5">
                          <h4 className="font-weight-bold">
                            Employee's Information
                          </h4>
                        </div>
                        <div className="row">
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Employee No"
                                name="employeeNo"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Employee No !",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Employee No"
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Job Title"
                                name="jobTitle"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter jobTitle !",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Job Title"
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter First Name !",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="First Name"
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item label="Middle Name" name="middleName">
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Middle Name"
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Last Name !",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Last Name"
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Preffered Name"
                                name="prefferedName"
                              >
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Preffered Name"
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Mobile"
                                name="mobile"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Mobile Number !",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Mobile Number"
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item label="Phone" name="phoneNumber">
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Phone"
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Email !",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Email"
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Address"
                                name="address"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Address !",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Address"
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Suburb"
                                name="suburb"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Suburb !",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Suburb"
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Country"
                                name="country"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Country !",
                                  },
                                ]}
                              >
                                <Select placeholder="Select Country">
                                  {addEmployementSectionList?.countryStateCities?.map(
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
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="State"
                                name="state"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter State !",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select State"
                                  options={addEmployementSectionList?.countryStateCities
                                    ?.find(
                                      (country) => country.id == selectedCountry
                                    )
                                    ?.states.map((state) => {
                                      return {
                                        label: state.value,
                                        value: state.id,
                                      };
                                    })}
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="City"
                                name="city"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter City !",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select City"
                                  options={addEmployementSectionList?.countryStateCities
                                    ?.find(
                                      (country) => country.id == selectedCountry
                                    )
                                    ?.cities.map((state) => {
                                      return {
                                        label: state.value,
                                        value: state.id,
                                      };
                                    })}
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Zip Code"
                                name="zipCode"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Zip Code !",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Zip Code"
                                />
                              </Form.Item>
                            </div>
                          </div>

                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item label="Gender" name="gender">
                                <Select placeholder="Gender">
                                  <Select.Option value="0" key={0}>
                                    Male
                                  </Select.Option>
                                  <Select.Option key={1} value="1">
                                    Femlae
                                  </Select.Option>
                                  <Select.Option key={2} value="2">
                                    Others
                                  </Select.Option>
                                </Select>
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Pay Scale Level"
                                name="payScale"
                              >
                                <Select placeholder="Pay Scale">
                                  {addEmployementSectionList?.payScaleLevels?.map(
                                    (item) => {
                                      return (
                                        <Select.Option
                                          value={item.id}
                                          key={item.id}
                                        >
                                          {item.name}
                                        </Select.Option>
                                      );
                                    }
                                  )}
                                </Select>
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <div className=" pt-0">
                                <Form.Item
                                  label="Annual Salary"
                                  name="annualSalary"
                                >
                                  <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="eg:Your Annual Salary"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <div className=" pt-0">
                                <Form.Item
                                  label="Hourly Rate"
                                  name="hourlyRate"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please Enter Hourly Rate !",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="eg:Your Hourly Rate"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Reporting Employee"
                                name="reportingEmployee"
                              >
                                <Select placeholder="Reporting Employee">
                                  {addEmployementSectionList?.employees?.map(
                                    (item) => {
                                      return (
                                        <Select.Option
                                          value={item.id}
                                          key={item.id}
                                        >
                                          {item.name}
                                        </Select.Option>
                                      );
                                    }
                                  )}
                                </Select>
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <div className=" pt-0">
                                <label className=" control-label d-flex align-items-center mt-3">
                                  Images:
                                </label>
                                <input
                                  onChange={handleImageUpload}
                                  type="file"
                                  name="attachments"
                                  className="form-control-file"
                                />{" "}
                              </div>
                              {isFormSubmitted && !image && (
                                <span style={{ color: "red" }}>
                                  Image is required !
                                </span>
                              )}
                              {imageError && (
                                <span style={{ color: "red" }}>
                                  {imageError}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Emergency contact */}
                  <div className="card mt-2">
                    <div className="card-body bg-light-blue">
                      <div className="contact_form">
                        {/*  details */}
                        <div className="emergency_info">
                          <div className="row">
                            <div className="col-md-6 col-lg-4">
                              <div className="form-group">
                                <div className=" pt-0">
                                  <Form.Item
                                    label="Emergency Contact Name"
                                    name="emergencyContactName"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please Enter Emergency Contact Name !",
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="text"
                                      className="form-control"
                                      placeholder="Emergency Contact Name"
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                              <div className="form-group">
                                <div className=" pt-0">
                                  <Form.Item
                                    label="Emergency Relationship Person"
                                    name="relationship"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Enter relationship !",
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="text"
                                      className="form-control"
                                      placeholder="Relationship"
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                              <div className="form-group">
                                <div className=" pt-0">
                                  <Form.Item
                                    label="Emergency Phone"
                                    name="phone"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please Enter Phone !",
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="text"
                                      className="form-control"
                                      placeholder="Phone"
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                              <div className="form-group">
                                <div className=" pt-0">
                                  <Form.Item
                                    label=" Emergency Email"
                                    name="email"
                                  >
                                    <Input
                                      type="text"
                                      className="form-control"
                                      placeholder="Email"
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* General Information */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-12 text-center mt-3 mb-3">
                  <div className=" justify-content-center">
                    <Button
                      loading={employeeLoading}
                      type="primary"
                      htmlType="submit"
                      className="btn btn-primary all_btn rounded-0 me-2"
                      onClick={() => {
                        setIsFormSubmitted(true);
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      loading={false}
                      type="danger"
                      className="btn btn-primary all_btn rounded-0 me-2"
                    >
                      Cancel
                    </Button>
                  </div>
                </div> */}
                </Form>
              ))}
            {current == 1 && (
              <div className="card mt-2">
                <Form form={administrationForm}>
                  <div className="card-body bg-light-blue">
                    <div className="contact_form">
                      {/* General Information */}
                      <div className="generel_info">
                        <div className="mr-md-3 mr-xl-5">
                          <h4 className="font-weight-bold">Administration</h4>
                        </div>
                        <div className="row">
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Employment Date"
                                name="employmentDate"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Employment Date !",
                                  },
                                ]}
                              >
                                <DatePicker
                                  format={activeStore.dateFormat
                                    .split(" ")[0]
                                    ?.toUpperCase()}
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="LSL Commencement Date"
                                name="lslComencementDate"
                              >
                                <DatePicker
                                  format={activeStore.dateFormat
                                    .split(" ")[0]
                                    ?.toUpperCase()}
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="LSL Eligibility Date"
                                name="lsleligibilityDate"
                              >
                                <DatePicker
                                  format={activeStore.dateFormat
                                    .split(" ")[0]
                                    ?.toUpperCase()}
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <div className=" pt-0">
                                <label className="mb-0">Years of Service</label>
                                <div className="row">
                                  <div className="col-md-6 col-lg-4">
                                    <Form.Item name="serviceDays">
                                      <Input placeholder="days" />
                                    </Form.Item>
                                  </div>
                                  <div className="col-md-6 col-lg-4">
                                    <Form.Item name="serviceMonths">
                                      <Input placeholder="months" />
                                    </Form.Item>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item label="Status" name="status">
                                <Select placeholder="Select Status">
                                  <Select.Option key={1} value={true}>
                                    Active
                                  </Select.Option>
                                  <Select.Option key={2} value={false}>
                                    Inactive
                                  </Select.Option>
                                </Select>
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Inactivity Date"
                                name="inactivityDate"
                              >
                                <DatePicker
                                  format={activeStore.dateFormat
                                    .split(" ")[0]
                                    ?.toUpperCase()}
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Termination Date"
                                name="terminationDate"
                              >
                                <DatePicker
                                  format={activeStore.dateFormat
                                    .split(" ")[0]
                                    ?.toUpperCase()}
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Birth Date"
                                name="birthDate"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Birth Date !",
                                  },
                                ]}
                              >
                                <DatePicker
                                  format={activeStore.dateFormat
                                    .split(" ")[0]
                                    ?.toUpperCase()}
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <div className=" pt-0">
                                <label className="mb-0">Age</label>
                                <div className="row">
                                  <div className="col-md-6 col-lg-4">
                                    <Form.Item name="ageDays" label="">
                                      <Input placeholder="year" />
                                    </Form.Item>
                                  </div>
                                  <div className="col-md-6 col-lg-4">
                                    <Form.Item label="" name="ageMonth">
                                      <Input placeholder="month" />
                                    </Form.Item>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            )}
            {current == 2 && (
              <Form form={taxForm}>
                {/* Financial details */}
                <div className="card mt-2">
                  <div className="card-body bg-light-blue">
                    <div className="contact_form">
                      <div className="finance_info">
                        <div className="mr-md-3 mr-xl-5">
                          <h4 className="font-weight-bold">Tax Information</h4>
                        </div>
                      </div>
                      {/* bank details */}
                      {/* Taxes */}
                      <div className="Payroll_taxes">
                        <div className="row">
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              {" "}
                              <Form.Item
                                label="Tax File Number"
                                name="taxFileNumber"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Tax File Number !",
                                  },
                                ]}
                              >
                                <Input placeholder="Tax File Number" />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="TFN Exepmtion"
                                name="tfnExepmtion"
                              >
                                <Select placeholder="Select TFN Exepmtion">
                                  {addEmployementSectionList?.tfnExcemptions?.map(
                                    (item) => {
                                      return (
                                        <Select.Option
                                          value={item.id}
                                          key={item.id}
                                        >
                                          {item.name}
                                        </Select.Option>
                                      );
                                    }
                                  )}
                                </Select>
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Employment Type"
                                name="employmentType"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Employment !",
                                  },
                                ]}
                              >
                                <Select placeholder="Select EmploymentType">
                                  {addEmployementSectionList?.employmentTypes?.map(
                                    (item) => {
                                      return (
                                        <Select.Option
                                          value={item.id}
                                          key={item.id}
                                        >
                                          {item.name}
                                        </Select.Option>
                                      );
                                    }
                                  )}
                                </Select>
                              </Form.Item>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <div className="form-group">
                              <Form.Item
                                label="Residency Status"
                                name="residencyStatus"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Residency Status !",
                                  },
                                ]}
                              >
                                <Select placeholder="Select Residency Status">
                                  <Select.Option key={1} value={true}>
                                    Active
                                  </Select.Option>
                                  <Select.Option key={2} value={false}>
                                    Inactive
                                  </Select.Option>
                                </Select>
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mt-2">
                  <div className="card-body bg-light-blue">
                    <div className="other_info">
                      <div className="row">
                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <Form.Item
                              label="Superannuation Fund Name"
                              name="superAnnuationFundName"
                            >
                              <Input placeholder="Superannuation Fund Name" />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <Form.Item
                              label="Payroll Tax State"
                              name="payrollTaxState"
                            >
                              <Select
                                placeholder="Select Payroll Tax State"
                                options={addEmployementSectionList?.countryStateCities
                                  ?.find(
                                    (country) =>
                                      country.id ==
                                      employeeForm.getFieldValue("country")
                                  )
                                  ?.states.map((state) => {
                                    return {
                                      label: state.value,
                                      value: state.id,
                                    };
                                  })}
                              />
                            </Form.Item>
                          </div>
                        </div>
                        {/* <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <Form.Item
                              label="Holiday Group"
                              name="holidayGroup"
                            >
                              <Input placeholder="Holiday Group" />
                            </Form.Item>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
            <div className="steps-action">
              {current > 0 && (
                <Button
                  className="prev-button"
                  danger
                  type="primary"
                  onClick={() => prev()}
                >
                  Previous
                </Button>
              )}
              {current < 3 - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === 3 - 1 && (
                <Button
                  loading={addEmployeeLoading}
                  onClick={onAddEmployeeHandler}
                  type="primary"
                >
                  Add Employee
                </Button>
              )}
            </div>
            {/* end */}
          </div>
        </div>
        {/* form tab end */}
      </div>
      {/* form end */}
    </div>
  );
};

export default AddEmployee;
