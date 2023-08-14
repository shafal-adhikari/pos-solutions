/** @format */

import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Pagination, Popconfirm, Spin, Switch, Tabs } from "antd";
import { Input } from "antd";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";
import AssignCustomer from "./AssignCustomer";
function AddGroup({ setIsAddGroupModalVisible }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [bulkSelected, setBulkSelected] = useState([]);
  const [activeKey, setActiveKey] = useState(1);

  const {
    groupLoading,
    addGroupLoading,
    voucherGroup,
    isOperatioSuccessful,
    editData,
    isEditSuccess,
    deleteVoucherGroupLoading,
  } = useSelector((state) => state.loyaltyReducer);
  const bulkDeleteHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_VOUCHER_GROUP_REQUEST",
      payload: [...bulkSelected],
    });
  };
  useEffect(() => {
    dispatch({
      type: "GET_VOUCHER_GROUP_REQUEST",
      payload: {
        Page: 1,
        PageSize: 5,
        SearchKeywords: "",
        ExternalFilter: {},
      },
    });
    setBulkSelected([]);
  }, [isOperatioSuccessful]);
  useEffect(() => {
    if (isOperatioSuccessful) {
      form.resetFields();
      setBulkSelected([]);
      if (editData?.id) {
        dispatch({
          type: "RESET_EDIT_DATA",
        });
      }
      dispatch({
        type: "GET_ASSIGN_GROUP_SECTION_LIST_REQUEST",
      });
    }
    if (isEditSuccess) {
      form.resetFields();
      setBulkSelected([]);
    }
  }, [isOperatioSuccessful, isEditSuccess]);
  const editCategoryTypeHandler = (id) => {
    dispatch({
      type: "EDIT_VOUCHER_GROUP_REQUEST",
      payload: id,
    });
  };
  const deleteCategoryTypeHandler = (id, name) => {
    dispatch({
      type: "DELETE_VOUCHER_GROUP_REQUEST",
      payload: [
        {
          Id: id,
          Name: name,
        },
      ],
    });
  };
  const [searchKeyword, setSearchKeyword] = useState("");
  const addVoucherGroupHandler = (values) => {
    dispatch({
      type: "ADD_VOUCHER_GROUP_REQUEST",
      payload: [
        {
          Id: editData?.id ? editData.id : "",
          Name: values.groupName,
          isActive: values.isActive,
        },
      ],
    });
  };
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);
    dispatch({
      type: "GET_VOUCHER_GROUP_REQUEST",
      payload: {
        Page: current,
        PageSize: pageSize,
      },
    });
  }
  return (
    <>
      <Tabs
        onChange={(key) => {
          setActiveKey(key);
        }}
        activeKey={activeKey}
        type="card"
        title="dsa"
        items={[
          {
            label: `Create Group`,
            key: 1,
            children: (
              <>
                <Form
                  form={form}
                  onFinish={addVoucherGroupHandler}
                  fields={[
                    {
                      name: ["groupName"],
                      value: editData
                        ? editData.name
                        : form.getFieldValue("groupName"),
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
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-12 categoryField">
                        <div className=" form-group ">
                          <div className="row control-group">
                            <div className="col-md-6">
                              <div className="form-group">
                                <Form.Item
                                  label="Group Name"
                                  name="groupName"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Plesae enter Group Name !",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="Group Name"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <Form.Item
                                name="isActive"
                                label="Status"
                                valuePropName="checked"
                              >
                                <Switch />
                              </Form.Item>
                            </div>
                            <div className="col-md-12 d-flex">
                              <Button
                                htmlType="submit"
                                type="primary"
                                loading={addGroupLoading}
                                className="btn btn-success btn-sm bg-theme border-0"
                              >
                                Save
                              </Button>
                              <Button
                                type="danger"
                                onClick={() => {
                                  setIsAddGroupModalVisible(false);
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
                </Form>
                <div className="card mt-2 ">
                  <div className="card-body">
                    <div className="table-body">
                      <div className="d-flex justify-content-between flex-wrap align-items-center mb-3">
                        <div className="delete_btn">
                          {bulkSelected.length > 0 && (
                            <Button
                              loading={deleteVoucherGroupLoading}
                              type="danger"
                              onClick={bulkDeleteHandler}
                              className="btn btn-danger border-0 rounded-0"
                            >
                              <i className="fas fa-trash-alt me-1 " />
                              Delete
                            </Button>
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

                      {groupLoading ? (
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
                                        voucherGroup?.data?.length ==
                                        bulkSelected.length
                                      }
                                      value={
                                        voucherGroup?.data?.length ==
                                        bulkSelected.length
                                      }
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setBulkSelected(
                                            voucherGroup?.data?.map((brand) => {
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
                                <th>Group Name</th>

                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {voucherGroup?.data?.length > 0 ? (
                                voucherGroup?.data?.map((group) => {
                                  return (
                                    <tr key={group.id}>
                                      <td>
                                        <div className="form-check">
                                          <input
                                            className="form-check-input mt-2 catcheck"
                                            type="checkbox"
                                            checked={
                                              bulkSelected.find(
                                                (eachPrev) =>
                                                  eachPrev.Id == group.id
                                              )
                                                ? true
                                                : false
                                            }
                                            value={
                                              bulkSelected.find(
                                                (eachPrev) =>
                                                  eachPrev.Id == group.id
                                              )
                                                ? true
                                                : false
                                            }
                                            onChange={(e) => {
                                              if (!e.target.checked) {
                                                setBulkSelected((prev) => {
                                                  return prev.filter(
                                                    (prevEach) =>
                                                      prevEach.Id != group.id
                                                  );
                                                });
                                              } else {
                                                setBulkSelected((prev) => {
                                                  return [
                                                    ...prev,
                                                    {
                                                      Id: group.id,
                                                      Name: group.name,
                                                    },
                                                  ];
                                                });
                                              }
                                            }}
                                            id="defaultCheck1"
                                          />
                                        </div>
                                      </td>
                                      <td>{group.name}</td>

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
                                              group.isActive ? true : false
                                            }
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <a
                                          onClick={(e) => {
                                            e.preventDefault();
                                            editCategoryTypeHandler(group.id);
                                          }}
                                          className="btn btn-info btn-sm ms-2"
                                          style={{ marginRight: "5px" }}
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

                                        <Popconfirm
                                          okText="Yes"
                                          onConfirm={() => {
                                            deleteCategoryTypeHandler(
                                              group.id,
                                              group.name
                                            );
                                          }}
                                          cancelText="No"
                                          title="Are you sure you want to delete?"
                                        >
                                          <a
                                            className="btn btn-danger btn-sm me-1"
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
                                        </Popconfirm>
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
                          total={voucherGroup?.total ? voucherGroup?.total : 10}
                          showTotal={(total, range) =>
                            `${
                              voucherGroup?.total ? voucherGroup?.total : 10
                            } out of ${total ? total : 10} items`
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
              </>
            ),
          },
          {
            label: "Assign Customer to Group",
            key: 2,
            children: (
              <>
                <AssignCustomer
                  setIsAddGroupModalVisible={setIsAddGroupModalVisible}
                />
              </>
            ),
          },
        ]}
      />
    </>
  );
}

export default AddGroup;
