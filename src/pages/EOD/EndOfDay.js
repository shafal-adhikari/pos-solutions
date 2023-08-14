import React, { useEffect, useState } from "react";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, DatePicker, Popconfirm, Select } from "antd";
import { dayjs } from "../../helpers/frontendHelper";
import Skeleton from "react-loading-skeleton";
import { Form } from "antd";
import FinalizeModal from "./FinalizeModal";
function EndOfDay() {
  const [date, setDate] = useState(dayjs());

  const {
    eodSectionList: { accountingPlatforms, taxExclusiveInclusives },
    finalizeLoading,
    mainLoading,
    allEod: { eodChartOfAccountPayment, eodSaleReconcilation, message },
  } = useSelector((state) => state.eodReducer);
  const [form] = Form.useForm();
  useEffect(() => {
    if (eodChartOfAccountPayment) {
      form.setFieldValue("EODChartOfAccountPayments", eodChartOfAccountPayment);
    }
  }, [eodChartOfAccountPayment]);
  const {
    activeStore: { dateFormat, currencySymbol },
  } = useSelector((state) => state.authenticationReducer);
  const dispatch = useDispatch();
  const [selectedPlatform, setSelectedPlatform] = useState();
  const [selectedTaxType, setSelectedTaxType] = useState();
  const formatDate = dateFormat.split(" ")[0].toUpperCase();
  const [finalizeModal, setFinalizeModal] = useState(false);
  useEffect(() => {});
  const calcuateEODHandler = () => {
    dispatch({
      type: "GET_ALL_EOD_BY_DATE_REQUEST",
      payload: {
        Page: 1,
        PageSize: 100,
        SearchKeywords: "",
        ExternalFilter: {
          Date: dayjs(date).format(formatDate) + " 00:00:00",
          AccountingPlatFormId: selectedPlatform.toUpperCase(),
          TaxExclusiveInclusiveId: selectedTaxType,
        },
      },
    });
  };
  useEffect(() => {
    if (selectedPlatform && date && selectedTaxType) {
      dispatch({
        type: "GET_ALL_EOD_BY_DATE_REQUEST",
        payload: {
          Page: 1,
          PageSize: 100,
          SearchKeywords: "",
          ExternalFilter: {
            Date: dayjs(date).format(formatDate) + " 00:00:00",
            AccountingPlatFormId: selectedPlatform.toUpperCase(),
            TaxExclusiveInclusiveId: selectedTaxType,
          },
        },
      });
    }
  }, [selectedPlatform, date, selectedTaxType]);
  useEffect(() => {
    dispatch({
      type: "GET_ALL_EOD_SECTION_REQUEST",
    });
  }, []);

  useEffect(() => {
    if (accountingPlatforms) {
      setSelectedPlatform(accountingPlatforms?.[0].id);
      setSelectedTaxType(
        taxExclusiveInclusives?.find((tax) => tax.isSelected)?.id
      );
    }
  }, [accountingPlatforms, taxExclusiveInclusives]);
  const finalizeHandler = (emailValues) => {
    console.log(emailValues);
    dispatch({
      type: "FINALIZE_EOD_REQUEST",
      payload: {
        date: dayjs(date).format(formatDate) + " 00:00:00",
        AccountingPlatFormId: selectedPlatform,
        TaxExclusiveInclusiveId: selectedTaxType,
        EODChartOfAccountPayments: form.getFieldValue(
          "EODChartOfAccountPayments"
        ),
      },
      EmailModel: emailValues,
      IsSendMailAndFinalize: emailValues.IsSendMailAndFinalize,
    });
  };
  return (
    <>
      <FinalizeModal
        isOpen={finalizeModal}
        setIsOpen={setFinalizeModal}
        message={`Please find the EOD report on day ${dayjs(date).format(
          formatDate
        )}`}
        subject={`EOD on date ${dayjs(date).format(formatDate)}`}
        submitHandler={finalizeHandler}
      />
      {/* <div className="card">
        <div className="card">
          <div className="card-body">
            <div className="add_btn ">
              <div className="row">
                <div className="col-md-6">
                  <div className="eodbtn ">
                    <Skeleton count={0.3} height={30} inline={true} />
                    <Skeleton
                      count={0.3}
                      className="ms-2"
                      height={30}
                      inline={true}
                    />
                    <Skeleton
                      count={0.3}
                      height={30}
                      className="ms-2"
                      inline={true}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <Skeleton height={30} />
                    </div>
                    <div className="col-md-6">
                      <Skeleton height={30} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div> */}
      <div className="card">
        <div className="card-body">
          <div className="add_btn ">
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-3">
                    <Select
                      className="w-100"
                      value={selectedPlatform}
                      onChange={(val) => setSelectedPlatform(val)}
                      options={accountingPlatforms?.map((platform) => {
                        return {
                          value: platform.id,
                          label: platform.name,
                        };
                      })}
                    />
                  </div>
                  <div className="col-md-3">
                    <Select
                      className="w-100"
                      value={selectedTaxType}
                      onChange={(val) => setSelectedTaxType(val)}
                      options={taxExclusiveInclusives?.map((platform) => {
                        return {
                          value: platform.id,
                          label: platform.name,
                        };
                      })}
                    />
                  </div>
                  <div className="col-md-3">
                    <DatePicker
                      className="w-100"
                      value={date}
                      format={formatDate.split(" ")[0]}
                      onChange={(date) => setDate(date)}
                    />
                  </div>
                  <div className="col-md-3">
                    <button
                      className="btn btn-primary all_btn rounded-0"
                      onClick={calcuateEODHandler}
                    >
                      Calculate EOD
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-3 d-flex justify-content-end">
                <div className="eodbtn ">
                  <Button
                    className="btn btn-primary all_btn btn_red rounded-0 ms-2"
                    data-bs-toggle="offcanvas"
                    loading={finalizeLoading}
                    onClick={() => {
                      setFinalizeModal(true);
                    }}
                    data-bs-target="#eodfinalize"
                    aria-controls="eodfinalize"
                  >
                    Finalize Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <hr />
          {mainLoading ? (
            <div className="statstop ">
              <div className="row g-4">
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="h-100">
                    <Skeleton height={100} borderRadius={15} />
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="h-100">
                    <Skeleton height={100} borderRadius={15} />
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="h-100">
                    <Skeleton height={100} borderRadius={15} />
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="h-100">
                    <Skeleton height={100} borderRadius={15} />
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="h-100">
                    <Skeleton height={100} borderRadius={15} />
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="h-100">
                    <Skeleton height={100} borderRadius={15} />
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="h-100">
                    <Skeleton height={100} borderRadius={15} />
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="h-100">
                    <Skeleton height={100} borderRadius={15} />
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="h-100">
                    <Skeleton height={100} borderRadius={15} />
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="h-100">
                    <Skeleton height={100} borderRadius={15} />
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="h-100">
                    <Skeleton height={100} borderRadius={15} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="statstop ">
              <div className="row g-4">
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="count1 text-center h-100">
                    <span className="d-block">
                      {currencySymbol}
                      {Number(eodSaleReconcilation?.posSales)}
                    </span>
                    <h3>POS Sales</h3>
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="count1 text-center h-100">
                    <span className="d-block">
                      {currencySymbol}
                      {Number(eodSaleReconcilation?.uberEatsSales)}
                    </span>
                    <h3>UberEats Sales</h3>
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="count1 text-center h-100">
                    <span className="d-block">
                      {currencySymbol}
                      {Number(eodSaleReconcilation?.doorDashSales)}
                    </span>
                    <h3>DoorDash Sales</h3>
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="count1 text-center h-100">
                    <span className="d-block">
                      {currencySymbol}
                      {Number(eodSaleReconcilation?.menuLogSales)}
                    </span>
                    <h3>Menulog Sales</h3>
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="count1 text-center h-100">
                    <span className="d-block">
                      {currencySymbol}
                      {Number(eodSaleReconcilation?.onlineOrderSales)}
                    </span>
                    <h3>Online Order Sales</h3>
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="count1 text-center h-100">
                    <span className="d-block">
                      {currencySymbol}
                      {Number(eodSaleReconcilation?.centralizedSales)}
                    </span>
                    <h3>Centralise Order Sales</h3>
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="count1 text-center h-100">
                    <span className="d-block">
                      {currencySymbol}
                      {Number(eodSaleReconcilation?.refund)}
                    </span>
                    <h3>Refund</h3>
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="count1 text-center h-100">
                    <span className="d-block">
                      {currencySymbol}
                      {Number(eodSaleReconcilation?.discount)}
                    </span>
                    <h3>Discount</h3>
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="count1 text-center h-100">
                    <span className="d-block">
                      {currencySymbol}
                      {Number(eodSaleReconcilation?.gstOrTax)}
                    </span>
                    <h3>GST/Tax</h3>
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="count1 text-center h-100">
                    <span className="d-block">
                      {currencySymbol}
                      {Number(eodSaleReconcilation?.cashIn)}
                    </span>
                    <h3>Cash In</h3>
                  </div>
                </div>
                <div className="col-md-3 col-xxl-2 col-lg-3 col-6">
                  <div className="count1 text-center h-100">
                    <span className="d-block">
                      {currencySymbol}
                      {Number(eodSaleReconcilation?.cashOut)}
                    </span>
                    <h3>Cash Out</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card mt-4">
        {mainLoading ? (
          <TableSkeleton />
        ) : (
          <div className="card-body">
            <Form form={form}>
              <div className="table-responsive">
                <table className="table table-hover  align-middle table-nowrap mb-0">
                  <Form.List name="EODChartOfAccountPayments">
                    {(fields) => (
                      <>
                        <thead>
                          <tr className="table-light">
                            <th> Payment</th>
                            <th>Amount ({currencySymbol})</th>
                          </tr>
                        </thead>

                        <tbody>
                          {message ? (
                            <tr style={{ textAlign: "center" }}>
                              <td colSpan={2}>{message}</td>
                            </tr>
                          ) : (
                            fields?.map(
                              ({ key, name, ...restField }, index) => {
                                return (
                                  <tr
                                    key={name + index}
                                    className="table-with-input"
                                  >
                                    <td
                                      className={`${
                                        (eodChartOfAccountPayment[index]
                                          .chartOfAccountNameEnum ==
                                          "Variance" ||
                                          eodChartOfAccountPayment[index]
                                            .name == "Total") &&
                                        "fw-bold"
                                      }`}
                                    >
                                      {/* <Form.Item name={[name, "name"]}>
                                        <Input type="text" disabled={true} />
                                      </Form.Item> */}
                                      {eodChartOfAccountPayment[index].name}
                                    </td>
                                    <td>
                                      <Form.Item name={[name, "amount"]}>
                                        <Input
                                          type="number"
                                          disabled={
                                            eodChartOfAccountPayment[index]
                                              .chartOfAccountNameEnum !==
                                              "Cash" &&
                                            eodChartOfAccountPayment[index]
                                              .chartOfAccountNameEnum !==
                                              "Float" &&
                                            eodChartOfAccountPayment[index]
                                              .chartOfAccountNameEnum !==
                                              "Variance"
                                          }
                                        />
                                      </Form.Item>
                                    </td>
                                  </tr>
                                );
                              }
                            )
                          )}
                        </tbody>
                      </>
                    )}
                  </Form.List>
                </table>
              </div>
            </Form>
          </div>
        )}
      </div>
    </>
  );
}

export default EndOfDay;
