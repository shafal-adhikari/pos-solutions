import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";

const initialState = {
  isLoading: true,
  isOrderLoading: false,
  orderType: null,
  productsWithCategories: null,
  storeTaxSettings: null,
  setMenus: null,
  error: null,
  staffs: null,
  tables: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ORDER_TYPE_SUCCESS":
      return {
        ...state,
        orderType: payload,
      };
    case "GET_ORDER_TYPE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case "GET_ALL_ORDER_SECTION_REQUEST1":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_ORDER_SECTION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        message: payload.message,
        isSubscriptionActive: payload.isSubscriptionActive,
        productsWithCategories: payload.productsWithCategories,
        setMenus: payload.setMenus,
        storeTaxSettings: payload.storeTaxSettings,
        staffs: payload.staffs,
        tables: payload.tables,
        posDevices: payload.posDevices,
      };
    case "GET_ALL_ORDER_SECTION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "REMOVE_ORDER_REQUEST":
      return {
        ...state,
        orderData: null,
      };
    case "PLACE_ORDER_REQUEST":
      return {
        ...state,
        isOrderLoading: true,
        orderData: null,
        updateSuccess: false,
        error: null,
      };
    case "PLACE_ORDER_SUCCESS":
      return {
        ...state,
        isOrderLoading: false,
        orderData: !payload.isUpdate ? payload : null,
        updateSuccess: payload.isUpdate ? true : false,
      };
    case "PLACE_ORDER_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        isOrderLoading: false,
        errorOrder: payload,
      };
    case "REMOVE_UPDATE_SUCCESS":
      return {
        ...state,
        updateSuccess: false,
      };
    default:
      return state;
  }
}
