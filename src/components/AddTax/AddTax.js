import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "../Table Skeleton/TableSkeleton";
import {
  Button,
  Form,
  Spin,
  Switch,
  Select,
  Pagination,
  Input,
  Popconfirm,
} from "antd";
function AddTax({ isOpen, setIsOpen }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {
    editData,
    editLoading,
    taxSection,
    isLoading,
    addTaxSuccess,
    allTax,
    totalTax,
    deleteTaxSuccess,
    allLoading,
  } = useSelector((state) => state.settingsReducer);
  const [currentPagination, setCurrentPagination] = useState(1);

  useEffect(() => {
    dispatch({
      type: "GET_ALL_TAX_REQUEST",
      payload: {
        Page: currentPagination,
        PageSize: 5,
      },
    });
  }, [addTaxSuccess, deleteTaxSuccess, currentPagination]);
  const [bulkSelected, setBulkSelected] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const bulkDeleteHandler = () => {
    dispatch({
      type: "DELETE_TAX_REQUEST",
      payload: bulkSelected,
    });
  };
  useEffect(() => {
    dispatch({
      type: "GET_TAX_SECTION_REQUEST",
    });
  }, []);
  const addOrderTypeHandler = (values) => {
    dispatch({
      type: "ADD_TAX_REQUEST",
      payload: {
        ...values,
        Id: editData ? editData?.id : "",
      },
    });
  };
  useEffect(() => {
    if (addTaxSuccess) {
      form.resetFields();
    }
  }, [addTaxSuccess]);
  const editTax = (id) => {
    dispatch({
      type: "EDIT_TAX_REQUEST",
      payload: id,
    });
  };
  const deleteTaxHandler = (id, name) => {
    dispatch({
      type: "DELETE_TAX_REQUEST",
      payload: [
        {
          Id: id,
          Name: name,
        },
      ],
    });
  };
  return (
    <Modal
      show={isOpen}
      backdrop="static"
      size="lg"
      id="businessModal"
      tabIndex={-1}
    >
      <Modal.Header className="modal-header  ">
        <h5 className="modal-title" id="businessnamemodalLabel">
          Add Tax
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
            onFinish={addOrderTypeHandler}
            fields={[
              {
                name: ["TaxTypeId"],
                value: editData?.taxTypeId
                  ? editData?.taxTypeId
                  : taxSection?.taxType[0].id,
              },
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
                name: ["isDefault"],
                value: editData?.isDefault ? editData?.isDefault : false,
              },
              {
                name: ["Value"],
                value: editData?.value,
              },
            ]}
          >
            <div className="newsupplier_form bg-light p-3">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="after-add-more">
                      <div className="row control-group">
                        <div className="col-md-3">
                          <div className="form-group categoryField">
                            <Form.Item
                              label="Tax Type"
                              name="TaxTypeId"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Order Type !",
                                },
                              ]}
                            >
                              <Select>
                                {taxSection?.taxType?.map((taxType) => {
                                  return (
                                    <Select.Option
                                      value={taxType.id}
                                      key={taxType.id}
                                    >
                                      {taxType.value}
                                    </Select.Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group categoryField">
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
                                placeholder="Name"
                              />
                            </Form.Item>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group categoryField">
                            <Form.Item
                              label="Value"
                              name="Value"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Value",
                                },
                              ]}
                            >
                              <Input
                                type="number"
                                className="form-control"
                                placeholder="Value"
                              />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="col-md-4 categoryField">
                          <Form.Item
                            name="isActive"
                            label="Status"
                            valuePropName="checked"
                          >
                            <Switch defaultChecked={true} />
                          </Form.Item>
                        </div>
                        <div className="col-md-4 categoryField">
                          <Form.Item
                            name="isDefault"
                            label="Default"
                            valuePropName="checked"
                          >
                            <Switch defaultChecked={true} />
                          </Form.Item>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group categoryField">
                            <Form.Item label="Description" name="Description">
                              <Input.TextArea
                                type="text"
                                className="form-control"
                                placeholder="Description"
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex col-md-12">
                  <Button
                    htmlType="submit"
                    type="primary"
                    loading={isLoading}
                    className="btn btn-success btn-sm bg-theme border-0"
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
          </Form>
        </Spin>
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
                              defaultValue=""
                              id="defaultCheck1"
                            />
                          </div>
                        </th>
                        <th>Tax Name</th>
                        <th>Value</th>
                        <th>Tax type</th>
                        <th>Status</th>
                        <th>Default</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTax?.map((tax) => {
                        return (
                          <tr key={tax.id}>
                            <td>
                              <div className="form-check">
                                <input
                                  className="form-check-input mt-2 catcheck"
                                  type="checkbox"
                                  defaultValue=""
                                  id="defaultCheck1"
                                />
                              </div>
                            </td>
                            <td>{tax.name}</td>
                            <td>{tax.value}</td>
                            <td>{tax.taxType}</td>
                            <td>
                              {tax.isActive ? (
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
                              {tax.isDefault ? (
                                <span className="badge bg-info text-dark">
                                  Default
                                </span>
                              ) : (
                                <span className="badge bg-danger">
                                  Not Default
                                </span>
                              )}
                            </td>
                            <td>
                              <a
                                href=""
                                className="btn btn-info btn-sm"
                                data-bs-toggle="tooltip"
                                data-bs-placement="left"
                                title=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  editTax(tax.id);
                                }}
                                data-bs-original-title="Edit"
                              >
                                <i className="fas fa-edit" aria-hidden="true" />
                              </a>
                              <Popconfirm
                                okText="Yes"
                                onConfirm={() =>
                                  deleteTaxHandler(tax.id, tax.name)
                                }
                                cancelText="No"
                                title="Are you sure you want to delete?"
                              >
                                <a
                                  href=""
                                  className="btn ms-1 btn-danger btn-sm"
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
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="company_footer d-flex justify-content-end mt-3">
                <Pagination
                  total={totalTax}
                  pageSize={5}
                  defaultCurrent={1}
                  showTotal={(total, range) =>
                    `${allTax ? allTax.length : 0} out of ${
                      total ? total : 0
                    } items`
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

export default AddTax;
