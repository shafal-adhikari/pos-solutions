import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
import { triggerBase64Download } from "common-base64-downloader-react";
const initialState = {
  isLoading: false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_SALES_HISTORY_SECTION_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_SALES_HISTORY_SECTION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        salesHistorySection: payload,
      };
    case "GET_SALES_HISTORY_SECTION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_SALES_HISTORY_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_SALES_HISTORY_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allSalesHistory: payload.data,
        totalSalesHistory: payload.total,
      };
    case "GET_SALES_HISTORY_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "EXPORT_SALES_PDF_REQUEST":
      return {
        ...state,
        exportPdfLoading: true,
      };
    case "EXPORT_SALES_PDF_REQUEST":
      return {
        ...state,
        exportExcelLoading: true,
      };
    case "EXPORT_SALES_SUCCESS":
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
    default:
      return state;
  }
}
