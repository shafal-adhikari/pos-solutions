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
  TreeSelect,
} from "antd";
import { Input } from "antd";
import TableSkeleton from "../Table Skeleton/TableSkeleton";
function AddSubCategory({ isOpen, setIsOpen }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [bulkSelected, setBulkSelected] = useState([]);
  const {
    subCategorySection,
    allSubCategories,
    totalSubCategories,
    addSubCategorySuccess,
    deleteSubCategorySuccess,
    editData,
    editLoading,
    isLoading,
    allLoading,
  } = useSelector((state) => state.settingsReducer);

  const bulkDeleteHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_CATEGORY_TYPE_REQUEST",
      payload: [...bulkSelected],
    });
  };
  useEffect(() => {
    dispatch({
      type: "GET_ALL_SUB_CATEGORIES_REQUEST",
      payload: {
        Page: 1,
        PageSize: 5,
      },
    });
    setBulkSelected([]);
  }, [addSubCategorySuccess, deleteSubCategorySuccess]);
  useEffect(() => {
    if (addSubCategorySuccess) {
      form.resetFields();
    }
  }, [addSubCategorySuccess]);
  useEffect(() => {
    if (subCategorySection) {
      form.setFieldValue(
        "CategoryId",
        subCategorySection?.productCategories[0]?.id
      );
    }
  }, [subCategorySection]);
  useEffect(() => {
    dispatch({
      type: "GET_SUB_CATEGORY_SECTION_REQUEST",
    });
  }, []);
  const editSubCategoryHandler = (id) => {
    dispatch({
      type: "EDIT_SUB_CATEGORY_REQUEST",
      payload: id,
    });
  };
  const deleteSubCategoryHandler = (id, name) => {
    dispatch({
      type: "DELETE_SUB_CATEGORY_REQUEST",
      payload: [
        {
          Id: id,
          Name: name,
        },
      ],
    });
  };
  const generateCategoriesOption = (categories) => {
    if (!categories || categories?.length < 1) {
      return undefined;
    }
    return categories.map((category) => {
      return {
        value: category.categoryId,
        title: category.categoryName,
        children: generateCategoriesOption(category.childernCategories),
      };
    });
  };
  useEffect(() => {
    if (subCategorySection?.productCategories) {
      console.log(
        generateCategoriesOption(subCategorySection?.productCategories)
      );
    }
  }, [subCategorySection?.productCategories]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const addSubCategoryHandler = (values) => {
    dispatch({
      type: "ADD_SUB_CATEGORY_REQUEST",
      payload: {
        ...values,
        Id: editData?.id ? editData.id : "",
        sortOrder: parseInt(values.sortOrder),
      },
    });
  };
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);
    dispatch({
      type: "GET_ALL_SUB_CATEGORIES_REQUEST",
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
          Add New Sub Category
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
          onFinish={addSubCategoryHandler}
          fields={[
            {
              name: "ParentProductCategoryId",
              value: editData
                ? editData.parentProductCategoryId
                : form.getFieldValue("ParentProductCategoryId"),
            },
            {
              name: ["Name"],
              value: editData ? editData.name : form.getFieldValue("Name"),
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
                : form.getFieldValue("isActive")
                ? form.getFieldValue("isActive")
                : true,
            },
          ]}
        >
          <Spin spinning={editLoading}>
            <div className="newsupplier_form bg-light p-3">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12 categoryField">
                  <div className=" form-group ">
                    <div className="row control-group">
                      <div className="col-md-3">
                        <div className="form-group">
                          <Form.Item
                            label="Category"
                            name="ParentProductCategoryId"
                            rules={[
                              {
                                required: true,
                                message: "Please choose category",
                              },
                            ]}
                          >
                            <TreeSelect
                              treeDefaultExpandAll={true}
                              filterTreeNode={(inputValue, treeNode) =>
                                treeNode.props.title
                                  .toLowerCase()
                                  .indexOf(inputValue.toLowerCase()) !== -1
                              }
                              showSearch
                              placeholder="Category"
                              treeData={generateCategoriesOption(
                                subCategorySection?.productCategories
                              )}
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <Form.Item
                            label="Sub Category Name"
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
                              placeholder="Sub Category Name"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <Form.Item
                            label="Sort"
                            name="sortOrder"
                            rules={[
                              {
                                required: true,
                                message: "Please enter sort order",
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
                      <div className="col-md-12 d-flex">
                        <Button
                          htmlType="submit"
                          type="primary"
                          loading={isLoading}
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
                  </div>
                </div>
              </div>
            </div>
          </Spin>
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
                                allSubCategories?.length == bulkSelected.length
                              }
                              value={
                                allSubCategories?.length == bulkSelected.length
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelected(
                                    allSubCategories?.map((brand) => {
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
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Sort</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allSubCategories?.length > 0 ? (
                        allSubCategories?.map((brand) => {
                          return (
                            <tr key={brand.id}>
                              <td>
                                <div className="form-check">
                                  <input
                                    className="form-check-input mt-2 catcheck"
                                    type="checkbox"
                                    checked={
                                      bulkSelected.find(
                                        (eachPrev) => eachPrev.Id == brand.id
                                      )
                                        ? true
                                        : false
                                    }
                                    value={
                                      bulkSelected.find(
                                        (eachPrev) => eachPrev.Id == brand.id
                                      )
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      if (!e.target.checked) {
                                        setBulkSelected((prev) => {
                                          return prev.filter(
                                            (prevEach) =>
                                              prevEach.Id != brand.id
                                          );
                                        });
                                      } else {
                                        setBulkSelected((prev) => {
                                          return [
                                            ...prev,
                                            {
                                              Id: brand.id,
                                              Name: brand.name,
                                            },
                                          ];
                                        });
                                      }
                                    }}
                                    id="defaultCheck1"
                                  />
                                </div>
                              </td>
                              <td>{brand.categoryName}</td>
                              <td>{brand.subCateogryName}</td>
                              <td>{brand.sortOrder}</td>
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
                                    checked={brand.isActive ? true : false}
                                  />
                                </div>
                              </td>
                              <td>
                                <a
                                  href=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                    editSubCategoryHandler(brand.id);
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
                                  className="btn btn-danger btn-sm ms-1"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="left"
                                  title=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteSubCategoryHandler(
                                      brand.id,
                                      brand.name
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
                  total={totalSubCategories}
                  showTotal={(total, range) =>
                    `${allSubCategories ? allSubCategories.length : 0} out of ${
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

export default AddSubCategory;
