import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const addNewCashInCashOut = (action$) =>
  action$.pipe(
    ofType("ADD_NEW_CASHIN_REQUEST", "ADD_NEW_CASHOUT_REQUEST"),
    mergeMap((action) =>
      from(API.post("/eod/createUpdateCashInCashOut", action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "ADD_NEW_CASHIN_CASHOUT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_NEW_CASHIN_CASHOUT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllCashInCashOut = (action$) =>
  action$.pipe(
    ofType("GET_ALL_CASHIN_CASHOUT_REQUEST"),
    mergeMap((action) =>
      from(API.post("/eod/getAllCashInCashOut", action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_ALL_CASHIN_CASHOUT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_CASHIN_CASHOUT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editCashInCashOut = (action$) =>
  action$.pipe(
    ofType("EDIT_CASHIN_CASHOUT_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/eod/editCashInCashOut/${action.payload}`)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "EDIT_CASHIN_CASHOUT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_CASHIN_CASHOUT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllEODSectionList = (action$) =>
  action$.pipe(
    ofType("GET_ALL_EOD_SECTION_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/eod/getAllEODSectionList`)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_ALL_EOD_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_EOD_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllEODByDate = (action$) =>
  action$.pipe(
    ofType("GET_ALL_EOD_BY_DATE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/eod/getAllEODFinalizeByDate`, action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_ALL_EOD_BY_DATE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_EOD_BY_DATE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const finalizeEod = (action$) =>
  action$.pipe(
    ofType("FINALIZE_EOD_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/eod/FinalizeEODByDate`, action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "FINALIZE_EOD_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "FINALIZE_EOD_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
