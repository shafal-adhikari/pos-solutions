const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "EMAIL_CONFIRMATION_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null,
      };
    case "REMOVE_MESSAGE":
      return {
        ...state,
        isLoading: false,
        error: null,
        success: null,
      };
    case "EMAIL_CONFIRMATION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    case "EMAIL_CONFIRMATION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "CHANGE_PASSWORD_REQUEST":
    case "FORGOT_PASSWORD_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };
    case "FORGOT_PASSWORD_LINK_SUCCESS":
      return {
        ...state,
        isLoading: false,
        success: payload.message,
        error: null,
      };
    case "FORGOT_PASSWORD_LINK_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "CHANGE_PASSWORD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isChangePasswordSuccess: true,
        error: null,
      };

    case "CHANGE_PASSWORD_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
        isChangePasswordSuccess: false,
      };
    default:
      return state;
  }
}
