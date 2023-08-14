/** @format */

import React, { useEffect, useState } from "react";
import { Empty, Pagination, Spin, Input, Switch, Popconfirm } from "antd";
import TotalPageShow from "../TotalPageShow/TotalPageShow";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { Modal } from "react-bootstrap";

import { useSelector } from "react-redux";

import AddCustomer from "./AddCustomer";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";
const { Search } = Input;

const CustomerList = () => {
  const [currentPagination, setCurrentPagination] = useState(1);
  const dispatch = useDispatch();
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [bulkSelected, setBulkSelected] = useState([]);
  const {
    allCustomers,
    isLoading,
    addSuccess,
    deleteSuccess,
    totalCustomers,
    exportPdfLoading,
    exportExcelLoading,
  } = useSelector((state) => state.customerReducer);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (addSuccess || deleteSuccess) {
      dispatch({
        type: "GET_ALL_CUSTOMER_LIST_REQUEST",
        payload: {
          Page: 1,
          PageSize: 10,
          SearchKeywords: "",
          ExternalFilter: { Id: "", Name: "" },
        },
      });
      setIsAddCustomerOpen(false);
    }
  }, [addSuccess, deleteSuccess]);
  useEffect(() => {
    if (searchKeyword) {
      const searchTimeout = setTimeout(() => {
        dispatch({
          type: "GET_ALL_CUSTOMER_LIST_REQUEST",
          payload: {
            Page: 1,
            PageSize: 10,
            SearchKeywords: searchKeyword,
            ExternalFilter: { Id: "", Name: "" },
          },
        });
      }, 500);
      return () => {
        clearTimeout(searchTimeout);
      };
    } else {
      dispatch({
        type: "GET_ALL_CUSTOMER_LIST_REQUEST",
        payload: {
          Page: 1,
          PageSize: 10,
          SearchKeywords: searchKeyword,
          ExternalFilter: { Id: "", Name: "" },
        },
      });
    }
  }, [searchKeyword]);
  const deleteCustomerHandler = (id, name) => {
    dispatch({
      type: "DELETE_CUSTOMER_REQUEST",
      payload: [{ id, name }],
    });
  };
  const bulkDeleteHandler = () => {
    dispatch({
      type: "DELETE_CUSTOMER_REQUEST",
      payload: bulkSelected,
    });
  };
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);

    dispatch({
      type: "GET_ALL_CUSTOMER_LIST_REQUEST",
      payload: {
        Page: current,
        PageSize: pageSize,
        SearchKeywords: "",
        ExternalFilter: { Id: "", Name: "" },
      },
    });
  }
  return (
    <>
      <Modal
        show={isAddCustomerOpen}
        size="lg"
        centered
        onHide={() => {
          setIsAddCustomerOpen(false);
        }}
      >
        <Modal.Header closeButton>
          <h5
            className="modal-title"
            style={{ fontWeight: "500" }}
            id="addcontactmodalLabel"
          >
            {isEditClicked ? "Edit" : "Add New"} Customer
          </h5>
        </Modal.Header>
        <Modal.Body>
          <AddCustomer
            setOpen={setIsAddCustomerOpen}
            isOpen={isAddCustomerOpen}
            isEditClicked={isEditClicked}
          />
        </Modal.Body>
      </Modal>

      <div className="card">
        <div className="card-body">
          {/* ?table */}
          <div className="table-body">
            <div className="table_card d-flex justify-content-between">
              <div className="mb-3">
                <div className="vendor_con">
                  <a
                    onClick={() => {
                      setIsEditClicked(false);
                      setIsAddCustomerOpen(true);
                    }}
                    className="btn btn-primary all_btn rounded-0"
                    data-bs-toggle="modal"
                    data-bs-target="#addnewcustomerModal"
                  >
                    <i className="fas fa-plus" />
                    <span className="ms-2">Add New Customer</span>
                  </a>
                  {bulkSelected.length > 0 && (
                    <a
                      onClick={bulkDeleteHandler}
                      className="btn btn-danger border-0 rounded-0 ms-2"
                    >
                      <i className="fas fa-trash-alt me-1" />
                      Delete
                    </a>
                  )}
                </div>
              </div>
              <div className="table_search">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text h-100 rounded-0"
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
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    spellCheck="false"
                    data-ms-editor="true"
                  />
                </div>
              </div>
            </div>
            <div className="table-responsive">
              {isLoading ? (
                <TableSkeleton row={5} column={7} />
              ) : (
                <table className="table table-hover align-middle table-nowrap mb-0">
                  <thead>
                    <tr className="table-light">
                      <th>
                        <div className="form-check">
                          <input
                            className="form-check-input mt-2 catcheck"
                            type="checkbox"
                            checked={
                              allCustomers?.length == bulkSelected.length
                            }
                            value={allCustomers?.length == bulkSelected.length}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setBulkSelected(
                                  allCustomers?.map((customer) => {
                                    return {
                                      Id: customer.id,
                                      Name: customer.name,
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
                      <th>Customer Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Postal Code</th>
                      <th>Promotion Enabled</th>
                      <th>Loyalty Enabled</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCustomers && allCustomers.length > 0 ? (
                      allCustomers?.map((customer) => {
                        return (
                          <tr key={customer.id}>
                            <td>
                              <div className="form-check">
                                <input
                                  className="form-check-input mt-2 catcheck"
                                  type="checkbox"
                                  checked={
                                    bulkSelected.find(
                                      (eachPrev) => eachPrev.Id == customer.id
                                    )
                                      ? true
                                      : false
                                  }
                                  value={
                                    bulkSelected.find(
                                      (eachPrev) => eachPrev.Id == customer.id
                                    )
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => {
                                    if (!e.target.checked) {
                                      setBulkSelected((prev) => {
                                        return prev.filter(
                                          (prevEach) =>
                                            prevEach.Id != customer.id
                                        );
                                      });
                                    } else {
                                      setBulkSelected((prev) => {
                                        return [
                                          ...prev,
                                          {
                                            Id: customer.id,
                                            Name: customer.name,
                                          },
                                        ];
                                      });
                                    }
                                  }}
                                  id="defaultCheck1"
                                />
                              </div>
                            </td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.postalCode}</td>
                            <td>
                              <Switch
                                defaultChecked={true}
                                checked={customer.isMarketingPromotionEnabled}
                              />
                            </td>
                            <td>
                              <Switch
                                defaultChecked={true}
                                checked={customer.isLoyaltyEnabled}
                              />
                            </td>
                            <td>
                              <a
                                onClick={() => {
                                  setIsAddCustomerOpen(true);
                                  setIsEditClicked(true);
                                  dispatch({
                                    type: "EDIT_CUSTOMER_REQUEST",
                                    payload: customer.id,
                                  });
                                }}
                                className="btn btn-info btn-sm"
                                data-bs-toggle="tooltip"
                                data-bs-placement="left"
                                title=""
                                data-bs-original-title="Edit"
                              >
                                <i className="fas fa-edit" aria-hidden="true" />
                              </a>
                              <Popconfirm
                                onConfirm={() => {
                                  deleteCustomerHandler(
                                    customer.id,
                                    customer.name
                                  );
                                }}
                                title="Are you sure you want to delete?"
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
                        <td colSpan={7}>No Customers Found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
            <div className="company_footer d-flex justify-content-between mt-3">
              {allCustomers?.length > 0 && (
                <div className="table_btn">
                  <Button
                    type="primary"
                    className="btn btn-primary all_btn rounded-0"
                    loading={exportPdfLoading}
                    onClick={() =>
                      dispatch({
                        type: "EXPORT_CUSTOMER_PDF_REQUEST",
                        payload: {
                          Page: 1,
                          PageSize: 10,
                          ExportType: "pdf",
                          SearchKeywords: "",
                          ExternalFilter: { Id: "", Name: "" },
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
                        type: "EXPORT_CUSTOMER_EXCEL_REQUEST",
                        payload: {
                          Page: 1,
                          PageSize: 10,
                          ExportType: "xlsx",
                          SearchKeywords: "",
                          ExternalFilter: { Id: "", Name: "" },
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
                total={totalCustomers}
                showTotal={(total, range) =>
                  `${allCustomers ? allCustomers.length : 0} out of ${
                    total ? total : 0
                  } items`
                }
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={1}
                onChange={onShowSizeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerList;
