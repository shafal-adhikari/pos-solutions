import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  isLoading: false,
  error: null,
  isOperatioSuccessful: false,
  franchiseList: {},
  franchiseAddSection: {},
  languageAddSection: {},
  languageList: {},
  isOperatioSuccessfulLanguage: false,
  getFranchiseSectionLoading: false,
  getLanguageSectionLoading: false,
  addFranchiseLoading: false,
  addLanguageLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_FRANCHISE_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_FRANCHISE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        franchiseList: payload,
      };
    case "GET_ALL_FRANCHISE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_ADD_FRANCHISE_SECTION_REQUEST":
      return {
        ...state,
        getFranchiseSectionLoading: true,
      };
    case "GET_ADD_FRANCHISE_SECTION_SUCCESS":
      return {
        ...state,
        getFranchiseSectionLoading: false,
        franchiseAddSection: payload,
      };
    case "GET_ADD_FRANCHISE_SECTION_FAILURE":
      return {
        ...state,
        getFranchiseSectionLoading: false,
        error: payload,
      };

    case "ADD_FRANCHISE_REQUEST":
      return {
        ...state,
        addFranchiseLoading: true,
        isOperatioSuccessful: false,
      };
    case "ADD_FRANCHISE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addFranchiseLoading: false,
        isOperatioSuccessful: true,
      };
    case "ADD_FRANCHISE_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addFranchiseLoading: false,
        error: payload,
        isOperatioSuccessful: false,
      };
    case "DELETE_FRANCHISE_REQUEST":
      return {
        ...state,
        isLoading: true,
        isOperatioSuccessful: false,
      };
    case "DELETE_FRANCHISE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        isLoading: false,
        isOperatioSuccessful: true,
      };
    case "DELETE_FRANCHISE_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        isLoading: false,
        error: payload,
        isOperatioSuccessful: false,
      };
    case "GET_ALL_LANGUAGE_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_LANGUAGE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        languageList: payload,
      };
    case "GET_ALL_LANGUAGE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case "GET_ADD_LANGUAGE_SECTION_REQUEST":
      return {
        ...state,
        getLanguageSectionLoading: true,
      };
    case "GET_ADD_LANGUAGE_SECTION_SUCCESS":
      return {
        ...state,
        getLanguageSectionLoading: false,
        languageAddSection: payload,
      };
    case "GET_ADD_LANGUAGE_SECTION_FAILURE":
      return {
        ...state,
        getLanguageSectionLoading: false,
        error: payload,
      };

    case "ADD_LANGUAGE_REQUEST":
      return {
        ...state,
        addLanguageLoading: true,
        isOperatioSuccessfulLanguage: false,
      };
    case "ADD_LANGUAGE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLanguageLoading: false,
        isOperatioSuccessfulLanguage: true,
      };
    case "ADD_LANGUAGE_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addLanguageLoading: false,
        error: payload,
        isOperatioSuccessfulLanguage: false,
      };
    default:
      return state;
  }
}
