/** @format */

import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  isLoading: false,
  error: null,
  allLoyaltyList: {},
  customerLoyaltyHistory: {},
  getCustomerLoyaltyLoading: false,
  voucherGroup: {},
  addGroupLoading: false,
  isOperatioSuccessful: false,
  editData: {},
  isEditSuccess: false,
  deleteVoucherGroupLoading: false,
  assignCustomerSectionList: {},
  assignCustomerLoading: false,
  customerByVoucherGroup: null,
  getCustomerByVoucherGroupLoading: false,
  issueVoucherToGroupLoading: false,
  issueVoucherToCustomerLoading: false,
  uploadMarketingMaterialLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_VOUCHER_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_ALL_VOUCHER_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allVouchers: payload.data,
        totalVouchers: payload.total,
      };
    case "GET_ALL_VOUCHER_FAILURE":
      return {
        ...state,
        error: payload,
        allLoading: false,
      };
    case "GET_ALL_VOUCHER_CUSTOMER_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_VOUCHER_CUSTOMER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        totalCustomers: payload.total,
        allCustomers: payload.data,
      };
    case "GET_ALL_VOUCHER_CUSTOMER_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_CUSTOMER_BY_VOUCHER_GROUP_REQUEST":
      return {
        ...state,
        getCustomerByVoucherGroupLoading: true,
      };
    case "GET_CUSTOMER_BY_VOUCHER_GROUP_SUCCESS":
      return {
        ...state,
        getCustomerByVoucherGroupLoading: false,
        customerByVoucherGroup: payload,
      };
    case "GET_CUSTOMER_BY_VOUCHER_GROUP_FAILURE":
      return {
        ...state,
        getCustomerByVoucherGroupLoading: false,
      };
    case "GET_LOYALTY_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_LOYALTY_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allLoyaltyList: payload,
      };
    case "GET_LOYALTY_FAILURE":
      return {
        ...state,
        isLoading: false,
      };
    case "GET_CUSTOMER_LOYALTY_REQUEST":
      return {
        ...state,
        getCustomerLoyaltyLoading: true,
      };
    case "GET_CUSTOMER_LOYALTY_SUCCESS":
      return {
        ...state,
        getCustomerLoyaltyLoading: false,
        customerLoyaltyHistory: payload,
      };
    case "GET_CUSTOMER_LOYALTY_FAILURE":
      return {
        ...state,
        getCustomerLoyaltyLoading: false,
      };
    case "GET_VOUCHER_GROUP_REQUEST":
      return {
        ...state,
        groupLoading: true,
      };
    case "GET_VOUCHER_GROUP_SUCCESS":
      return {
        ...state,
        groupLoading: false,
        voucherGroup: payload,
      };
    case "GET_VOUCHER_GROUP_FAILURE":
      return {
        ...state,
        groupLoading: false,
      };
    case "ADD_VOUCHER_GROUP_REQUEST":
      return {
        ...state,
        addGroupLoading: true,
        isOperatioSuccessful: false,
      };
    case "ADD_VOUCHER_GROUP_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addGroupLoading: false,
        isOperatioSuccessful: true,
      };
    case "ADD_VOUCHER_GROUP_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addGroupLoading: false,
        isOperatioSuccessful: false,
      };
    case "DELETE_VOUCHER_GROUP_REQUEST":
      return {
        ...state,
        groupLoading: true,
        deleteVoucherGroupLoading: true,
        isOperatioSuccessful: false,
      };
    case "DELETE_VOUCHER_GROUP_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        deleteVoucherGroupLoading: false,
        isOperatioSuccessful: true,
      };
    case "DELETE_VOUCHER_GROUP_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        deleteVoucherGroupLoading: false,
        isOperatioSuccessful: false,
      };

    case "EDIT_VOUCHER_GROUP_REQUEST":
      return {
        ...state,
        isEditSuccess: false,
      };
    case "EDIT_VOUCHER_GROUP_SUCCESS":
      return {
        ...state,
        editData: payload,
        isEditSuccess: true,
      };
    case "EDIT_VOUCHER_GROUP_FAILURE":
      return {
        ...state,
        isEditSuccess: false,
      };
    case "GET_ASSIGN_GROUP_SECTION_LIST_REQUEST":
      return {
        ...state,
      };
    case "GET_ASSIGN_GROUP_SECTION_LIST_SUCCESS":
      return {
        ...state,
        assignCustomerSectionList: payload,
      };
    case "GET_ASSIGN_GROUP_SECTION_LIST_FAILURE":
      return {
        ...state,
      };
    case "RESET_EDIT_DATA":
      return {
        ...state,
        editData: {},
      };
    case "ASSIGN_CUSTOMER_TO_GROUP_REQUEST":
      return {
        ...state,
        assignCustomerLoading: true,
        isOperatioSuccessful: false,
      };
    case "ASSIGN_CUSTOMER_TO_GROUP_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        assignCustomerLoading: false,
        isOperatioSuccessful: true,
      };
    case "ASSIGN_CUSTOMER_TO_GROUP_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        assignCustomerLoading: false,
        isOperatioSuccessful: false,
      };
    case "ISSUE_VOUCHER_TO_GROUP_REQUEST":
      return {
        ...state,
        issueVoucherToGroupLoading: true,
        isOperatioSuccessful: false,
      };
    case "ISSUE_VOUCHER_TO_GROUP_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        issueVoucherToGroupLoading: false,
        isOperatioSuccessful: true,
      };
    case "ISSUE_VOUCHER_TO_GROUP_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        issueVoucherToGroupLoading: false,
        isOperatioSuccessful: false,
      };
    case "ISSUE_VOUCHER_TO_CUSTOMERS_REQUEST":
      return {
        ...state,
        issueVoucherToCustomerLoading: true,
        isOperatioSuccessful: false,
      };
    case "ISSUE_VOUCHER_TO_CUSTOMERS_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        issueVoucherToCustomerLoading: false,
        isOperatioSuccessful: true,
      };
    case "ISSUE_VOUCHER_TO_CUSTOMERS_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        issueVoucherToCustomerLoading: false,
        isOperatioSuccessful: false,
      };
    case "UPLOAD_MARKETING_MATERIALS_REQUEST":
      return {
        ...state,
        uploadMarketingMaterialLoading: true,
        isOperatioSuccessful: false,
      };
    case "UPLOAD_MARKETING_MATERIALS_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        uploadMarketingMaterialLoading: false,
        isOperatioSuccessful: true,
      };
    case "UPLOAD_MARKETING_MATERIALS_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        uploadMarketingMaterialLoading: false,
        isOperatioSuccessful: false,
      };

    default:
      return state;
  }
}
