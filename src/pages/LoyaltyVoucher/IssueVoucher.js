/** @format */

import { Button, DatePicker, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dayjs } from "../../helpers/frontendHelper";

const IssueVoucher = ({
  setIsIssueVoucherModalOpen,
  selectedGroups,
  selectedCustomers,
  issueVoucherToCustomer,
}) => {
  const {
    activeStore: { dateFormat },
  } = useSelector((state) => state.authenticationReducer);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {
    isOperatioSuccessful,
    issueVoucherToGroupLoading,
    issueVoucherToCustomerLoading,
  } = useSelector((state) => state.loyaltyReducer);
  const onIssueVoucherHandler = (values) => {
    if (issueVoucherToCustomer) {
      dispatch({
        type: "ISSUE_VOUCHER_TO_CUSTOMERS_REQUEST",
        payload: {
          CustomerIds: selectedCustomers?.map((item) => item.Id),
          Discount: values.discount,
          VoucherExpiryDate:
            dayjs(values.voucherExpiryDate)
              .format(dateFormat.toUpperCase())
              .split(" ")[0] + " 00:00:00",
        },
      });
    } else {
      dispatch({
        type: "ISSUE_VOUCHER_TO_GROUP_REQUEST",
        payload: {
          GroupIds: selectedGroups,
          Discount: values.discount,
          VoucherExpiryDate:
            dayjs(values.voucherExpiryDate)
              .format(dateFormat.toUpperCase())
              .split(" ")[0] + " 00:00:00",
        },
      });
    }
  };
  useEffect(() => {
    if (isOperatioSuccessful) {
      form.resetFields();
    }
  }, [isOperatioSuccessful]);
  return (
    <Form form={form} onFinish={onIssueVoucherHandler}>
      <div className="card p-2 mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 form-group categoryField">
              <Form.Item
                label="Discount %"
                name="discount"
                rules={[
                  {
                    required: true,
                    message: "Please enter discount",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6 form-group categoryField">
              <Form.Item
                label="Voucher Expiry Date"
                name="voucherExpiryDate"
                rules={[
                  {
                    required: true,
                    message: "Please select Voucher Expiry Date",
                  },
                ]}
              >
                <DatePicker
                  format={dateFormat.toUpperCase().split(" ")[0]}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>
          <div className=" justify-content-start ">
            <Button
              loading={
                issueVoucherToGroupLoading || issueVoucherToCustomerLoading
              }
              type="primary"
              htmlType="submit"
              className="btn btn-primary all_btn rounded-0 me-2"
            >
              Send
            </Button>
            <button
              onClick={() => {
                setIsIssueVoucherModalOpen(false);
              }}
              type="button"
              className="btn rounded-0  btn-danger "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default IssueVoucher;
