import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const getUserProfile = (action$) =>
  action$.pipe(
    ofType("GET_USER_PROFILE_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/account/getUserById/${action.payload}`)).pipe(
        mergeMap((response) => {
          return [
            {
              type: "GET_USER_PROFILE_SUCCESS",
              payload: response.data,
            },
          ];
        }),
        catchError((error) =>
          of({
            type: "GET_USER_PROFILE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const updateUserProfile = (action$) =>
  action$.pipe(
    ofType("UPDATE_USER_PROFILE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/account/updateUser/`, action.payload)).pipe(
        mergeMap((response) => {
          return [
            {
              type: "UPDATE_USER_PROFILE_SUCCESS",
              payload: response.data,
            },
          ];
        }),
        catchError((error) =>
          of({
            type: "UPDATE_USER_PROFILE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const changeUserPassword = (action$) =>
  action$.pipe(
    ofType("CHANGE_USER_PASSWORD_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/account/changePassword/`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "CHANGE_USER_PASSWORD_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "CHANGE_USER_PASSWORD_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const enableDisable2FA = (action$) =>
  action$.pipe(
    ofType("ENABLE_DISABLE_2FA_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/account/enableDisable2FA/`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ENABLE_DISABLE_2FA_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ENABLE_DISABLE_2FA_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
