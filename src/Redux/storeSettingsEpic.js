/** @format */

import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";
import { getLocalStorage } from "../helpers/frontendHelper";

export const getAllStoreAddSectionEpic = (action$) =>
  action$.pipe(
    ofType("GET_STORE_ADD_SECTION_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/getAllStoresAddSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_STORE_ADD_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_STORE_ADD_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getEditStoreSectionEpic = (action$) =>
  action$.pipe(
    ofType("GET_EDIT_STORE_SECTION_LIST_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/settings/editStore/${getLocalStorage("activeStores").id}`)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_EDIT_STORE_SECTION_LIST_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_EDIT_STORE_SECTION_LIST_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const updateStoreDataEpic = (action$) =>
  action$.pipe(
    ofType("UDPATE_STORE_DETAIL_REQUEST"),
    mergeMap((action) =>
      from(API.post(`settings/createUpdateStore`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "UDPATE_STORE_DETAIL_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "UDPATE_STORE_DETAIL_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const resetColorSettingsEpic = (action$) =>
  action$.pipe(
    ofType("RESET_COLOR_SETTINGS_REQUEST"),
    mergeMap((action) =>
      from(API.post(`settings/resetStoreColor`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "RESET_COLOR_SETTINGS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "RESET_COLOR_SETTINGS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
