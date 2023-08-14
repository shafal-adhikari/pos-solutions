import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
import { triggerBase64Download } from "common-base64-downloader-react";
const initialState = {
  isLoading: false,
  error: null,
  categoryLoading: false,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_PRODUCT_ADD_SECTION_REQUEST":
      return {
        ...state,
        isLoading: true,
        addOnsData: null,
      };
    case "GET_PRODUCT_ADD_SECTION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        addSuccess: false,
        productAddSection: payload,
      };
    case "GET_ALL_PRODUCTS_REQUEST":
      return {
        ...state,
        isLoading: true,
        addSuccess: false,
      };
    case "GET_ALL_PRODUCTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allProducts: payload.data,
        totalProducts: payload.total,
      };
    case "GET_ALL_PRODUCTS_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_PRODUCT_ADD_SECTION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_PRODUCT_SEARCH_SECTION_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_PRODUCT_SEARCH_SECTION_SUCCESS":
      return {
        ...state,
        productSearchSection: payload,
      };
    case "GET_PRODUCT_SEARCH_SECTION_FAILURE":
      return {
        ...state,

        error: payload,
      };
    case "GET_PRODUCT_ADDONS_REQUEST":
      return {
        ...state,
        addOnsLoading: true,
      };
    case "GET_PRODUCT_ADDONS_SUCCESS":
      return {
        ...state,
        addOnsLoading: false,
        addOnsData: payload,
      };
    case "GET_PRODUCT_ADDONS_FAILURE":
      console.log(payload, "error");
      return {
        ...state,
        addOnsLoading: false,
        error: payload.message,
      };
    case "ADD_PRODUCT_WITH_NEW_REQUEST":
      return {
        ...state,
        addAndNewLoading: true,
      };
    case "ADD_PRODUCT_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "ADD_PRODUCT_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        addAndNewLoading: false,
        addSuccess: payload,
      };
    case "ADD_PRODUCT_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addAndNewLoading: false,
        addLoading: false,
        error: payload,
      };
    case "ADD_SET_MENU_REQUEST":
      return {
        ...state,
        addLoading: true,
      };
    case "ADD_SET_MENU_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addLoading: false,
        addSuccess: payload,
      };
    case "ADD_SET_MENU_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addLoading: false,
        error: payload,
      };
    case "DELETE_PRODUCT_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "DELETE_PRODUCT_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        isLoading: false,
        deactivateSuccess: payload,
      };
    case "DELETE_PRODUCT_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "EDIT_PRODUCT_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "EDIT_PRODUCT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        editData: payload,
      };
    case "EDIT_PRODUCT_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "EDIT_PRODUCT_PRICE_REQUEST":
      return {
        ...state,
        editLoading: true,
      };
    case "UPDATE_PRODUCT_PRICE_REQUEST":
      return {
        ...state,
        updatePriceLoading: true,
      };
    case "UPDATE_PRODUCT_PRICE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        updatePriceLoading: false,
        updateSuccess: payload,
      };
    case "UPDATE_PRODUCT_PRICE_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        updatePriceLoading: false,
      };
    case "DELETE_PRODUCT_VARIATION_REQUEST":
      return {
        ...state,
        productVariationDeleteLoading: true,
      };
    case "DELETE_PRODUCT_VARIATION_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        productVariationDeleteLoading: false,
        deleteVariationSuccess: true,
      };
    case "DELETE_PRODUCT_VARIATION_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        productVariationDeleteLoading: false,
      };
    case "EDIT_PRODUCT_PRICE_SUCCESS":
      return {
        ...state,
        editLoading: false,
        editPriceData: payload,
      };
    case "EDIT_PRODUCT_PRICE_FAILURE":
      return {
        ...state,
        editLoading: false,
        error: payload,
      };
    case "EDIT_SETMENU_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "EDIT_SETMENU_SUCCESS":
      return {
        ...state,
        isLoading: false,
        editData: payload,
      };
    case "EDIT_SETMENU_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "EXPORT_PRODUCT_PDF_REQUEST":
      return {
        ...state,
        exportPdfLoading: true,
      };
    case "EXPORT_PRODUCT_EXCEL_REQUEST":
      return {
        ...state,
        exportExcelLoading: true,
      };
    case "EXPORT_PRODUCT_SUCCESS":
      let type = payload.type;
      if (type == "xlsx") {
        type = "vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      }
      triggerBase64Download(
        `data:application/${type};base64,` + payload.fileContents,
        payload.fileDownloadName.split(".")[0]
      );
      return {
        ...state,
        exportExcelLoading: false,
        exportPdfLoading: false,
        exportData: payload,
      };
    case "EXPORT_PRODUCT_FAILURE":
      return {
        ...state,
        exportExcelLoading: false,
        exportPdfLoading: false,
        error: payload,
      };
    case "GET_ALL_SET_MENU_REQUEST":
      return {
        ...state,
        isLoading: true,
        addSuccess: false,
      };
    case "GET_ALL_SET_MENU_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allSetMenus: payload.data,
        totalSetMenus: payload.total,
      };
    case "GET_ALL_SET_MENU_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_SET_MENU_ADD_SECTION_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_SET_MENU_ADD_SECTION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        setMenuAddSection: payload,
      };
    case "GET_SET_MENU_ADD_SECTION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "DELETE_SETMENU_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "DELETE_SETMENU_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        isLoading: false,
        deleteSuccess: payload,
      };
    case "DELETE_SETMENU_FAILURE":
      openNotificationWithIcon("error", payload);

      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_ALL_PRODUCTS_BY_CATEGORY_REQUEST":
      return {
        ...state,
        categoryLoading: true,
      };
    case "GET_ALL_PRODUCTS_BY_CATEGORY_SUCCESS":
      return {
        ...state,
        categoryLoading: false,
        productsByCategories: payload,
      };
    case "GET_ALL_PRODUCTS_BY_CATEGORY_FAILURE":
      return {
        ...state,
        categoryLoading: false,
        error: payload,
      };
    case "GET_ALL_PRODUCT_IMAGE_REQUEST":
      return {
        ...state,
        imagesLoading: true,
      };
    case "GET_ALL_PRODUCT_IMAGE_SUCCESS":
      return {
        ...state,
        imagesLoading: false,
        allImages: payload,
      };
    case "GET_ALL_PRODUCT_IMAGE_FAILURE":
      return {
        ...state,
        imagesLoading: false,
        error: payload,
      };
    case "UPLOAD_PRODUCT_IMAGES_REQUEST":
      return {
        ...state,
        uploadLoading: true,
      };
    case "UPLOAD_PRODUCT_IMAGES_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);

      return {
        ...state,
        uploadLoading: false,
        uploadSuccess: payload,
      };
    case "UPLOAD_PRODUCT_IMAGES_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        uploadLoading: false,
        error: payload,
      };
    case "DELETE_PRODUCT_IMAGE_REQUEST":
      return {
        ...state,
        deleteImageLoading: true,
      };
    case "DELETE_PRODUCT_IMAGE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        deleteImageLoading: false,
        deleteImageSuccess: payload,
      };
    case "DELETE_PRODUCT_IMAGE_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        deleteImageLoading: false,
        error: payload,
      };
    case "CHANGE_DEFAULT_PRODUCT_IMAGE_REQUEST":
      return {
        ...state,
        changeLoading: true,
      };
    case "CHANGE_DEFAULT_PRODUCT_IMAGE_SUCCESS":
      return {
        ...state,
        changeLoading: false,
        changeSuccess: payload,
      };
    case "CHANGE_DEFAULT_PRODUCT_IMAGE_FAILURE":
      return {
        ...state,
        changeLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
