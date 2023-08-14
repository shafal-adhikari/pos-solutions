/** @format */

import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";

const initialState = {
  isLoading: false,
  error: null,
  success: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_POS_DEVICE_SETTINGS_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_POS_DEVICE_SETTINGS_SUCCESS":
      return {
        ...state,
        posDevices: payload.posDevices,
        departments: payload.departments,
        posPrinters: payload.posPrinters,
        allLoading: false,
      };
    case "GET_POS_DEVICE_SETTINGS_FAILURE":
      return {
        ...state,
        error: payload,
        allLoading: false,
      };
    case "UPDATE_PRINTER_SETUP_REQUEST":
      return {
        ...state,
        updateSetupLoading: true,
      };
    case "UPDATE_PRINTER_SETUP_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        updateSetupLoading: false,
      };
    case "UPDATE_PRINTER_SETUP_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        updateSetupLoading: false,
        error: payload,
      };
    case "GET_PRINTER_SETUP_SECTION_REQUEST":
    case "GET_POS_DEVICE_SECTION_LIST_REQUEST":
    case "GET_PRINTER_DETAILS_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_PRINTER_DETAILS_SUCCESS":
      return {
        ...state,
        allLoading: false,
        posDeviceSetup: payload,
      };
    case "GET_PRINTER_DETAILS_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "GET_PRINTER_SETUP_SECTION_SUCCESS":
      return {
        ...state,
        printerSetupSectionList: payload,
      };
    case "GET_POS_DEVICE_SECTION_LIST_SUCCESS":
      return {
        ...state,
        posDeviceAddSection: payload,
      };
    case "GET_PRINTER_SETUP_SECTION_FAILURE":
    case "GET_POS_DEVICE_SECTION_LIST_REQUEST":
      return {
        ...state,
        error: payload,
      };
    case "ADD_DEPARTMENT_REQUEST":
    case "ADD_PRINTER_LOCATION_REQUEST":
    case "ADD_POS_DEVICE_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "ADD_PRINTER_LOCATION_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        addPrinterLocationSuccess: payload,
      };
    case "ADD_DEPARTMENT_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        addDepartmentSuccess: payload,
      };
    case "ADD_POS_DEVICE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        addPOSDeviceSuccess: payload,
      };
    case "ADD_DEPARTMENT_FAILURE":
    case "ADD_PRINTER_LOCATION_FAILURE":
    case "ADD_POS_DEVICE_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addLoading: false,
        error: payload,
      };
    case "EDIT_DEPARTMENT_REQUEST":
    case "EDIT_POS_DEVICE_REQUEST":
    case "EDIT_PRINTER_LOCATION_REQUEST":
      return {
        ...state,
        editLoading: true,
      };
    case "EDIT_DEPARTMENT_SUCCESS":
    case "EDIT_POS_DEVICE_SUCCESS":
    case "EDIT_PRINTER_LOCATION_SUCCESS":
      return {
        ...state,
        editLoading: false,
        editData: payload,
      };
    case "EDIT_DEPARTMENT_FAILURE":
    case "EDIT_PRINTER_LOCATION_FAILURE":
    case "EDIT_POS_DEVICE_FAILURE":
      return {
        ...state,
        editLoading: false,
        error: payload,
      };
    case "GET_ALL_DEPARTMENT_REQUEST":
    case "GET_ALL_PRINTER_LOCATION_REQUEST":
    case "GET_ALL_POS_DEVICE_REQUEST":
      return {
        ...state,
        allLoading: true,
        editData: null,
      };
    case "GET_ALL_PRINTER_LOCATION_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allPrinterLocations: payload.data,
        totalPrinterLocations: payload.total,
      };
    case "GET_ALL_DEPARTMENT_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allDepartments: payload.data,
        totalDepartments: payload.total,
      };
    case "GET_ALL_POS_DEVICE_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allPOSDevices: payload.data,
        totalPOSDevices: payload.total,
      };
    case "GET_ALL_DEPARTMENT_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "DELETE_DEPARTMENT_REQUEST":
    case "DELETE_PRINTER_LOCATION_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "DELETE_PRINTER_LOCATION_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        allLoading: false,
        deletePrinterLocationSuccess: payload,
      };
    case "DELETE_DEPARTMENT_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        allLoading: false,
        deleteDepartmentSuccess: payload,
      };
    case "DELETE_DEPARTMENT_FAILURE":
    case "DELETE_PRINTER_LOCATION_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
