/** @format */

import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const emailConfirmationEpic = (action$) =>
  action$.pipe(
    ofType("EMAIL_CONFIRMATION_REQUEST"),
    mergeMap((action) =>
      from(API.post("/account/confirmEmail", action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "EMAIL_CONFIRMATION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EMAIL_CONFIRMATION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getCountriesPrefix = (action$) =>
  action$.pipe(
    ofType("GET_COUNTRY_PREFIX_REQUEST"),
    mergeMap((action) =>
      from(API.get("/common/listCountry")).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_COUNTRY_PREFIX_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_COUNTRY_PREFIX_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const searchUniqueCodeByPaymentMethod = (action$) =>
  action$.pipe(
    ofType("SEARCH_UNIQUE_CODE_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          "/posorder/SearchUniqueCodeByPaymentMethodType",
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "SEARCH_UNIQUE_CODE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "SEARCH_UNIQUE_CODE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getCountryStateCity = (action$) =>
  action$.pipe(
    ofType("GET_COUNTRY_STATE_REQUEST"),
    mergeMap((action) =>
      from(API.get("/common/listCountryCityState")).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_COUNTRY_STATE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_COUNTRY_STATE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const loginEpic = (action$) =>
  action$.pipe(
    ofType("LOGIN_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/account/login", {
          ChannelPlatForm: "POSMobile",
          ...action.payload,
          // FCMToken: "dskadjfla",
          DeviceIdentifier: "dsakjfldkajklfa",
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "LOGIN_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "LOGIN_FAILURE",
            payload: error.response
              ? error.response.data.message[0].message
              : error.message,
          })
        )
      )
    )
  );

export const validate2FAQr = (action$) =>
  action$.pipe(
    ofType("VALIDATE_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/account/validate2faQr", {
          ChannelPlatForm: "POSMobile",
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "LOGIN_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "2FA_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const sendOTPtoMail = (action$) =>
  action$.pipe(
    ofType("SEND_OTP_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/account/sendOtpCodeToEmail", {
          ChannelPlatForm: "POSMobile",
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "SEND_OTP_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "SEND_OTP_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const validateMailOTP = (action$) =>
  action$.pipe(
    ofType("VALIDATE_OTP_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/account/validateOtpCodeToEmail", {
          ChannelPlatForm: "POSMobile",
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "LOGIN_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "LOGIN_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const forgotPasswordRequest = (action$) =>
  action$.pipe(
    ofType("FORGOT_PASSWORD_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/account/sendForgotPasswordChangeLink", {
          ChannelPlatForm: "POSMobile",
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "FORGOT_PASSWORD_LINK_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "FORGOT_PASSWORD_LINK_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const changePasswordEpic = (action$) =>
  action$.pipe(
    ofType("CHANGE_PASSWORD_REQUEST"),
    mergeMap((action) =>
      from(API.post("/account/resetPassword", action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "CHANGE_PASSWORD_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "CHANGE_PASSWORD_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getReleaseVersion = (action$) =>
  action$.pipe(
    ofType("GET_RELEASE_VERSION_REQUEST"),
    mergeMap((action) =>
      from(API.get("/common/getPOSWebReleaseVersion")).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_RELEASE_VERSION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_RELEASE_VERSION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const activateStore = (action$) =>
  action$.pipe(
    ofType("ACTIVATE_STORE_REQUEST"),
    mergeMap((action) =>
      from(API.post("/account/activateStore", action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ACTIVATE_STORE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ACTIVATE_STORE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const sendOTPRegisterEpic = (action$) =>
  action$.pipe(
    ofType("SEND_OTP_REQUEST_REGISTER"),
    mergeMap((action) =>
      from(
        API.post("/onBoard/sendOtpCodeToEmailOnBoarding", {
          ...action.payload,
          ChannelPlatForm: "POSWeb",
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "SEND_OTP_SUCCESS_REGISTER",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "SEND_OTP_FAILURE_REGISTER",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const REsendOTPRegisterEpic = (action$) =>
  action$.pipe(
    ofType("SEND_OTP_REQUEST_REGISTER_RESEND"),
    mergeMap((action) =>
      from(
        API.post("/onBoard/sendOtpCodeToEmailOnBoarding", {
          ...action.payload,
          ChannelPlatForm: "POSWeb",
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "SEND_OTP_SUCCESS_REGISTER_RESEND",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "SEND_OTP_FAILURE_REGISTER_RESEND",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getCountriesCitiesPrefix = (action$) =>
  action$.pipe(
    ofType("GET_COUNTRY_CITIES_PREFIX_REQUEST"),
    mergeMap((action) =>
      from(API.get("/onBoard/onBoardAddSectionList")).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_COUNTRY_CITIES_PREFIX_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_COUNTRY_CITIES_PREFIX_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const registerOnBoardUserEpic = (action$) =>
  action$.pipe(
    ofType("REGISTER_USER_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/onboard/onBoardUser", {
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "REGISTER_USER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "REGISTER_USER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getOnBoardAddSectionList = (action$) =>
  action$.pipe(
    ofType("GET_ON_BOARD_ADD_SECTION_REQUEST"),
    mergeMap((action) =>
      from(API.get("/onboard/onBoardAddSectionList")).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ON_BOARD_ADD_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ON_BOARD_ADD_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addOrganisation = (action$) =>
  action$.pipe(
    ofType("ADD_NEW_ORGANISATION_REQUEST"),
    mergeMap((action) =>
      from(API.post("/onboard/onBoardStore", action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_NEW_ORGANISATION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_NEW_ORGANISATION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
