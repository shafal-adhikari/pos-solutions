/** @format */

import { combineReducers } from "redux";
import emailConfirmationReducer from "./emailConfirmationReducer";
import authenticationReducer from "./authenticationReducer";
import menuReducer from "./menuReducer";
import cartReducer from "./cartReducer";
import paymentReducer from "./paymentReducer";
import settingsReducer from "./settingsReducer";
import paymentSettingsReducer from "./paymentSettingsReducer";
import storeSettingsReducer from "./storeSettingsReducer";
import bannerSettingsReducer from "./bannerSettingsReducer";
import integerationReducer from "./integerationReducer";
import commonReducer from "./commonReducer";
import giftCardReducer from "./giftCardReducer";
import superAdminReducer from "./superAdminReducer";
import supplierReducer from "./supplierReducer";
import bookingReducer from "./bookingReducer";
import ordersReducer from "./ordersReducer";
import loyaltyReducer from "./loyaltyReducer";
import inventoryReducer from "./inventoryReducer";
import customerReducer from "./customerReducer";
import syncReducer from "./syncReducer";
import posDeviceSettingsReducer from "./posDeviceSettingsReducer";
import reportsReducer from "./reportsReducer";
import cityReducer from "./cityReducer";
import stateReducer from "./stateReducer";
import userProfileReducer from "./userProfileReducer";
import billingReducer from "./billingReducer";
import userManagement from "./userManagement";
import popupSettingsReducer from "./popupSettingsReducer";
import eodReducer from "./eodReducer";
import payrollSettingsReducer from "./payrollSettingsReducer";
import leaveRecordsReducer from "./leaveRecordsReducer";
import employeeDocumentsReducer from "./employeeDocumentsReducer";
import assignLeaveReducer from "./assignLeaveReducer";
import updateCartReducer from "./updateCartReducer";
import pageSettingsReducer from "./pageSettingsReducer";
export const rootReducer = combineReducers({
  emailConfirmationReducer,
  syncReducer,
  settingsReducer,
  authenticationReducer,
  menuReducer,
  customerReducer,
  cityReducer,
  paymentReducer,
  giftCardReducer,
  commonReducer,
  cartReducer,
  inventoryReducer,
  storeSettingsReducer,
  bannerSettingsReducer,
  integerationReducer,
  paymentSettingsReducer,
  superAdminReducer,
  supplierReducer,
  bookingReducer,
  ordersReducer,
  loyaltyReducer,
  posDeviceSettingsReducer,
  reportsReducer,
  stateReducer,
  userProfileReducer,
  billingReducer,
  userManagement,
  popupSettingsReducer,
  eodReducer,
  payrollSettingsReducer,
  leaveRecordsReducer,
  employeeDocumentsReducer,
  assignLeaveReducer,
  updateCartReducer,
  pageSettingsReducer,
});
