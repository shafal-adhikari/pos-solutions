/** @format */

import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const addRoleEpic = (action$) =>
  action$.pipe(
    ofType("ADD_ROLE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/account/createUpdateRoles`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_ROLE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_ROLE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getRolesEpic = (action$) =>
  action$.pipe(
    ofType("GET_ROLES_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/account/getAllRoles`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ROLES_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ROLES_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getPermissionAddSectionListEpic = (action$) =>
  action$.pipe(
    ofType("GET_PERMISSION_ADD_SECTION_LIST_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/account/getAllPermissionAddSectionList`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_PERMISSION_ADD_SECTION_LIST_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_PERMISSION_ADD_SECTION_LIST_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getPermissionByRoleEpic = (action$) =>
  action$.pipe(
    ofType("GET_PERMISSION_BY_ROLE_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(
          `/account/getPermissionByRoleIdAndChannePlatformlId/${action.payload.roleId}/${action.payload.channelplatformid}`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_PERMISSION_BY_ROLE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_PERMISSION_BY_ROLE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const createUpadteRolesPermissionEpic = (action$) =>
  action$.pipe(
    ofType("UPDATE_PERMISSION_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/account/createUpdateRolesPermission`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "UPDATE_PERMISSION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "UPDATE_PERMISSION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteRoleEpic = (action$) =>
  action$.pipe(
    ofType("DELETE_ROLE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/account/deleteRoles`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_ROLE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_ROLE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getUserByIDEpic = (action$) =>
  action$.pipe(
    ofType("GET_USER_BY_ID_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/account/getUserById/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_USER_BY_ID_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_USER_BY_ID_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getUserManagementEpic = (action$) =>
  action$.pipe(
    ofType("GET_USERMANAGEMENT_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/account/getAllUsers`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_USERMANAGEMENT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_USERMANAGEMENT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getUserSectionListEpic = (action$) =>
  action$.pipe(
    ofType("GET_ADD_USER_SECTION_LIST_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/account/getAllUserAddSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ADD_USER_SECTION_LIST_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ADD_USER_SECTION_LIST_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addUserEpic = (action$) =>
  action$.pipe(
    ofType("ADD_USER_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/account/createUpdateUser`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_USER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_USER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
