import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const getAllSalesHistorySectionList = (action$) =>
  action$.pipe(
    ofType("GET_SALES_HISTORY_SECTION_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/report/getAllSalesHistoryReportSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_SALES_HISTORY_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_SALES_HISTORY_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllSalesHistory = (action$) =>
  action$.pipe(
    ofType("GET_SALES_HISTORY_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/report/salesHistoryReport`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_SALES_HISTORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_SALES_HISTORY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const salesHistoryReport = (action$) =>
  action$.pipe(
    ofType("EXPORT_SALES_PDF_REQUEST", "EXPORT_SALES_EXCEL_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/report/salesHistoryReport/export", {
          ...action.payload,
          IsExport: true,
        })
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "EXPORT_SALES_SUCCESS",
            payload: {
              ...response.data,
              type: action.payload.ExportType,
            },
          });
        }),
        catchError((error) =>
          of({
            type: "EXPORT_SALES_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
