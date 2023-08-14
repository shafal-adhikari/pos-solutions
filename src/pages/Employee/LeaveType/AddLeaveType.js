import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Select, Spin } from "antd";
import { Input, Switch, Pagination, Alert } from "antd";
import TableSkeleton from "../../../components/Table Skeleton/TableSkeleton";
import FormItemSkeleton from "../../../components/FormItemSkeleton/FormItemSkeleton";
function AddLeaveType({ isOpen, setIsOpen, selectedImage, setSelectedImage }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "GET_CATEGORIES_IMAGE_REQUEST",
    });
  }, []);
  const {
    allLeaveType,
    addSuccess,
    deleteSuccess,
    addLoading,
    isLoading,
    editData,
    editLoading,
    totalLeaveType,
  } = useSelector((state) => state.payrollSettingsReducer);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [bulkSelected, setBulkSelected] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    if (isOpen && editData) {
      form.setFields([
        {
          name: "Name",
          value: editData.name,
        },
        {
          name: "isActive",
          value: editData.isActive,
        },
      ]);
    }
  }, [editData, isOpen]);
  useEffect(() => {
    if (searchKeyword) {
      const searchTimeout = setTimeout(async () => {
        dispatch({
          type: "GET_ALL_LEAVE_TYPE_REQUEST",
          payload: {
            Page: 1,
            PageSize: 5,
            ExternalFilter: {
              SearchKeyWords: searchKeyword,
            },
          },
        });
      }, 500);
      return () => {
        clearTimeout(searchTimeout);
      };
    } else {
      dispatch({
        type: "GET_ALL_LEAVE_TYPE_REQUEST",
        payload: {
          Page: 1,
          PageSize: 5,
          ExternalFilter: {
            SearchKeyWords: "",
          },
        },
      });
    }
  }, [searchKeyword]);
  useEffect(() => {
    dispatch({
      type: "GET_ALL_LEAVE_TYPE_REQUEST",
      payload: {
        Page: currentPagination,
        PageSize: 5,
        ExternalFilter: {
          SearchKeyWords: "",
        },
      },
    });
    setBulkSelected([]);
  }, [addSuccess, deleteSuccess, currentPagination]);
  useEffect(() => {
    if (totalLeaveType == 0 && currentPagination > 1) {
      setCurrentPagination((prevPag) => prevPag - 1);
    }
  }, [totalLeaveType]);
  useEffect(() => {
    if (addSuccess) {
      form.resetFields();
    }
  }, [addSuccess]);

  const editLeaveType = (id) => {
    dispatch({
      type: "EDIT_LEAVE_TYPE_REQUEST",
      payload: id,
    });
  };
  const bulkDeleteHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_LEAVE_TYPE_REQUEST",
      payload: [...bulkSelected],
    });
  };
  const deleteLeaveTypeHandler = (id, name) => {
    dispatch({
      type: "DELETE_LEAVE_TYPE_REQUEST",
      payload: [
        {
          Id: id,
          Name: name,
        },
      ],
    });
  };
  const addLeaveTypeHandler = (values) => {
    dispatch({
      type: "ADD_NEW_LEAVE_TYPE_REQUEST",
      payload: [
        {
          ...values,
          Id: editData ? editData.id : "",
        },
      ],
    });
  };
  return (
    <Modal
      show={isOpen}
      size="lg"
      backdrop="static"
      id="businessModal"
      tabIndex={-1}
    >
      <Modal.Header className="modal-header">
        <h5 className="modal-title" id="businessnamemodalLabel">
          Add New Leave Type
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => {
            setIsOpen(false);
            dispatch({
              type: "RESET_EDIT_DATA",
            });
          }}
        ></button>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form
          form={form}
          onFinish={addLeaveTypeHandler}
          initialValues={{
            isActive: true,
          }}
        >
          <div className="newsupplier_form bg-light p-3">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12 categoryField">
                <div className=" form-group ">
                  {editLoading ? (
                    <div className="row control-group">
                      <div className="col-md-3">
                        <div className="form-group">
                          <FormItemSkeleton />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <FormItemSkeleton />
                      </div>
                      <div className="col-md-12 d-flex">
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
                          onClick={() => {
                            setIsOpen(false);
                            dispatch({
                              type: "RESET_EDIT_DATA",
                            });
                          }}
                          style={{ marginLeft: "5px" }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="row control-group">
                      <div className="col-md-3">
                        <div className="form-group">
                          <Form.Item
                            label="Name"
                            name="Name"
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
                              placeholder="Leave Type Name"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <Form.Item
                          name="isActive"
                          label="Status"
                          valuePropName="checked"
                        >
                          <Switch defaultChecked={true} />
                        </Form.Item>
                      </div>
                      <div className="col-md-12 d-flex">
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
                          onClick={() => {
                            setIsOpen(false);
                            dispatch({
                              type: "RESET_EDIT_DATA",
                            });
                          }}
                          style={{ marginLeft: "5px" }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Form>

        <div className="card mt-2 ">
          <div className="card-body">
            <div className="table-body">
              <div className="d-flex justify-content-between flex-wrap align-items-center mb-3">
                <div className="delete_btn">
                  {bulkSelected.length > 0 && (
                    <a
                      onClick={bulkDeleteHandler}
                      className="btn btn-danger border-0 rounded-0"
                    >
                      <i className="fas fa-trash-alt me-1 " />
                      Delete
                    </a>
                  )}
                </div>
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
              {isLoading ? (
                <TableSkeleton row={2} column={5} />
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover  align-middle table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>
                          <div className="form-check">
                            <input
                              className="form-check-input mt-2 catcheck"
                              type="checkbox"
                              checked={
                                allLeaveType?.length == bulkSelected.length
                              }
                              value={
                                allLeaveType?.length == bulkSelected.length
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelected(
                                    allLeaveType?.map((category) => {
                                      return {
                                        Id: category.id,
                                        Name: category.name,
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
                      {allLeaveType?.length > 0 ? (
                        allLeaveType?.map((leaveType) => {
                          return (
                            <tr key={leaveType.id}>
                              <td>
                                <div className="form-check">
                                  <input
                                    className="form-check-input mt-2 catcheck"
                                    type="checkbox"
                                    checked={
                                      bulkSelected.find(
                                        (eachPrev) =>
                                          eachPrev.Id == leaveType.id
                                      )
                                        ? true
                                        : false
                                    }
                                    value={
                                      bulkSelected.find(
                                        (eachPrev) =>
                                          eachPrev.Id == leaveType.id
                                      )
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      if (!e.target.checked) {
                                        setBulkSelected((prev) => {
                                          return prev.filter(
                                            (prevEach) =>
                                              prevEach.Id != leaveType.id
                                          );
                                        });
                                      } else {
                                        setBulkSelected((prev) => {
                                          return [
                                            ...prev,
                                            {
                                              Id: leaveType.id,
                                              Name: leaveType.name,
                                            },
                                          ];
                                        });
                                      }
                                    }}
                                    id="defaultCheck1"
                                  />
                                </div>
                              </td>
                              <td>{leaveType.name}</td>
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
                                    checked={leaveType.isActive ? true : false}
                                  />
                                </div>
                              </td>
                              <td>
                                <a
                                  href=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                    editLeaveType(leaveType.id);
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
                                <a
                                  href=""
                                  className="ms-1 btn btn-danger btn-sm"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="left"
                                  title=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteLeaveTypeHandler(
                                      leaveType.id,
                                      leaveType.name
                                    );
                                  }}
                                  data-bs-original-title="Delete"
                                >
                                  <i
                                    className="fas fa-trash-alt"
                                    aria-hidden="true"
                                  />
                                </a>
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
                  total={totalLeaveType}
                  showTotal={(total, range) =>
                    `${allLeaveType ? allLeaveType.length : 0} out of ${
                      total ? total : 0
                    } items`
                  }
                  pageSize={5}
                  defaultCurrent={1}
                  onChange={(val) => setCurrentPagination(val)}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddLeaveType;
