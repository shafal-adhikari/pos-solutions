import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const addGiftCard = (action$) =>
  action$.pipe(
    ofType("ADD_GIFT_CARD_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          "/GiftCardVoucherLoyality/createUpdateGiftCards",
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "ADD_GIFT_CARD_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_GIFT_CARD_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllGiftCardsAddSectionList = (action$) =>
  action$.pipe(
    ofType("GET_GIFT_CARD_SECTION_REQUEST"),
    mergeMap(() =>
      from(
        API.get("/GiftCardVoucherLoyality/getAllGiftCardsAddSectionList")
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_GIFT_CARD_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_GIFT_CARD_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllGiftCardCustomer = (action$) =>
  action$.pipe(
    ofType("GET_ALL_GIFT_CARD_CUSTOMER_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          "/GiftCardVoucherLoyality/getAllGiftCardCustomer",
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_ALL_GIFT_CARD_CUSTOMER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_GIFT_CARD_CUSTOMER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllGiftCard = (action$) =>
  action$.pipe(
    ofType("GET_GIFT_CARDS_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/GiftCardVoucherLoyality/getAllGiftCard", action.payload)
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_GIFT_CARDS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_GIFT_CARDS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );

export const getAllCustomers = (action$) =>
  action$.pipe(
    ofType("GET_ALL_CUSTOMER_REQUEST"),
    mergeMap((action) =>
      from(API.post("/customer/getAllCustomer", action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_ALL_CUSTOMER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_CUSTOMER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getRedeemHistoryGiftCard = (action$) =>
  action$.pipe(
    ofType("GET_REDEEM_HISTORY_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          "/GiftCardVoucherLoyality/giftCardDetailsWithReedemSummary",
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_REDEEM_HISTORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_REDEEM_HISTORY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const giftCardReport = (action$) =>
  action$.pipe(
    ofType("EXPORT_GIFT_PDF_REQUEST", "EXPORT_GIFT_EXCEL_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/report/giftCardReport/export", {
          ...action.payload,
          IsExport: true,
        })
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "EXPORT_GIFT_SUCCESS",
            payload: {
              ...response.data,
              type: action.payload.ExportType,
            },
          });
        }),
        catchError((error) =>
          of({
            type: "EXPORT_GIFT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getSearchSectionList = (action$) =>
  action$.pipe(
    ofType("GET_GIFT_SEARCH_SECTION_REQUEST"),
    mergeMap((action) =>
      from(
        API.get("/GiftCardVoucherLoyality/getAllGiftCardsSearchSectionList")
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_GIFT_SEARCH_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_GIFT_SEARCH_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deactivateGiftCard = (action$) =>
  action$.pipe(
    ofType("DEACTIVATE_GIFT_CARD_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/GiftCardVoucherLoyality/deactiveGiftCard", action.payload)
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "DEACTIVATE_GIFT_CARD_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DEACTIVATE_GIFT_CARD_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
