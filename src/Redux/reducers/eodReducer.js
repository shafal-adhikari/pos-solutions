import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
import { triggerBase64Download } from "common-base64-downloader-react";
const initialState = {
  isLoading: false,
  error: null,
  eodSectionList: {},
  mainLoading: false,
  allEod: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "FINALIZE_EOD_REQUEST":
      return {
        ...state,
        finalizeLoading: true,
      };
    case "FINALIZE_EOD_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        finalizeLoading: false,
        finalizeSuccess: payload,
      };
    case "FINALIZE_EOD_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        finalizeLoading: false,
        error: payload,
      };
    case "GET_ALL_CASHIN_CASHOUT_REQUEST":
      return {
        ...state,
        isLoading: true,
        editData: null,
      };
    case "GET_ALL_CASHIN_CASHOUT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allCashInCashOut: payload.data,
        totalCashInCashOut: payload.total,
      };
    case "GET_ALL_CASHIN_CASHOUT_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "ADD_NEW_CASHIN_REQUEST":
      return {
        ...state,
        cashInLoading: true,
      };
    case "ADD_NEW_CASHOUT_REQUEST":
      return {
        ...state,
        cashOutLoading: true,
      };
    case "ADD_NEW_CASHIN_CASHOUT_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        cashOutLoading: false,
        cashInLoading: false,
        addSuccess: payload,
      };
    case "ADD_NEW_CASHIN_CASHOUT_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        cashOutLoading: false,
        cashInLoading: false,
        error: payload,
      };
    case "EDIT_CASHIN_CASHOUT_REQUEST":
      return {
        ...state,
        editLoading: true,
      };
    case "EDIT_CASHIN_CASHOUT_SUCCESS":
      return {
        ...state,
        editLoading: false,
        editData: payload,
      };
    case "EDIT_CASHIN_CASHOUT_FAILURE":
      return {
        ...state,
        editLoading: false,
        error: payload,
      };
    case "GET_ALL_EOD_SECTION_REQUEST":
      return {
        ...state,
        mainLoading: true,
      };
    case "GET_ALL_EOD_SECTION_SUCCESS":
      return {
        ...state,
        eodSectionList: payload,
      };
    case "GET_ALL_EOD_SECTION_FAILURE":
      return {
        ...state,
        error: payload,
      };
    case "GET_ALL_EOD_BY_DATE_REQUEST":
      return {
        ...state,
        mainLoading: true,
      };
    case "GET_ALL_EOD_BY_DATE_SUCCESS":
      return {
        ...state,
        mainLoading: false,
        allEod: payload,
      };
    case "GET_ALL_EOD_BY_DATE_FAILURE":
      return {
        ...state,
        mainLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
