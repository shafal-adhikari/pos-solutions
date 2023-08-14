import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const getPagesAddSectionList = (action$) =>
  action$.pipe(
    ofType("GET_PAGES_ADD_SECTION_LIST_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/getAllPagesAddSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_PAGES_ADD_SECTION_LIST_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_PAGES_ADD_SECTION_LIST_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllPages = (action$) =>
  action$.pipe(
    ofType("GET_ALL_PAGES_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/getAllPages`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_PAGES_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_PAGES_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addPage = (action$) =>
  action$.pipe(
    ofType("ADD_PAGE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/createUpdatePage`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_PAGE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_PAGE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editPage = (action$) =>
  action$.pipe(
    ofType("EDIT_PAGE_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/editPage/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_PAGE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_PAGE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deletePage = (action$) =>
  action$.pipe(
    ofType("DELETE_PAGE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/deletePage`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_PAGE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_PAGE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
