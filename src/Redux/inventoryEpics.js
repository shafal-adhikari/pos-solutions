import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const getProductAddSectionList = (action$) =>
  action$.pipe(
    ofType("GET_PRODUCT_ADD_SECTION_REQUEST"),
    mergeMap(() =>
      from(API.get("/product/getAllProductAddSectionList")).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_PRODUCT_ADD_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_PRODUCT_ADD_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getProductSearchSectionList = (action$) =>
  action$.pipe(
    ofType("GET_PRODUCT_SEARCH_SECTION_REQUEST"),
    mergeMap(() =>
      from(API.get("/product/getAllProductSearchSectionList")).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_PRODUCT_SEARCH_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_PRODUCT_SEARCH_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getSetMenuAddSection = (action$) =>
  action$.pipe(
    ofType("GET_SET_MENU_ADD_SECTION_REQUEST"),
    mergeMap(() =>
      from(API.get("/settings/getAllSetmenuAddSection")).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_SET_MENU_ADD_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_SET_MENU_ADD_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllProducts = (action$) =>
  action$.pipe(
    ofType("GET_ALL_PRODUCTS_REQUEST"),
    mergeMap((action) =>
      from(API.post("/product/getAllProducts", action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_ALL_PRODUCTS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_PRODUCTS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllSetMenus = (action$) =>
  action$.pipe(
    ofType("GET_ALL_SET_MENU_REQUEST"),
    mergeMap((action) =>
      from(API.post("/settings/getAllSetMenu", action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_ALL_SET_MENU_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_SET_MENU_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllProductsByCategory = (action$) =>
  action$.pipe(
    ofType("GET_ALL_PRODUCTS_BY_CATEGORY_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/product/getAllProductsByProductCategory", action.payload)
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_ALL_PRODUCTS_BY_CATEGORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_PRODUCTS_BY_CATEGORY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getProductAddons = (action$) =>
  action$.pipe(
    ofType("GET_PRODUCT_ADDONS_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/product/getAllProductSearchByStore", action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_PRODUCT_ADDONS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_PRODUCT_ADDONS_FAILURE",
            payload: error.response.data.message[0].message
              ? error.response.data.message[0].message
              : error,
          })
        )
      )
    )
  );
export const editProduct = (action$) =>
  action$.pipe(
    ofType("EDIT_PRODUCT_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/product/editProduct/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_PRODUCT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_PRODUCT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editProductPrice = (action$) =>
  action$.pipe(
    ofType("EDIT_PRODUCT_PRICE_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/product/editProductPrice/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_PRODUCT_PRICE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_PRODUCT_PRICE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editSetMenu = (action$) =>
  action$.pipe(
    ofType("EDIT_SETMENU_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/editSetMenu/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_SETMENU_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_SETMENU_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addProduct = (action$) =>
  action$.pipe(
    ofType("ADD_PRODUCT_REQUEST", "ADD_PRODUCT_WITH_NEW_REQUEST"),
    mergeMap((action) =>
      from(API.post("/product/createupdateProducts", action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_PRODUCT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_PRODUCT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addSetMenu = (action$) =>
  action$.pipe(
    ofType("ADD_SET_MENU_REQUEST"),
    mergeMap((action) =>
      from(API.post("/settings/createUpdateSetMenu", action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_SET_MENU_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_SET_MENU_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deactivateProduct = (action$) =>
  action$.pipe(
    ofType("DELETE_PRODUCT_REQUEST"),
    mergeMap((action) =>
      from(API.post("/product/deactivateProduct", action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_PRODUCT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_PRODUCT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteProductVariation = (action$) =>
  action$.pipe(
    ofType("DELETE_PRODUCT_VARIATION_REQUEST"),
    mergeMap((action) =>
      from(API.post("/product/deleteProductVariation", action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_PRODUCT_VARIATION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_PRODUCT_VARIATION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteSetMenu = (action$) =>
  action$.pipe(
    ofType("DELETE_SETMENU_REQUEST"),
    mergeMap((action) =>
      from(API.post("/settings/deleteSetMenu", action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_SETMENU_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_SETMENU_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const productReport = (action$) =>
  action$.pipe(
    ofType("EXPORT_PRODUCT_PDF_REQUEST", "EXPORT_PRODUCT_EXCEL_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/report/productReport/export", {
          ...action.payload,
          IsExport: true,
        })
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "EXPORT_PRODUCT_SUCCESS",
            payload: {
              ...response.data,
              type: action.payload.ExportType,
            },
          });
        }),
        catchError((error) =>
          of({
            type: "EXPORT_PRODUCT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const updateProductPrice = (action$) =>
  action$.pipe(
    ofType("UPDATE_PRODUCT_PRICE_REQUEST"),
    mergeMap((action) =>
      from(API.post("/product/updateProductPrice", action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "UPDATE_PRODUCT_PRICE_SUCCESS",
            payload: {
              ...response.data,
              type: action.payload.ExportType,
            },
          });
        }),
        catchError((error) =>
          of({
            type: "UPDATE_PRODUCT_PRICE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getProductImages = (action$) =>
  action$.pipe(
    ofType("GET_ALL_PRODUCT_IMAGE_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/product/getAllProductImages/${action.payload}`)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_ALL_PRODUCT_IMAGE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_PRODUCT_IMAGE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const uploadProductImages = (action$) =>
  action$.pipe(
    ofType("UPLOAD_PRODUCT_IMAGES_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/product/uploadProductImages`, action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of(
            {
              type: "UPLOAD_PRODUCT_IMAGES_SUCCESS",
              payload: response.data,
            },
            {
              type: "GET_ALL_PRODUCT_IMAGE_REQUEST",
              payload: action.productId,
            }
          );
        }),
        catchError((error) =>
          of({
            type: "UPLOAD_PRODUCT_IMAGES_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteProductImage = (action$) =>
  action$.pipe(
    ofType("DELETE_PRODUCT_IMAGE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/product/deleteProductImage`, action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of(
            {
              type: "DELETE_PRODUCT_IMAGE_SUCCESS",
              payload: response.data,
            },
            {
              type: "GET_ALL_PRODUCT_IMAGE_REQUEST",
              payload: action.productId,
            }
          );
        }),
        catchError((error) =>
          of({
            type: "DELETE_PRODUCT_IMAGE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const changeDefaultProductImage = (action$) =>
  action$.pipe(
    ofType("CHANGE_DEFAULT_PRODUCT_IMAGE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/product/makeProductImageDefault`, action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of(
            {
              type: "CHANGE_DEFAULT_PRODUCT_IMAGE_SUCCESS",
              payload: response.data,
            },
            {
              type: "GET_ALL_PRODUCT_IMAGE_REQUEST",
              payload: action.payload.productId,
            }
          );
        }),
        catchError((error) =>
          of({
            type: "CHANGE_DEFAULT_PRODUCT_IMAGE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
