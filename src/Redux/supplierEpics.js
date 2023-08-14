import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const getSupplierSection = (action$) =>
  action$.pipe(
    ofType("GET_SUPPLIER_SECTION_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/supplier/getAllSupplierAddSectionList`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_SUPPLIER_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_SUPPLIER_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const supplierReport = (action$) =>
  action$.pipe(
    ofType("EXPORT_SUPPLIER_PDF_REQUEST", "EXPORT_SUPPLIER_EXCEL_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/report/supplierReport/export", {
          ...action.payload,
          IsExport: true,
        })
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "EXPORT_SUPPLIER_SUCCESS",
            payload: {
              ...response.data,
              type: action.payload.ExportType,
            },
          });
        }),
        catchError((error) =>
          of({
            type: "EXPORT_SUPPLIER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllSupplier = (action$) =>
  action$.pipe(
    ofType("GET_ALL_SUPPLIER_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/supplier/getAllSupplier`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_SUPPLIER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_SUPPLIER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addSupplier = (action$) =>
  action$.pipe(
    ofType("ADD_SUPPLIER_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/supplier/createUpdateSupplier`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_SUPPLIER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_SUPPLIER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editSupplier = (action$) =>
  action$.pipe(
    ofType("EDIT_SUPPLIER_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/supplier/editSupplier/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_SUPPLIER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_SUPPLIER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteSupplier = (action$) =>
  action$.pipe(
    ofType("DELETE_SUPPLIER_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/supplier/deleteSupplier`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_SUPPLIER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_SUPPLIER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllPurchaseOrderSectionList = (action$) =>
  action$.pipe(
    ofType("GET_ALL_PURCHASE_ORDER_ADD_SECTION_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/purchaseorder/getallPurchaseOrderAddSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_PURCHASE_ORDER_ADD_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_PURCHASE_ORDER_ADD_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getallPurchaseCreditNoteAddSectionList = (action$) =>
  action$.pipe(
    ofType("GET_ALL_PURCHASE_CREDIT_ADD_SECTION_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/PurchaseCreditNote/getallPurchaseCreditNoteAddSectionList`)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_PURCHASE_CREDIT_ADD_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_PURCHASE_CREDIT_ADD_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getProductsBySupplier = (action$) =>
  action$.pipe(
    ofType("GET_PRODUCTS_BY_SUPPLIER_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/supplier/getAllProductsBySupplier`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_PRODUCTS_BY_SUPPLIER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_PRODUCTS_BY_SUPPLIER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const createPurchaseOrder = (action$) =>
  action$.pipe(
    ofType("CREATE_PURCHASE_ORDER_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/purchaseorder/createUpdatePurchaseOrder`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "CREATE_PURCHASE_ORDER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "CREATE_PURCHASE_ORDER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const createPurchaseCredit = (action$) =>
  action$.pipe(
    ofType("CREATE_PURCHASE_CREDIT_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          `/PurchaseCreditNote/createUpdatePurchaseCreditNote`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "CREATE_PURCHASE_CREDIT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "CREATE_PURCHASE_CREDIT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllPurchaseOrderList = (action$) =>
  action$.pipe(
    ofType("GET_ALL_PURCHASE_ORDER_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/purchaseorder/getAllPurchaseOrderList`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_PURCHASE_ORDER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_PURCHASE_ORDER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllPurchaseCreditList = (action$) =>
  action$.pipe(
    ofType("GET_ALL_PURCHASE_CREDIT_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          `/PurchaseCreditNote/getAllPurchaseCreditNoteList`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_PURCHASE_CREDIT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_PURCHASE_CREDIT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getallPurchaseOrderStatusList = (action$) =>
  action$.pipe(
    ofType("GET_ALL_PURCHASE_STATUS_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/purchaseorder/getallPurchaseOrderStatusList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_PURCHASE_STATUS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_PURCHASE_STATUS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getallPurchaseCreditStatusList = (action$) =>
  action$.pipe(
    ofType("GET_ALL_PURCHASE_NOTE_STATUS_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/PurchaseCreditNote/getallPurchaseCreditNoteStatusList`)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_PURCHASE_NOTE_STATUS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_PURCHASE_NOTE_STATUS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deletePurchaseOrder = (action$) =>
  action$.pipe(
    ofType("DELETE_PURCHASE_ORDER_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/purchaseorder/deletePurchaseOrder`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_PURCHASE_ORDER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_PURCHASE_ORDER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deletePurchaseCredit = (action$) =>
  action$.pipe(
    ofType("DELETE_PURCHASE_CREDIT_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/PurchaseCreditNote/deletePurchaseCreditNote`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_PURCHASE_ORDER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_PURCHASE_ORDER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editPurchaseOrder = (action$) =>
  action$.pipe(
    ofType("EDIT_PURCHASE_ORDER_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/purchaseorder/editPurchaseOrder/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_PURCHASE_ORDER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_PURCHASE_ORDER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editPurchaseCredit = (action$) =>
  action$.pipe(
    ofType("EDIT_PURCHASE_CREDIT_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/PurchaseCreditNote/editPurchaseCreditNote/${action.payload}`)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_PURCHASE_ORDER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_PURCHASE_ORDER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
