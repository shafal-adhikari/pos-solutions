/** @format */

import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const getAllLeaveRecords = (action$) =>
  action$.pipe(
    ofType("GET_ALL_LEAVE_RECORDS_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/getAllLeaveRecord`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_LEAVE_RECORDS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_LEAVE_RECORDS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editLeaveRecord = (action$) =>
  action$.pipe(
    ofType("EDIT_LEAVE_RECORD_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/employee/editLeaveRecord/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_LEAVE_REQUEST_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_LEAVE_REQUEST_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteLeaveRecord = (action$) =>
  action$.pipe(
    ofType("DELETE_LEAVE_RECORD_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/deleteLeaveRecord`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_LEAVE_RECORD_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_LEAVE_RECORD_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllLeaveRecordStatusList = (action$) =>
  action$.pipe(
    ofType("GET_ALL_LEAVE_RECORD_STATUS_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/employee/getallLeaveRecordStatusList`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_LEAVE_RECORD_STATUS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_LEAVE_RECORD_STATUS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllLeaveRecordAddSectionList = (action$) =>
  action$.pipe(
    ofType("GET_ALL_LEAVE_RECORD_ADD_SECTION_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/employee/getAllLeaveRecordAddSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_LEAVE_RECORD_ADD_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_LEAVE_RECORD_ADD_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addUpdateLeaveRecord = (action$) =>
  action$.pipe(
    ofType("ADD_LEAVE_RECORD_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/createUpdateLeaveRecord`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_LEAVE_RECORD_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_LEAVE_RECORD_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addUpdateYear = (action$) =>
  action$.pipe(
    ofType("ADD_YEAR_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/createUpdateYear`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_YEAR_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_YEAR_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editYear = (action$) =>
  action$.pipe(
    ofType("EDIT_YEAR_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/employee/editYear/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_YEAR_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_YEAR_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllYear = (action$) =>
  action$.pipe(
    ofType("GET_ALL_YEAR_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/getAllYear`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_YEAR_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_YEAR_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteYear = (action$) =>
  action$.pipe(
    ofType("DELETE_YEAR_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/deleteYear`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_YEAR_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_YEAR_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addUpdateDocumentType = (action$) =>
  action$.pipe(
    ofType("ADD_DOCUMENT_TYPE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/createUpdateDocumentType`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_YEAR_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_YEAR_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editDocumentType = (action$) =>
  action$.pipe(
    ofType("EDIT_DOCUMENT_TYPE_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/employee/editDocumentType/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_YEAR_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_YEAR_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllDocumentType = (action$) =>
  action$.pipe(
    ofType("GET_ALL_DOCUMENT_TYPE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/getAllDocumentType`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_DOCUMENT_TYPE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_DOCUMENT_TYPE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteDocumentType = (action$) =>
  action$.pipe(
    ofType("DELETE_DOCUMENT_TYPE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/deleteYear`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_YEAR_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_YEAR_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
