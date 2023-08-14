import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  isLoading: false,
  error: null,
  isOperationSuccessful: false,
  tableReservationList: {},
  tableReservationList1: {},
  tableReservationAddSection: {},
  getTableRservationAddSectionLoading: false,
  makeReservationLoading: false,
  confirmReservationLoading: false,
  isConfirmSuccess: false,
  isMakeReservationSuccess: false,
  getIndividualTableReservationLoading: false,
  individualTableReservation: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_TABLE_RESERVATION_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_TABLE_RESERVATION_REQUEST1":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_TABLE_RESERVATION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        tableReservationList: payload,
      };
    case "GET_ALL_TABLE_RESERVATION_PENDING_SUCCESS":
      return {
        ...state,
        isLoading: false,
        tableReservationList1: payload,
      };
    case "GET_ALL_TABLE_RESERVATION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_ALL_TABLE_RESERVATION_ADD_SECTION_REQUEST":
      return {
        ...state,
        isLoading: true,
        getTableRservationAddSectionLoading: true,
      };
    case "GET_ALL_TABLE_RESERVATION_ADD_SECTION_SUCCESS":
      return {
        ...state,
        getTableRservationAddSectionLoading: false,
        tableReservationAddSection: payload,
      };
    case "GET_ALL_TABLE_RESERVATION_ADD_SECTION_FAILURE":
      return {
        ...state,
        getTableRservationAddSectionLoading: false,
        error: payload,
      };
    case "MAKE_RESERVATION_REQUEST":
      return {
        ...state,

        makeReservationLoading: true,
        isMakeReservationSuccess: false,
      };
    case "MAKE_RESERVATION_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        makeReservationLoading: false,
        isMakeReservationSuccess: true,
      };
    case "MAKE_RESERVATION_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        makeReservationLoading: false,
        error: payload,
        isMakeReservationSuccess: false,
      };
    case "CONFIRM_RESERVATION_REQUEST":
      return {
        ...state,

        confirmReservationLoading: true,
        isConfirmSuccess: false,
      };
    case "CONFIRM_RESERVATION_REQUEST1":
      return {
        ...state,
        cancelReservationLoading: true,
        isConfirmSuccess: false,
      };
    case "CONFIRM_RESERVATION_SUCCESS":
      openNotificationWithIcon("success", payload.message);
      return {
        ...state,
        confirmReservationLoading: false,
        cancelReservationLoading: false,
        isConfirmSuccess: true,
      };
    case "CONFIRM_RESERVATION_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        cancelReservationLoading: false,
        confirmReservationLoading: false,
        error: payload,
        isConfirmSuccess: false,
      };
    case "GET_INDIVIDUAL_TABLE_RESERVATION_REQUEST":
      return {
        ...state,
        getIndividualTableReservationLoading: true,
      };
    case "GET_INDIVIDUAL_TABLE_RESERVATION_SUCCESS":
      return {
        ...state,
        getTableRservationAddSectionLoading: false,
        individualTableReservation: payload,
      };
    case "GET_INDIVIDUAL_TABLE_RESERVATION_FAILURE":
      return {
        ...state,
        getIndividualTableReservationLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
