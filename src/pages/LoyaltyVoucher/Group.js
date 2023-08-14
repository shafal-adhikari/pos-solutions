/** @format */

import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import IssueVoucher from "./IssueVoucher";
import { Select, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";
import Email from "./Email";

const Group = ({ setSizeFullModal }) => {
  const [isIssueVoucherModalOpen, setIsIssueVoucherModalOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    assignCustomerSectionList,
    getCustomerByVoucherGroupLoading,
    customerByVoucherGroup,
    isOperatioSuccessful,
  } = useSelector((state) => state.loyaltyReducer);

  const [selectedGroups, setSelectedGroups] = useState([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState("");

  useEffect(() => {
    dispatch({
      type: "GET_ASSIGN_GROUP_SECTION_LIST_REQUEST",
    });
  }, []);

  useEffect(() => {
    if (selectedGroups.length > 0) {
      dispatch({
        type: "GET_CUSTOMER_BY_VOUCHER_GROUP_REQUEST",
        payload: {
          GroupIds: selectedGroups,
        },
      });
    }
  }, [selectedGroups]);

  useEffect(() => {
    if (isOperatioSuccessful) {
      setIsIssueVoucherModalOpen(false);
    }
    if (isOperatioSuccessful) {
      setIsEmailModalOpen(false);
    }
  }, [isOperatioSuccessful]);

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
      <div className="row"></div>
      {/* <Modal
        show={isIssueVoucherModalOpen}
        onHide={() => {
          setIsIssueVoucherModalOpen(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Issue Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body> */}
      {isIssueVoucherModalOpen && (
        <IssueVoucher
          setIsIssueVoucherModalOpen={setIsIssueVoucherModalOpen}
          selectedGroups={selectedGroups}
          issueVoucherToCustomer={false}
        />
      )}
      {/* </Modal.Body>
      </Modal> */}
      {/* <Modal
        show={isEmailModalOpen}
        onHide={() => {
          setIsEmailModalOpen(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>
            Upload Marketing Materials
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
      </Modal> */}
      {/* <div className="posloyalty"> */}
      <div className="row d-flex align-items-start justify-content-between">
        <div className={`${isEmailModalOpen ? `col-md-7` : `col-md-12`} card`}>
          <div className="card-body">
            <div className="table_card d-flex justify-content-between align-items-center mb-3">
              <div className="table_btn mb-3 group-voucher-select">
                <Select
                  mode="multiple"
                  showArrow={true}
                  placeholder="Please select groups"
                  onChange={(e) => {
                    if (e.length < 1) {
                      setIsIssueVoucherModalOpen(false);
                    }
                    setSelectedGroups(e);
                  }}
                  style={{
                    width: "100%",
                    minWidth: "250px",
                    maxWidth: "450px",
                    marginTop: "0.5rem",
                  }}
                  options={assignCustomerSectionList?.voucherGroups?.map(
                    (item) => {
                      return {
                        label: item.name,
                        value: item.id,
                      };
                    }
                  )}
                />
              </div>
              {selectedGroups.length > 0 && (
                <div className="table_search">
                  <button
                    type="button"
                    className="btn btn-success bg-theme"
                    onClick={() => {
                      setIsEmailModalOpen(false);
                      setIsIssueVoucherModalOpen(true);
                    }}
                  >
                    <i className="fas fa-file-import" /> Issue Voucher
                  </button>
                </div>
              )}
            </div>
            <div className="table-body">
              <div className="table-responsive">
                {getCustomerByVoucherGroupLoading ? (
                  <TableSkeleton row={2} column={5} />
                ) : (
                  <table className="table table-hover align-middle table-nowrap mb-0">
                    <thead>
                      <tr className="table-light">
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Postal Code</th>
                        <th>Voucher Group</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerByVoucherGroup &&
                      customerByVoucherGroup?.data.length > 0 &&
                      selectedGroups.length > 0 ? (
                        customerByVoucherGroup?.data?.map((customer) => {
                          return (
                            <tr key={customer.id}>
                              <td>{customer.name}</td>
                              <td>{customer.email}</td>
                              <td>{customer.phoneNumber}</td>
                              <td>{customer.postalCode}</td>
                              <td>{customer.voucherGroup}</td>
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
                <div className="table_btn">
                  {/* 
                                          <button type="button" class="btn btn- all_btn text-white">Print</button>
                                          <button type="button" class="btn btn- all_btn text-white">Export</button> */}
                  {selectedGroups?.length > 0 && (
                    <button
                      type="button"
                      className="btn btn- all_btn text-white"
                      onClick={() => {
                        setSizeFullModal("xl");
                        setIsIssueVoucherModalOpen(false);
                        setIsEmailModalOpen(true);
                      }}
                    >
                      Email Marketing Material
                    </button>
                  )}
                </div>
                <Pagination
                  total={
                    parseInt(customerByVoucherGroup?.total)
                      ? parseInt(customerByVoucherGroup?.total)
                      : 10
                  }
                  showTotal={(total, range) =>
                    `${
                      customerByVoucherGroup?.total
                        ? customerByVoucherGroup?.total
                        : 0
                    } out of ${total ? total : 0} items`
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
        {isEmailModalOpen && (
          <Email
            selectedGroups={selectedGroups}
            setIsEmailModalOpen={setIsEmailModalOpen}
            setSizeFullModal={setSizeFullModal}
          />
        )}
      </div>
      {/* </div> */}
    </>
  );
};

export default Group;
