import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";

const initialState = {
  isLoading: true,
  error: null,
  getEditSupplierLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_SYNC_SECTION_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_SYNC_SECTION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        syncSectionList: payload,
      };
    case "GET_SYNC_SECTION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "SYNC_PRODUCT_REQUEST":
      return {
        ...state,
        syncLoading: true,
      };
    case "SYNC_PRODUCT_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        syncLoading: false,
        syncSuccess: payload,
      };
    case "SYNC_PRODUCT_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        syncLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
