import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";
import { getLocalStorage } from "../helpers/frontendHelper";

export const getAllBillingAndSubscription = (action$) =>
  action$.pipe(
    ofType("GET_ALL_SUBSCRIPTION_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/BillingAndSubscription/getAllSubscriptionAndBilling`)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_SUBSCRIPTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_SUBSCRIPTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllBillingAndSubscriptionPlan = (action$) =>
  action$.pipe(
    ofType("GET_ALL_SUBSCRIPTION_PLAN_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/BillingAndSubscription/getBillingAndSubscriptionPlanList`)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_SUBSCRIPTION_PLAN_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_SUBSCRIPTION_PLAN_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getNewSubscription = (action$) =>
  action$.pipe(
    ofType("NEW_SUBSCRIPTION_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          `/BillingAndSubscription/createSubscriptionAndBilling`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "NEW_SUBSCRIPTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "NEW_SUBSCRIPTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const changeSubscriptionPlan = (action$) =>
  action$.pipe(
    ofType("CHANGE_SUBSCRIPTION_PLAN_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          `/BillingAndSubscription/changeSubscriptionAndBillingPlan`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "CHANGE_SUBSCRIPTION_PLAN_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "CHANGE_SUBSCRIPTION_PLAN_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
