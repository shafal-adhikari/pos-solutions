import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  isLoading: false,
  error: null,
  storeAddSectionList: {},
  editStoreSectionList: {},
  isOperatioSuccessful: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_PAYMENT_METHODS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_PAYMENT_METHODS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        paymentMethodList: payload.data,
      };
    case "GET_PAYMENT_METHODS_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "UPDATE_PAYMENT_METHOD_REQUEST":
      return {
        ...state,
        updateLoading: true,
      };
    case "UPDATE_PAYMENT_METHOD_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        updateLoading: false,
        updateSuccess: payload,
      };
    case "UPDATE_PAYMENT_METHOD_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        updateLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
