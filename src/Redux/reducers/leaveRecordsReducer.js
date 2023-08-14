import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  isLoading: false,
  error: null,
  allYear: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_LEAVE_RECORD_STATUS_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_ALL_LEAVE_RECORD_STATUS_SUCCESS":
      return {
        ...state,
        allLoading: false,
        leaveRecordStatusList: payload.status,
      };
    case "GET_ALL_LEAVE_RECORD_STATUS_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "GET_ALL_LEAVE_RECORD_ADD_SECTION_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_LEAVE_RECORD_ADD_SECTION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        leaveRecordAddSectionList: payload,
      };
    case "GET_ALL_LEAVE_RECORD_ADD_SECTION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_ALL_LEAVE_RECORDS_REQUEST":
    case "GET_ALL_YEAR_REQUEST":
    case "GET_ALL_DOCUMENT_TYPE_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_ALL_YEAR_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allYear: payload.data,
        totalYear: payload.total,
      };
    case "GET_ALL_LEAVE_RECORDS_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allLeaveRecords: payload.data,
        totalLeaveRecords: payload.total,
      };
    case "GET_ALL_DOCUMENT_TYPE_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allDocumentType: payload.data,
        totalDocumentType: payload.total,
      };
    case "GET_ALL_YEAR_FAILURE":
    case "GET_ALL_LEAVE_RECORDS_FAILURE":
    case "GET_ALL_DOCUMENT_TYPE_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "EDIT_LEAVE_RECORD_REQUEST":
    case "EDIT_YEAR_REQUEST":
    case "EDIT_DOCUMENT_TYPE_REQUEST":
      return {
        ...state,
        editLoading: true,
      };
    case "EDIT_LEAVE_RECORD_SUCCESS":
    case "EDIT_YEAR_SUCCESS":
      return {
        ...state,
        editLoading: false,
        editData: payload,
      };
    case "EDIT_LEAVE_RECORD_FAILURE":
    case "EDIT_YEAR_FAILURE":
      return {
        ...state,
        editLoading: false,
        error: payload,
      };
    case "ADD_LEAVE_RECORD_REQUEST":
    case "ADD_YEAR_REQUEST":
    case "ADD_DOCUMENT_TYPE_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "ADD_LEAVE_RECORD_SUCCESS":
    case "ADD_YEAR_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        addSuccess: payload,
        editData: null,
      };
    case "ADD_LEAVE_RECORD_FAILURE":
    case "ADD_YEAR_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addLoading: false,
        error: payload,
      };
    case "DELETE_LEAVE_RECORD_REQUEST":
    case "DELETE_YEAR_REQUEST":
    case "DELETE_DOCUMENT_TYPE_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "DELETE_LEAVE_RECORD_SUCCESS":
    case "DELETE_YEAR_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        allLoading: false,
        deleteSuccess: payload,
      };
    case "DELETE_LEAVE_RECORD_FAILURE":
    case "DELETE_YEAR_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
