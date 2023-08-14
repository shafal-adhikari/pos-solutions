import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";

const initialState = {
  isLoading: false,
  error: null,
  success: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_STATE_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_ALL_STATE_SUCCESS":
      return {
        ...state,
        allLoading: false,
        isLoading: false,
        allState: payload.data,
        totalState: payload.total,
      };
    case "GET_ALL_STATE_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "EDIT_STATE_REQUEST":
      return {
        ...state,
        editLoading: true,
      };
    case "EDIT_STATE_SUCCESS":
      return {
        ...state,
        editLoading: false,
        editData: payload,
      };
    case "EDIT_STATE_FAILURE":
      return {
        ...state,
        editLoading: false,
        error: payload,
      };
    case "DELETE_STATE_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "DELETE_STATE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        deleteSuccess: payload,
      };
    case "DELETE_STATE_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        error: payload,
      };
    case "ADD_NEW_STATE_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "ADD_NEW_STATE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        addSuccess: payload,
      };
    case "ADD_NEW_STATE_FAILURE":
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
