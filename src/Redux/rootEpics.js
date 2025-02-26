/** @format */

import { combineEpics } from "redux-observable";
import {
  emailConfirmationEpic,
  changePasswordEpic,
  validateMailOTP,
  validate2FAQr,
  sendOTPtoMail,
  forgotPasswordRequest,
  getCountriesPrefix,
  loginEpic,
  getReleaseVersion,
  getCountryStateCity,
  activateStore,
  searchUniqueCodeByPaymentMethod,
  sendOTPRegisterEpic,
  getCountriesCitiesPrefix,
  REsendOTPRegisterEpic,
  registerOnBoardUserEpic,
  getOnBoardAddSectionList,
  addOrganisation,
} from "./myEpics";
import {
  getOrderTypeList,
  getAllOrderSectionList,
  placeOrder,
  searchCustomerForLoyalty,
  posOrderPaymentInvoiceDetails,
  placeOrderMakePayment,
  getPaymentSectionList,
  deleteItemOrder,
} from "./menuEpics";
import {
  addGiftCard,
  getAllGiftCardsAddSectionList,
  getAllGiftCard,
  getAllCustomers,
  getSearchSectionList,
  deactivateGiftCard,
  getRedeemHistoryGiftCard,
  giftCardReport,
  getAllGiftCardCustomer,
} from "./giftCardEpics";
import {
  getAllSettings,
  getCategoriesImage,
  getAllCategories,
  getTableImages,
  editOrderType,
  getAllOrderTypeSection,
  getAllBrands,
  getAllTableLocations,
  getAllTax,
  editCategory,
  editTableLocation,
  addTax,
  deleteTableLocation,
  getAllTables,
  editTable,
  addNewTable,
  deleteCategory,
  deleteTable,
  addNewTableLocation,
  editBrand,
  getAllTaxExclusiveInclusiveStoreAddSectionList,
  deleteBrand,
  addNewBrand,
  editTax,
  deleteOrderType,
  addOrderType,
  deleteTax,
  addNewCategory,
  generateQRTable,
  getAllOrderTypes,
  viewQRTable,
  addNewCategoryType,
  getAllCategoryTypes,
  deleteCategoryType,
  editCategoryType,
  getEmployeeEpic,
  addEmployeeEpic,
  getEmployeeAddSectionList,
  getEditEmployeeEpic,
  deleteEmployeeEpic,
  getAllSubCategoryAddSectionList,
  getAllSubCategories,
  editSubCategory,
  deleteSubCategory,
  addNewSubCategory,
} from "./settingsEpics";
import { updatePaymentMethod, getAllPaymentMethod } from "./paymentMethodEpics";
import { addNewCity, deleteCity, editCity, getCityList } from "./cityEpics";
import {
  getAllStoreAddSectionEpic,
  getEditStoreSectionEpic,
  resetColorSettingsEpic,
  updateStoreDataEpic,
} from "./storeSettingsEpic";
import {
  addBannerEpic,
  deleteBannerEpic,
  editBanner,
  getAllBannersAddSectionEpic,
  getAllBannersEpic,
} from "./bannerSettingsEpic";
import {
  getAccoungtingChartEpic,
  getAccoungtingIntegerationEpic,
  getAccoungtingPlatformConnectionEpic,
  updateAccoungtingChartEpic,
  updateAccoungtingPlatformConnectionEpic,
} from "./accounIntegerationEpic";
import {
  addFranchiseEpic,
  addLanguageEpic,
  deleteFranchiseEpic,
  getAllFranchiseAddSectionEpic,
  getAllFranchiseEpic,
  getAllLanguageAddSectionEpic,
  getAllLanguageEpic,
} from "./superAdminEpic";
import {
  addSupplier,
  createPurchaseCredit,
  createPurchaseOrder,
  deletePurchaseCredit,
  deletePurchaseOrder,
  deleteSupplier,
  editPurchaseCredit,
  editPurchaseOrder,
  editSupplier,
  getAllPurchaseCreditList,
  getallPurchaseCreditNoteAddSectionList,
  getallPurchaseCreditStatusList,
  getAllPurchaseOrderList,
  getAllPurchaseOrderSectionList,
  getallPurchaseOrderStatusList,
  getAllSupplier,
  getProductsBySupplier,
  getSupplierSection,
  supplierReport,
} from "./supplierEpics";
import {
  confirmReservationEpic,
  getAllTableReservationAddSectionEpic,
  getAllTableReservationEpic,
  getIndividualTableReservationEpic,
  makeTableReservationEpic,
} from "./bookingEpic";
import {
  getAllOrdersEpic,
  getOrderDetailById,
  getOrdersDetailSectionEpic,
  updateOrderStatusEpic,
} from "./ordersEpic";
import {
  addProduct,
  addSetMenu,
  changeDefaultProductImage,
  deactivateProduct,
  deleteProductImage,
  deleteProductVariation,
  deleteSetMenu,
  editProduct,
  editProductPrice,
  editSetMenu,
  getAllProducts,
  getAllProductsByCategory,
  getAllSetMenus,
  getProductAddons,
  getProductAddSectionList,
  getProductImages,
  getProductSearchSectionList,
  getSetMenuAddSection,
  productReport,
  updateProductPrice,
  uploadProductImages,
} from "./inventoryEpics";
import {
  addNewCustomer,
  customerReport,
  deleteCustomer,
  editCustomer,
  getCustomerAddSectionList,
  getCustomerList,
} from "./customerEpics";
import {
  addVoucherGroupEpic,
  assignCustomerToGroupEpic,
  deleteVoucherGroupEpic,
  editVoucherGroupEpic,
  getAllLoyaltyEpic,
  getAllVoucher,
  getAllVoucherCustomer,
  getAssignGroupSectionListpic,
  getCustomerByVoucherGroupEpic,
  getVoucherGroupEpic,
  issueVoucherToCustomerEpic,
  issueVoucherToGroupEpic,
  uploadMarketingMaterialEpic,
  viewCustomerLoyaltyEpic,
} from "./loyaltyEpic";
import { syncProduct, syncSectionList } from "./syncEpics";
import {
  addNewDepartment,
  addNewPOSDevice,
  addNewPrinterLocation,
  deleteDepartment,
  deletePOSDevice,
  deletePrinterLocation,
  editDepartment,
  editPOSDevice,
  editPrinterLocation,
  getAllDepartment,
  getAllPOSDevice,
  getAllPOSDevicesAddSectionList,
  getAllPOSDeviceSettings,
  getAllPOSPrinterSetUpSectionList,
  getAllPrinterLocation,
  getPrinterDetails,
  updatePrinterSetup,
} from "./posDeviceSettingsEpic";
import {
  getAllSalesHistory,
  getAllSalesHistorySectionList,
  salesHistoryReport,
} from "./reportsEpics";
import {
  addNewState,
  deleteState,
  editState,
  getStateList,
} from "./stateEpics";
import {
  changeUserPassword,
  enableDisable2FA,
  getUserProfile,
  updateUserProfile,
} from "./userProfileEpics";
import {
  changeSubscriptionPlan,
  getAllBillingAndSubscription,
  getAllBillingAndSubscriptionPlan,
  getNewSubscription,
} from "./billingEpics";
import {
  getUserManagementEpic,
  getUserSectionListEpic,
  addUserEpic,
  addRoleEpic,
  getRolesEpic,
  getPermissionAddSectionListEpic,
  getPermissionByRoleEpic,
  createUpadteRolesPermissionEpic,
  deleteRoleEpic,
  getUserByIDEpic,
} from "./UserManagementEpics";
import {
  addPopup,
  deletePopup,
  editPopup,
  getAllPopup,
} from "./popupSettingsEpic";
import {
  addNewCashInCashOut,
  editCashInCashOut,
  finalizeEod,
  getAllCashInCashOut,
  getAllEODByDate,
  getAllEODSectionList,
} from "./eodEpics";
import {
  addNewLeaveType,
  addNewPayScaleLevel,
  deleteLeaveType,
  deletePayScaleLevel,
  editLeaveType,
  editPayScaleLevel,
  getAllLeaveType,
  getAllPayrollSettings,
  getAllPayScaleLevel,
} from "./payrollSettingsEpic";
import {
  getAllLeaveRecordAddSectionList,
  getAllLeaveRecordStatusList,
  addUpdateLeaveRecord,
  getAllLeaveRecords,
  editLeaveRecord,
  deleteLeaveRecord,
  addUpdateYear,
  getAllYear,
  editYear,
  deleteYear,
  getAllDocumentType,
  editDocumentType,
  addUpdateDocumentType,
  deleteDocumentType,
} from "./leaveRecordsEpic";
import {
  createUpdateUploadDocument,
  deleteUploadedDocuments,
  editUploadedDocuments,
  getAllUploadDocumentAddSectionList,
  getAllUploadedDocuments,
} from "./employeeDocumentsEpics";
import {
  getAllEmployeeAssignedLeaveEpic,
  getAssignLeaveSectionListEpic,
  updateAssignLeaveEpic,
} from "./assignLeaveEpic";
import {
  addPage,
  deletePage,
  editPage,
  getAllPages,
  getPagesAddSectionList,
} from "./pageSettingsEpics";
export const rootEpic = combineEpics(
  emailConfirmationEpic,
  getCategoriesImage,
  getTableImages,
  updatePaymentMethod,
  getAllPaymentMethod,
  editCategory,
  addOrderType,
  viewQRTable,
  generateQRTable,
  getAllCustomers,
  getAllTax,
  editProduct,
  addNewCustomer,
  editCustomer,
  deleteTax,
  editTax,
  deleteOrderType,
  deleteCustomer,
  addTax,
  deactivateGiftCard,
  editTable,
  getAllTaxExclusiveInclusiveStoreAddSectionList,
  getAllOrderTypes,
  addNewTable,
  deleteTableLocation,
  getCustomerAddSectionList,
  getProductAddSectionList,
  productReport,
  getProductSearchSectionList,
  getAllGiftCardsAddSectionList,
  deleteBrand,
  changePasswordEpic,
  editTableLocation,
  deleteTable,
  getAllTables,
  deactivateProduct,
  getAllProducts,
  getAllBrands,
  getSearchSectionList,
  getProductAddons,
  addNewBrand,
  deleteCategory,
  addProduct,
  getAllTableLocations,
  editBrand,
  addNewTableLocation,
  editOrderType,
  addNewCategory,
  getAllCategories,
  getRedeemHistoryGiftCard,
  sendOTPtoMail,
  getAllOrderTypeSection,
  getAllSettings,
  forgotPasswordRequest,
  deleteCategoryType,
  editCategoryType,
  placeOrder,
  getPaymentSectionList,
  getAllCategoryTypes,
  editProductPrice,
  placeOrderMakePayment,
  posOrderPaymentInvoiceDetails,
  addNewCategoryType,
  validateMailOTP,
  searchCustomerForLoyalty,
  deleteProductVariation,
  addGiftCard,
  updateProductPrice,
  getAllOrderSectionList,
  validate2FAQr,
  getOrderTypeList,
  loginEpic,
  getAllStoreAddSectionEpic,
  getEditStoreSectionEpic,
  getAllSupplier,
  editSetMenu,
  updateStoreDataEpic,
  deleteSetMenu,
  addSupplier,
  giftCardReport,
  deleteSupplier,
  getAllBannersEpic,
  getSupplierSection,
  editSupplier,
  getAllBannersAddSectionEpic,
  addSetMenu,
  getAllSetMenus,
  addBannerEpic,
  deleteBannerEpic,
  getSetMenuAddSection,
  getAllProductsByCategory,
  getAccoungtingIntegerationEpic,
  getAccoungtingPlatformConnectionEpic,
  updateAccoungtingPlatformConnectionEpic,
  getAccoungtingChartEpic,
  customerReport,
  updateAccoungtingChartEpic,
  getAllGiftCard,
  getCountriesPrefix,
  getAllFranchiseEpic,
  getAllFranchiseAddSectionEpic,
  supplierReport,
  addFranchiseEpic,
  getCustomerList,
  deleteFranchiseEpic,
  getAllLanguageEpic,
  getAllLanguageAddSectionEpic,
  addLanguageEpic,
  getAllTableReservationEpic,
  getAllTableReservationAddSectionEpic,
  makeTableReservationEpic,
  confirmReservationEpic,
  getIndividualTableReservationEpic,
  getOrdersDetailSectionEpic,
  getAllOrdersEpic,
  updateOrderStatusEpic,
  getAllLoyaltyEpic,
  viewCustomerLoyaltyEpic,
  getReleaseVersion,
  syncSectionList,
  syncProduct,
  getAllDepartment,
  addNewDepartment,
  editDepartment,
  deleteDepartment,
  getAllPOSDevice,
  addNewPOSDevice,
  editPOSDevice,
  deletePOSDevice,
  getAllPOSDevicesAddSectionList,
  getAllPOSPrinterSetUpSectionList,
  getAllPrinterLocation,
  addNewPrinterLocation,
  editPrinterLocation,
  deletePrinterLocation,
  updatePrinterSetup,
  getAllSalesHistorySectionList,
  getAllSalesHistory,
  salesHistoryReport,
  getPrinterDetails,
  getAllPOSDeviceSettings,
  getAllBillingAndSubscription,
  getCityList,
  deleteCity,
  addNewCity,
  editCity,
  getStateList,
  editState,
  deleteState,
  addNewState,
  getUserProfile,
  getCountryStateCity,
  updateUserProfile,
  changeUserPassword,
  enableDisable2FA,
  getAllBillingAndSubscriptionPlan,
  getNewSubscription,
  changeSubscriptionPlan,
  activateStore,
  getAllPurchaseOrderSectionList,
  getProductsBySupplier,
  createPurchaseOrder,
  getallPurchaseOrderStatusList,
  getAllPurchaseOrderList,
  deletePurchaseOrder,
  editPurchaseOrder,
  getUserManagementEpic,
  getUserSectionListEpic,
  addUserEpic,
  addRoleEpic,
  getRolesEpic,
  getPermissionAddSectionListEpic,
  getPermissionByRoleEpic,
  createUpadteRolesPermissionEpic,
  deleteRoleEpic,
  getUserByIDEpic,
  getVoucherGroupEpic,
  addVoucherGroupEpic,
  editVoucherGroupEpic,
  deleteVoucherGroupEpic,
  getAssignGroupSectionListpic,
  assignCustomerToGroupEpic,
  getallPurchaseCreditStatusList,
  getAllPurchaseCreditList,
  getallPurchaseCreditNoteAddSectionList,
  createPurchaseCredit,
  deletePurchaseCredit,
  editPurchaseCredit,
  addPopup,
  getAllPopup,
  deletePopup,
  editPopup,
  getCustomerByVoucherGroupEpic,
  issueVoucherToGroupEpic,
  issueVoucherToCustomerEpic,
  addNewCashInCashOut,
  getAllCashInCashOut,
  editCashInCashOut,
  getAllEODSectionList,
  getAllEODByDate,
  getOrderDetailById,
  uploadMarketingMaterialEpic,
  addNewLeaveType,
  getAllLeaveType,
  editLeaveType,
  deleteLeaveType,
  getAllPayScaleLevel,
  addNewPayScaleLevel,
  editPayScaleLevel,
  deletePayScaleLevel,
  getAllPayrollSettings,
  getAllLeaveRecordStatusList,
  getAllLeaveRecordAddSectionList,
  addUpdateLeaveRecord,
  getAllLeaveRecords,
  editLeaveRecord,
  deleteLeaveRecord,
  uploadMarketingMaterialEpic,
  getEmployeeEpic,
  addEmployeeEpic,
  getEmployeeAddSectionList,
  getEditEmployeeEpic,
  deleteEmployeeEpic,
  searchUniqueCodeByPaymentMethod,
  addUpdateYear,
  getAllYear,
  editYear,
  deleteYear,
  getAllDocumentType,
  editDocumentType,
  addUpdateDocumentType,
  deleteDocumentType,
  getAllUploadDocumentAddSectionList,
  createUpdateUploadDocument,
  getAssignLeaveSectionListEpic,
  getAllEmployeeAssignedLeaveEpic,
  updateAssignLeaveEpic,
  getAllVoucherCustomer,
  getAllVoucher,
  getAllUploadedDocuments,
  editUploadedDocuments,
  deleteUploadedDocuments,
  editBanner,
  getAllGiftCardCustomer,
  getAllSubCategoryAddSectionList,
  getAllSubCategories,
  editSubCategory,
  deleteSubCategory,
  addNewSubCategory,
  resetColorSettingsEpic,
  sendOTPRegisterEpic,
  getCountriesCitiesPrefix,
  REsendOTPRegisterEpic,
  registerOnBoardUserEpic,
  deleteItemOrder,
  getOnBoardAddSectionList,
  addOrganisation,
  getAllPages,
  getPagesAddSectionList,
  editPage,
  addPage,
  deletePage,
  deleteProductImage,
  getProductImages,
  finalizeEod,
  uploadProductImages,
  changeDefaultProductImage
);
