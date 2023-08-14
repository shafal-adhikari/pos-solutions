import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  isLoading: false,
  error: null,
  isOperatioSuccessful: false,
  accountingIntegerationList: {},
  accountingPlatformConnection: {},
  accountingChartList: [],
  getAccountingPlatformLoading: false,
  saveLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ACCOUNTING_INTEGERATION_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ACCOUNTING_INTEGERATION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        accountingIntegerationList: payload,
      };
    case "GET_ACCOUNTING_INTEGERATION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_ACCOUNTING_PLATFORM_CONNECTION_REQUEST":
      return {
        ...state,
        getAccountingPlatformLoading: true,
      };
    case "GET_ACCOUNTING_PLATFORM_CONNECTION_SUCCESS":
      return {
        ...state,
        getAccountingPlatformLoading: false,
        accountingPlatformConnection: payload,
      };
    case "GET_ACCOUNTING_PLATFORM_CONNECTION_FAILURE":
      return {
        ...state,
        getAccountingPlatformLoading: false,
        error: payload,
      };
    case "GET_ACCOUNTING_CHART_REQUEST":
      return {
        ...state,
        getAccountingPlatformLoading: true,
      };
    case "GET_ACCOUNTING_CHART_SUCCESS":
      return {
        ...state,
        getAccountingPlatformLoading: false,
        accountingChartList: payload,
      };
    case "GET_ACCOUNTING_CHART_FAILURE":
      return {
        ...state,
        getAccountingPlatformLoading: false,
        error: payload,
      };

    case "UPDATE_ACCOUNTING_PLATFORM_CONNECTION_REQUEST":
      return {
        ...state,
        saveLoading: true,
        isOperatioSuccessful: false,
      };
    case "UPDATE_ACCOUNTING_PLATFORM_CONNECTION_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        saveLoading: false,
        isOperatioSuccessful: true,
      };
    case "UPDATE_ACCOUNTING_PLATFORM_CONNECTION_FAILURE":
      openNotificationWithIcon("error", "Something went wrong !");
      return {
        ...state,
        saveLoading: false,
        error: payload,
        isOperatioSuccessful: false,
      };
    case "UPDATE_CHART_OF_ACCOUNT_REQUEST":
      return {
        ...state,
        saveLoading: true,
        isOperatioSuccessful: false,
      };
    case "UPDATE_CHART_OF_ACCOUNT_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        saveLoading: false,
        isOperatioSuccessful: true,
      };
    case "UPDATE_CHART_OF_ACCOUNT_FAILURE":
      openNotificationWithIcon("error", "Something went wrong !");
      return {
        ...state,
        saveLoading: false,
        error: payload,
        isOperatioSuccessful: false,
      };

    default:
      return state;
  }
}
