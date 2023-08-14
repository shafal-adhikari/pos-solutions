import React, { useEffect, useState } from "react";
import SettingsSidebar from "../../components/SettingsSidebar/SettingsSidebar";
import { useDispatch, useSelector } from "react-redux";
import AddCategory from "../../components/AddCategory/AddCategory";
import ImageLibrary from "../../components/ImageLibrary/ImageLibrary";
import AddBrand from "../../components/AddBrand/AddBrand";
import { Form, Select, Spin } from "antd";
import AddTableLocations from "../../components/AddTableLocations/AddTableLocations";
import AddTable from "../../components/AddTable/AddTable";
import AddOrderType from "../../components/AddOrderType/AddOrderType";
import AddTax from "../../components/AddTax/AddTax";
import FormItemSkeleton from "../../components/FormItemSkeleton/FormItemSkeleton";
import AddCategoryType from "../../components/AddCategoryType/AddCategoryType";
import AddLeaveType from "./LeaveType/AddLeaveType";
import AddPayScaleLevel from "./PayScaleLevel/AddPayScaleLevel";
import AddYear from "./AddYear/AddYear";
import AddDocumentType from "./AddDocumentType/AddDocumentType";
function Settings() {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState();

  const { allLoading, payrollSettingsList, addSuccess, deleteSuccess } =
    useSelector((state) => state.payrollSettingsReducer);
  useEffect(() => {
    dispatch({
      type: "GET_ALL_PAYROLL_SETTINGS_REQUEST",
    });
  }, [addSuccess, deleteSuccess]);
  const [isLeaveTypeModalOpen, setIsLeaveTypeModalOpen] = useState(false);
  const [isPayScaleModalOpen, setIsPayScaleModalOpen] = useState(false);
  const [isYearModalOpen, setIsYearModalOpen] = useState(false);
  const [isDocumentTypeModalOpen, setIsDocumentTypeModalOpen] = useState(false);

  return (
    <>
      <div className="possetting">
        <div className="card text-left border-0">
          <Form>
            <div className="card-body categoryField">
              <div className="supplier_filter1">
                {allLoading ? (
                  <div className="row">
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                        <FormItemSkeleton />
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                        <FormItemSkeleton />
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                        <FormItemSkeleton />
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                        <FormItemSkeleton />
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                        <FormItemSkeleton />
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                        <FormItemSkeleton />
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                        <FormItemSkeleton />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group flex-column d-flex">
                        <div>
                          <label className="control-label">Leave Type</label>
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              setIsLeaveTypeModalOpen(true);
                            }}
                          >
                            <i
                              className="fas fa-plus mb-2 ms-1"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title=""
                            />
                          </a>
                        </div>
                        <Select
                          placeholder="Leave Type"
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={payrollSettingsList?.leaveTypes.map(
                            (categoryType) => {
                              return {
                                value: categoryType.id,
                                label: categoryType.value,
                              };
                            }
                          )}
                        ></Select>
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group flex-column d-flex">
                        <div>
                          <label className="control-label">
                            Pay Scale Level
                          </label>
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              setIsPayScaleModalOpen(true);
                            }}
                          >
                            <i
                              className="fas fa-plus mb-2 ms-1"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title=""
                            />
                          </a>
                        </div>
                        <Select
                          placeholder="Pay Scale Level"
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={payrollSettingsList?.payScaleLevels.map(
                            (categoryType) => {
                              return {
                                value: categoryType.id,
                                label: categoryType.value,
                              };
                            }
                          )}
                        ></Select>
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group flex-column d-flex">
                        <div>
                          <label className="control-label">Year</label>
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              setIsYearModalOpen(true);
                            }}
                          >
                            <i
                              className="fas fa-plus mb-2 ms-1"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title=""
                            />
                          </a>
                        </div>
                        <Select
                          placeholder="Year"
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={payrollSettingsList?.years.map(
                            (categoryType) => {
                              return {
                                value: categoryType.id,
                                label: categoryType.value,
                              };
                            }
                          )}
                        ></Select>
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group flex-column d-flex">
                        <div>
                          <label className="control-label">Document Type</label>
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              setIsDocumentTypeModalOpen(true);
                            }}
                          >
                            <i
                              className="fas fa-plus mb-2 ms-1"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title=""
                            />
                          </a>
                        </div>
                        <Select
                          placeholder="Document Type"
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={payrollSettingsList?.documentTypes.map(
                            (categoryType) => {
                              return {
                                value: categoryType.id,
                                label: categoryType.value,
                              };
                            }
                          )}
                        ></Select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Form>
        </div>
      </div>
      {isLeaveTypeModalOpen && (
        <AddLeaveType
          isOpen={isLeaveTypeModalOpen}
          setIsOpen={setIsLeaveTypeModalOpen}
        />
      )}
      {isPayScaleModalOpen && (
        <AddPayScaleLevel
          isOpen={isPayScaleModalOpen}
          setIsOpen={setIsPayScaleModalOpen}
        />
      )}
      {isYearModalOpen && (
        <AddYear isOpen={isYearModalOpen} setIsOpen={setIsYearModalOpen} />
      )}
      {isDocumentTypeModalOpen && (
        <AddDocumentType
          isOpen={isDocumentTypeModalOpen}
          setIsOpen={setIsDocumentTypeModalOpen}
        />
      )}
    </>
  );
}

export default Settings;
