import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Button, Card, DatePicker, Empty, Popconfirm, Tooltip } from "antd";
import RedeemHistory from "../RedeemHistory/RedeemHistory";
import { Pagination } from "antd";
import TableSkeleton from "../Table Skeleton/TableSkeleton";

const { RangePicker } = DatePicker;
function GiftCardList() {
  const dispatch = useDispatch();
  const [externalFilter, setExternalFilter] = useState({
    GiftCardCode: "",
    ReceiverName: "",
    GiftCardStatusId: "",
    ExpiryDateFrom: "",
    ExpiryDateTo: "",
  });
  const {
    activeStore: { dateFormat },
  } = useSelector((state) => state.authenticationReducer);
  const {
    allGiftCards,
    giftSearchSection,
    isLoading,
    exportPdfLoading,
    totalGiftCards,
    exportExcelLoading,
    deactivateSuccess,
    addGiftSuccess,
  } = useSelector((state) => state.giftCardReducer);
  const cardNoRef = useRef(null);
  const receiverNameRef = useRef(null);
  const selectStatusRef = useRef(null);
  const [activeId, setActiveId] = useState();
  const dateRef = useRef(null);
  const onChange = (dates, dateStrings) => {
    if (dates) {
      setExternalFilter((ext) => {
        return {
          ...ext,
          ExpiryDateFrom: moment(dateStrings[0]).format(
            dateFormat.toUpperCase()
          ),
          ExpiryDateTo: moment(dateStrings[1]).format(dateFormat.toUpperCase()),
        };
      });
    }
  };
  const searchHandler = () => {
    console.log(cardNoRef.current.value);
    setExternalFilter((state) => {
      return {
        ...state,
        GiftCardCode: cardNoRef.current.value,
        ReceiverName: receiverNameRef.current.value,
        GiftCardStatusId: selectStatusRef.current.value,
        ExpiryDateFrom: "",
        ExpiryDateTo: "",
      };
    });
  };
  useEffect(() => {
    dispatch({
      type: "GET_GIFT_CARDS_REQUEST",
      payload: {
        Page: 1,
        PageSize: 10,
        ExternalFilter: externalFilter,
      },
    });
  }, [externalFilter, deactivateSuccess, addGiftSuccess]);
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);

    dispatch({
      type: "GET_GIFT_CARDS_REQUEST",
      payload: {
        Page: 1,
        PageSize: 10,
        ExternalFilter: externalFilter,
      },
    });
  }
  useEffect(() => {
    dispatch({
      type: "GET_GIFT_SEARCH_SECTION_REQUEST",
    });
  }, []);
  const deactivateHandler = (id) => {
    dispatch({
      type: "DEACTIVATE_GIFT_CARD_REQUEST",
      payload: {
        Id: id,
      },
    });
  };
  return (
    <>
      <>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-2 col-lg-2">
                <div className="form-group">
                  <label className="control-label"> Gift Card No.</label>
                  <input
                    ref={cardNoRef}
                    type="email"
                    className="form-control"
                    placeholder=""
                    spellCheck="false"
                    data-ms-editor="true"
                  />
                </div>
              </div>
              <div className="col-md-2 col-lg-2">
                <div className="form-group">
                  <label className="control-label"> Receiver Name</label>
                  <input
                    type="email"
                    className="form-control"
                    ref={receiverNameRef}
                    placeholder=""
                    spellCheck="false"
                    data-ms-editor="true"
                  />
                </div>
              </div>
              <div className="col-md-2 col-lg-2">
                <div className="form-group">
                  <label className="control-label"> Status</label>
                  <select
                    ref={selectStatusRef}
                    defaultValue={giftSearchSection?.[0].id}
                    className="form-control form-select"
                  >
                    {giftSearchSection?.map((option) => {
                      return (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="form-group">
                  <label className="control-label">Expiry Date</label>
                  <div className="flex-row d-flex justify-content-center">
                    <div className="input-group input-daterange">
                      <RangePicker
                        format="YYYY/MM/DD"
                        onChange={onChange}
                        // onOk={onOk}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 col-lg-2 d-flex align-items-center mt-2">
                <button
                  type="button"
                  className="btn btn-primary all_btn rounded-0 checkcard"
                  onClick={searchHandler}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card cardlist mt-3">
          <div className="card-body">
            <h5 className="fw-bold text-theme">Gift Card List</h5>
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <table className="table table-hover  align-middle table-nowrap mb-0">
                <thead>
                  <tr className="table-light">
                    <th> Gift card No.</th>
                    <th>Sender Name</th>
                    <th>Receiver Name</th>
                    <th>Status</th>
                    <th>Purchase Date</th>
                    <th>Expiry Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allGiftCards && allGiftCards?.length > 0 ? (
                    allGiftCards?.map((giftCard) => {
                      return (
                        <tr key={giftCard.id}>
                          <td>{giftCard.giftCardCode}</td>
                          <td>{giftCard.senderName}</td>
                          <td>{giftCard.receiverName}</td>
                          <td>
                            {giftCard.statusEnum == 1 ? (
                              <span className="badge bg-success">Active</span>
                            ) : (
                              <span className="badge bg-danger">Inactive</span>
                            )}
                          </td>
                          <td>{giftCard.purchaseDate.split(" ")[0]}</td>
                          <td>{giftCard.expiryDate.split(" ")[0]}</td>
                          <td>
                            <a
                              onClick={() => setActiveId(giftCard.id)}
                              className="btn  btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#redeemhistoryModalCenter"
                            >
                              <i
                                className="fas fa-history delete"
                                aria-hidden="true"
                                data-bs-toggle="tooltip"
                                data-bs-placement="left"
                                title=""
                                data-bs-original-title="Redeem History"
                              />
                            </a>
                            {giftCard.statusEnum == 1 && (
                              <Tooltip
                                title="Deactivate Gift Card"
                                placement="bottom"
                              >
                                <Popconfirm
                                  title="Are you sure you want to deactivate?"
                                  okText="Yes"
                                  cancelText="No"
                                  onConfirm={() =>
                                    deactivateHandler(giftCard.id)
                                  }
                                >
                                  <a href="" className="btn  btn-sm">
                                    <i
                                      className="fas fa-eye-slash delete"
                                      aria-hidden="true"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="left"
                                      title=""
                                      data-bs-original-title="Deactivate"
                                    />
                                  </a>
                                </Popconfirm>
                              </Tooltip>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td align="center" colSpan={7}>
                        No Records Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            <div className="d-flex align-items-center justify-content-between">
              {allGiftCards?.length > 0 && (
                <div>
                  <Button
                    type="primary"
                    className="btn btn-primary all_btn rounded-0"
                    loading={exportPdfLoading}
                    onClick={() =>
                      dispatch({
                        type: "EXPORT_GIFT_PDF_REQUEST",
                        payload: {
                          Page: 1,
                          PageSize: 10,
                          ExportType: "pdf",
                          ExternalFilter: externalFilter,
                        },
                      })
                    }
                  >
                    <i className="fas fa-file-export " />
                    Export to PDF
                  </Button>
                  <Button
                    className="btn all_btn rounded-0 ms-2"
                    loading={exportExcelLoading}
                    style={{ background: "#00205A", color: "#fff" }}
                    onClick={() =>
                      dispatch({
                        type: "EXPORT_GIFT_EXCEL_REQUEST",
                        payload: {
                          Page: 1,
                          PageSize: 10,
                          ExportType: "xlsx",
                          ExternalFilter: externalFilter,
                        },
                      })
                    }
                  >
                    <i className="fas fa-file-export " />
                    Export to Excel
                  </Button>
                </div>
              )}
              <div />
              <div className="company_footer d-flex justify-content-end mt-3">
                <Pagination
                  total={totalGiftCards}
                  showTotal={(total, range) =>
                    `${allGiftCards ? allGiftCards?.length : 0} out of ${
                      total ? total : 0
                    } items`
                  }
                  pageSize={10}
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
      <RedeemHistory isOpen={activeId} setIsOpen={setActiveId} id={activeId} />
    </>
  );
}

export default GiftCardList;
