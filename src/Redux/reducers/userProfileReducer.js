import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";

const initialState = {
  isLoading: false,
  error: null,
  success: null,
  allLoading: false,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_USER_PROFILE_REQUEST":
      return {
        ...state,
        allLoading: true,
        switchLoading: true,
      };
    case "GET_USER_PROFILE_SUCCESS":
      return {
        ...state,
        allLoading: false,
        switchLoading: false,
        profileDetails: payload,
      };
    case "GET_USER_PROFILE_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
        switchLoading: false,
      };
    case "UPDATE_USER_PROFILE_REQUEST":
      return {
        ...state,
        updateLoading: true,
      };
    case "UPDATE_USER_PROFILE_SUCCESS":
      openNotificationWithIcon("success", payload.message);
      return {
        ...state,
        updateLoading: false,
        updateSuccess: payload,
      };
    case "UPDATE_USER_PROFILE_SUCCESS":
      openNotificationWithIcon(payload);
      return {
        ...state,
        updateLoading: false,
        error: payload,
      };
    case "CHANGE_USER_PASSWORD_REQUEST":
      return {
        ...state,
        updateLoading: true,
      };
    case "CHANGE_USER_PASSWORD_SUCCESS":
      openNotificationWithIcon("success", payload.message);
      return {
        ...state,
        updateLoading: false,
        updateSuccess: payload,
      };
    case "CHANGE_USER_PASSWORD_FAILURE":
      openNotificationWithIcon(payload);

      return {
        ...state,
        updateLoading: false,
        error: payload,
      };
    case "ENABLE_DISABLE_2FA_REQUEST":
      return {
        ...state,
        switchLoading: true,
      };
    case "ENABLE_DISABLE_2FA_SUCCESS":
      // openNotificationWithIcon("success", payload.message);
      return {
        ...state,
        switchLoading: false,
      };
    case "ENABLE_DISABLE_2FA_SUCCESS":
      // openNotificationWithIcon("error", payload);
      return {
        ...state,
        switchLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
