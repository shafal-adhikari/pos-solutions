import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  isLoading: false,
  error: null,
  isOperatioSuccessful: false,
  bannersList: {},
  bannerAddSection: {},
  getBannerAddSectionLoading: false,
  addBannerLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_BANNERS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_BANNERS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        bannersList: payload,
      };
    case "GET_ALL_BANNERS_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_ADD_BANNER_SECTION_REQUEST":
      return {
        ...state,
        getBannerAddSectionLoading: true,
      };
    case "GET_ADD_BANNER_SECTION_SUCCESS":
      return {
        ...state,
        getBannerAddSectionLoading: false,
        bannerAddSection: payload,
      };
    case "GET_ADD_BANNER_SECTION_FAILURE":
      return {
        ...state,
        getBannerAddSectionLoading: false,
        error: payload,
      };
    case "ADD_BANNER_REQUEST":
      return {
        ...state,
        addBannerLoading: true,
        isOperatioSuccessful: false,
      };
    case "ADD_BANNER_SUCCESS":
      openNotificationWithIcon("success", "Banner Created Successfully !");
      return {
        ...state,
        addBannerLoading: false,
        bannerAddSection: payload,
        isOperatioSuccessful: true,
      };
    case "ADD_BANNER_FAILURE":
      openNotificationWithIcon("error", "Something went wrong !");
      return {
        ...state,
        addBannerLoading: false,
        error: payload,
        isOperatioSuccessful: false,
      };
    case "DELETE_BANNER_REQUEST":
      return {
        ...state,
        isLoading: true,
        isOperatioSuccessful: false,
      };
    case "DELETE_BANNER_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        isLoading: false,
        isOperatioSuccessful: true,
      };
    case "DELETE_BANNER_FAILURE":
      openNotificationWithIcon("error", "Something went wrong !");
      return {
        ...state,
        isLoading: false,
        error: payload,
        isOperatioSuccessful: false,
      };
    case "EDIT_BANNER_REQUEST":
      return {
        ...state,
        editLoading: false,
      };
    case "EDIT_BANNER_SUCCESS":
      return {
        ...state,
        editLoading: false,
        editData: payload,
      };
    case "EDIT_BANNER_FAILURE":
      return {
        ...state,
        editLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
