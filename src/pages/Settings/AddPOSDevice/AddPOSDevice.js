import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Pagination,
  Popconfirm,
  Select,
  Spin,
  Switch,
} from "antd";
import { Input } from "antd";
import TableSkeleton from "../../../components/Table Skeleton/TableSkeleton";
function AddPOSDevice({ isOpen, setIsOpen }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [bulkSelected, setBulkSelected] = useState([]);

  const {
    allPOSDevices,
    totalPOSDevices,
    editLoading,
    posDeviceAddSection,
    addPOSDeviceSuccess,
    editData,
    addLoading,
    allLoading,
    deletePOSDeviceSuccess,
  } = useSelector((state) => state.posDeviceSettingsReducer);

  const bulkDeleteHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_POS_DEVICE_REQUEST",
      payload: [...bulkSelected],
    });
  };
  useEffect(() => {
    if (posDeviceAddSection) {
      form.setFieldValue("departmentId", posDeviceAddSection.departments[0].id);
    }
  }, [posDeviceAddSection]);
  useEffect(() => {
    dispatch({
      type: "GET_ALL_POS_DEVICE_REQUEST",
      payload: {
        Page: 1,
        PageSize: 5,
      },
    });
    setBulkSelected([]);
  }, [addPOSDeviceSuccess, deletePOSDeviceSuccess]);
  useEffect(() => {
    if (addPOSDeviceSuccess) {
      form.resetFields();
    }
  }, [addPOSDeviceSuccess]);
  useEffect(() => {
    dispatch({
      type: "GET_POS_DEVICE_SECTION_LIST_REQUEST",
    });
    form.setFieldValue("isActive", true);
  }, []);
  const editDepartmentHandler = (id) => {
    dispatch({
      type: "EDIT_POS_DEVICE_REQUEST",
      payload: id,
    });
  };
  const deleteDepartmentHandler = (id, name) => {
    dispatch({
      type: "DELETE_POS_DEVICE_REQUEST",
      payload: [
        {
          Id: id,
          Name: name,
        },
      ],
    });
  };
  const [searchKeyword, setSearchKeyword] = useState("");
  const addPOSDeviceHandler = (values) => {
    dispatch({
      type: "ADD_POS_DEVICE_REQUEST",
      payload: {
        ...values,
        sortOrder: parseInt(values.sortOrder),
        Id: editData?.id ? editData.id : "",
      },
    });
  };
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);
    dispatch({
      type: "GET_ALL_POS_DEVICE_REQUEST",
      payload: {
        Page: current,
        PageSize: pageSize,
      },
    });
  }
  return (
    <Modal
      show={isOpen}
      size="lg"
      backdrop="static"
      onHide={() => setIsOpen(false)}
      id="businessModal"
      tabIndex={-1}
    >
      <Modal.Header className="modal-header">
        <h5 className="modal-title" id="businessnamemodalLabel">
          Add New POS Device
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setIsOpen(false)}
        ></button>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form
          form={form}
          onFinish={addPOSDeviceHandler}
          fields={[
            {
              name: ["DepartmentId"],
              value: editData
                ? editData.departmentId
                : form.getFieldValue("DepartmentId"),
            },
            {
              name: ["Name"],
              value: editData
                ? editData.posDeviceNameOrLocation
                : form.getFieldValue("Name"),
            },
            {
              name: ["Description"],
              value: editData
                ? editData.description
                : form.getFieldValue("Description"),
            },
            {
              name: ["sortOrder"],
              value: editData
                ? editData.sortOrder
                : form.getFieldValue("sortOrder"),
            },
            {
              name: ["isActive"],
              value: editData
                ? editData?.isActive
                  ? true
                  : false
                : form.getFieldValue("isActive"),
            },
          ]}
        >
          <div className="newsupplier_form bg-light p-3">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12 categoryField">
                <div className=" form-group ">
                  <div className="row control-group">
                    <div className="col-md-4">
                      <div className="form-group">
                        <Form.Item
                          label="Department"
                          name="departmentId"
                          rules={[
                            {
                              required: true,
                              message: "Please Choose Department",
                            },
                          ]}
                        >
                          <Select placeholder="Choose Department">
                            {posDeviceAddSection?.departments.map(
                              (department) => {
                                return (
                                  <Select.Option
                                    value={department.id}
                                    key={department.id}
                                  >
                                    {department.value}
                                  </Select.Option>
                                );
                              }
                            )}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <Form.Item
                          label="Name"
                          name="PosDeviceNameOrLocation"
                          rules={[
                            {
                              required: true,
                              message: "Please Enter Name",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <Form.Item
                          label="Sort"
                          name="sortOrder"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Sort Order",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Sort"
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="col-md-8">
                      <div className="form-group">
                        <Form.Item label="Description" name="Description">
                          <Input.TextArea
                            type="text"
                            className="form-control"
                            placeholder="Description"
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <Form.Item
                        name="isActive"
                        label="Status"
                        valuePropName="checked"
                      >
                        <Switch defaultChecked={true} defaultChecked={true} />
                      </Form.Item>
                    </div>
                    <div className="col-md-12 d-flex mt-3">
                      <Button
                        htmlType="submit"
                        type="primary"
                        loading={addLoading}
                        className="btn btn-success btn-sm bg-theme border-0"
                      >
                        Save
                      </Button>
                      <Button
                        type="danger"
                        onClick={() => setIsOpen(false)}
                        style={{ marginLeft: "5px" }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
        <div className="card mt-2 ">
          <div className="card-body">
            <div className="table-body">
              <div className="d-flex justify-content-between flex-wrap align-items-center mb-3">
                {/* <div className="delete_btn">
                  {bulkSelected.length > 0 && (
                    <a
                      onClick={bulkDeleteHandler}
                      className="btn btn-danger border-0 rounded-0"
                    >
                      <i className="fas fa-trash-alt me-1 " />
                      Delete
                    </a>
                  )}
                </div> */}
                <div className="table_search">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text  h-100 rounded-0"
                        id="search"
                      >
                        <i className="fas fa-search" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search now"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      aria-label="search"
                      aria-describedby="search"
                      spellCheck="false"
                      data-ms-editor="true"
                    />
                  </div>
                </div>
              </div>

              {allLoading ? (
                <TableSkeleton row={2} column={5} />
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>
                          <div className="form-check">
                            <input
                              className="form-check-input mt-2 catcheck"
                              type="checkbox"
                              checked={
                                allPOSDevices?.length == bulkSelected.length
                              }
                              value={
                                allPOSDevices?.length == bulkSelected.length
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelected(
                                    allPOSDevices?.map((brand) => {
                                      return {
                                        Id: brand.id,
                                        Name: brand.name,
                                      };
                                    })
                                  );
                                } else {
                                  setBulkSelected([]);
                                }
                              }}
                              id="defaultCheck1"
                            />
                          </div>
                        </th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPOSDevices?.length > 0 ? (
                        allPOSDevices?.map((department) => {
                          return (
                            <tr key={department.id}>
                              <td>
                                <div className="form-check">
                                  <input
                                    className="form-check-input mt-2 catcheck"
                                    type="checkbox"
                                    checked={
                                      bulkSelected.find(
                                        (eachPrev) =>
                                          eachPrev.Id == department.id
                                      )
                                        ? true
                                        : false
                                    }
                                    value={
                                      bulkSelected.find(
                                        (eachPrev) =>
                                          eachPrev.Id == department.id
                                      )
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      if (!e.target.checked) {
                                        setBulkSelected((prev) => {
                                          return prev.filter(
                                            (prevEach) =>
                                              prevEach.Id != department.id
                                          );
                                        });
                                      } else {
                                        setBulkSelected((prev) => {
                                          return [
                                            ...prev,
                                            {
                                              Id: department.id,
                                              Name: department.name,
                                            },
                                          ];
                                        });
                                      }
                                    }}
                                    id="defaultCheck1"
                                  />
                                </div>
                              </td>
                              <td>{department.posDeviceNameOrLocation}</td>
                              <td>
                                <div
                                  className="form-check form-switch form-switch-lg text-start"
                                  dir="ltr"
                                >
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    readOnly
                                    checked={department.isActive ? true : false}
                                  />
                                </div>
                              </td>
                              <td>
                                <a
                                  href=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                    editDepartmentHandler(department.id);
                                  }}
                                  className="btn btn-info btn-sm"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="left"
                                  title=""
                                  data-bs-original-title="Edit"
                                >
                                  <i
                                    className="fas fa-edit"
                                    aria-hidden="true"
                                  />
                                </a>
                                {/* <Popconfirm
                                  title="Are you sure you want to delete"
                                  okText="Yes"
                                  cancelText="No"
                                  onConfirm={() =>
                                    deleteDepartmentHandler(
                                      department.id,
                                      department.name
                                    )
                                  }
                                >
                                  <a
                                    className="btn btn-danger btn-sm ms-1"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="left"
                                    title=""
                                    data-bs-original-title="Delete"
                                  >
                                    <i
                                      className="fas fa-trash-alt"
                                      aria-hidden="true"
                                    />
                                  </a>
                                </Popconfirm> */}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr style={{ textAlign: "center" }}>
                          <td colSpan={5}>No Records Found !</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="company_footer d-flex justify-content-end mt-3">
                <Pagination
                  total={totalPOSDevices}
                  showTotal={(total, range) =>
                    `${allPOSDevices ? allPOSDevices.length : 0} out of ${
                      total ? total : 0
                    } items`
                  }
                  pageSize={5}
                  onShowSizeChange={onShowSizeChange}
                  defaultCurrent={1}
                  onChange={onShowSizeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddPOSDevice;
