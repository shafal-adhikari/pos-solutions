import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";

const initialState = {
  isLoading: false,
  error: null,
  success: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_CITY_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_ALL_CITY_SUCCESS":
      return {
        ...state,
        allLoading: false,
        isLoading: false,
        allCity: payload.data,
        totalCity: payload.total,
      };
    case "GET_ALL_CITY_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "EDIT_CITY_REQUEST":
      return {
        ...state,
        editLoading: true,
      };
    case "EDIT_CITY_SUCCESS":
      return {
        ...state,
        editLoading: false,
        editData: payload,
      };
    case "EDIT_CITY_FAILURE":
      return {
        ...state,
        editLoading: false,
        error: payload,
      };
    case "DELETE_CITY_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "DELETE_CITY_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        deleteSuccess: payload,
      };
    case "DELETE_CITY_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        error: payload,
      };
    case "ADD_NEW_CITY_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "ADD_NEW_CITY_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        addSuccess: payload,
      };
    case "ADD_NEW_CITY_FAILURE":
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
