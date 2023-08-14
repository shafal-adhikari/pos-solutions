import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";
import { getLocalStorage } from "../helpers/frontendHelper";

export const getAccoungtingIntegerationEpic = (action$) =>
  action$.pipe(
    ofType("GET_ACCOUNTING_INTEGERATION_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(
          `/AccountingIntegration/getAllAccountingIntegrationSectionList`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ACCOUNTING_INTEGERATION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ACCOUNTING_INTEGERATION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAccoungtingPlatformConnectionEpic = (action$) =>
  action$.pipe(
    ofType("GET_ACCOUNTING_PLATFORM_CONNECTION_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(
          `/AccountingIntegration/getAccountingPlatformIntegrationConnectionByPlatformId/${action.payload}`
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ACCOUNTING_PLATFORM_CONNECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ACCOUNTING_PLATFORM_CONNECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const updateAccoungtingPlatformConnectionEpic = (action$) =>
  action$.pipe(
    ofType("UPDATE_ACCOUNTING_PLATFORM_CONNECTION_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          `/AccountingIntegration/createUpdateAccountingPlatformIntegrationConnection`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "UPDATE_ACCOUNTING_PLATFORM_CONNECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "UPDATE_ACCOUNTING_PLATFORM_CONNECTION_FAILURe",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAccoungtingChartEpic = (action$) =>
  action$.pipe(
    ofType("GET_ACCOUNTING_CHART_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(
          `/AccountingIntegration/getAccountingChartofAccountIntegrationByPlatformId/${action.payload}`
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ACCOUNTING_CHART_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ACCOUNTING_CHART_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const updateAccoungtingChartEpic = (action$) =>
  action$.pipe(
    ofType("UPDATE_CHART_OF_ACCOUNT_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          `/AccountingIntegration/createUpdateAccountingIntegrationChartofAccountMappings`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "UPDATE_CHART_OF_ACCOUNT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "UPDATE_CHART_OF_ACCOUNT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
