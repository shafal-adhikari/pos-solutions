import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  isLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_PAGES_ADD_SECTION_LIST_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_PAGES_ADD_SECTION_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        pagesSection: payload.pages,
      };
    case "GET_PAGES_ADD_SECTION_LIST_FAILURE":
      return {
        ...state,
        isLoading: false,
      };
    case "GET_ALL_PAGES_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_ALL_PAGES_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allPages: payload.data,
        totalPages: payload.total,
      };
    case "GET_ALL_PAGES_FAILURE":
      return {
        ...state,
        allLoading: false,
      };
    case "ADD_PAGE_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "ADD_PAGE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        addSuccess: payload,
      };
    case "ADD_PAGE_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addLoading: false,
        error: payload,
      };
    case "EDIT_PAGE_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "EDIT_PAGE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        editData: payload,
      };
    case "EDIT_PAGE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "DELETE_PAGE_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "DELETE_PAGE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        allLoading: false,
        deleteSuccess: payload,
      };
    case "DELETE_PAGE_FAILURE":
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
