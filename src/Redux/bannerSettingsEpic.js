import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";
import { getLocalStorage } from "../helpers/frontendHelper";

export const getAllBannersEpic = (action$) =>
  action$.pipe(
    ofType("GET_ALL_BANNERS_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/getAllBanner`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_BANNERS_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_BANNERS_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllBannersAddSectionEpic = (action$) =>
  action$.pipe(
    ofType("GET_ADD_BANNER_SECTION_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/getAllBannerAddSectionList`)).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ADD_BANNER_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ADD_BANNER_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const addBannerEpic = (action$) =>
  action$.pipe(
    ofType("ADD_BANNER_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/createUpdateBanners`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "ADD_BANNER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "ADD_BANNER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const deleteBannerEpic = (action$) =>
  action$.pipe(
    ofType("DELETE_BANNER_REQUEST"),
    mergeMap((action) =>
      from(API.post(`/settings/deleteBanner`, action.payload)).pipe(
        mergeMap((response) => {
          return of({
            type: "DELETE_BANNER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "DELETE_BANNER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const editBanner = (action$) =>
  action$.pipe(
    ofType("EDIT_BANNER_REQUEST"),
    mergeMap((action) =>
      from(API.get(`/settings/editBanner/${action.payload}`)).pipe(
        mergeMap((response) => {
          return of({
            type: "EDIT_BANNER_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "EDIT_BANNER_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
