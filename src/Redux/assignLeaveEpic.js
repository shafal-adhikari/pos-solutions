/** @format */

import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";
import { getLocalStorage } from "../helpers/frontendHelper";

export const getAssignLeaveSectionListEpic = (action$) =>
  action$.pipe(
    ofType("GET_ASSIGN_LEAVE_SECTION_LIST_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/employee/getAllAssignLeaveToEmployeeSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ASSIGN_LEAVE_SECTION_LIST_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ASSIGN_LEAVE_SECTION_LIST_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllEmployeeAssignedLeaveEpic = (action$) =>
  action$.pipe(
    ofType("GET_ALL_EMPLOYEE_ASSIGNED_LEAVE_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/employee/getAllEmployeeAssignedLeave`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_EMPLOYEE_ASSIGNED_LEAVE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_EMPLOYEE_ASSIGNED_LEAVE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const updateAssignLeaveEpic = (action$) =>
  action$.pipe(
    ofType("UPDATE_ASSIGNED_LEAVE_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/employee/createUpdateAssignedLeave`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "UPDATE_ASSIGNED_LEAVE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "UPDATE_ASSIGNED_LEAVE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
