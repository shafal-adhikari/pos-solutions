/** @format */

import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
import {
  setLocalStorage,
  removeLocalStorage,
  getLocalStorage,
} from "../../helpers/frontendHelper";

const initialState = {
  isLoading: false,
  data: null,
  loginSuccess: false,
  storeDetails: getLocalStorage("storeDetailsUser"),
  activeStore: getLocalStorage("activeStores"),
  userDetails: getLocalStorage("userDetails"),
  error: null,
  token: getLocalStorage("token"),
  isLoggedIn: !!getLocalStorage("token"),
  sendOTPLoading: false,
  isSendOTPSuccess: false,
  countryCitiesList: [],
  resendOTPLoading: false,
  isResendOTPSuccess: false,
  registerUserLoading: false,
  registerationError: "",
  isCLearForm: false,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SEND_OTP_REQUEST":
      return {
        ...state,
        sendLoading: true,
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        is2FaEnabled: false,
        isLoading: true,
        error: null,
        success: null,
        data: null,
      };
    case "VALIDATE_REQUEST":
    case "VALIDATE_OTP_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
        data: null,
      };
    case "SEND_OTP_SUCCESS":
      return {
        ...state,
        sendLoading: false,
        success: payload.message,
      };
    case "SEND_OTP_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        sendLoading: false,
        error: payload,
      };
    case "LOGIN_SUCCESS":
      if (!payload.isEmailConfirmed || payload.isLockedOut) {
        return {
          ...state,
          isLoading: false,
          error: payload.message,
        };
      }
      if (payload.is2FaEnabled && payload.token == null) {
        setLocalStorage("twoFAData", {
          data: payload.twoFaQRImage,
          email: payload.email,
          userId: payload.userId,
        });
        return {
          ...state,
          isLoading: false,
          is2FaEnabled: true,
          data: payload.twoFaQRImage,
          email: payload.email,
          userId: payload.userId,
        };
      }
      removeLocalStorage("twoFAData");
      setLocalStorage("token", payload.token);
      setLocalStorage("userDetails", {
        email: payload.email,
        image: payload.image,
        name: payload.name,
        userId: payload.userId,
        phoneNumber: payload.phoneNumber,
      });
      setLocalStorage(
        "storeDetailsUser",
        payload.storeDetailsLoginResponseViewModels
      );
      setLocalStorage(
        "activeStores",
        payload.storeDetailsLoginResponseViewModels[0]
      );
      return {
        ...state,
        isLoading: false,
        succes: true,
        data: payload,
        token: payload.token,
        isLoggedIn: true,
        loginSuccess: true,
        userDetails: {
          email: payload.email,
          image: payload.image,
          name: payload.name,
          userId: payload.userId,
          phoneNumber: payload.phoneNumber,
        },
        storeDetails: payload.storeDetailsLoginResponseViewModels,
        activeStore: payload.storeDetailsLoginResponseViewModels[0],
      };
    case "2FA_FAILURE":
      return {
        ...state,
        isLoading: false,
        error2fa: payload,
        success: null,
      };
    case "LOGIN_FAILURE":
      // alert(payload);
      return {
        ...state,
        isLoading: false,
        success: null,
        error: payload,
      };
    case "ACTIVATE_STORE_REQUEST":
      return {
        ...state,
        activateStoreLoading: true,
      };
    case "ACTIVATE_STORE_SUCCESS":
      setLocalStorage("activeStores", payload);
      window.location.reload();
      return {
        ...state,
        activateStoreLoading: false,
        activeStore: payload,
      };
    case "ACTIVATE_STORE_FAILURE":
      return {
        ...state,
        activateStoreLoading: false,
        error: payload,
      };
    case "UPDATE_STORE_DETAILS":
      const existingStoreData = getLocalStorage("activeStores");
      setLocalStorage("activeStores", {
        ...getLocalStorage("activeStores"),
        ...payload,
      });
      return {
        ...state,
        activeStore: {
          ...getLocalStorage("activeStores"),
          ...payload,
        },
      };
      return state;
    case "UPDATE_USER_DETAILS":
      setLocalStorage("userDetails", {
        email: payload.email,
        image: payload.image,
        name: payload.name,
        userId: payload.userId,
        phoneNumber: payload.phoneNumber,
      });
      return {
        ...state,
        userDetails: {
          email: payload.email,
          image: payload.image,
          name: payload.name,
          userId: payload.userId,
          phoneNumber: payload.phoneNumber,
        },
      };
    case "SEND_OTP_REQUEST_REGISTER_RESEND":
      return {
        ...state,
        resendOTPLoading: true,
        isResendOTPSuccess: false,
        error: null,
      };
    case "SEND_OTP_SUCCESS_REGISTER_RESEND":
      return {
        ...state,
        resendOTPLoading: false,
        isResendOTPSuccess: true,
        success: payload.message,
      };
    case "SEND_OTP_FAILURE_REGISTER_RESEND":
      return {
        ...state,
        isResendOTPSuccess: false,
        resendOTPLoading: false,
        error: payload,
      };
    case "CLEAR_FORM":
      return {
        ...state,
        isSendOTPSuccess: false,
        isCLearForm: true,
      };
    case "SEND_OTP_REQUEST_REGISTER":
      return {
        ...state,
        sendOTPLoading: true,
        isSendOTPSuccess: false,

        error: null,
      };
    case "SEND_OTP_SUCCESS_REGISTER":
      return {
        ...state,
        sendOTPLoading: false,
        isSendOTPSuccess: true,
        success: payload.message,
      };
    case "SEND_OTP_FAILURE_REGISTER":
      return {
        ...state,
        isSendOTPSuccess: false,
        sendOTPLoading: false,
        error: payload,
      };
    case "REGISTER_USER_REQUEST":
      return {
        ...state,
        registerUserLoading: true,
        isOperationSuccessful: false,
      };
    case "REGISTER_USER_SUCCESS":
      openNotificationWithIcon("success", payload.message);

      return {
        ...state,
        registerUserLoading: false,
        isOperationSuccessful: true,
      };
    case "REGISTER_USER_FAILURE":
      return {
        ...state,
        registerationError: payload,
        registerUserLoading: false,
        isOperationSuccessful: false,
      };
    case "GET_ON_BOARD_ADD_SECTION_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_ON_BOARD_ADD_SECTION_SUCCESS":
      return {
        ...state,
        allLoading: false,
        onBoardCountries: payload.countries,
        businessTypes: payload.businessTypes,
        timeZones: payload.timeZones,
      };
    case "GET_ON_BOARD_ADD_SECTION_FAILURE":
      return {
        ...state,
        allLoading: false,
      };
    case "ADD_NEW_ORGANISATION_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "ADD_NEW_ORGANISATION_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        addSuccess: payload,
      };
    case "ADD_NEW_ORGANISATION_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addLoading: false,
        error: payload,
      };
    case "LOGOUT":
      removeLocalStorage("token");
      removeLocalStorage("twoFAData");
      removeLocalStorage("userDetails");
      removeLocalStorage("storeDetailsUser");
      removeLocalStorage("activeStores");
      setLocalStorage("cartData", []);
      setLocalStorage("cartSetMenu", []);
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        is2FaEnabled: false,
      };
    case "GET_COUNTRY_CITIES_PREFIX_SUCCESS":
      return {
        ...state,
        countryCitiesList: payload.countries,
      };
    default:
      return state;
  }
}
