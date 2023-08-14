import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  isLoading: false,
  error: null,
  isOperatioSuccessful: false,
  rolesList: {},
  addRoleLoading: false,
  permissionAddSectionList: {},
  selectedRolesPermission: [],
  updateRolesPermisssionLoading: false,
  activeUser: {},
  usersList: {},
  userAddSectionList: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_USER_BY_ID_REQUEST":
      return {
        ...state,
        isLoading: true,
        isOperatioSuccessful: false,
      };
    case "GET_USER_BY_ID_SUCCESS":
      return {
        ...state,
        isLoading: false,
        activeUser: payload,
      };
    case "GET_USER_BY_ID_FAILURE":
      return {
        ...state,
        isLoading: false,
      };
    case "GET_PERMISSION_ADD_SECTION_LIST_REQUEST":
      return {
        ...state,
        isLoading: true,
        isOperatioSuccessful: false,
      };
    case "GET_PERMISSION_ADD_SECTION_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        permissionAddSectionList: payload,
      };
    case "GET_PERMISSION_ADD_SECTION_LIST_FAILURE":
      return {
        ...state,
        isLoading: false,
      };
    case "GET_ROLES_REQUEST":
      return {
        ...state,
        isLoading: true,
        isOperatioSuccessful: false,
      };
    case "GET_ROLES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        rolesList: payload,
      };
    case "GET_ROLES_FAILURE":
      return {
        ...state,
        isLoading: false,
      };
    case "GET_PERMISSION_BY_ROLE_REQUEST":
      return {
        ...state,

        isOperatioSuccessful: false,
      };
    case "GET_PERMISSION_BY_ROLE_SUCCESS":
      return {
        ...state,

        selectedRolesPermission: payload,
      };
    case "GET_PERMISSION_BY_ROLE_FAILURE":
      return {
        ...state,
      };
    case "ADD_ROLE_REQUEST":
      return {
        ...state,
        addRoleLoading: true,
        isOperatioSuccessful: false,
      };
    case "ADD_ROLE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        addRoleLoading: false,
        isOperatioSuccessful: true,
      };
    case "ADD_ROLE_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        addRoleLoading: false,
        error: payload,
        isOperatioSuccessful: false,
      };
    case "DELETE_ROLE_REQUEST":
      return {
        ...state,

        isOperatioSuccessful: false,
      };
    case "DELETE_ROLE_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,

        isOperatioSuccessful: true,
      };
    case "DELETE_ROLE_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        error: payload,
        isOperatioSuccessful: false,
      };
    case "UPDATE_PERMISSION_REQUEST":
      return {
        ...state,
        updateRolesPermisssionLoading: true,
        isOperatioSuccessful: false,
      };
    case "UPDATE_PERMISSION_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        updateRolesPermisssionLoading: false,
        isOperatioSuccessful: true,
      };
    case "UPDATE_PERMISSION_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        updateRolesPermisssionLoading: false,
        error: payload,
        isOperatioSuccessful: false,
      };
    case "GET_USERMANAGEMENT_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_USERMANAGEMENT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        usersList: payload,
      };
    case "GET_USERMANAGEMENT_FAILURE":
      return {
        ...state,
        isLoading: false,
      };
    case "GET_ADD_USER_SECTION_LIST_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ADD_USER_SECTION_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        userAddSectionList: payload,
      };
    case "GET_ADD_USER_SECTION_LIST_FAILURE":
      return {
        ...state,
        isLoading: false,
      };
    case "ADD_USER_REQUEST":
      return {
        ...state,
        isLoading: true,
        isOperatioSuccessful: false,
      };
    case "ADD_USER_SUCCESS":
      openNotificationWithIcon("success", "User Added Successfully !");

      return {
        ...state,
        isLoading: false,
        isOperatioSuccessful: true,
      };
    case "ADD_USER_FAILURE":
      openNotificationWithIcon("error", payload);

      return {
        ...state,
        isLoading: false,
        error: payload,
        isOperatioSuccessful: false,
      };
    default:
      return state;
  }
}
