import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const getAllPopup = (action$) =>
  action$.pipe(
    ofType("GET_ALL_POPUP_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/getAllPopUp`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_POPUP_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_POPUP_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addPopup = (action$) =>
  action$.pipe(
    ofType("ADD_POPUP_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/createUpdatePopUp`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_POPUP_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_POPUP_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deletePopup = (action$) =>
  action$.pipe(
    ofType("DELETE_POPUP_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/deletePopUp`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_POPUP_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_POPUP_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editPopup = (action$) =>
  action$.pipe(
    ofType("EDIT_POPUP_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/editPopup/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_POPUP_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_POPUP_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
