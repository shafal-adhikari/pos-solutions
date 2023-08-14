import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Select, Spin } from "antd";
import { Input, Switch, Pagination, Alert } from "antd";
import { debounceCall } from "../../helpers/frontendHelper";
import TableSkeleton from "../Table Skeleton/TableSkeleton";
function AddCategory({ isOpen, setIsOpen, selectedImage, setSelectedImage }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "GET_CATEGORIES_IMAGE_REQUEST",
    });
  }, []);
  const {
    allCategories,
    editData,
    editLoading,
    addCategorySuccess,
    deleteCategorySuccess,
    categoriesSection,
    isLoading,
    allLoading,
    error,
    totalCategories,
  } = useSelector((state) => state.settingsReducer);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [bulkSelected, setBulkSelected] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    if (searchKeyword) {
      const searchTimeout = setTimeout(async () => {
        dispatch({
          type: "GET_ALL_CATEGORIES_REQUEST",
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
        type: "GET_ALL_CATEGORIES_REQUEST",
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
      type: "GET_ALL_CATEGORIES_REQUEST",
      payload: {
        Page: currentPagination,
        PageSize: 5,
        ExternalFilter: {
          SearchKeyWords: "",
        },
      },
    });
    setBulkSelected([]);
  }, [addCategorySuccess, deleteCategorySuccess, currentPagination]);
  useEffect(() => {
    if (totalCategories == 0 && currentPagination > 1) {
      setCurrentPagination((prevPag) => prevPag - 1);
    }
  }, [totalCategories]);
  useEffect(() => {
    if (addCategorySuccess) {
      form.resetFields();
    }
  }, [addCategorySuccess]);

  const editCategoryHandler = (id) => {
    dispatch({
      type: "EDIT_CATEGORY_REQUEST",
      payload: id,
    });
  };
  const bulkDeleteHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_CATEGORY_REQUEST",
      payload: [...bulkSelected],
    });
  };
  const deleteCategoryHandler = (id, name) => {
    dispatch({
      type: "DELETE_CATEGORY_REQUEST",
      payload: [
        {
          Id: id,
          Name: name,
        },
      ],
    });
  };
  const addCategoryHandler = (values) => {
    setSelectedImage(null);
    dispatch({
      type: "ADD_CATEGORY_REQUEST",
      payload: {
        ...values,
        Id: editData ? editData.id : "",
        SortOrder: parseInt(values.SortOrder),
        ProductCategoryImageId: selectedImage ? selectedImage.id : "",
      },
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
          Add New Category
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
          onFinish={addCategoryHandler}
          fields={[
            {
              name: ["CategoryTypeId"],
              value: editData
                ? editData.categoryTypeId.toLowerCase()
                : categoriesSection
                ? categoriesSection.categoryTypes[0]?.id.toLowerCase()
                : form.getFieldValue("Name"),
            },

            {
              name: ["Name"],
              value: editData ? editData.name : form.getFieldValue("Name"),
            },
            {
              name: ["SortOrder"],
              value: editData
                ? editData.sortOrder
                : form.getFieldValue("SortOrder"),
            },
            {
              name: ["Description"],
              value: editData
                ? editData.description
                : form.getFieldValue("Description"),
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
                            label="Category Type"
                            name="CategoryTypeId"
                            rules={[
                              {
                                required: true,
                                message: "Please choose category Type Id",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Category Type"
                              options={categoriesSection?.categoryTypes.map(
                                (type) => {
                                  return {
                                    value: type.id.toLowerCase(),
                                    label: type.value,
                                  };
                                }
                              )}
                            />
                          </Form.Item>
                        </div>
                      </div>
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
                              placeholder="Category Name"
                            />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <Form.Item
                            label="Sort"
                            name="SortOrder"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter Sort Order",
                              },
                            ]}
                          >
                            <Input
                              type="number"
                              className="form-control"
                              placeholder="Sort Order"
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
                  <table className="table table-hover  align-middle table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>
                          <div className="form-check">
                            <input
                              className="form-check-input mt-2 catcheck"
                              type="checkbox"
                              checked={
                                allCategories?.length == bulkSelected.length
                              }
                              value={
                                allCategories?.length == bulkSelected.length
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelected(
                                    allCategories?.map((category) => {
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
                        <th>Category Type</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Sort</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allCategories?.length > 0 ? (
                        allCategories?.map((category) => {
                          return (
                            <tr key={category.id}>
                              <td>
                                <div className="form-check">
                                  <input
                                    className="form-check-input mt-2 catcheck"
                                    type="checkbox"
                                    checked={
                                      bulkSelected.find(
                                        (eachPrev) => eachPrev.Id == category.id
                                      )
                                        ? true
                                        : false
                                    }
                                    value={
                                      bulkSelected.find(
                                        (eachPrev) => eachPrev.Id == category.id
                                      )
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      if (!e.target.checked) {
                                        setBulkSelected((prev) => {
                                          return prev.filter(
                                            (prevEach) =>
                                              prevEach.Id != category.id
                                          );
                                        });
                                      } else {
                                        setBulkSelected((prev) => {
                                          return [
                                            ...prev,
                                            {
                                              Id: category.id,
                                              Name: category.name,
                                            },
                                          ];
                                        });
                                      }
                                    }}
                                    id="defaultCheck1"
                                  />
                                </div>
                              </td>
                              <td>{category.categoryType}</td>
                              <td>{category.name}</td>
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
                                    checked={category.isActive ? true : false}
                                  />
                                </div>
                              </td>
                              <td>{category.sortOrder}</td>
                              <td>
                                <a
                                  href=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                    editCategoryHandler(category.id);
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
                                    deleteCategoryHandler(
                                      category.id,
                                      category.name
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
                  total={totalCategories}
                  showTotal={(total, range) =>
                    `${allCategories ? allCategories.length : 0} out of ${
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

export default AddCategory;
