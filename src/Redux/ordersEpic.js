import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const getOrdersDetailSectionEpic = (action$) =>
  action$.pipe(
    ofType("GET_ORDERS_DETAIL_SECTION_LIST_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/posorder/getAllPOSOrderDetailsSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ORDERS_DETAIL_SECTION_LIST_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ORDERS_DETAIL_SECTION_LIST_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getOrderDetailById = (action$) =>
  action$.pipe(
    ofType("GET_ORDER_DETAIL_BY_ID_REQUEST", "PAY_ORDER_DETAIL_BY_ID_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/posorder/getOrderDetailsByOrderId/${action.payload}`)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ORDER_DETAIL_BY_ID_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ORDER_DETAIL_BY_ID_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllOrdersEpic = (action$) =>
  action$.pipe(
    ofType("GET_ALL_ORDERS_REQUEST", "GET_ALL_ORDERS_REQUEST1"),
    mergeMap((action) =>
      from(API.post(`/posorder/getAllOrders`, action.payload)).pipe(
        mergeMap((response) => {
          if (action.payload.isStatusPending) {
            return of({
              type: "GET_ALL_PENDING_ORDERS_SUCCESS",
              payload: response.data,
            });
          } else {
            return of({
              type: "GET_ALL_ORDERS_SUCCESS",
              payload: response.data,
            });
          }
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_ORDERS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const updateOrderStatusEpic = (action$) =>
  action$.pipe(
    ofType("UPDATE_ORDER_STATUS_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/posorder/bulkorderChangeStatus`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "UPDATE_ORDER_STATUS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "UPDATE_ORDER_STATUS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
