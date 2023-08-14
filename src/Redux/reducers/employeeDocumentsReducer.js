import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";

const initialState = {
  isLoading: false,
  error: null,
  success: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "EDIT_UPLOAD_DOCUMENTS_REQUEST":
      return {
        ...state,
        editLoading: true,
      };
    case "EDIT_UPLOAD_DOCUMENTS_SUCCESS":
      return {
        ...state,
        editData: payload,
        editLoading: false,
      };
    case "EDIT_UPLOAD_DOCUMENTS_FAILURE":
      return {
        ...state,
        editLoading: false,
      };
    case "DELETE_UPLOAD_DOCUMENTS_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "DELETE_UPLOAD_DOCUMENTS_SUCCESS":
      return {
        ...state,
        deleteSuccess: payload,
        allLoading: false,
      };
    case "DELETE_UPLOAD_DOCUMENTS_FAILURE":
      return {
        ...state,
        allLoading: false,
      };
    case "GET_ALL_UPLOAD_DOCUMENTS_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_ALL_UPLOAD_DOCUMENTS_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allDocuments: payload.data,
        totalDocuments: payload.total,
      };
    case "GET_ALL_UPLOAD_DOCUMENTS_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "GET_ALL_UPLOAD_DOCUMENT_SECTION_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_ALL_UPLOAD_DOCUMENT_SECTION_SUCCESS":
      return {
        ...state,
        allLoading: false,
        uploadDocumentSectionList: payload,
      };
    case "GET_ALL_UPLOAD_DOCUMENT_SECTION_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "CREATE_UPLOAD_DOCUMENT_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "CREATE_UPLOAD_DOCUMENT_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        addSuccess: payload,
      };
    case "CREATE_UPLOAD_DOCUMENT_FAILURE":
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
