import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Pagination, Popconfirm, Spin, Switch } from "antd";
import { Input } from "antd";
import TableSkeleton from "../Table Skeleton/TableSkeleton";

function AddBrand({ isOpen, setIsOpen }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [currentPagination, setCurrentPagination] = useState(1);
  const [bulkSelected, setBulkSelected] = useState([]);

  const {
    allBrands,
    totalBrands,
    addBrandSuccess,
    deleteBrandSuccess,
    editData,
    editLoading,
    isLoading,
    allLoading,
  } = useSelector((state) => state.settingsReducer);

  const bulkDeleteHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_BRAND_REQUEST",
      payload: [...bulkSelected],
    });
  };
  useEffect(() => {
    if (totalBrands == 0 && currentPagination > 1) {
      setCurrentPagination((current) => current - 1);
    }
  }, [totalBrands]);
  useEffect(() => {
    dispatch({
      type: "GET_ALL_BRANDS_REQUEST",
      payload: {
        Page: currentPagination,
        PageSize: 5,
      },
    });
    setBulkSelected([]);
  }, [addBrandSuccess, currentPagination, deleteBrandSuccess]);
  useEffect(() => {
    if (addBrandSuccess) {
      form.resetFields();
    }
  }, [addBrandSuccess]);
  const editBrandHandler = (id) => {
    dispatch({
      type: "EDIT_BRAND_REQUEST",
      payload: id,
    });
  };
  const deleteBrandHandler = (id, name) => {
    dispatch({
      type: "DELETE_BRAND_REQUEST",
      payload: [
        {
          Id: id,
          Name: name,
        },
      ],
    });
  };
  const [searchKeyword, setSearchKeyword] = useState("");
  const addBrandHandler = (values) => {
    dispatch({
      type: "ADD_BRAND_REQUEST",
      payload: {
        ...values,
        Id: editData?.id ? editData.id : "",
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
          Add New Brand
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
          onFinish={addBrandHandler}
          fields={[
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
                      <div className="col-md-4">
                        <div className="form-group">
                          <Form.Item
                            label="Brand Name"
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
                              placeholder="Brand Name"
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
                              checked={allBrands?.length == bulkSelected.length}
                              value={allBrands?.length == bulkSelected.length}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelected(
                                    allBrands?.map((brand) => {
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
                        <th>Brand Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBrands?.length > 0 ? (
                        allBrands?.map((brand) => {
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
                              <td>{brand.name}</td>
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
                                    editBrandHandler(brand.id);
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
                                    deleteBrandHandler(brand.id, brand.name);
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
                  total={totalBrands}
                  showTotal={(total, range) =>
                    `${allBrands ? allBrands.length : 0} out of ${
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

export default AddBrand;
