import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const getCityList = (action$) =>
  action$.pipe(
    ofType("GET_ALL_CITY_REQUEST"),
    mergeMap((action) =>
      from(API.post("/settings/getAllCity", action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_ALL_CITY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_CITY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addNewCity = (action$) =>
  action$.pipe(
    ofType("ADD_NEW_CITY_REQUEST"),
    mergeMap((action) =>
      from(API.post("/settings/createUpdateCity", action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "ADD_NEW_CITY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_NEW_CITY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteCity = (action$) =>
  action$.pipe(
    ofType("DELETE_CITY_REQUEST"),
    mergeMap((action) =>
      from(API.post("/settings/deleteCity", action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "DELETE_CITY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_CITY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getCustomerAddSectionList = (action$) =>
  action$.pipe(
    ofType("GET_CUSTOMER_ADD_SECTION_REQUEST"),
    mergeMap(() =>
      from(API.get("/customer/getAllCustomerAddSectionList")).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_CUSTOMER_ADD_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_CUSTOMER_ADD_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editCity = (action$) =>
  action$.pipe(
    ofType("EDIT_CITY_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/editCity/${action.payload}`)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "EDIT_CITY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_CITY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const customerReport = (action$) =>
  action$.pipe(
    ofType("EXPORT_CUSTOMER_PDF_REQUEST", "EXPORT_CUSTOMER_EXCEL_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/report/customerReport/export", {
          ...action.payload,
          IsExport: true,
        })
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "EXPORT_CUSTOMER_SUCCESS",
            payload: {
              ...response.data,
              type: action.payload.ExportType,
            },
          });
        }),
        catchError((error) =>
          of({
            type: "EXPORT_CUSTOMER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
