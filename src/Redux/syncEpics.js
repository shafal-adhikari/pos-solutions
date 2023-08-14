import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";

export const syncSectionList = (action$) =>
  action$.pipe(
    ofType("GET_SYNC_SECTION_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/sync/syncSectionList`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_SYNC_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_SYNC_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const syncProduct = (action$) =>
  action$.pipe(
    ofType("SYNC_PRODUCT_REQUEST"),
    mergeMap((action) =>
      from(
        API.post("/sync/syncProductFromOneChannelToOtherChannel", {
          ...action.payload,
          IsExport: true,
        })
      ).pipe(
        mergeMap((response) => {
          console.log(response);
          return of({
            type: "SYNC_PRODUCT_SUCCESS",
            payload: {
              ...response.data,
            },
          });
        }),
        catchError((error) =>
          of({
            type: "SYNC_PRODUCT_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
