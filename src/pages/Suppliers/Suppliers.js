import React, { useEffect, useState } from "react";
import { Empty, Pagination, Spin, Input } from "antd";
import { Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";

import { Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddContact from "./AddContact";
const { Search } = Input;

const Suppliers = () => {
  const [currentPagination, setCurrentPagination] = useState(1);
  const dispatch = useDispatch();
  const [isAddFranchiseOpen, setIsFranchiseOpen] = useState(false);
  const {
    isLoading,
    allSuppliers,
    totalSuppliers,
    addSuccess,
    deleteSuccess,
    exportData,
    exportExcelLoading,
    exportPdfLoading,
  } = useSelector((state) => state.supplierReducer);

  const [bulkSelected, setBulkSelected] = useState([]);
  const [searchkeyword, setSearchKeyword] = useState("");
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    if (searchkeyword) {
      const searchTimeout = setTimeout(() => {
        dispatch({
          type: "GET_ALL_SUPPLIER_REQUEST",
          payload: {
            Page: 1,
            PageSize: 10,
            SearchKeywords: "",
            ExternalFilter: { Id: "", Name: "", SearchKeywords: searchkeyword },
          },
        });
      }, 500);
      return () => {
        clearTimeout(searchTimeout);
      };
    } else {
      dispatch({
        type: "GET_ALL_SUPPLIER_REQUEST",
        payload: {
          Page: 1,
          PageSize: 10,
          SearchKeywords: "",
          ExternalFilter: { Id: "", Name: "", SearchKeywords: searchkeyword },
        },
      });
    }
  }, [searchkeyword]);
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);
    setPageSize(pageSize);

    dispatch({
      type: "GET_ALL_SUPPLIER_REQUEST",
      payload: {
        Page: current,
        pageSize: pageSize,
        ExternalFilter: { Id: "", Name: "", SearchKeywords: searchkeyword },
      },
    });
  }
  useEffect(() => {
    if (addSuccess || deleteSuccess) {
      dispatch({
        type: "GET_ALL_SUPPLIER_REQUEST",
        payload: {
          Page: 1,
          PageSize: 10,
          SearchKeywords: "",
          ExternalFilter: { Id: "", Name: "" },
        },
      });
      setBulkSelected([]);
    }
  }, [addSuccess, deleteSuccess]);
  useEffect(() => {
    setIsFranchiseOpen(false);
  }, [addSuccess]);

  return (
    <div
      className="tab-pane fade active show"
      id="v-pills-franchisesetting"
      role="tabpanel"
      aria-labelledby="v-pills-franchisesetting-tab"
    >
      <Modal
        size="xl"
        show={isAddFranchiseOpen}
        onHide={() => {
          setIsFranchiseOpen(false);
        }}
      >
        <Modal.Header closeButton>
          <h5
            className="modal-title"
            style={{ fontWeight: "500" }}
            id="addcontactmodalLabel"
          >
            {isEditClicked ? "Edit" : "Add"} Contacts
          </h5>
        </Modal.Header>
        <Modal.Body>
          <AddContact isEdit={isEditClicked} setIsOpen={setIsFranchiseOpen} />
        </Modal.Body>
      </Modal>

      {/* <h6
        className="fw-bold text-theme"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <span> Online Banner Settings </span>
      </h6> */}

      <div className="card">
        <div className="card-body">
          <div className="table-body">
            <div className="table-responsive">
              <div
                style={{
                  display: "flex",
                  margin: "0",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <Button
                    icon={<PlusOutlined />}
                    style={{
                      background: "#002059",
                      color: "white",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setIsEditClicked(false);
                      setIsFranchiseOpen(true);
                    }}
                  >
                    Add Contact
                  </Button>
                  {bulkSelected.length > 0 && (
                    <Popconfirm
                      onConfirm={() => {
                        dispatch({
                          type: "DELETE_SUPPLIER_REQUEST",
                          payload: bulkSelected,
                        });
                      }}
                      cancelText="No"
                      title="Are you sure you want to delete?"
                    >
                      <Button
                        style={{
                          background: "#EF2016",
                          color: "white",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: "8px",
                        }}
                      >
                        <i
                          className="fas fa-trash-alt"
                          aria-hidden="true"
                          style={{ marginRight: "10px" }}
                        />
                        Delete
                      </Button>
                    </Popconfirm>
                  )}
                </div>
                <Search
                  style={{ width: "28%" }}
                  placeholder="Search For Supplier"
                  onSearch={() => {}}
                  onChange={(e) => {
                    setSearchKeyword(e.target.value);
                  }}
                  enterButton="Search"
                />
              </div>
              {isLoading ? (
                <TableSkeleton />
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover  align-middle table-nowrap mb-0">
                    <thead>
                      <tr style={{ background: "#EFEFEE" }}>
                        <th>
                          <input
                            className="form-check-input mt-2 catcheck"
                            type="checkbox"
                            checked={
                              allSuppliers?.length == bulkSelected.length
                            }
                            value={allSuppliers?.length == bulkSelected.length}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setBulkSelected(
                                  allSuppliers?.map((category) => {
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
                        </th>
                        <th>Supplier Code</th>
                        <th>Supplier Name</th>
                        <th>Email</th>
                        <th>Phone</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allSuppliers?.length > 0 ? (
                        allSuppliers?.map((supplier) => {
                          return (
                            <tr key={supplier.id}>
                              <td>
                                <input
                                  className="form-check-input mt-2 catcheck"
                                  type="checkbox"
                                  checked={
                                    bulkSelected.find(
                                      (eachPrev) => eachPrev.Id == supplier.id
                                    )
                                      ? true
                                      : false
                                  }
                                  value={
                                    bulkSelected.find(
                                      (eachPrev) => eachPrev.Id == supplier.id
                                    )
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => {
                                    if (!e.target.checked) {
                                      setBulkSelected((prev) => {
                                        return prev.filter(
                                          (prevEach) =>
                                            prevEach.Id != supplier.id
                                        );
                                      });
                                    } else {
                                      setBulkSelected((prev) => {
                                        return [
                                          ...prev,
                                          {
                                            Id: supplier.id,
                                            Name: supplier.name,
                                          },
                                        ];
                                      });
                                    }
                                  }}
                                  id="defaultCheck1"
                                />
                              </td>
                              <td>{supplier.code}</td>
                              <td>{supplier.name}</td>
                              <td>{supplier.email}</td>

                              <td>{supplier.phoneNumber}</td>

                              <td>
                                <Tooltip title="Edit Contact">
                                  <a
                                    className="btn btn-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="left"
                                    onClick={(e) => {
                                      // setActiveItem(supplier);
                                      setIsEditClicked(true);
                                      dispatch({
                                        type: "EDIT_SUPPLIER_REQUEST",
                                        payload: supplier.id,
                                      });
                                      setIsFranchiseOpen(true);
                                    }}
                                    style={{ marginRight: "5px" }}
                                    data-bs-original-title="Edit"
                                  >
                                    <i
                                      className="fas fa-edit"
                                      aria-hidden="true"
                                    />
                                  </a>
                                </Tooltip>
                                <Popconfirm
                                  okText="Yes"
                                  onConfirm={() => {
                                    dispatch({
                                      type: "DELETE_SUPPLIER_REQUEST",
                                      payload: [
                                        {
                                          Id: supplier.id,
                                          Name: supplier.name,
                                        },
                                      ],
                                    });
                                  }}
                                  cancelText="No"
                                  title="Are you sure you want to delete?"
                                >
                                  <Tooltip title="Delete Contact">
                                    <a
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
                                  </Tooltip>
                                </Popconfirm>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td align="center" colSpan={7}>
                            {" "}
                            No Records Found !
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="company_footer d-flex justify-content-between mt-3">
              {allSuppliers?.length > 0 && (
                <div>
                  <Button
                    type="primary"
                    className="btn btn-primary all_btn rounded-0"
                    loading={exportPdfLoading}
                    onClick={() =>
                      dispatch({
                        type: "EXPORT_SUPPLIER_PDF_REQUEST",
                        payload: {
                          Page: 1,
                          PageSize: 10,
                          ExportType: "pdf",
                          ExternalFilter: {
                            Id: "",
                            Name: "",
                            SearchKeywords: searchkeyword,
                          },
                        },
                      })
                    }
                  >
                    <i className="fas fa-file-export " />
                    Export to PDF
                  </Button>
                  <Button
                    className="btn btn-success bg-theme text-white ms-2"
                    style={{ background: "#00205A" }}
                    loading={exportExcelLoading}
                    onClick={() =>
                      dispatch({
                        type: "EXPORT_SUPPLIER_EXCEL_REQUEST",
                        payload: {
                          Page: 1,
                          PageSize: 10,
                          ExportType: "xlsx",
                          ExternalFilter: {
                            Id: "",
                            Name: "",
                            SearchKeywords: searchkeyword,
                          },
                        },
                      })
                    }
                  >
                    <i className="fas fa-file-export " />
                    Export to Excel
                  </Button>
                </div>
              )}
              <div></div>
              <Pagination
                total={totalSuppliers}
                showSizeChanger
                showTotal={(total, range) =>
                  `${allSuppliers ? allSuppliers.length : 0} out of ${
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
    </div>
  );
};

export default Suppliers;
