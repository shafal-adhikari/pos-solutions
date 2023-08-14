import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const getOrderTypeList = (action$) =>
  action$.pipe(
    ofType("GET_ORDER_TYPE_REQUEST"),
    mergeMap(() =>
      from(API.get("/common/listorderType")).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_ORDER_TYPE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ORDER_TYPE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllOrderSectionList = (action$) =>
  action$.pipe(
    ofType("GET_ALL_ORDER_SECTION_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/posorder/getAllPOSOrderSectionList", action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_ORDER_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_ORDER_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getPaymentSectionList = (action$) =>
  action$.pipe(
    ofType("PAYMENT_SECTION_LIST_REQUEST"),
    mergeMap((action) =>
      from(API.get("/posorder/posOrderPaymentSectionList")).pipe(
        mergeMap((response) => {
          return of({
            type: "PAYMENT_SECTION_LIST_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "PAYMENT_SECTION_LIST_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const searchCustomerForLoyalty = (action$) =>
  action$.pipe(
    ofType("SEARCH_CUSTOMER_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/posorder/searchCustomerForLoyaltyDetails", action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "SEARCH_CUSTOMER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "SEARCH_CUSTOMER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteItemOrder = (action$) =>
  action$.pipe(
    ofType("DELETE_ITEM_ORDER_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/posorder/cancelOrderItems", {
          ChannelPlatForm: "POSMobile",
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: action.payload.isSetMenu
              ? "REMOVE_SET_MENU_CART_UPDATE"
              : "REMOVE_ITEM_CART_UPDATE",
            payload: {
              product: action.payload.product,
              deleteSuccess: response.data,
            },
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_ITEM_ORDER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const placeOrder = (action$) =>
  action$.pipe(
    ofType("PLACE_ORDER_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/posorder/placeOrderOrCheckOut", {
          ChannelPlatForm: "POSMobile",
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of(
            {
              type: "PLACE_ORDER_SUCCESS",
              payload: { isUpdate: action.payload.isUpdate, ...response.data },
            },
            {
              type: action.payload.isUpdate ? "CLEAR_CART_UPDATE" : "",
              payload: {},
            }
          );
        }),
        catchError((error) =>
          of({
            type: "PLACE_ORDER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const placeOrderMakePayment = (action$) =>
  action$.pipe(
    ofType("ORDER_PAYMENT_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/posorder/placeOrderMakePayments", {
          ChannelPlatForm: "POSMobile",
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ORDER_PAYMENT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ORDER_PAYMENT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const posOrderPaymentInvoiceDetails = (action$) =>
  action$.pipe(
    ofType("GET_ORDER_INVOICE_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/posorder/posOrderPaymentInvoicePrint`, {
          OrderId: action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ORDER_INVOICE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ORDER_INVOICE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
