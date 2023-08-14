import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const getAllPOSPrinterSetUpSectionList = (action$) =>
  action$.pipe(
    ofType("GET_PRINTER_SETUP_SECTION_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/POSDeviceSetting/getAllPOSPrinterSetUpSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_PRINTER_SETUP_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_PRINTER_SETUP_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllPOSDeviceSettings = (action$) =>
  action$.pipe(
    ofType("GET_POS_DEVICE_SETTINGS_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/POSDeviceSetting/getAllPOSDeviceGeneralSettings`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_POS_DEVICE_SETTINGS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_POS_DEVICE_SETTINGS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const updatePrinterSetup = (action$) => {
  return action$.pipe(
    ofType("UPDATE_PRINTER_SETUP_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          `/POSDeviceSetting/createUpdatePOSprinterSetUp`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "UPDATE_PRINTER_SETUP_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "UPDATE_PRINTER_SETUP_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
};
export const getAllDepartment = (action$) =>
  action$.pipe(
    ofType("GET_ALL_DEPARTMENT_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/POSDeviceSetting/getAllDepartment`, {
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_DEPARTMENT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_DEPARTMENT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllPrinterLocation = (action$) =>
  action$.pipe(
    ofType("GET_ALL_PRINTER_LOCATION_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/POSDeviceSetting/getAllPOSPrinters`, {
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_PRINTER_LOCATION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_PRINTER_LOCATION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addNewDepartment = (action$) =>
  action$.pipe(
    ofType("ADD_DEPARTMENT_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/settings/createUpdateDepartment`, [
          {
            ...action.payload,
          },
        ])
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_DEPARTMENT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_DEPARTMENT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getPrinterDetails = (action$) =>
  action$.pipe(
    ofType("GET_PRINTER_DETAILS_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/POSDeviceSetting/getPrinterSetUpDetails/`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_PRINTER_DETAILS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_PRINTER_DETAILS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editDepartment = (action$) =>
  action$.pipe(
    ofType("EDIT_DEPARTMENT_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/editDepartment/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_DEPARTMENT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_DEPARTMENT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteDepartment = (action$) =>
  action$.pipe(
    ofType("DELETE_DEPARTMENT_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/deleteDepartment`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_DEPARTMENT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_DEPARTMENT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllPOSDevicesAddSectionList = (action$) =>
  action$.pipe(
    ofType("GET_POS_DEVICE_SECTION_LIST_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/POSDeviceSetting/getAllPOSDevicesAddSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_POS_DEVICE_SECTION_LIST_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_POS_DEVICE_SECTION_LIST_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllPOSDevice = (action$) =>
  action$.pipe(
    ofType("GET_ALL_POS_DEVICE_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/POSDeviceSetting/getAllPOSDevices`, {
          ...action.payload,
        })
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_POS_DEVICE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_POS_DEVICE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addNewPOSDevice = (action$) =>
  action$.pipe(
    ofType("ADD_POS_DEVICE_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/POSDeviceSetting/createUpdatePosDevices`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_POS_DEVICE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_POS_DEVICE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editPOSDevice = (action$) =>
  action$.pipe(
    ofType("EDIT_POS_DEVICE_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/POSDeviceSetting/editPosDevice/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_POS_DEVICE_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_POS_DEVICE_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deletePOSDevice = (action$) =>
  action$.pipe(
    ofType("DELETE_DEPARTMENT_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/POSDeviceSetting/deletePOSDevice`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_DEPARTMENT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_DEPARTMENT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addNewPrinterLocation = (action$) =>
  action$.pipe(
    ofType("ADD_PRINTER_LOCATION_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(`/POSDeviceSetting/createUpdatePOSPrinter`, [
          {
            ...action.payload,
          },
        ])
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_PRINTER_LOCATION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_PRINTER_LOCATION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editPrinterLocation = (action$) =>
  action$.pipe(
    ofType("EDIT_PRINTER_LOCATION_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/POSDeviceSetting/editPOSPrinter/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_PRINTER_LOCATION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_PRINTER_LOCATION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deletePrinterLocation = (action$) =>
  action$.pipe(
    ofType("DELETE_PRINTER_LOCATION_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/POSDeviceSetting/deletePOSPrinter`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_PRINTER_LOCATION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_PRINTER_LOCATION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
