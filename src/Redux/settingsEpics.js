/** @format */

import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const getAllSettings = (action$) =>
  action$.pipe(
    ofType("GET_SETTINGS_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/getAllSettings`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_SETTINGS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_SETTINGS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );

export const getCategoriesImage = (action$) =>
  action$.pipe(
    ofType("GET_CATEGORIES_IMAGE_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/getAllProductCategoriesAddSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_CATEGORIES_IMAGE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_CATEGORIES_IMAGE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllSubCategoryAddSectionList = (action$) =>
  action$.pipe(
    ofType("GET_SUB_CATEGORY_SECTION_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/getAllProductSubCategoriesAddSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_SUB_CATEGORY_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_SUB_CATEGORY_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllOrderTypeSection = (action$) =>
  action$.pipe(
    ofType("GET_ORDER_TYPE_SECTION_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/getAllOrderTypeAddSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ORDER_TYPE_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ORDER_TYPE_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );

export const getAllTaxExclusiveInclusiveStoreAddSectionList = (action$) =>
  action$.pipe(
    ofType("GET_TAX_SECTION_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/settings/getAllTaxExclusiveInclusiveStoreAddSectionList`)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_TAX_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_TAX_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getTableImages = (action$) =>
  action$.pipe(
    ofType("GET_TABLE_IMAGES_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/getAllTablesAddSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_TABLE_IMAGES_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_TABLE_IMAGES_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllCategories = (action$) =>
  action$.pipe(
    ofType("GET_ALL_CATEGORIES_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/getAllProductCategories`, {
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_CATEGORIES_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_CATEGORIES_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllSubCategories = (action$) =>
  action$.pipe(
    ofType("GET_ALL_SUB_CATEGORIES_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/getAllProductSubCategories`, {
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_SUB_CATEGORIES_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_SUB_CATEGORIES_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllCategoryTypes = (action$) =>
  action$.pipe(
    ofType("GET_ALL_CATEGORIES_TYPE_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/getAllCategoryType`, {
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_CATEGORIES_TYPE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_CATEGORIES_TYPE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllTax = (action$) =>
  action$.pipe(
    ofType("GET_ALL_TAX_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/getAllTaxInclusiveNonInclusiveStore`, {
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_TAX_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_TAX_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllOrderTypes = (action$) =>
  action$.pipe(
    ofType("GET_ALL_ORDER_TYPE_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/getAllOrderTypes`, {
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_ORDER_TYPE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_ORDER_TYPE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllBrands = (action$) =>
  action$.pipe(
    ofType("GET_ALL_BRANDS_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/getAllBrands`, {
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_BRANDS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_BRANDS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllTableLocations = (action$) =>
  action$.pipe(
    ofType("GET_ALL_TABLE_LOCATIONS_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/getAllTableLocations`, {
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_TABLE_LOCATIONS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_TABLE_LOCATIONS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllTables = (action$) =>
  action$.pipe(
    ofType("GET_ALL_TABLES_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/getAllTables`, {
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_TABLES_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_TABLES_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addNewCategory = (action$) =>
  action$.pipe(
    ofType("ADD_CATEGORY_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/createUpdateProductCategories`, [
          {
            ...action.payload,
          },
        ])
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_CATEGORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_CATEGORY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addNewSubCategory = (action$) =>
  action$.pipe(
    ofType("ADD_SUB_CATEGORY_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/createUpdateProductSubCategories`, [
          {
            ...action.payload,
          },
        ])
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_SUB_CATEGORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_SUB_CATEGORY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addNewCategoryType = (action$) =>
  action$.pipe(
    ofType("ADD_CATEGORY_TYPE_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/createUpdateCategoryType`, [
          {
            ...action.payload,
          },
        ])
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_CATEGORY_TYPE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_CATEGORY_TYPE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addOrderType = (action$) =>
  action$.pipe(
    ofType("ADD_ORDER_TYPE_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/createUpdateOrderTypes`, [
          {
            ...action.payload,
          },
        ])
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_ORDER_TYPE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_ORDER_TYPE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addTax = (action$) =>
  action$.pipe(
    ofType("ADD_TAX_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/createUpdateTaxInclusiveNonInclusiveStore`, [
          {
            ...action.payload,
          },
        ])
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_TAX_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_TAX_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteCategory = (action$) =>
  action$.pipe(
    ofType("DELETE_CATEGORY_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/deleteProductCategories`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_CATEGORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_CATEGORY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteSubCategory = (action$) =>
  action$.pipe(
    ofType("DELETE_SUB_CATEGORY_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/deleteProductSubCategories`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_SUB_CATEGORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_SUB_CATEGORY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteCategoryType = (action$) =>
  action$.pipe(
    ofType("DELETE_CATEGORY_TYPE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/deleteCategoryType`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_CATEGORY_TYPE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_CATEGORY_TYPE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteOrderType = (action$) =>
  action$.pipe(
    ofType("DELETE_ORDER_TYPE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/deleteOrderType`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_ORDER_TYPE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_ORDER_TYPE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteBrand = (action$) =>
  action$.pipe(
    ofType("DELETE_BRAND_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/deleteBrands`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_BRAND_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_BRAND_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );

export const deleteTable = (action$) =>
  action$.pipe(
    ofType("DELETE_TABLE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/deleteTables`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_TABLE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_TABLE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteTax = (action$) =>
  action$.pipe(
    ofType("DELETE_TAX_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          `/settings/deleteTaxInclusiveNonInclusiveStore`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_TAX_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_TAX_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteTableLocation = (action$) =>
  action$.pipe(
    ofType("DELETE_TABLE_LOCATION_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/deleteTableLocations`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_TABLE_LOCATION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_TABLE_LOCATION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addNewBrand = (action$) =>
  action$.pipe(
    ofType("ADD_BRAND_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/createUpdateBrands`, [
          {
            ...action.payload,
          },
        ])
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_BRAND_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_BRAND_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addNewTableLocation = (action$) =>
  action$.pipe(
    ofType("ADD_TABLE_LOCATION_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/createUpdateTableLocations`, [
          {
            Id: "",
            ...action.payload,
          },
        ])
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_TABLE_LOCATION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_TABLE_LOCATION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editCategory = (action$) =>
  action$.pipe(
    ofType("EDIT_CATEGORY_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/editProductCategories/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_CATEGORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_CATEGORY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editSubCategory = (action$) =>
  action$.pipe(
    ofType("EDIT_SUB_CATEGORY_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/settings/editProductSubCategories/${action.payload}`)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_SUB_CATEGORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_SUB_CATEGORY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editCategoryType = (action$) =>
  action$.pipe(
    ofType("EDIT_CATEGORY_TYPE_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/editCategoryType/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_CATEGORY_TYPE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_CATEGORY_TYPE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editTax = (action$) =>
  action$.pipe(
    ofType("EDIT_TAX_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/settings/editTaxInclusiveNonInclusiveStore/${action.payload}`)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_CATEGORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_CATEGORY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const generateQRTable = (action$) =>
  action$.pipe(
    ofType("GENERATE_TABLE_QR_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/generateQRForTable`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GENERATE_TABLE_QR_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GENERATE_TABLE_QR_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const viewQRTable = (action$) =>
  action$.pipe(
    ofType("VIEW_TABLE_QR_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/getTableQRImage`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "VIEW_TABLE_QR_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "VIEW_TABLE_QR_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editOrderType = (action$) =>
  action$.pipe(
    ofType("EDIT_ORDER_TYPE_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/editOrderType/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_CATEGORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_CATEGORY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editBrand = (action$) =>
  action$.pipe(
    ofType("EDIT_BRAND_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/editBrand/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_CATEGORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_CATEGORY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editTableLocation = (action$) =>
  action$.pipe(
    ofType("EDIT_TABLE_LOCATION_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/editTableLocations/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_CATEGORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_CATEGORY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editTable = (action$) =>
  action$.pipe(
    ofType("EDIT_TABLE_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/editTable/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_CATEGORY_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_CATEGORY_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addNewTable = (action$) =>
  action$.pipe(
    ofType("ADD_TABLE_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/createUpdateTables`, [
          {
            Id: "",
            ...action.payload,
          },
        ])
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_TABLE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_TABLE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getEmployeeEpic = (action$) =>
  action$.pipe(
    ofType("GET_EMPLOYEE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/getAllEmployeeList`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_EMPLOYEE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_EMPLOYEE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addEmployeeEpic = (action$) =>
  action$.pipe(
    ofType("ADD_EMPLOYEE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/createupdateEmployee`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_EMPLOYEE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_EMPLOYEE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getEmployeeAddSectionList = (action$) =>
  action$.pipe(
    ofType("GET_EMPLOYEE_ADD_SECTION_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/employee/getAllEmployeeAddSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_EMPLOYEE_ADD_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_EMPLOYEE_ADD_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getEditEmployeeEpic = (action$) =>
  action$.pipe(
    ofType("GET_EDIT_EMPLOYEE_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/employee/editEmployee/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_EDIT_EMPLOYEE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_EDIT_EMPLOYEE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteEmployeeEpic = (action$) =>
  action$.pipe(
    ofType("DELETE_EMPLOYEE_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/deleteEmployee`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_EMPLOYEE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_EMPLOYEE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
