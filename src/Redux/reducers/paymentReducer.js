import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";

const initialState = {
  isLoading: false,
  error: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "PAYMENT_SECTION_LIST_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "PAYMENT_SECTION_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        paymentMethodList: payload.paymentMethods,
      };
    case "PAYMENT_SECTION_LIST_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "ORDER_PAYMENT_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "ORDER_PAYMENT_SUCCESS":
      if (payload.isPaymentCompleted) {
        openNotificationWithIcon("success", "Order payment complete! ");
      }
      return {
        ...state,
        isLoading: false,
        orderPaymentData: payload,
      };
    case "GET_ORDER_INVOICE_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ORDER_INVOICE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        paymentInvoice: payload,
      };
    case "GET_ORDER_INVOICE_FAILURE":
      return {
        ...state,
        isLoading: false,
        errorPayment: payload,
      };
    case "ORDER_PAYMENT_FAILURE":
      return {
        ...state,
        isLoading: false,
        errorPayment: payload,
      };
    case "SEARCH_CUSTOMER_REQUEST":
      return {
        ...state,
        isLoading: true,
        customerError: null,
      };
    case "SEARCH_CUSTOMER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        customer: payload,
      };
    case "SEARCH_CUSTOMER_FAILURE":
      return {
        ...state,
        isLoading: false,
        customerError: payload,
        customer: null,
      };
    case "DELETE_ITEM_ORDER_REQUEST":
      return {
        ...state,
        deleteItemOrderLoading: true,
        deleteSuccess: false,
      };
    case "DELETE_ITEM_ORDER_SUCCESS":
      return {
        ...state,
        deleteItemOrderLoading: false,
        deleteSuccess: true,
      };
    case "DELETE_ITEM_ORDER_FAILURE":
      return {
        ...state,
        deleteItemOrderLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
