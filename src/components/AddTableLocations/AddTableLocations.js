import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Spin, Switch, Pagination } from "antd";
import { Input } from "antd";
import TableSkeleton from "../Table Skeleton/TableSkeleton";
function AddTableLocation({ isOpen, setIsOpen }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {
    allTableLocations,
    editData,
    editLoading,
    isLoading,
    addTableLocationSuccess,
    totalTableLocations,
    allLoading,
    deleteTableLocationSuccess,
  } = useSelector((state) => state.settingsReducer);
  const [currentPagination, setCurrentPagination] = useState(1);
  useEffect(() => {
    if (totalTableLocations == 0) {
      if (currentPagination > 1) {
        setCurrentPagination((currentPagination) => currentPagination - 1);
      }
    }
  }, [totalTableLocations]);
  useEffect(() => {
    dispatch({
      type: "GET_ALL_TABLE_LOCATIONS_REQUEST",
      payload: {
        Page: currentPagination,
        PageSize: 5,
      },
    });
    setBulkSelected([]);
  }, [addTableLocationSuccess, deleteTableLocationSuccess, currentPagination]);
  const [bulkSelected, setBulkSelected] = useState([]);

  useEffect(() => {
    if (addTableLocationSuccess) {
      form.resetFields();
    }
  }, [addTableLocationSuccess]);
  const addTableLocationHandler = (values) => {
    dispatch({
      type: "ADD_TABLE_LOCATION_REQUEST",
      payload: {
        ...values,
        Id: editData?.id ? editData.id : "",
      },
    });
  };
  const editTableLocationHandler = (id) => {
    dispatch({
      type: "EDIT_TABLE_LOCATION_REQUEST",
      payload: id,
    });
  };
  const deleteTableLocationHandler = (id, name) => {
    dispatch({
      type: "DELETE_TABLE_LOCATION_REQUEST",
      payload: [
        {
          Id: id,
          Name: name,
        },
      ],
    });
  };
  const bulkDeleteHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_TABLE_LOCATION_REQUEST",
      payload: [...bulkSelected],
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
      <Modal.Header className="modal-header  ">
        <h5 className="modal-title" id="businessnamemodalLabel">
          Add New Table Location
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          onClick={() => {
            setIsOpen(false);
            dispatch({
              type: "RESET_EDIT_DATA",
            });
          }}
          aria-label="Close"
        />
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Spin spinning={editLoading}>
          <Form
            form={form}
            onFinish={addTableLocationHandler}
            fields={[
              {
                name: ["Name"],
                value: editData?.name,
              },
              {
                name: ["Description"],
                value: editData?.description,
              },
              {
                name: ["isActive"],
                value: editData
                  ? editData?.isActive
                  : form.getFieldValue("isActive")
                  ? form.getFieldValue("isActive")
                  : true,
              },
            ]}
          >
            <div className="newsupplier_form bg-light p-3">
              <div className="row ">
                <div className="col-md-12">
                  <div className=" form-group categoryField">
                    <div className="">
                      <div className="row control-group">
                        <div className="col-md-3">
                          <div className="form-group">
                            <Form.Item
                              label="Table Location"
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
                                placeholder="Table Location"
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
                        <div className="col-md-12">
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
                        <div className="col-md-12">
                          <Button
                            htmlType="submit"
                            type="primary"
                            loading={isLoading}
                            className="btn btn-success btn-sm bg-theme border-0"
                            style={{
                              background: "#09B29C",
                              width: "100px",
                              height: "30px",
                            }}
                          >
                            {!isLoading && "Save"}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Spin>

        <div className="card mt-3 ">
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
                  <table className="table table-hover  align-middle table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>
                          <div className="form-check">
                            <input
                              className="form-check-input mt-2 catcheck"
                              type="checkbox"
                              checked={
                                allTableLocations?.length == bulkSelected.length
                              }
                              value={
                                allTableLocations?.length == bulkSelected.length
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelected(
                                    allTableLocations?.map((category) => {
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
                        <th> Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTableLocations?.length > 0 ? (
                        allTableLocations?.map((tableLocation) => {
                          return (
                            <tr key={tableLocation.id}>
                              <td>
                                <div className="form-check">
                                  <input
                                    className="form-check-input mt-2 catcheck"
                                    type="checkbox"
                                    checked={
                                      bulkSelected.find(
                                        (eachPrev) =>
                                          eachPrev.Id == tableLocation.id
                                      )
                                        ? true
                                        : false
                                    }
                                    value={
                                      bulkSelected.find(
                                        (eachPrev) =>
                                          eachPrev.Id == tableLocation.id
                                      )
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      if (!e.target.checked) {
                                        setBulkSelected((prev) => {
                                          return prev.filter(
                                            (prevEach) =>
                                              prevEach.Id != tableLocation.id
                                          );
                                        });
                                      } else {
                                        setBulkSelected((prev) => {
                                          return [
                                            ...prev,
                                            {
                                              Id: tableLocation.id,
                                              Name: tableLocation.name,
                                            },
                                          ];
                                        });
                                      }
                                    }}
                                    id="defaultCheck1"
                                  />
                                </div>
                              </td>
                              <td>{tableLocation.name}</td>
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
                                    checked={
                                      tableLocation.isActive ? true : false
                                    }
                                  />
                                </div>
                              </td>
                              <td>
                                <a
                                  href=""
                                  className="btn btn-info btn-sm"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="left"
                                  title=""
                                  data-bs-original-title="Edit"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    editTableLocationHandler(tableLocation.id);
                                  }}
                                >
                                  <i
                                    className="fas fa-edit"
                                    aria-hidden="true"
                                  />
                                </a>
                                <a
                                  href=""
                                  className="btn btn-danger btn-sm ms-1"
                                  data-bs-toggle="tooltip"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteTableLocationHandler(
                                      tableLocation.id,
                                      tableLocation.name
                                    );
                                  }}
                                  data-bs-placement="left"
                                  title=""
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
                          <td colSpan={4}>No Records Found!</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="company_footer d-flex justify-content-end mt-3">
                <Pagination
                  total={totalTableLocations}
                  pageSize={5}
                  current={currentPagination}
                  showTotal={(total, range) =>
                    `${
                      allTableLocations ? allTableLocations.length : 0
                    } out of ${total ? total : 0} items`
                  }
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

export default AddTableLocation;
