import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  isLoading: false,
  error: null,
  isOperationSuccessful: false,
  ordersDetailSection: {},
  allOrdersList: {},
  allPendingOrdersList: {},
  orderDetails: {},
  isOrderStatusChanged: false,
  changeOrderStatusLoading: false,
  getPendingOrdersLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ORDERS_DETAIL_SECTION_LIST_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ORDERS_DETAIL_SECTION_LIST_SUCCESS":
      return {
        ...state,
        ordersDetailSection: payload,
      };
    case "GET_ORDERS_DETAIL_SECTION_LIST_FAILURE":
      return {
        ...state,
        tableReservationList1: payload,
      };
    case "GET_ALL_ORDERS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_ORDERS_REQUEST1":
      return {
        ...state,
        getPendingOrdersLoading: true,
      };
    case "GET_ALL_ORDERS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allOrdersList: payload,
      };
    case "GET_ALL_PENDING_ORDERS_SUCCESS":
      return {
        ...state,
        getPendingOrdersLoading: false,
        allPendingOrdersList: payload,
      };
    case "GET_ALL_ORDERS_FAILURE":
      return {
        ...state,
        isLoading: false,
      };
    case "UPDATE_ORDER_STATUS_REQUEST":
      return {
        ...state,
        changeOrderStatusLoading: true,
        isOrderStatusChanged: false,
      };
    case "UPDATE_ORDER_STATUS_SUCCESS":
      openNotificationWithIcon("success", payload.message);

      return {
        ...state,
        changeOrderStatusLoading: false,
        isOrderStatusChanged: true,
      };
    case "UPDATE_ORDER_STATUS_FAILURE":
      openNotificationWithIcon("error", payload);

      return {
        ...state,
        isOrderStatusChanged: false,
        changeOrderStatusLoading: false,
      };
    case "GET_ORDER_DETAIL_BY_ID_REQUEST":
      return {
        ...state,
        getLoading: true,
        deleteSuccess: false,
      };
    case "PAY_ORDER_DETAIL_BY_ID_REQUEST":
      return {
        ...state,
        payLoading: true,
      };
    case "GET_ORDER_DETAIL_BY_ID_SUCCESS":
      return {
        ...state,
        getLoading: false,
        payLoading: false,
        orderDetails: payload,
      };
    case "GET_ORDER_DETAIL_BY_ID_FALSE":
      return {
        ...state,
        getLoading: false,
      };
    default:
      return state;
  }
}
