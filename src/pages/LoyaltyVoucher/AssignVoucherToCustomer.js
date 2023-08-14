import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddGroup from "./AddGroup";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";
import IssueVoucher from "./IssueVoucher";
import { Button, Pagination, Form } from "antd";
import Email from "./Email";
import GroupVoucher from "./GroupVoucher";
function AssignVoucherToCustomer() {
  const dispatch = useDispatch();

  const [isAddGroupModalVisible, setIsAddGroupModalVisible] = useState(false);
  const { allCustomers, totalCustomers, isLoading } = useSelector(
    (state) => state.loyaltyReducer
  );
  const { isOperatioSuccessful } = useSelector((state) => state.loyaltyReducer);
  const [isIssuVocuherModal, setIssuVoucherModalOpen] = useState(false);
  const [isIssueVoucherFullModal, setIsIssueVoucherFullModal] = useState(false);
  const [bulkSelected, setBulkSelected] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isEmailModalOpen, setIsEmailModalOpen] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    if (searchKeyword) {
      const searchTimeout = setTimeout(() => {
        dispatch({
          type: "GET_ALL_VOUCHER_CUSTOMER_REQUEST",
          payload: {
            Page: 1,
            pageSize: 10,
            ExternalFilter: { Id: "", Name: "" },
            SearchKeywords: searchKeyword,
          },
        });
      }, 500);
      return () => {
        clearTimeout(searchTimeout);
      };
    } else {
      dispatch({
        type: "GET_ALL_VOUCHER_CUSTOMER_REQUEST",
        payload: {
          Page: 1,
          PageSize: 10,
          SearchKeywords: "",
          ExternalFilter: { Id: "", Name: "" },
        },
      });
    }
  }, [searchKeyword]);

  useEffect(() => {
    if (isOperatioSuccessful) {
      setBulkSelected([]);
      setIssuVoucherModalOpen(false);
    }
  }, [isOperatioSuccessful]);
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);

    dispatch({
      type: "GET_ALL_VOUCHER_CUSTOMER_REQUEST",
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
        show={isEmailModalOpen}
        onHide={() => {
          setIsEmailModalOpen(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>
            Email Your Loayalty
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Email setIsEmailModalOpen={setIsEmailModalOpen} />
        </Modal.Body>
      </Modal>
      <Modal
        show={isAddGroupModalVisible}
        onHide={() => {
          setIsAddGroupModalVisible(false);
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Issue Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddGroup setIsAddGroupModalVisible={setIsAddGroupModalVisible} />
        </Modal.Body>
      </Modal>
      {/* <Modal
        show={isIssuVocuherModal}
        onHide={() => {
          setIssuVoucherModalOpen(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Issue Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
      </Modal> */}
      <Modal
        size="lg"
        show={isIssueVoucherFullModal}
        onHide={() => {
          setIsIssueVoucherFullModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Issue Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GroupVoucher
            setIsIssueVoucherModalOpen={setIsIssueVoucherFullModal}
          />
        </Modal.Body>
      </Modal>
      {isIssuVocuherModal && (
        <IssueVoucher
          setIsIssueVoucherModalOpen={setIssuVoucherModalOpen}
          selectedCustomers={bulkSelected}
          issueVoucherToCustomer={true}
        />
      )}
      <div className="card">
        <div className="card-body">
          <div className="table_card d-flex justify-content-between align-items-center mb-3">
            <div className="add_btn">
              <div className="row">
                <div className="col-md-12">
                  {bulkSelected?.length > 0 && (
                    <a
                      onClick={() => {
                        setIssuVoucherModalOpen(true);
                      }}
                      className="btn btn-danger btn-lg border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#issuevoucherModalCenter"
                    >
                      Issue Voucher
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="table_search">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="search">
                    <i className="mdi mdi-magnify" />
                  </span>
                </div>
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="form-control"
                  placeholder="Search Items Here"
                  aria-label="search"
                  aria-describedby="search"
                  spellCheck="false"
                  data-ms-editor="true"
                />
              </div>
            </div>
          </div>
          <div className="table-body">
            <div className="table-responsive">
              {isLoading ? (
                <TableSkeleton row={2} column={5} />
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
                          </tr>
                        );
                      })
                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan={5}>No Customers Found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
            <div className="company_footer d-flex justify-content-between mt-3">
              <div className="table_btn">
                {/* 
                                            <button type="button" class="btn btn- all_btn text-white">Print</button>
                                            <button type="button" class="btn btn- all_btn text-white">Export</button> */}
                {/* <button
                    type="button"
                    className="btn btn- all_btn text-white"
                    onClick={() => {
                      setIsEmailModalOpen(true);
                    }}
                  >
                    Email
                  </button> */}
              </div>
              <Pagination
                total={parseInt(totalCustomers) ? parseInt(totalCustomers) : 10}
                showTotal={(total, range) =>
                  `${totalCustomers ? totalCustomers : 0} out of ${
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
}

export default AssignVoucherToCustomer;
