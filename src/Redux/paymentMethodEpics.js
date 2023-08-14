import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const getAllPaymentMethod = (action$) =>
  action$.pipe(
    ofType("GET_PAYMENT_METHODS_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/getAllPaymentMethod`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_PAYMENT_METHODS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_PAYMENT_METHODS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const updatePaymentMethod = (action$) =>
  action$.pipe(
    ofType("UPDATE_PAYMENT_METHOD_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/createUpdatePaymentMethod`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "UPDATE_PAYMENT_METHOD_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "UPDATE_PAYMENT_METHOD_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
