import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  isLoading: false,
  addSuccess: null,
  addLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "ADD_POPUP_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "ADD_POPUP_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addSuccess: payload,
        addLoading: false,
      };
    case "ADD_POPUP_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addLoading: false,
      };
    case "GET_ALL_POPUP_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_ALL_POPUP_SUCCESS":
      return {
        ...state,
        popupList: payload,
        allLoading: false,
      };
    case "GET_ALL_POPUP_FAILURE":
      return {
        ...state,
        error: payload,
        allLoading: false,
      };
    case "DELETE_POPUP_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "DELETE_POPUP_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        deleteSuccess: payload,
      };
    case "DELETE_POPUP_FAILURE":
      openNotificationWithIcon("success", payload);
      return {
        ...state,
        allLoading: false,
      };
    case "EDIT_POPUP_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "EDIT_POPUP_SUCCESS":
      return {
        ...state,
        editData: payload,
        isLoading: false,
      };
    case "EDIT_POPUP_REQUEST":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
