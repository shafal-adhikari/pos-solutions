/** @format */

import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";
import { getLocalStorage } from "../helpers/frontendHelper";

export const getAllLoyaltyEpic = (action$) =>
  action$.pipe(
    ofType("GET_LOYALTY_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/GiftCardVoucherLoyality/GetAllLoyalty`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_LOYALTY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_LOYALTY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllVoucher = (action$) =>
  action$.pipe(
    ofType("GET_ALL_VOUCHER_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/GiftCardVoucherLoyality/GetAllVoucher`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_VOUCHER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_VOUCHER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllVoucherCustomer = (action$) =>
  action$.pipe(
    ofType("GET_ALL_VOUCHER_CUSTOMER_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          `/GiftCardVoucherLoyality/GetAllMarketingAndPromotionEnabledCustomer`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_VOUCHER_CUSTOMER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_VOUCHER_CUSTOMER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const viewCustomerLoyaltyEpic = (action$) =>
  action$.pipe(
    ofType("GET_CUSTOMER_LOYALTY_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          `/GiftCardVoucherLoyality/loyaltyHistoryByCustomer`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_CUSTOMER_LOYALTY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_CUSTOMER_LOYALTY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getVoucherGroupEpic = (action$) =>
  action$.pipe(
    ofType("GET_VOUCHER_GROUP_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/GiftCardVoucherLoyality/GetAllVoucherGroup`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_VOUCHER_GROUP_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_VOUCHER_GROUP_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addVoucherGroupEpic = (action$) =>
  action$.pipe(
    ofType("ADD_VOUCHER_GROUP_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          `/GiftCardVoucherLoyality/createUpdateVoucherGroup`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_VOUCHER_GROUP_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_VOUCHER_GROUP_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editVoucherGroupEpic = (action$) =>
  action$.pipe(
    ofType("EDIT_VOUCHER_GROUP_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/GiftCardVoucherLoyality/editVoucherGroup/${action.payload}`)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_VOUCHER_GROUP_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_VOUCHER_GROUP_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteVoucherGroupEpic = (action$) =>
  action$.pipe(
    ofType("DELETE_VOUCHER_GROUP_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/GiftCardVoucherLoyality/deleteVoucherGroup`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_VOUCHER_GROUP_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_VOUCHER_GROUP_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAssignGroupSectionListpic = (action$) =>
  action$.pipe(
    ofType("GET_ASSIGN_GROUP_SECTION_LIST_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(
          `/GiftCardVoucherLoyality/getAllCustomerVoucherGroupAddSectionList`
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ASSIGN_GROUP_SECTION_LIST_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ASSIGN_GROUP_SECTION_LIST_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const assignCustomerToGroupEpic = (action$) =>
  action$.pipe(
    ofType("ASSIGN_CUSTOMER_TO_GROUP_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          `/GiftCardVoucherLoyality/assignCustomerToGroup`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ASSIGN_CUSTOMER_TO_GROUP_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ASSIGN_CUSTOMER_TO_GROUP_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getCustomerByVoucherGroupEpic = (action$) =>
  action$.pipe(
    ofType("GET_CUSTOMER_BY_VOUCHER_GROUP_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/Customer/getAllCustomerByVoucherGroups`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_CUSTOMER_BY_VOUCHER_GROUP_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_CUSTOMER_BY_VOUCHER_GROUP_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const issueVoucherToGroupEpic = (action$) =>
  action$.pipe(
    ofType("ISSUE_VOUCHER_TO_GROUP_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/GiftCardVoucherLoyality/sendVoucherToGroups`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ISSUE_VOUCHER_TO_GROUP_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ISSUE_VOUCHER_TO_GROUP_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const issueVoucherToCustomerEpic = (action$) =>
  action$.pipe(
    ofType("ISSUE_VOUCHER_TO_CUSTOMERS_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          `/GiftCardVoucherLoyality/sendVoucherToCustomers`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ISSUE_VOUCHER_TO_CUSTOMERS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ISSUE_VOUCHER_TO_CUSTOMERS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const uploadMarketingMaterialEpic = (action$) =>
  action$.pipe(
    ofType("UPLOAD_MARKETING_MATERIALS_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          `/GiftCardVoucherLoyality/sendMarketingMaterialsToGroups`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "UPLOAD_MARKETING_MATERIALS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "UPLOAD_MARKETING_MATERIALS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
