import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";
export const getAllPayrollSettings = (action$) =>
  action$.pipe(
    ofType("GET_ALL_PAYROLL_SETTINGS_REQUEST"),
    mergeMap(() =>
      from(API.get(`/employee/getAllPayrollSettings`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_PAYROLL_SETTINGS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_PAYROLL_SETTINGS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addNewLeaveType = (action$) =>
  action$.pipe(
    ofType("ADD_NEW_LEAVE_TYPE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/createUpdateLeaveType`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_NEW_LEAVE_TYPE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_NEW_LEAVE_TYPE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllLeaveType = (action$) =>
  action$.pipe(
    ofType("GET_ALL_LEAVE_TYPE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/getAllLeaveType`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_LEAVE_TYPE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_LEAVE_TYPE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteLeaveType = (action$) =>
  action$.pipe(
    ofType("DELETE_LEAVE_TYPE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/deleteLeaveType`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_LEAVE_TYPE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_LEAVE_TYPE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editLeaveType = (action$) =>
  action$.pipe(
    ofType("EDIT_LEAVE_TYPE_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/employee/editLeaveType/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_LEAVE_TYPE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_LEAVE_TYPE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addNewPayScaleLevel = (action$) =>
  action$.pipe(
    ofType("ADD_NEW_PAY_SCALE_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/employee/createUpdatePayScaleLevel`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_NEW_PAY_SCALE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_NEW_PAY_SCALE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllPayScaleLevel = (action$) =>
  action$.pipe(
    ofType("GET_ALL_PAY_SCALE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/getAllPayScaleLevel`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_PAY_SCALE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_PAY_SCALE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deletePayScaleLevel = (action$) =>
  action$.pipe(
    ofType("DELETE_PAY_SCALE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/deletePayScaleLevel`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_PAY_SCALE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_PAY_SCALE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editPayScaleLevel = (action$) =>
  action$.pipe(
    ofType("EDIT_PAY_SCALE_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/employee/editPayScaleLevel/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_PAY_SCALE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_PAY_SCALE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
