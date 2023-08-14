import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const getAllUploadDocumentAddSectionList = (action$) =>
  action$.pipe(
    ofType("GET_ALL_UPLOAD_DOCUMENT_SECTION_REQUEST"),
    mergeMap((action) =>
      from(API.get("/employee/getAllUploadDocumentAddSectionList")).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_ALL_UPLOAD_DOCUMENT_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_UPLOAD_DOCUMENT_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const createUpdateUploadDocument = (action$) =>
  action$.pipe(
    ofType("CREATE_UPLOAD_DOCUMENT_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/employee/createUpdateUploadedDocument", action.payload)
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "CREATE_UPLOAD_DOCUMENT_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "CREATE_UPLOAD_DOCUMENT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllUploadedDocuments = (action$) =>
  action$.pipe(
    ofType("GET_ALL_UPLOAD_DOCUMENTS_REQUEST"),
    mergeMap((action) =>
      from(API.post("/employee/getAllUploadedDocument", action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "GET_ALL_UPLOAD_DOCUMENTS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_UPLOAD_DOCUMENTS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editUploadedDocuments = (action$) =>
  action$.pipe(
    ofType("EDIT_UPLOAD_DOCUMENTS_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/employee/editUploadDocuments/${action.payload}`)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "EDIT_UPLOAD_DOCUMENTS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_UPLOAD_DOCUMENTS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteUploadedDocuments = (action$) =>
  action$.pipe(
    ofType("DELETE_UPLOAD_DOCUMENTS_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/employee/deleteUploadDocument/`, action.payload)).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "DELETE_UPLOAD_DOCUMENTS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_UPLOAD_DOCUMENTS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
