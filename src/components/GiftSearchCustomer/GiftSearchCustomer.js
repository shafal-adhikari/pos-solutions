import { Alert, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "../Table Skeleton/TableSkeleton";

function GiftSearchCustomer({
  isSenderOpen,
  setIsSenderOpen,
  senderDetails,
  isReceiverOpen,
  setIsReceiverOpen,
  receiverDetails,
  setSenderDetails,
  setReceiverDetails,
}) {
  const dispatch = useDispatch();
  const [checkedCustomer, setCheckedCustomer] = useState(null);
  useEffect(() => {
    if (senderDetails && isSenderOpen) {
      setCheckedCustomer(senderDetails);
    } else if (receiverDetails && isReceiverOpen) {
      setCheckedCustomer(receiverDetails);
    } else {
      setCheckedCustomer(null);
    }
  }, [isReceiverOpen, isSenderOpen, senderDetails, receiverDetails]);
  const confirmHandler = () => {
    if (isSenderOpen) {
      setSenderDetails(checkedCustomer);
    } else {
      setReceiverDetails(checkedCustomer);
    }
    setCheckedCustomer(null);
    closeHandler();
  };
  const closeHandler = () => {
    setIsReceiverOpen(false);
    setIsSenderOpen(false);
  };
  useEffect(() => {
    if (isSenderOpen || isReceiverOpen) {
      dispatch({
        type: "GET_ALL_GIFT_CARD_CUSTOMER_REQUEST",
        payload: {
          Page: 1,
          PageSize: 10,
          SearchKeywords: "",
          ExternalFilter: {},
        },
      });
    }
  }, [isSenderOpen, isReceiverOpen]);
  const searchCustomerHandler = (e) => {
    e.preventDefault();
    if (customerLoading) {
      return;
    }
    dispatch({
      type: "GET_ALL_GIFT_CARD_CUSTOMER_REQUEST",
      payload: {
        Page: 1,
        PageSize: 10,
        SearchKeywords: searchValue,
        ExternalFilter: {},
      },
    });
  };
  const [searchValue, setSearchValue] = useState();
  const { customerError, customerLoading, customerData } = useSelector(
    (state) => state.giftCardReducer
  );
  return (
    <Modal
      show={isSenderOpen || isReceiverOpen}
      backdrop="static"
      centered
      size="xl"
    >
      <Modal.Header className="modal-header ">
        <h5 className="modal-title" id="searchmodalLabel">
          Search Now
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={closeHandler}
        />
      </Modal.Header>
      <Modal.Body className="modal-body">
        <form onSubmit={searchCustomerHandler}>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text  h-100 rounded-0" id="search">
                <i className="fas fa-search" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search Customer"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              aria-label="search"
              aria-describedby="search"
              spellCheck="false"
              data-ms-editor="true"
            />
          </div>
        </form>
        <div className="table-responsive mt-3">
          {/* <Spin spinning={customerLoading}> */}
          {customerLoading ? (
            <TableSkeleton row={4} column={3} />
          ) : (
            <table className="table table-hover  align-middle table-nowrap mb-0">
              <thead>
                <tr className="table-light">
                  <th></th>
                  <th> Customer Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {customerData && customerData.length > 0 ? (
                  customerData?.map((customer) => {
                    return (
                      <tr
                        key={customer.id}
                        onClick={() => setCheckedCustomer(customer)}
                      >
                        <td>
                          <input
                            className="form-check-input mt-2 catcheck"
                            type="checkbox"
                            checked={customer.id == checkedCustomer?.id}
                            value={customer.id == checkedCustomer?.id}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCheckedCustomer(customer);
                              } else {
                                setCheckedCustomer(null);
                              }
                            }}
                            name="customercheckbox"
                            id="defaultCheck1"
                          />
                        </td>
                        <td>{customer.name}</td>
                        <td>{customer.phoneNumber}</td>
                        <td>{customer.email}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr style={{ textAlign: "center" }}>
                    <td colSpan={3}>No Customers Found !</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          {/* </Spin> */}
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer justify-content-start">
        <button
          type="button"
          className="btn btn-primary all_btn rounded-0"
          disabled={checkedCustomer ? false : true}
          data-bs-dismiss="modal"
          onClick={confirmHandler}
        >
          Confirm
        </button>
        <button
          type="button"
          className="btn btn-danger rounded-0"
          data-bs-dismiss="modal"
          onClick={closeHandler}
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default GiftSearchCustomer;
