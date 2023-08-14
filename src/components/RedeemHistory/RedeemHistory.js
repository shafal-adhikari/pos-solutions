import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
function RedeemHistory({ isOpen, setIsOpen, id }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch({
        type: "GET_REDEEM_HISTORY_REQUEST",
        payload: {
          Id: id,
        },
      });
    }
  }, [id]);
  const { redeemLoading, redeemHistory } = useSelector(
    (state) => state.giftCardReducer
  );
  const {
    activeStore: { currencySymbol },
  } = useSelector((state) => state.authenticationReducer);
  return (
    <Modal centered size="xl" show={isOpen} backdrop="static">
      <Modal.Header className="modal-header  ">
        <h5 className="modal-title" id="redeemhistorymodalLabel">
          Redeem History
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          onClick={() => setIsOpen(null)}
          aria-label="Close"
        />
      </Modal.Header>
      <Modal.Body className="modal-body">
        {redeemLoading ? (
          <div className="bg-light p-2 rounded-3">
            <div className="row">
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  {" "}
                  <Skeleton width={160} height={25} />
                  <span className="control-label d-block">
                    {" "}
                    <Skeleton width={160} height={25} />
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <Skeleton width={160} height={25} />
                  <span className="control-label d-block">
                    {" "}
                    <Skeleton width={160} height={25} />
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <Skeleton width={160} height={25} />
                  <span className="control-label d-block">
                    {" "}
                    <Skeleton width={160} height={25} />
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <Skeleton width={160} height={25} />
                  <span className="control-label d-block">
                    {" "}
                    <Skeleton width={160} height={25} />
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <Skeleton width={160} height={25} />
                  <span className="control-label d-block">
                    {" "}
                    <Skeleton width={160} height={25} />
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <Skeleton width={160} height={25} />
                  <span className="control-label d-block">
                    {" "}
                    <Skeleton width={160} height={25} />
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <Skeleton width={160} height={25} />
                  <span className="control-label d-block">
                    {" "}
                    <Skeleton width={160} height={25} />
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <Skeleton width={160} height={25} />
                  <span className="control-label d-block">
                    {" "}
                    <Skeleton width={160} height={25} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-light p-2 rounded-3">
            <div className="row">
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <label className="control-label"> Gift Card No.</label>
                  <span className="control-label d-block">
                    {" "}
                    {redeemHistory?.giftCardCode}
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <label className="control-label"> Amount</label>
                  <span className="control-label d-block">
                    {currencySymbol + redeemHistory?.amount}
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <label className="control-label"> Sender Name</label>
                  <span className="control-label d-block">
                    {" "}
                    {redeemHistory?.senderName}
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <label className="control-label"> Receiver Name</label>
                  <span className="control-label d-block">
                    {redeemHistory?.receiverName}
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <label className="control-label"> Remaining Amount</label>

                  <span className="control-label d-block">
                    {currencySymbol}
                    {redeemHistory?.remainingAmount
                      ? redeemHistory?.remainingAmount
                      : 0}
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <label className="control-label"> Purchased Date</label>
                  <span className="control-label d-block">
                    {redeemHistory?.purchasedDate.split(" ")[0]}
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <label className="control-label"> Expiry Date</label>
                  <span className="control-label d-block">
                    {redeemHistory?.expiryDate.split(" ")[0]}
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <label className="control-label d-block"> Status</label>
                  <span className="badge bg-success ">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="table-responsive mt-3">
          <table className="table table-hover  align-middle table-nowrap mb-0">
            <thead>
              <tr className="table-light">
                <th> Redeem by</th>
                <th>Redeem Amount</th>
                <th>Redeem Date</th>
              </tr>
            </thead>
            <tbody>
              {redeemHistory?.giftCardRedeemSummaryDetails?.length > 0 ? (
                <tr>
                  <td>001</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={3} align="center" style={{ fontSize: "14px" }}>
                    No Record Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer justify-content-start">
        <button
          type="button"
          className="btn btn-danger rounded-0"
          data-bs-dismiss="modal"
          onClick={() => setIsOpen(null)}
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default RedeemHistory;
