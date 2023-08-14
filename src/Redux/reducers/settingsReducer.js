/** @format */

import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";

const initialState = {
  isLoading: false,
  error: null,
  editLoading: false,
  employessList: {},
  employeeLoading: false,
  addEmployementSectionList: {},
  isOperationSuccessful: false,
  addEmployeeLoading: false,
  editEmployeeData: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_SETTINGS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_SETTINGS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        settingsList: payload,
      };
    case "GET_SETTINGS_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_CATEGORIES_IMAGE_REQUEST":
    case "GET_SUB_CATEGORY_SECTION_REQUEST":
    case "GET_TABLE_IMAGES_REQUEST":
    case "GET_ORDER_TYPE_SECTION_REQUEST":
    case "GET_TAX_SECTION_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_SUB_CATEGORY_SECTION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        subCategorySection: payload,
      };
    case "GET_TAX_SECTION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        taxSection: payload,
      };
    case "GET_SUB_CATEGORY_SECTION_FAILURE":
    case "GET_TAX_SECTION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_ORDER_TYPE_SECTION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        orderTypeSection: payload,
      };
    case "GET_CATEGORIES_IMAGE_SUCCESS":
      return {
        ...state,
        allLoading: false,
        categoriesSection: payload,
      };
    case "GET_CATEGORIES_IMAGE_FAILURE":
    case "GET_ORDER_TYPE_SECTION_FAILURE":
      return {
        ...state,
        isLoading: false,
        allLoading: false,
        error: payload,
      };
    case "GET_TABLE_IMAGES_SUCCESS":
      return {
        ...state,
        tableSection: payload,
      };
    case "GET_TABLE_IMAGES_FAILURE":
      return {
        ...state,
        error: payload,
      };
    case "GET_ALL_CATEGORIES_REQUEST":
    case "GET_ALL_CATEGORIES_TYPE_REQUEST":
    case "GET_ALL_ORDER_TYPE_REQUEST":
    case "GET_ALL_TAX_REQUEST":
    case "GET_ALL_TABLES_REQUEST":
    case "GET_ALL_TABLE_LOCATIONS_REQUEST":
    case "GET_ALL_BRANDS_REQUEST":
    case "GET_ALL_SUB_CATEGORIES_REQUEST":
      return {
        ...state,
        allLoading: true,
        error: null,
      };
    case "GENERATE_TABLE_QR_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GENERATE_TABLE_QR_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        allLoading: false,
        generateQRSuccess: payload,
      };
    case "REMOVE_QR":
      return {
        ...state,
        tableQR: null,
      };

    case "GENERATE_TABLE_QR_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        allLoading: false,
        generateQRError: payload,
      };
    case "VIEW_TABLE_QR_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "VIEW_TABLE_QR_SUCCESS":
      return {
        ...state,
        allLoading: false,
        tableQR: payload,
      };
    case "VIEW_TABLE_QR_FAILURE":
      return {
        ...state,
        allLoading: false,
        generateQRError: payload,
      };
    case "GET_ALL_TAX_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allTax: payload.data,
        totalTax: payload.total,
      };
    case "GET_ALL_ORDER_TYPE_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allOrderTypes: payload.data,
        totalOrderTypes: payload.total,
      };
    case "GET_ALL_CATEGORIES_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allCategories: payload.data,
        totalCategories: payload.total,
      };
    case "GET_ALL_SUB_CATEGORIES_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allSubCategories: payload.data,
        totalSubCategories: payload.total,
      };
    case "GET_ALL_CATEGORIES_FAILURE":
    case "GET_ALL_SUB_CATEGORIES_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "GET_ALL_CATEGORIES_TYPE_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allCategoryTypes: payload.data,
        totalCategoryTypes: payload.total,
      };
    case "GET_ALL_CATEGORIES_TYPE_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "GET_ALL_TABLES_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allTables: payload.data,
        totalTables: payload.total,
      };
    case "GET_ALL_TABLES_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "GET_ALL_TABLE_LOCATIONS_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allTableLocations: payload.data,
        totalTableLocations: payload.total,
      };
    case "GET_ALL_TABLE_LOCATIONS_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_ALL_BRANDS_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allBrands: payload.data,
        totalBrands: payload.total,
      };
    case "GET_ALL_BRANDS_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "DELETE_SUB_CATEGORY_REQUEST":
    case "DELETE_CATEGORY_REQUEST":
    case "DELETE_CATEGORY_TYPE_REQUEST":
    case "DELETE_TABLE_LOCATION_REQUEST":
    case "DELETE_BRAND_REQUEST":
    case "DELETE_TABLE_REQUEST":
    case "DELETE_ORDER_TYPE_REQUEST":
    case "DELETE_TAX_REQUEST":
      return {
        ...state,
        allLoading: true,
        error: null,
      };
    case "DELETE_TAX_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);

      return {
        ...state,
        allLoading: false,
        deleteTaxSuccess: payload,
        editData: null,
      };
    case "DELETE_TAX_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "DELETE_ORDER_TYPE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);

      return {
        ...state,
        allLoading: false,
        deleteOrderTypeSuccess: payload,
        editData: null,
      };
    case "DELETE_ORDER_TYPE_FAILURE":
      openNotificationWithIcon("error", payload);

      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "DELETE_TABLE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);

      return {
        ...state,
        allLoading: false,
        deleteTableSuccess: payload,
        editData: null,
      };
    case "DELETE_TABLE_FAILURE":
      openNotificationWithIcon("error", payload);

      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "DELETE_BRAND_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);

      return {
        ...state,
        allLoading: false,
        deleteBrandSuccess: payload,
        editData: null,
      };
    case "DELETE_TABLE_LOCATION_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);

      return {
        ...state,
        allLoading: false,
        deleteTableLocationSuccess: payload,
        editData: null,
      };
    case "DELETE_CATEGORY_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        allLoading: false,
        categoryData: null,
        deleteCategorySuccess: payload,
      };
    case "DELETE_SUB_CATEGORY_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        allLoading: false,
        subCategoryData: null,
        deleteSubCategorySuccess: payload,
      };
    case "DELETE_CATEGORY_TYPE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        allLoading: false,
        categoryData: null,
        deleteCategoryTypeSuccess: payload,
        editData: null,
      };
    case "DELETE_CATEGORY_FAILURE":
    case "DELETE_SUB_CATEGORY_FAILURE":
    case "DELETE_CATEGORY_TYPE_FAILURE":
    case "DELETE_TABLE_LOCATION_FAILURE":
    case "DELETE_BRAND_FAILURE":
      openNotificationWithIcon("error", payload);

      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "ADD_CATEGORY_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        isLoading: false,
        editData: null,
        addCategorySuccess: payload,
      };
    case "ADD_SUB_CATEGORY_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        isLoading: false,
        editData: null,
        addSubCategorySuccess: payload,
      };
    case "ADD_CATEGORY_TYPE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        isLoading: false,
        editData: null,
        addCategoryTypeSuccess: payload,
      };
    case "ADD_CATEGORY_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "ADD_CATEGORY_TYPE_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "ADD_BRAND_REQUEST":
    case "ADD_TABLE_LOCATION_REQUEST":
    case "ADD_CATEGORY_REQUEST":
    case "ADD_SUB_CATEGORY_REQUEST":
    case "ADD_ORDER_TYPE_REQUEST":
    case "ADD_CATEGORY_TYPE_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "ADD_ORDER_TYPE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        isLoading: false,
        addOrderTypeSuccess: payload,
      };
    case "ADD_ORDER_TYPE_FAILURE":
      openNotificationWithIcon("error", payload);

      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "ADD_BRAND_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        editData: null,
        isLoading: false,
        addBrandSuccess: payload,
      };
    case "ADD_BRAND_FAILURE":
      openNotificationWithIcon("error", payload);

      return {
        ...state,
        isLoading: true,
        error: payload,
      };
    case "ADD_TABLE_LOCATION_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);

      return {
        ...state,
        isLoading: false,
        editData: null,
        addTableLocationSuccess: payload,
      };
    case "ADD_TABLE_LOCATION_FAILURE":
      openNotificationWithIcon("error", payload);

      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "ADD_TABLE_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "ADD_TABLE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);

      return {
        ...state,
        editData: null,
        isLoading: false,
        addTableSuccess: payload,
      };
    case "ADD_TABLE_FAILURE":
      openNotificationWithIcon("error", payload);

      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "ADD_ORDER_TYPE_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "ADD_ORDER_TYPE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);

      return {
        ...state,
        isLoading: false,
        editData: null,
        addOrderTypeSuccess: payload,
      };
    case "ADD_ORDER_TYPE_FAILURE":
      openNotificationWithIcon("error", payload);

      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "ADD_TAX_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "ADD_TAX_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);

      return {
        ...state,
        isLoading: false,
        editData: null,
        addTaxSuccess: payload,
      };
    case "ADD_TAX_FAILURE":
      openNotificationWithIcon("error", payload);

      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "EDIT_CATEGORY_REQUEST":
    case "EDIT_SUB_CATEGORY_REQUEST":
    case "EDIT_CATEGORY_TYPE_REQUEST":
    case "EDIT_BRAND_REQUEST":
    case "EDIT_TABLE_LOCATION_REQUEST":
    case "EDIT_TABLE_REQUEST":
    case "EDIT_ORDER_TYPE_REQUEST":
    case "EDIT_TAX_REQUEST":
      return {
        ...state,
        editLoading: true,
      };
    case "EDIT_CATEGORY_SUCCESS":
      return {
        ...state,
        editLoading: false,
        editData: payload,
      };
    case "EDIT_SUB_CATEGORY_SUCCESS":
      return {
        ...state,
        editLoading: false,
        editData: payload,
      };
    case "EDIT_CATEGORY_FAILURE":
    case "EDIT_SUB_CATEGORY_FAILURE":
      return {
        ...state,
        editLoading: false,
        categoryError: payload,
      };
    case "EDIT_CATEGORY_TYPE_SUCCESS":
      return {
        ...state,
        editLoading: false,
        editData: payload,
      };
    case "EDIT_CATEGORY_TYPE_FAILURE":
      return {
        ...state,
        editLoading: false,
        error: payload,
      };
    case "RESET_EDIT_DATA":
      return {
        ...state,
        editData: null,
      };
    case "GET_EMPLOYEE_REQUEST":
      return {
        ...state,
        employeeLoading: true,
      };
    case "GET_EMPLOYEE_SUCCESS":
      return {
        ...state,
        employeeLoading: false,
        employessList: payload,
      };
    case "GET_EMPLOYEE_FAILURE":
      return {
        ...state,
        employeeLoading: false,
      };
    case "ADD_EMPLOYEE_REQUEST":
      return {
        ...state,
        employeeLoading: true,
        isOperationSuccessful: false,
        addEmployeeLoading: true,
      };
    case "ADD_EMPLOYEE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        employeeLoading: false,
        isOperationSuccessful: true,
        addEmployeeLoading: false,
      };

    case "ADD_EMPLOYEE_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        employeeLoading: false,
        isOperationSuccessful: false,
        addEmployeeLoading: false,
      };
    case "GET_EMPLOYEE_ADD_SECTION_REQUEST":
      return {
        ...state,
        employeeLoading: true,
      };
    case "GET_EMPLOYEE_ADD_SECTION_SUCCESS":
      return {
        ...state,
        employeeLoading: false,
        addEmployementSectionList: payload,
      };
    case "GET_EMPLOYEE_ADD_SECTION_FAILURE":
      return {
        ...state,
        employeeLoading: false,
      };
    case "MAKE_IS_OPERATION_FALSE":
      return {
        ...state,
        isOperationSuccessful: false,
      };
    case "CLEAR_EDIT_DATA":
      return {
        ...state,
        editEmployeeData: {},
      };
    case "GET_EDIT_EMPLOYEE_REQUEST":
      return {
        ...state,
        employeeLoading: true,
      };
    case "GET_EDIT_EMPLOYEE_SUCCESS":
      return {
        ...state,
        employeeLoading: false,
        editEmployeeData: payload,
      };
    case "GET_EDIT_EMPLOYEE_FAILURE":
      return {
        ...state,
        employeeLoading: false,
      };
    case "DELETE_EMPLOYEE_REQUEST":
      return {
        ...state,
        employeeLoading: true,
        isOperationSuccessful: false,
      };
    case "DELETE_EMPLOYEE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        employeeLoading: false,
        isOperationSuccessful: true,
      };

    case "DELETE_EMPLOYEE_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        employeeLoading: false,
        isOperationSuccessful: false,
      };
    default:
      return state;
  }
}
