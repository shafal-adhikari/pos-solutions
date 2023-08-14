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
  Checkbox,
} from "antd";
function AddOrderType({ isOpen, setIsOpen }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {
    editData,
    editLoading,
    orderTypeSection,
    isLoading,
    addOrderTypeSuccess,
    allOrderTypes,
    totalOrderTypes,
    allLoading,
    deleteOrderTypeSuccess,
  } = useSelector((state) => state.settingsReducer);
  const [bulkSelected, setBulkSelected] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const bulkDeleteHandler = () => {
    dispatch({
      type: "DELETE_ORDER_TYPE_REQUEST",
      payload: bulkSelected,
    });
  };
  const [currentPagination, setCurrentPagination] = useState(1);
  useEffect(() => {
    if (addOrderTypeSuccess) {
      form.resetFields();
    }
  }, [addOrderTypeSuccess]);
  useEffect(() => {
    dispatch({
      type: "GET_ORDER_TYPE_SECTION_REQUEST",
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: "GET_ALL_ORDER_TYPE_REQUEST",
      payload: {
        Page: currentPagination,
        PageSize: 5,
      },
    });
  }, [currentPagination, addOrderTypeSuccess, deleteOrderTypeSuccess]);
  const addOrderTypeHandler = (values) => {
    dispatch({
      type: "ADD_ORDER_TYPE_REQUEST",
      payload: {
        ...values,
        SortOrder: Number(values.SortOrder),
        Id: editData ? editData.id : "",
      },
    });
  };
  const editOrderTypeHandler = (id) => {
    dispatch({
      type: "EDIT_ORDER_TYPE_REQUEST",
      payload: id,
    });
  };
  const deleteOrderTypeHandler = (id, name) => {
    dispatch({
      type: "DELETE_ORDER_TYPE_REQUEST",
      payload: {
        Id: id,
        Name: name,
      },
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
          Add New Order Type
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
                name: ["OrderTypeId"],
                value: editData?.orderTypeId
                  ? editData?.orderTypeId
                  : orderTypeSection?.orderTypes[0].id,
              },
              {
                name: ["StoreChannelId"],
                value: editData?.storeChannelId
                  ? editData?.storeChannelId
                  : orderTypeSection?.channels[0].id,
              },
              {
                name: ["SortOrder"],
                value: editData?.sortOrder,
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
                value: editData
                  ? editData?.isDefault
                  : form.getFieldValue("isDefault")
                  ? form.getFieldValue("isDefault")
                  : true,
              },
              {
                name: ["IsPOSOrderType"],
                value: editData?.isPOSOrderType ? true : false,
              },
              {
                name: ["IsOnlineOrderType"],
                value: editData?.isOnlineOrderType ? true : false,
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
                              label="Channel"
                              name="StoreChannelId"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Channel !",
                                },
                              ]}
                            >
                              <Select>
                                {orderTypeSection?.channels?.map(
                                  (orderType) => {
                                    return (
                                      <Select.Option
                                        value={orderType.id}
                                        key={orderType.id}
                                      >
                                        {orderType.value}
                                      </Select.Option>
                                    );
                                  }
                                )}
                              </Select>
                            </Form.Item>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group categoryField">
                            <Form.Item
                              label="Order Type"
                              name="OrderTypeId"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Order Type !",
                                },
                              ]}
                            >
                              <Select>
                                {orderTypeSection?.orderTypes?.map(
                                  (orderType) => {
                                    return (
                                      <Select.Option
                                        value={orderType.id}
                                        key={orderType.id}
                                      >
                                        {orderType.value}
                                      </Select.Option>
                                    );
                                  }
                                )}
                              </Select>
                            </Form.Item>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group categoryField">
                            <Form.Item
                              label="Sort"
                              name="SortOrder"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Sort",
                                },
                              ]}
                            >
                              <Input
                                type="number"
                                className="form-control"
                                placeholder="Sort"
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3 categoryField">
                          <Form.Item
                            name="isActive"
                            label="Status"
                            valuePropName="checked"
                          >
                            <Switch defaultChecked={true} loading={isLoading} />
                          </Form.Item>
                        </div>
                        <div className="col-md-3 categoryField">
                          <Form.Item
                            name="isDefault"
                            label="Default"
                            valuePropName="checked"
                          >
                            <Switch defaultChecked={true} loading={isLoading} />
                          </Form.Item>
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
                    style={{
                      width: "80px",
                    }}
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
                                allOrderTypes?.length == bulkSelected.length
                              }
                              value={
                                allOrderTypes?.length == bulkSelected.length
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelected(
                                    allOrderTypes?.map((orderType) => {
                                      return {
                                        Id: orderType.id,
                                        Name: orderType.name,
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
                        <th>Sort No</th>
                        <th>Order Type</th>
                        <th>Channel Name</th>
                        <th>Is Active</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrderTypes?.map((orderType) => {
                        return (
                          <tr key={orderType.id}>
                            <td>
                              <div className="form-check">
                                <input
                                  className="form-check-input mt-2 catcheck"
                                  type="checkbox"
                                  checked={
                                    bulkSelected.find(
                                      (eachPrev) => eachPrev.Id == orderType.id
                                    )
                                      ? true
                                      : false
                                  }
                                  value={
                                    bulkSelected.find(
                                      (eachPrev) => eachPrev.Id == orderType.id
                                    )
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => {
                                    if (!e.target.checked) {
                                      setBulkSelected((prev) => {
                                        return prev.filter(
                                          (prevEach) =>
                                            prevEach.Id != orderType.id
                                        );
                                      });
                                    } else {
                                      setBulkSelected((prev) => {
                                        return [
                                          ...prev,
                                          {
                                            Id: orderType.id,
                                            Name: orderType.name,
                                          },
                                        ];
                                      });
                                    }
                                  }}
                                  id="defaultCheck1"
                                />
                              </div>
                            </td>
                            <td>{orderType.sortOrder}</td>
                            <td>{orderType.orderType}</td>
                            <td>{orderType.channelName}</td>
                            <td>
                              {orderType.isActive ? (
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
                                className="btn btn-info btn-sm"
                                data-bs-toggle="tooltip"
                                data-bs-placement="left"
                                title=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  editOrderTypeHandler(orderType.id);
                                }}
                                data-bs-original-title="Edit"
                              >
                                <i className="fas fa-edit" aria-hidden="true" />
                              </a>
                              {/* <Popconfirm
                                okText="Yes"
                                onConfirm={() =>
                                  deleteOrderTypeHandler(
                                    orderType.id,
                                    orderType.name
                                  )
                                }
                                cancelText="No"
                                title="Are you sure you want to delete?"
                              >
                                <a
                                  href=""
                                  className="btn btn-danger btn-sm"
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
                              </Popconfirm> */}
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
                  total={totalOrderTypes}
                  pageSize={5}
                  defaultCurrent={1}
                  showTotal={(total, range) =>
                    `${allOrderTypes ? allOrderTypes.length : 0} out of ${
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

export default AddOrderType;
