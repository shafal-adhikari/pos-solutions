import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Select, Input, Pagination, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";
import UploadDocument from "./UploadDocument";
import { Modal } from "react-bootstrap";
import "./index.css";
function Documents() {
  const dispatch = useDispatch();
  const [bulkSelected, setBulkSelected] = useState([]);
  const [form] = Form.useForm();
  // const category = Form.useWatch("productCategoryId", form);
  const searchKeyword = Form.useWatch("searchKeyword", form);
  const supplier = Form.useWatch("supplierId", form);
  const status = Form.useWatch("statusId", form);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const {
    allLoading,
    allDocuments,
    totalDocuments,
    addSuccess,
    uploadDocumentSectionList,
    deleteSuccess,
  } = useSelector((state) => state.employeeDocumentsReducer);
  useEffect(() => {
    setBulkSelected([]);
  }, [allDocuments]);
  useEffect(() => {
    if (uploadDocumentSectionList) {
      form.setFields([
        {
          name: "EmployeeId",
          value: uploadDocumentSectionList.employees?.[0]?.id,
        },
        {
          name: "DocumentTypeId",
          value: uploadDocumentSectionList.documentTypes?.[0]?.id,
        },
      ]);
    }
  }, [uploadDocumentSectionList]);
  const DocumentTypeId = Form.useWatch("DocumentTypeId", form);
  const EmployeeId = Form.useWatch("EmployeeId", form);
  useEffect(() => {
    if (DocumentTypeId && EmployeeId) {
      if (searchKeyword) {
        const searchTimeout = setTimeout(async () => {
          if (searchKeyword) {
            dispatch({
              type: "GET_ALL_UPLOAD_DOCUMENTS_REQUEST",
              payload: {
                Page: 1,
                PageSize: 10,
                ExternalFilter: { DocumentTypeId, EmployeeId },
                SearchKeywords: searchKeyword,
              },
            });
          }
        }, 500);
        return () => {
          clearTimeout(searchTimeout);
        };
      }
      dispatch({
        type: "GET_ALL_UPLOAD_DOCUMENTS_REQUEST",
        payload: {
          Page: 1,
          PageSize: 10,
          ExternalFilter: { DocumentTypeId, EmployeeId },
          SearchKeywords: "",
        },
      });
    }
  }, [addSuccess, deleteSuccess, DocumentTypeId, EmployeeId, searchKeyword]);
  useEffect(() => {
    dispatch({
      type: "GET_ALL_UPLOAD_DOCUMENT_SECTION_REQUEST",
    });
  }, []);
  const bulkDeleteHandler = () => {
    dispatch({
      type: "DELETE_UPLOAD_DOCUMENTS_REQUEST",
      payload: bulkSelected,
    });
  };
  const productPriceEdit = (id) => {
    dispatch({
      type: "EDIT_PRODUCT_PRICE_REQUEST",
      payload: id,
    });
  };
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);
    dispatch({
      type: "GET_ALL_UPLOAD_DOCUMENTS_REQUEST",
      payload: {
        Page: current,
        PageSize: pageSize,
        ExternalFilter: {
          SearchKeywords: searchKeyword,
        },
      },
    });
  }
  const deleteUploadedDocumentsHandler = (id, name) => {
    dispatch({
      type: "DELETE_UPLOAD_DOCUMENTS_REQUEST",
      payload: [
        {
          Id: id,
        },
      ],
    });
  };
  const downloadPDFHandler = (filePath) => {
    const objectUrl = URL.createObjectURL(new Blob([filePath]));
    const link = document.createElement("a");
    link.href = objectUrl;
    // link.setAttribute("download", `FileName.pdf`);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  };
  const editDocumentHandler = (id) => {
    setIsEditClicked(true);
    setIsUploadModalOpen(true);
    dispatch({
      type: "EDIT_UPLOAD_DOCUMENTS_REQUEST",
      payload: id,
    });
  };
  return (
    <div className="menu_right">
      <>
        <div className="right_top mb-4">
          <div className="card text-left border">
            <div className="card-body">
              <Form form={form}>
                <div className="timesheet_filter categoryField">
                  <div className="row">
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                        <Form.Item label="Document Type" name="DocumentTypeId">
                          <Select>
                            {uploadDocumentSectionList?.documentTypes?.map(
                              (category) => {
                                return (
                                  <Select.Option
                                    key={category.id}
                                    value={category.id}
                                  >
                                    {category.value}
                                  </Select.Option>
                                );
                              }
                            )}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                        <Form.Item label="Employee" name="EmployeeId">
                          <Select
                            showSearch
                            options={uploadDocumentSectionList?.employees?.map(
                              (employee) => {
                                return {
                                  value: employee.id,
                                  label: employee.value,
                                };
                              }
                            )}
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          >
                            {/* {uploadDocumentSectionList?.employees.map(
                              (supplier) => {
                                return (
                                  <Select.Option
                                    key={supplier.id}
                                    value={supplier.id}
                                  >
                                    {supplier.value}
                                  </Select.Option>
                                );
                              }
                            )} */}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                      <div className="form-group">
                        <Form.Item label="Search" name="searchKeyword">
                          <Input type="text" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2 align-items-center my-auto pt-2 ">
                      <button
                        type="button"
                        className="btn btn-primary all_btn rounded-0"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <div className="table_card d-flex justify-content-between align-items-center mb-3">
                <div className="">
                  <h4 className="font-weight-bold"> Documents</h4>
                </div>
                <div>
                  <button
                    className="btn all_btn border-0 rounded-0 font-weight-bold text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#uploaddocsmodal"
                    onClick={() => setIsUploadModalOpen(true)}
                  >
                    <i className="fas fa-upload mr-2 me-2" />
                    Upload
                  </button>
                </div>
              </div>
              <div className="table_card d-flex justify-content-between mb-3">
                <div className="add_btn ">
                  <div className="row">
                    <div className="col-md-12">
                      {bulkSelected.length > 0 && (
                        <Popconfirm
                          onConfirm={bulkDeleteHandler}
                          okText="Yes"
                          title="Are you sure you want to deactivate?"
                          cancelText="No"
                        >
                          <a className="btn btn-danger border-0 rounded-0">
                            <i className="fas fa-eye-slash me-1 " />
                            Deactivate
                          </a>
                        </Popconfirm>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive product-table">
                {allLoading ? (
                  <TableSkeleton />
                ) : (
                  <table className="table table-hover  align-middle table-nowrap mb-0">
                    <thead>
                      <tr className="table-light">
                        <th>
                          <div className="form-check">
                            <input
                              className="form-check-input mt-2 catcheck"
                              type="checkbox"
                              checked={
                                allDocuments?.length == bulkSelected.length
                              }
                              value={
                                allDocuments?.length == bulkSelected.length
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelected(
                                    allDocuments?.map((product) => {
                                      return {
                                        Id: product.id,
                                        Name: product.name,
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
                        <th>S.No</th>
                        <th>Document Name</th>
                        <th>Document Type</th>
                        <th>Employee Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allDocuments && allDocuments?.length > 0 ? (
                        allDocuments?.map((document, index) => {
                          return (
                            <tr key={document.id + index}>
                              <td>
                                <div className="form-check">
                                  <input
                                    className="form-check-input mt-2 catcheck"
                                    type="checkbox"
                                    checked={
                                      bulkSelected.find(
                                        (eachPrev) => eachPrev.Id == document.id
                                      )
                                        ? true
                                        : false
                                    }
                                    value={
                                      bulkSelected.find(
                                        (eachPrev) => eachPrev.Id == document.id
                                      )
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      if (!e.target.checked) {
                                        setBulkSelected((prev) => {
                                          return prev.filter(
                                            (prevEach) =>
                                              prevEach.Id != document.id
                                          );
                                        });
                                      } else {
                                        setBulkSelected((prev) => {
                                          return [
                                            ...prev,
                                            {
                                              Id: document.id,
                                              Name: document.name,
                                            },
                                          ];
                                        });
                                      }
                                    }}
                                    id="defaultCheck1"
                                  />
                                </div>
                              </td>
                              <td>{index < 10 ? "0" + index : index}</td>
                              <td>{document.documentName}</td>
                              <td>{document.documentType}</td>

                              <td>{document.employeeName}</td>
                              <td>
                                <a
                                  onClick={(e) => {
                                    e.preventDefault();
                                    editDocumentHandler(document.id);
                                  }}
                                  className="btn btn-success me-1 btn-sm"
                                >
                                  <i
                                    className="fas fa-edit"
                                    aria-hidden="true"
                                  />
                                </a>
                                <a
                                  target="_blank"
                                  href={document.filePath}
                                  className="btn btn-success me-1 btn-sm"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="left"
                                  title=""
                                  data-bs-original-title="Edit"
                                >
                                  <i
                                    className="fas fa-eye"
                                    aria-hidden="true"
                                  />
                                </a>
                                <a
                                  onClick={() =>
                                    downloadPDFHandler(document.filePath)
                                  }
                                  className="btn btn-info btn-sm"
                                >
                                  <i
                                    className="fas fa-download text-white"
                                    aria-hidden="true"
                                  />
                                </a>
                                <Popconfirm
                                  onConfirm={() =>
                                    deleteUploadedDocumentsHandler(document.id)
                                  }
                                  title="Are you sure you want to deactivate?"
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <a
                                    className="btn btn-danger btn-sm ms-1"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="left"
                                    title=""
                                    data-bs-original-title="Delete"
                                  >
                                    <i
                                      className="fas fa-trash"
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
                          <td colSpan={7}>No Documents Found !</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div />
                  <div>
                    <Pagination
                      total={totalDocuments ? totalDocuments : 2}
                      showSizeChanger
                      onShowSizeChange={onShowSizeChange}
                      showTotal={(total, range) =>
                        `${
                          allDocuments ? allDocuments.length : 0
                        } out of ${total} items`
                      }
                      defaultCurrent={1}
                      onChange={onShowSizeChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isUploadModalOpen && (
          <Modal
            show={isUploadModalOpen}
            onHide={() => setIsUploadModalOpen(false)}
          >
            <Modal.Header closeButton>
              {" "}
              <h5>Upload Document</h5>
            </Modal.Header>
            <Modal.Body>
              <UploadDocument
                setOpen={setIsUploadModalOpen}
                editClicked={isEditClicked}
                setIsEditClicked={setIsEditClicked}
              />
            </Modal.Body>
          </Modal>
        )}
      </>
    </div>
  );
}

export default Documents;
