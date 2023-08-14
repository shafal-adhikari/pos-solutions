import { BsPaypal } from "react-icons/bs";
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
    case "ADD_NEW_PAY_SCALE_REQUEST":
    case "ADD_NEW_LEAVE_TYPE_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "ADD_NEW_PAY_SCALE_SUCCESS":
    case "ADD_NEW_LEAVE_TYPE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        editData: null,
        addSuccess: payload,
      };
    case "ADD_NEW_PAY_SCALE_FAILURE":
    case "ADD_NEW_LEAVE_TYPE_FAILURE":
      openNotificationWithIcon(payload);

      return {
        ...state,
        addLoading: false,
        error: payload,
      };
    case "GET_ALL_LEAVE_TYPE_REQUEST":
    case "GET_ALL_PAY_SCALE_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_PAY_SCALE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allPayScaleLevel: payload.data,
        totalPayScaleLevel: payload.total,
      };
    case "GET_ALL_LEAVE_TYPE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allLeaveType: payload.data,
        totalLeaveType: payload.total,
      };
    case "GET_ALL_LEAVE_TYPE_FAILURE":
    case "GET_ALL_PAY_SCALE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "DELETE_LEAVE_TYPE_REQUEST":
    case "DELTE_PAY_SCALE_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "DELETE_LEAVE_TYPE_SUCCESS":
    case "DELETE_PAY_SCALE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        isLoading: false,
        deleteSuccess: payload,
      };
    case "DELETE_LEAVE_TYPE_FAILURE":
    case "DELETE_PAY_SCALE_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        isLoading: false,
        deleteSuccess: payload,
      };
    case "EDIT_LEAVE_TYPE_REQUEST":
    case "EDIT_PAY_SCALE_REQUEST":
      return {
        ...state,
        editLoading: true,
      };
    case "EDIT_LEAVE_TYPE_SUCCESS":
    case "EDIT_PAY_SCALE_SUCCESS":
      return {
        ...state,
        editLoading: false,
        editData: payload,
      };
    case "EDIT_LEAVE_TYPE_FAILURE":
    case "EDIT_PAY_SCALE_FAILURE":
      return {
        ...state,
        editLoading: false,
        error: payload,
      };
    case "GET_ALL_PAYROLL_SETTINGS_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_ALL_PAYROLL_SETTINGS_SUCCESS":
      return {
        ...state,
        allLoading: false,
        payrollSettingsList: payload,
      };
    case "GET_ALL_PAYROLL_SETTINGS_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
