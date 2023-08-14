/** @format */

import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";

const initialState = {
  isLoading: false,
  error: null,
  assignLeaveSectionList: {},
  employeeAssignedLists: {},
  updateAssignLeaveLoading: false,
  isOperationSuccessful: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ASSIGN_LEAVE_SECTION_LIST_REQUEST":
      return {
        ...state,
      };
    case "GET_ASSIGN_LEAVE_SECTION_LIST_SUCCESS":
      return {
        ...state,
        assignLeaveSectionList: payload,
      };
    case "GET_ASSIGN_LEAVE_SECTION_LIST_FAILURE":
      return {
        ...state,
      };
    case "GET_ALL_EMPLOYEE_ASSIGNED_LEAVE_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_EMPLOYEE_ASSIGNED_LEAVE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        employeeAssignedLists: payload,
      };
    case "GET_ALL_EMPLOYEE_ASSIGNED_LEAVE_FAILURE":
      return {
        ...state,
        isLoading: false,
      };
    case "UPDATE_ASSIGNED_LEAVE_REQUEST":
      return {
        ...state,
        updateAssignLeaveLoading: true,
        isOperationSuccessful: false,
      };
    case "UPDATE_ASSIGNED_LEAVE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        isOperationSuccessful: true,
        updateAssignLeaveLoading: false,
      };

    case "UPDATE_ASSIGNED_LEAVE_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        updateAssignLeaveLoading: false,
        isOperationSuccessful: false,
      };
    default:
      return state;
  }
}
