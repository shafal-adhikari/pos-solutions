import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
import { triggerBase64Download } from "common-base64-downloader-react";
const initialState = {
  isLoading: false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_GIFT_CARD_CUSTOMER_REQUEST":
      return {
        ...state,
        customerLoading: true,
      };
    case "GET_GIFT_SEARCH_SECTION_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_GIFT_SEARCH_SECTION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        giftSearchSection: payload.giftCardStatus,
      };
    case "GET_GIFT_SEARCH_SECTION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "DEACTIVATE_GIFT_CARD_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "DEACTIVATE_GIFT_CARD_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        isLoading: false,
        deactivateSuccess: payload,
      };
    case "DEACTIVATE_GIFT_CARD_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_REDEEM_HISTORY_REQUEST":
      return {
        ...state,
        redeemLoading: true,
      };
    case "EXPORT_GIFT_PDF_REQUEST":
      return {
        ...state,
        exportPdfLoading: true,
      };
    case "EXPORT_GIFT_EXCEL_REQUEST":
      return {
        ...state,
        exportExcelLoading: true,
      };
    case "EXPORT_GIFT_SUCCESS":
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
    case "EXPORT_GIFT_FAILURE":
      return {
        ...state,
        exportExcelLoading: false,
        exportPdfLoading: false,
        error: payload,
      };
    case "GET_REDEEM_HISTORY_SUCCESS":
      return {
        ...state,
        redeemLoading: false,
        redeemHistory: payload,
      };
    case "GET_REDEEM_HISTORY_SUCCESS":
      return {
        ...state,
        redeemLoading: false,
        error: payload,
      };
    case "GET_ALL_GIFT_CARD_CUSTOMER_SUCCESS":
      return {
        ...state,
        customerLoading: false,
        customerData: payload.data,
      };
    case "GET_ALL_GIFT_CARD_CUSTOMER_FAILURE":
      return {
        ...state,
        customerLoading: false,
        customerError: payload,
      };
    case "ADD_GIFT_CARD_REQUEST":
      return {
        ...state,
        addLoading: true,
      };

    case "GET_GIFT_CARDS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allGiftCards: payload.data,
        totalGiftCards: payload.total,
      };
    case "GET_GIFT_CARDS_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "ADD_GIFT_CARD_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        addGiftSuccess: payload,
      };
    case "ADD_GIFT_CARD_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addLoading: false,
        error: payload,
      };
    case "GET_GIFT_CARD_SECTION_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_GIFT_CARD_SECTION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        giftCardSection: payload,
      };
    case "GET_GIFT_CARD_SECTION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "REMOVE_EXPORT_DATA_GIFT":
      return {
        ...state,
        exportData: null,
      };
    default:
      return state;
  }
}
