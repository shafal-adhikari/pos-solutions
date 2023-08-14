import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
import { triggerBase64Download } from "common-base64-downloader-react";

const initialState = {
  isLoading: true,
  error: null,
  getEditSupplierLoading: true,
  purchaseSectionList: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_PRODUCTS_BY_SUPPLIER_REQUEST":
      return {
        ...state,
        productLoading: true,
      };
    case "GET_PRODUCTS_BY_SUPPLIER_SUCCESS":
      return {
        ...state,
        productLoading: false,
        productsBySuppliers: payload,
      };
    case "GET_PRODUCTS_BY_SUPPLIER_FAILURE":
      return {
        ...state,
        productLoading: false,
        error: payload,
      };
    case "GET_ALL_PURCHASE_STATUS_REQUEST":
    case "GET_ALL_PURCHASE_NOTE_STATUS_REQUEST":
    case "GET_ALL_PURCHASE_ORDER_ADD_SECTION_REQUEST":
    case "GET_ALL_PURCHASE_CREDIT_ADD_SECTION_REQUEST":
      return {
        ...state,
        editData: null,
        allLoading: true,
      };
    case "GET_ALL_PURCHASE_STATUS_SUCCESS":
    case "GET_ALL_PURCHASE_NOTE_STATUS_SUCCESS":
      return {
        ...state,
        purchaseOrderStatus: payload.status,
      };
    case "GET_ALL_PURCHASE_STATUS_FAILURE":
    case "GET_ALL_PURCHASE_NOTE_STATUS_FAILURE":
      return {
        ...state,
        error: payload,
      };
    case "GET_ALL_PURCHASE_ORDER_REQUEST":
    case "GET_ALL_PURCHASE_CREDIT_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_ALL_PURCHASE_ORDER_SUCCESS":
    case "GET_ALL_PURCHASE_CREDIT_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allPurchaseOrders: payload.data,
        totalPurchaseOrders: payload.total,
      };
    case "GET_ALL_PURCHASE_ORDER_FAILURE":
    case "GET_ALL_PURCHASE_CREDIT_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "GET_ALL_PURCHASE_ORDER_ADD_SECTION_SUCCESS":
    case "GET_ALL_PURCHASE_CREDIT_ADD_SECTION_SUCCESS":
      return {
        ...state,
        allLoading: false,
        purchaseSectionList: payload,
      };
    case "GET_ALL_PURCHASE_ORDER_ADD_SECTION_FAILURE":
    case "GET_ALL_PURCHASE_SECTIOn_ADD_SECTION_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "GET_SUPPLIER_SECTION_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_SUPPLIER_SECTION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        supplierSectionList: payload,
      };
    case "GET_SUPPLIER_SECTION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_ALL_SUPPLIER_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_SUPPLIER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allSuppliers: payload.data,
        totalSuppliers: payload.total,
      };
    case "GET_ALL_SUPPLIER_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "EXPORT_SUPPLIER_PDF_REQUEST":
      return {
        ...state,
        exportPdfLoading: true,
      };
    case "EXPORT_SUPPLIER_EXCEL_REQUEST":
      return {
        ...state,
        exportExcelLoading: true,
      };
    case "EXPORT_SUPPLIER_SUCCESS":
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
    case "EXPORT_SUPPLIER_FAILURE":
      return {
        ...state,
        exportExcelLoading: false,
        exportPdfLoading: false,
        error: payload,
      };
    case "EDIT_PURCHASE_ORDER_REQUEST":
    case "EDIT_PURCHASE_CREDIT_REQUEST":
    case "EDIT_SUPPLIER_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "EDIT_PURCHASE_ORDER_SUCCESS":
    case "EDIT_SUPPLIER_SUCCESS":
      return {
        ...state,
        allLoading: false,
        editData: payload,
      };
    case "EDIT_PURCHASE_ORDER_FAILURE":
    case "EDIT_SUPPLIER_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "ADD_SUPPLIER_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "DELETE_PURCHASE_ORDER_REQUEST":
    case "DELETE_SUPPLIER_REQUEST":
    case "DELETE_PURCHASE_CREDIT_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "DELETE_PURCHASE_ORDER_SUCCESS":
    case "DELETE_SUPPLIER_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        isLoading: false,
        deleteSuccess: payload,
      };
    case "DELETE_PURCHASE_ORDER_FAILURE":
    case "DELETE_SUPPLIER_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "ADD_SUPPLIER_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        addSuccess: payload,
      };
    case "ADD_SUPPLIER_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addLoading: false,
        error: payload,
      };
    case "CREATE_PURCHASE_ORDER_REQUEST":
    case "CREATE_PURCHASE_CREDIT_REQUEST":
      return {
        ...state,
        addLoading: true,
        addSuccess: false,
      };
    case "CREATE_PURCHASE_ORDER_SUCCESS":
    case "CREATE_PURCHASE_CREDIT_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        addSuccess: payload,
      };
    case "CREATE_PURCHASE_ORDER_FAILURE":
    case "CREATE_PURCHASE_CREDIT_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
