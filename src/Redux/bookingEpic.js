import { mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { API } from "../helpers/baseURL";
import { getLocalStorage } from "../helpers/frontendHelper";

export const getAllTableReservationAddSectionEpic = (action$) =>
  action$.pipe(
    ofType("GET_ALL_TABLE_RESERVATION_ADD_SECTION_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/tablereservation/getAllTableReservationAddSectionList`)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_ALL_TABLE_RESERVATION_ADD_SECTION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_TABLE_RESERVATION_ADD_SECTION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const getAllTableReservationEpic = (action$) =>
  action$.pipe(
    ofType(
      "GET_ALL_TABLE_RESERVATION_REQUEST",
      "GET_ALL_TABLE_RESERVATION_REQUEST1"
    ),
    mergeMap((action) =>
      from(
        API.post(`/tablereservation/getAllTableReservation`, action.payload)
      ).pipe(
        mergeMap((response) => {
          if (action?.payload?.isStatusPending) {
            return of({
              type: "GET_ALL_TABLE_RESERVATION_PENDING_SUCCESS",
              payload: response.data,
            });
          } else {
            return of({
              type: "GET_ALL_TABLE_RESERVATION_SUCCESS",
              payload: response.data,
            });
          }
        }),
        catchError((error) =>
          of({
            type: "GET_ALL_TABLE_RESERVATION_ FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const makeTableReservationEpic = (action$) =>
  action$.pipe(
    ofType("MAKE_RESERVATION_REQUEST"),
    mergeMap((action) =>
      from(
        API.post(
          `/tablereservation/createUpdateTableReservation`,
          action.payload
        )
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "MAKE_RESERVATION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "MAKE_RESERVATION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
export const confirmReservationEpic = (action$) =>
  action$.pipe(
    ofType("CONFIRM_RESERVATION_REQUEST", "CONFIRM_RESERVATION_REQUEST1"),
    mergeMap((action) =>
      from(
        API.post(`/tablereservation/confirmTableReservation`, action.payload)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "CONFIRM_RESERVATION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "CONFIRM_RESERVATION_FAILURE",
            payload: error.response.data.message,
          })
        )
      )
    )
  );
export const getIndividualTableReservationEpic = (action$) =>
  action$.pipe(
    ofType("GET_INDIVIDUAL_TABLE_RESERVATION_REQUEST"),
    mergeMap((action) =>
      from(
        API.get(`/tablereservation/editTableReservation/${action.payload.id}`)
      ).pipe(
        mergeMap((response) => {
          return of({
            type: "GET_INDIVIDUAL_TABLE_RESERVATION_SUCCESS",
            payload: response.data,
          });
        }),
        catchError((error) =>
          of({
            type: "GET_INDIVIDUAL_TABLE_RESERVATION_FAILURE",
            payload: error.response.data.message[0].message,
          })
        )
      )
    )
  );
