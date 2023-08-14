import { Alert, Button, DatePicker, Form, Input, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";
import { dayjs } from "../../helpers/frontendHelper";
import FormItemSkeleton from "../../components/FormItemSkeleton/FormItemSkeleton";
function CashInCashOut() {
  const [form] = Form.useForm();
  const {
    isLoading,
    allCashInCashOut,
    cashOutLoading,
    addSuccess,
    editLoading,
    cashInLoading,
    editData,
  } = useSelector((state) => state.eodReducer);
  const {
    activeStore: { dateFormat, currencySymbol },
  } = useSelector((state) => state.authenticationReducer);
  const [currentPagination, setCurrentPagination] = useState(1);
  const dispatch = useDispatch();
  const [summary, setSummary] = useState({
    cashIn: 0,
    cashOut: 0,
  });
  useEffect(() => {
    if (allCashInCashOut) {
      let cashIn = 0;
      let cashOut = 0;
      for (let i = 0; i < allCashInCashOut.length; i++) {
        let singleData = allCashInCashOut[i];
        if (singleData.type == "CashIn") {
          cashIn = cashIn + parseFloat(singleData.amount);
        } else {
          cashOut = cashOut + parseFloat(singleData.amount);
        }
      }
      setSummary(() => {
        return {
          cashIn,
          cashOut,
        };
      });
    }
  }, [allCashInCashOut]);
  const [date, setDate] = useState(dayjs());
  useEffect(() => {
    if (editData) {
      form.setFields([
        {
          name: "Amount",
          value: editData.amount,
        },
        {
          name: "Notes",
          value: editData.notes,
        },
      ]);
    }
  }, [editData]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const editCategoryHandler = (id) => {
    dispatch({
      type: "EDIT_CASHIN_CASHOUT_REQUEST",
      payload: id,
    });
  };
  const cashInHandler = (values) => {
    dispatch({
      type: "ADD_NEW_CASHIN_REQUEST",
      payload: {
        ...values,
        id: editData?.id ? editData.id : "",
      },
    });
  };
  const cashOutHandler = (values) => {
    dispatch({
      type: "ADD_NEW_CASHOUT_REQUEST",
      payload: {
        ...values,
        id: editData?.id ? editData.id : "",
      },
    });
  };
  const formatDate =
    dateFormat.split(" ")[0].toUpperCase() +
    " " +
    dateFormat.split(" ")[1].toLowerCase();
  useEffect(() => {
    dispatch({
      type: "GET_ALL_CASHIN_CASHOUT_REQUEST",
      payload: {
        Page: 1,
        PageSize: 100,
        SearchKeywords: "",
        ExternalFilter: {
          Date: dayjs(date).format(formatDate),
        },
      },
    });
    form.resetFields();
  }, [date, addSuccess]);
  return (
    <Form form={form}>
      <h5 className="fw-bold ms-1">Cash In / Cash Out</h5>
      <div className="card">
        <div className="card-body">
          {editLoading ? (
            <div className="cashform categoryField">
              <div className="row">
                <div className="col-md-6 form-group">
                  <FormItemSkeleton />
                </div>
                <div className="col-md-12 form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="mybtn">
                <Skeleton count={0.2} height={30} />
                <Skeleton count={0.2} height={30} />
              </div>
            </div>
          ) : (
            <div className="cashform categoryField">
              <div className="row">
                <div className="col-md-6 form-group">
                  <Form.Item
                    label={`Amount (${currencySymbol})`}
                    name="Amount"
                    rules={[{ required: true, message: "Please enter value" }]}
                  >
                    <Input placeholder="Amount" type="number" />
                  </Form.Item>
                </div>
                <div className="col-md-8 form-group">
                  <Form.Item label="Notes" name="Notes">
                    <Input.TextArea placeholder="Notes" />
                  </Form.Item>
                </div>
              </div>
              <div className="mybtn">
                <Button
                  type="primary"
                  loading={cashInLoading}
                  className="btn btn-success btn-lg bg-theme border-0"
                  onClick={() => {
                    form.validateFields().then(() => {
                      cashInHandler({
                        ...form.getFieldsValue(),
                        Type: "CashIn",
                      });
                    });
                  }}
                >
                  Cash In
                </Button>
                <Button
                  type="danger"
                  className="btn btn-danger btn-lg border-0 ms-2"
                  loading={cashOutLoading}
                  onClick={() => {
                    const prevValues = form.getFieldsValue();
                    console.log(prevValues);
                    form.validateFields().then(() => {
                      cashOutHandler({
                        ...form.getFieldsValue(),
                        Type: "CashOut",
                      });
                    });
                  }}
                >
                  Cash out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card mt-2 ">
        <div className="card-body">
          <div className="table-body">
            <div className="fw-bold d-flex justify-content-between flex-wrap align-items-center mb-3">
              <div className="d-flex">
                {/* <div className="col-md-3"> */}
                <Alert
                  type="success"
                  message={
                    <>
                      Total CashIn Amount:
                      <br />
                      {" " + currencySymbol}
                      {summary.cashIn}
                    </>
                  }
                ></Alert>
                {/* </div> */}
                {/* <div className="col-md-3"> */}
                <Alert
                  type="error"
                  className="ms-4"
                  message={
                    <>
                      Total CashOut Amount:
                      <br />
                      {" " + currencySymbol}
                      {summary.cashOut}
                    </>
                  }
                ></Alert>
                {/* </div> */}
              </div>
              <DatePicker
                value={date}
                format={formatDate.split(" ")[0]}
                onChange={(date) => setDate(date)}
              />
            </div>
            {isLoading ? (
              <TableSkeleton row={2} column={5} />
            ) : (
              <div className="table-responsive">
                <table className="table table-hover  align-middle table-nowrap mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Notes</th>
                      <th>User</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCashInCashOut?.length > 0 ? (
                      allCashInCashOut?.map((cashInCashOut, i) => {
                        console.log(cashInCashOut);
                        return (
                          <tr key={i}>
                            <td>{cashInCashOut.date.split(" ")[0]}</td>
                            <td>{cashInCashOut.date.split(" ")[1]}</td>
                            <td>{cashInCashOut.type}</td>
                            <td>{cashInCashOut.amount}</td>
                            <td>{cashInCashOut.notes}</td>
                            <td>{cashInCashOut.user}</td>
                            <td>
                              <a
                                href=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  editCategoryHandler(cashInCashOut.id);
                                }}
                                className="btn btn-info btn-sm"
                                data-bs-toggle="tooltip"
                                data-bs-placement="left"
                                title=""
                                data-bs-original-title="Edit"
                              >
                                <i className="fas fa-edit" aria-hidden="true" />
                              </a>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan={7}>No Records Found !</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <div className="company_footer d-flex justify-content-end mt-3">
              {/* <Pagination
                total={totalCashInCashOut}
                showTotal={(total, range) =>
                  `${allCashInCashOut ? allCashInCashOut.length : 0} out of ${
                    total ? total : 0
                  } items`
                }
                pageSize={5}
                defaultCurrent={1}
                onChange={(val) => setCurrentPagination(val)}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default CashInCashOut;
