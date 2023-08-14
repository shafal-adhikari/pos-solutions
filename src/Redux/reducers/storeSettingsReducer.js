/** @format */

import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  isLoading: false,
  error: null,
  storeAddSectionList: {},
  editStoreSectionList: {},
  isOperatioSuccessful: false,
  updateStoreLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_STORE_ADD_SECTION_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_STORE_ADD_SECTION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        storeAddSectionList: payload,
      };
    case "GET_STORE_ADD_SECTION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case "GET_EDIT_STORE_SECTION_LIST_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_EDIT_STORE_SECTION_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        editStoreSectionList: payload,
      };
    case "GET_EDIT_STORE_SECTION_LIST_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "UDPATE_STORE_DETAIL_REQUEST":
      return {
        ...state,
        updateStoreLoading: true,
        isOperatioSuccessful: false,
      };
    case "UDPATE_STORE_DETAIL_SUCCESS":
      openNotificationWithIcon(
        "success",
        "Store Detail Updated Successfully !"
      );

      return {
        ...state,
        updateStoreLoading: false,
        isOperatioSuccessful: true,
      };
    case "UDPATE_STORE_DETAIL_FAILURE":
      openNotificationWithIcon("error", payload);

      return {
        ...state,
        updateStoreLoading: false,
        error: payload,
        isOperatioSuccessful: false,
      };
    case "RESET_COLOR_SETTINGS_REQUEST":
      return {
        ...state,
        resetColorLoading: true,
        isOperatioSuccessful: false,
      };
    case "RESET_COLOR_SETTINGS_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        resetColorLoading: false,
        isOperatioSuccessful: true,
      };
    case "RESET_COLOR_SETTINGS_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        resetColorLoading: false,
        error: payload,
        isOperatioSuccessful: false,
      };
    default:
      return state;
  }
}
