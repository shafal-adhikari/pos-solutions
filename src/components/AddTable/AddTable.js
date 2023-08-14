import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "../Table Skeleton/TableSkeleton";

import {
  Button,
  Form,
  Spin,
  Switch,
  Pagination,
  Input,
  Popconfirm,
  Tooltip,
  Select,
} from "antd";
import TableQR from "../TableQR/TableQR";
function AddTable({ isOpen, setIsOpen, selectedImage }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {
    allTables,
    editData,
    editLoading,
    totalTables,
    isLoading,
    addTableSuccess,
    tableQR,
    allLoading,
    tableSection,
    deleteTableSuccess,
  } = useSelector((state) => state.settingsReducer);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [selectedTableLocation, setSelectedTableLocation] = useState();
  const [imageError, setImageError] = useState();
  const [bulkSelected, setBulkSelected] = useState([]);
  const [isQRPreviewOpen, setIsQRPreviewOpen] = useState(false);

  useEffect(() => {
    dispatch({
      type: "GET_TABLE_IMAGES_REQUEST",
    });
  }, []);
  useEffect(() => {
    if (tableSection) {
      setSelectedTableLocation(tableSection.tableLocations[0]);
    }
  }, [tableSection]);

  function onShowSizeChange(current, pageSize) {
    setCurrentPagination(current);
    window.scrollTo(0, 0);
    dispatch({
      type: "GET_ALL_TABLES_REQUEST",
      payload: {
        Page: current,
        PageSize: 5,
      },
    });
    setBulkSelected([]);
  }
  useEffect(() => {
    if (tableQR) {
      setIsQRPreviewOpen(true);
    }
  }, [tableQR]);
  // setIsQRPreviewOpen(true);
  useEffect(() => {
    dispatch({
      type: "GET_ALL_TABLES_REQUEST",
      payload: {
        Page: currentPagination,
        PageSize: 5,
      },
    });
    setBulkSelected([]);
  }, [addTableSuccess, deleteTableSuccess]);
  useEffect(() => {
    if (totalTables == 0 && currentPagination > 1) {
      setCurrentPagination((currentPagination) => currentPagination - 1);
    }
  }, [totalTables]);
  useEffect(() => {
    if (addTableSuccess) {
      form.resetFields();
    }
  }, [addTableSuccess]);
  useEffect(() => {
    if (selectedImage) {
      setImageError(null);
    }
  }, [selectedImage]);
  const bulkDeleteHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_TABLE_REQUEST",
      payload: [...bulkSelected],
    });
  };
  const addTableHandler = (values) => {
    dispatch({
      type: "ADD_TABLE_REQUEST",
      payload: {
        ...values,
        Id: editData ? editData.id : "",
        TableImageId: selectedImage ? selectedImage.id : "",
        TableLocationId: selectedTableLocation.id,
      },
    });
  };
  const editTableHandler = (id) => {
    dispatch({
      type: "EDIT_TABLE_REQUEST",
      payload: id,
    });
  };
  const deleteTableHandler = (id, name) => {
    dispatch({
      type: "DELETE_TABLE_REQUEST",
      payload: [
        {
          Id: id,
          Name: name,
        },
      ],
    });
  };
  return (
    <>
      <Modal
        show={isOpen}
        size="lg"
        backdrop="static"
        id="businessModal"
        tabIndex={-1}
      >
        <Modal.Header className="modal-header  ">
          <h5 className="modal-title" id="businessnamemodalLabel">
            Add New Table
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
            <div className="newsupplier_form bg-light p-3">
              <Form
                form={form}
                onFinish={addTableHandler}
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
                  {
                    name: ["ChildCapacity"],
                    value: editData?.childCapacity,
                  },
                  {
                    name: ["AdultCapacity"],
                    value: editData?.adultCapacity,
                  },
                ]}
              >
                <div className="newsupplier_form bg-light p-3">
                  <div className="row ">
                    <div className="col-md-12 text-start">
                      <div className=" form-group categoryField">
                        <div className="">
                          <div className="row control-group">
                            <div className="col-md-4">
                              <div className="form-group">
                                <div className="pt-0">
                                  <Form.Item label="Table Location">
                                    <Select
                                      className="form-control form-select"
                                      value={tableSection?.tableLocations?.indexOf(
                                        selectedTableLocation
                                      )}
                                      onChange={(e) =>
                                        setSelectedTableLocation(
                                          tableSection?.tableLocations[e]
                                        )
                                      }
                                    >
                                      {tableSection?.tableLocations?.map(
                                        (tablelocation, index) => {
                                          return (
                                            <Select.Option
                                              value={index}
                                              key={tablelocation.id}
                                            >
                                              {tablelocation.name}
                                            </Select.Option>
                                          );
                                        }
                                      )}
                                    </Select>
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <Form.Item
                                  label="Table Name"
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
                                    placeholder="Table Name"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <Form.Item
                                  label="Adult Capacity"
                                  name="AdultCapacity"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please Enter Capacity",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="number"
                                    className="form-control"
                                    placeholder="Adult Capacity"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <Form.Item
                                  label="Child Capacity"
                                  name="ChildCapacity"
                                  // rules={[
                                  //   {
                                  //     required: true,
                                  //     message: "Please Enter Capacity",
                                  //   },
                                  // ]}
                                >
                                  <Input
                                    type="number"
                                    className="form-control"
                                    placeholder="Child Capacity"
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
                                <Switch defaultChecked={true} />
                              </Form.Item>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <Form.Item
                                  label="Description"
                                  name="Description"
                                >
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
                                }}
                              >
                                {!isLoading && "Save "}
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
            </div>
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
                                  allTables?.length == bulkSelected.length
                                }
                                value={allTables?.length == bulkSelected.length}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setBulkSelected(
                                      allTables?.map((category) => {
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
                          <th> Adult</th>
                          <th> Child</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allTables?.length > 0 ? (
                          allTables?.map((table) => {
                            return (
                              <tr key={table.id}>
                                <td>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input mt-2 catcheck"
                                      type="checkbox"
                                      checked={
                                        bulkSelected.find(
                                          (eachPrev) => eachPrev.Id == table.id
                                        )
                                          ? true
                                          : false
                                      }
                                      value={
                                        bulkSelected.find(
                                          (eachPrev) => eachPrev.Id == table.id
                                        )
                                          ? true
                                          : false
                                      }
                                      onChange={(e) => {
                                        if (!e.target.checked) {
                                          setBulkSelected((prev) => {
                                            return prev.filter(
                                              (prevEach) =>
                                                prevEach.Id != table.id
                                            );
                                          });
                                        } else {
                                          setBulkSelected((prev) => {
                                            return [
                                              ...prev,
                                              {
                                                Id: table.id,
                                                Name: table.name,
                                              },
                                            ];
                                          });
                                        }
                                      }}
                                      id="defaultCheck1"
                                    />
                                  </div>
                                </td>
                                <td>{table.name}</td>
                                <td>{table.adultCapacity}</td>
                                <td>{table.childCapacity}</td>
                                <td>
                                  {table.isActive ? (
                                    <span className="badge bg-info text-dark">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="badge bg-danger">
                                      Inactive
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <a
                                    href=""
                                    className="btn btn-info btn-sm ms-1 me-1"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="left"
                                    title=""
                                    onClick={(e) => {
                                      e.preventDefault();
                                      editTableHandler(table.id);
                                    }}
                                    data-bs-original-title="Edit"
                                  >
                                    <i
                                      className="fas fa-edit"
                                      aria-hidden="true"
                                    />
                                  </a>
                                  <Popconfirm
                                    okText="Yes"
                                    onConfirm={() =>
                                      deleteTableHandler(table.id, table.name)
                                    }
                                    cancelText="No"
                                    title="Are you sure you want to delete?"
                                  >
                                    <a
                                      href=""
                                      className="btn btn-danger btn-sm me-1"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="left"
                                      title=""
                                      onClick={(e) => e.preventDefault()}
                                      data-bs-original-title="Delete"
                                    >
                                      <i
                                        className="fas fa-trash-alt"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </Popconfirm>
                                  <Tooltip title="Generate QR">
                                    <a
                                      href=""
                                      className="btn btn-sm qrButton me-1"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="left"
                                      title=""
                                      onClick={(e) => {
                                        e.preventDefault();
                                        dispatch({
                                          type: "GENERATE_TABLE_QR_REQUEST",
                                          payload: {
                                            Id: table.id,
                                          },
                                        });
                                      }}
                                      data-bs-original-title="Delete"
                                    >
                                      <i
                                        className="fa fa-qrcode"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title="View Table QR">
                                    <a
                                      href=""
                                      className="btn btn-sm viewButton"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="left"
                                      title=""
                                      onClick={(e) => {
                                        e.preventDefault();
                                        dispatch({
                                          type: "VIEW_TABLE_QR_REQUEST",
                                          payload: {
                                            Id: table.id,
                                          },
                                        });
                                      }}
                                      data-bs-original-title="Delete"
                                    >
                                      <i
                                        className="fa fa-eye"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </Tooltip>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr style={{ textAlign: "center" }}>
                            <td colSpan={5}>No Results Found !</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="company_footer d-flex justify-content-end mt-3">
                  <Pagination
                    total={totalTables}
                    pageSize={5}
                    showTotal={(total, range) =>
                      `${allTables ? allTables.length : 0} out of ${
                        total ? total : 0
                      } items`
                    }
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
      <TableQR isOpen={isQRPreviewOpen} setIsOpen={setIsQRPreviewOpen} />
    </>
  );
}

export default AddTable;
