import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";
import { getLocalStorage } from "../helpers/frontendHelper";

export const getAllFranchiseEpic = (action$) =>
  action$.pipe(
    ofType("GET_ALL_FRANCHISE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/getAllFranchise`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_FRANCHISE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_FRANCHISE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllFranchiseAddSectionEpic = (action$) =>
  action$.pipe(
    ofType("GET_ADD_FRANCHISE_SECTION_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/getAllFranchiseAddSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ADD_FRANCHISE_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ADD_FRANCHISE_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addFranchiseEpic = (action$) =>
  action$.pipe(
    ofType("ADD_FRANCHISE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/createUpdateFranchise`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_FRANCHISE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_FRANCHISE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteFranchiseEpic = (action$) =>
  action$.pipe(
    ofType("DELETE_FRANCHISE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/deleteFranchise`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_FRANCHISE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_FRANCHISE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllLanguageEpic = (action$) =>
  action$.pipe(
    ofType("GET_ALL_LANGUAGE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/getAllLanguageParameter`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_LANGUAGE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_LANGUAGE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllLanguageAddSectionEpic = (action$) =>
  action$.pipe(
    ofType("GET_ADD_LANGUAGE_SECTION_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/getAllLanguageParameterAddSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ADD_LANGUAGE_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ADD_LANGUAGE_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addLanguageEpic = (action$) =>
  action$.pipe(
    ofType("ADD_LANGUAGE_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/createUpdateLanguageParameter`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_LANGUAGE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_LANGUAGE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
