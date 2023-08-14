import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";
import { Pagination, Button, Tooltip } from "antd";
import { Form, Select, Input, Skeleton, DatePicker } from "antd";
import { dayjs } from "../../helpers/frontendHelper";
function SalesSummary() {
  const [form] = Form.useForm();
  const { activeStore } = useSelector((state) => state.authenticationReducer);
  const dateFormat = activeStore.dateFormat.split(" ")[0];
  const { salesHistorySection } = useSelector((state) => state.reportsReducer);
  const {
    activeStore: { currencySymbol },
  } = useSelector((state) => state.authenticationReducer);
  useEffect(() => {
    dispatch({
      type: "GET_SALES_HISTORY_SECTION_REQUEST",
    });
  }, []);
  const paymentMethod = Form.useWatch("paymentMethodId", form);
  const storeChannel = Form.useWatch("storeChannelId", form);
  const date = Form.useWatch("date", form);
  useLayoutEffect(() => {
    if (salesHistorySection) {
      form.setFields([
        {
          name: "paymentMethodId",
          value: salesHistorySection?.paymentMethodStore[0]?.id,
        },
        {
          name: "storeChannelId",
          value: salesHistorySection?.storeChannelId[0]?.id,
        },
        {
          name: "date",
          value: [dayjs().subtract(30, "day"), dayjs()],
        },
      ]);
    }
  }, [salesHistorySection]);

  useEffect(() => {
    if (paymentMethod && date && storeChannel) {
      dispatch({
        type: "GET_SALES_HISTORY_REQUEST",
        payload: {
          Page: 1,
          PageSize: 10,
          ExternalFilter: {
            PaymentMethodId: paymentMethod,
            FromDate: dayjs(date[0]).format(dateFormat.toUpperCase()),
            ToDate: dayjs(date[1]).format(dateFormat.toUpperCase()),
            ChannelId: paymentMethod,
          },
        },
      });
    }
  }, [paymentMethod, date, storeChannel]);
  const {
    isLoading,
    allSalesHistory,
    totalSalesHistory,
    exportPdfLoading,
    exportExcelLoading,
  } = useSelector((state) => state.reportsReducer);
  const dispatch = useDispatch();
  const [searchkeyword, setSearchKeyword] = useState("");
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);
    dispatch({
      type: "GET_SALES_HISTORY_REQUEST",
      payload: {
        Page: current,
        PageSize: pageSize,
        ExternalFilter: {
          PaymentMethodId: paymentMethod,
          FromDate: dayjs(date[0]).format(dateFormat.toUpperCase()),
          ToDate: dayjs(date[1]).format(dateFormat.toUpperCase()),
          ChannelId: paymentMethod,
        },
      },
    });
  }
  return (
    <>
      <div className="col-md-10 col-xxl-10">
        <div className="menu_right">
          <div className="right_top mb-4">
            <div className="card text-left border">
              <div className="card-body">
                <div className="timesheet_filter">
                  <Form form={form}>
                    <div className="row">
                      <div className="col-md-3 col-lg-3">
                        <div className="form-group categoryField">
                          <Form.Item
                            label="Start and End Date"
                            placeholder="Start and End Date"
                            name="date"
                          >
                            <DatePicker.RangePicker
                              format={dateFormat.toUpperCase().split(" ")[0]}
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3">
                        <div className="form-group categoryField">
                          <Form.Item
                            label="Payment Method"
                            name="paymentMethodId"
                          >
                            <Select>
                              {salesHistorySection?.paymentMethodStore.map(
                                (paymentMethod) => {
                                  return (
                                    <Select.Option
                                      value={paymentMethod.id}
                                      key={paymentMethod.id}
                                    >
                                      {paymentMethod.value}
                                    </Select.Option>
                                  );
                                }
                              )}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3">
                        <div className="form-group categoryField">
                          <Form.Item
                            label="Store Channel"
                            name="storeChannelId"
                          >
                            <Select>
                              {salesHistorySection?.storeChannelId.map(
                                (storeChannel) => {
                                  return (
                                    <Select.Option
                                      value={storeChannel.id}
                                      key={storeChannel.id}
                                    >
                                      {storeChannel.value}
                                    </Select.Option>
                                  );
                                }
                              )}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3 d-flex align-items-center mt-3">
                        <Button
                          style={{ background: "#002059", color: "#fefefe" }}
                        >
                          Search
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <div className="card mt-2">
              <div className="card">
                <div className="card-body">
                  <div className="table-body">
                    <div className="table-responsive">
                      {isLoading ? (
                        <TableSkeleton />
                      ) : (
                        <div className="table-responsive">
                          <table className="table table-hover  align-middle table-nowrap mb-0">
                            <thead>
                              <tr style={{ background: "#EFEFEE" }}>
                                <th>Date</th>
                                <th>Recipet Number</th>
                                <th>Payment Method</th>
                                <th>Sales({currencySymbol})</th>
                                <th>Tax ({currencySymbol})</th>
                                <th>Discount ({currencySymbol})</th>
                                <th>Holiday Charge ({currencySymbol})</th>
                                <Tooltip title="Credit Card Surchage Amount">
                                  <th>CC Surcharge ({currencySymbol})</th>
                                </Tooltip>
                              </tr>
                            </thead>
                            <tbody>
                              {allSalesHistory?.length > 0 ? (
                                allSalesHistory?.map((salesHistory, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{salesHistory.date}</td>
                                      <td>{salesHistory.receiptNumber}</td>
                                      <td>{salesHistory.paymentMethod}</td>
                                      <td>
                                        {currencySymbol +
                                          " " +
                                          salesHistory.salesAmount}
                                      </td>
                                      <td>
                                        {currencySymbol +
                                          " " +
                                          salesHistory.taxAmount}
                                      </td>
                                      <td>
                                        {currencySymbol +
                                          " " +
                                          salesHistory.discountAmount}
                                      </td>
                                      <td>
                                        {currencySymbol +
                                          " " +
                                          salesHistory.holidayChargeAmount}
                                      </td>
                                      <td>
                                        {currencySymbol +
                                          " " +
                                          salesHistory.creditCardSurchargeAmount}
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td align="center" colSpan={8}>
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
                      {allSalesHistory?.length > 0 && <div>
                        <Button
                          type="primary"
                          className="btn btn-primary all_btn rounded-0"
                          loading={exportPdfLoading}
                          onClick={() =>
                            dispatch({
                              type: "EXPORT_SALES_PDF_REQUEST",
                              payload: {
                                Page: 1,
                                PageSize: 10,
                                ExportType: "pdf",
                                ExternalFilter: {
                                  PaymentMethodId: paymentMethod,
                                  FromDate: dayjs(date[0]).format(
                                    dateFormat.toUpperCase()
                                  ),
                                  ToDate: dayjs(date[1]).format(
                                    dateFormat.toUpperCase()
                                  ),
                                  ChannelId: paymentMethod,
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
                              type: "EXPORT_SALES_EXCEL_REQUEST",
                              payload: {
                                Page: 1,
                                PageSize: 10,
                                ExportType: "xlsx",
                                ExternalFilter: {
                                  PaymentMethodId: paymentMethod,
                                  FromDate: dayjs(date[0]).format(
                                    dateFormat.toUpperCase()
                                  ),
                                  ToDate: dayjs(date[1]).format(
                                    dateFormat.toUpperCase()
                                  ),
                                  ChannelId: paymentMethod,
                                },
                              },
                            })
                          }
                        >
                          <i className="fas fa-file-export " />
                          Export to Excel
                        </Button>
                      </div>}
                      <div />
                      <Pagination
                        total={totalSalesHistory}
                        showSizeChanger
                        showTotal={(total, range) =>
                          `${
                            allSalesHistory ? allSalesHistory.length : 0
                          } out of ${total ? total : 0} items`
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
          </div>
        </div>
      </div>
    </>
  );
}

export default SalesSummary;
