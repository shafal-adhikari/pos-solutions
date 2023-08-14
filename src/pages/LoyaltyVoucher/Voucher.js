/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddGroup from "./AddGroup";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";
import IssueVoucher from "./IssueVoucher";
import { Switch, Pagination, Form } from "antd";
import Email from "./Email";
import GroupVoucher from "./GroupVoucher";
import { dayjs } from "../../helpers/frontendHelper";

const Voucher = () => {
  const dispatch = useDispatch();
  const {
    activeStore: { dateFormat },
  } = useSelector((state) => state.authenticationReducer);
  const [isAddGroupModalVisible, setIsAddGroupModalVisible] = useState(false);
  const { allVouchers, totalVouchers, allLoading, isOperatioSuccessful } =
    useSelector((state) => state.loyaltyReducer);
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
          type: "GET_ALL_VOUCHER_REQUEST",
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
        type: "GET_ALL_VOUCHER_REQUEST",
        payload: {
          Page: 1,
          PageSize: 10,
          SearchKeywords: "",
          ExternalFilter: { Id: "", Name: "" },
        },
      });
    }
  }, [searchKeyword]);
  const [sizeFullModal, setSizeFullModal] = useState("lg");
  useEffect(() => {
    if (isOperatioSuccessful) {
      setBulkSelected([]);
      setIssuVoucherModalOpen(false);
    }
  }, [isOperatioSuccessful]);
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);

    dispatch({
      type: "GET_ALL_VOUCHER_REQUEST",
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
      {/* <Modal
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
      </Modal> */}
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
      <Modal
        size={sizeFullModal}
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
            setSizeFullModal={setSizeFullModal}
            setIsIssueVoucherModalOpen={setIsIssueVoucherFullModal}
          />
        </Modal.Body>
      </Modal>
      <div className="card">
        <div className="card-body">
          <div className="table_card d-flex justify-content-between align-items-center mb-3">
            <div className="add_btn">
              <div className="row">
                <div className="col-md-12">
                  <a
                    onClick={() => {
                      setIsAddGroupModalVisible(true);
                    }}
                    className="btn btn-primary all_btn btn-lg  ms-2"
                    data-bs-toggle="modal"
                    data-bs-target="#viewgroupModalCenter"
                  >
                    Create Group
                  </a>
                  <a
                    onClick={() => setIsIssueVoucherFullModal(true)}
                    className="btn btn-primary all_btn btn-lg  ms-2"
                  >
                    Issue Voucher
                  </a>
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
              {allLoading ? (
                <TableSkeleton row={2} column={5} />
              ) : (
                <table className="table table-hover align-middle table-nowrap mb-0">
                  <thead>
                    <tr className="table-light">
                      <th>Customer Name</th>
                      <th>Voucher Code</th>
                      <th>Discount (%)</th>
                      <th>Redeemed</th>
                      <th>Expiry Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allVouchers && allVouchers.length > 0 ? (
                      allVouchers?.map((voucher) => {
                        return (
                          <tr key={voucher.voucherCode}>
                            <td>{voucher.customerName}</td>
                            <td>{voucher.voucherCode}</td>
                            <td>{voucher.discountPercentage}</td>
                            <td>
                              <Switch readOnly checked={voucher.isReedemed} />
                            </td>
                            <td>
                              {dayjs(voucher.expiryDate).format(
                                dateFormat.toUpperCase().split(" ")[0]
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan={5}>No Vouchers Found</td>
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
                total={parseInt(totalVouchers) ? parseInt(totalVouchers) : 10}
                showTotal={(total, range) =>
                  `${totalVouchers ? totalVouchers : 0} out of ${
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

export default Voucher;
