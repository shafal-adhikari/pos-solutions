import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
import { triggerBase64Download } from "common-base64-downloader-react";
const initialState = {
  isLoading: false,
  error: null,
  success: null,
  getEditCustomerLoading: false,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_CUSTOMER_LIST_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
        data: null,
      };
    case "GET_ALL_CUSTOMER_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allCustomers: payload.data,
        totalCustomers: payload.total,
      };
    case "GET_ALL_CUSTOMER_LIST_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_CUSTOMER_ADD_SECTION_REQUEST":
      return {
        ...state,
        addGetLoading: true,
      };
    case "GET_CUSTOMER_ADD_SECTION_SUCCESS":
      return {
        ...state,
        addGetLoading: false,
        customerAddSection: payload,
      };
    case "GET_CUSTOMER_ADD_SECTION_FAILURE":
      return {
        ...state,
        addGetLoading: false,
        error: payload,
      };
    case "ADD_NEW_CUSTOMER_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "ADD_NEW_CUSTOMER_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        addSuccess: payload,
      };
    case "ADD_NEW_CUSTOMER_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addLoading: false,
        error: payload,
      };
    case "EDIT_CUSTOMER_REQUEST":
      return {
        ...state,
        getEditCustomerLoading: true,
      };
    case "EDIT_CUSTOMER_SUCCESS":
      return {
        ...state,
        getEditCustomerLoading: false,
        editData: payload,
      };
    case "EDIT_CUSTOMER_FAILURE":
      return {
        ...state,
        getEditCustomerLoading: false,
        error: payload,
      };
    case "DELETE_CUSTOMER_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "DELETE_CUSTOMER_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        isLoading: false,
        deleteSuccess: payload,
      };
    case "DELETE_CUSTOMER_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "EXPORT_CUSTOMER_PDF_REQUEST":
      return {
        ...state,
        exportPdfLoading: true,
      };
    case "EXPORT_CUSTOMER_EXCEL_REQUEST":
      return {
        ...state,
        exportExcelLoading: true,
      };
    case "EXPORT_CUSTOMER_SUCCESS":
      let type = payload.type;
      if (type == "xlsx") {
        type = "vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      }
      triggerBase64Download(
        `data:application/${type};base64,` + payload.fileContents,
        payload.fileDownloadName.split(".")[0]
      );
      return {
        ...state,
        exportExcelLoading: false,
        exportPdfLoading: false,
        exportData: payload,
      };
    case "EXPORT_CUSTOMER_FAILURE":
      return {
        ...state,
        exportExcelLoading: false,
        exportPdfLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
