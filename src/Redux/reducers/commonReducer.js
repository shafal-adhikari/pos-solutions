const initialState = {
  isLoading: false,
  error: null,
  success: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SEARCH_UNIQUE_CODE_REQUEST":
      return {
        ...state,
        searchUniqueLoading: true,
      };
    case "SEARCH_UNIQUE_CODE_SUCCESS":
      return {
        ...state,
        searchUniqueLoading: false,
        uniqueCodeData: payload,
        uniqueCodeError: null,
      };
    case "SEARCH_UNIQUE_CODE_FAILURE":
      return {
        ...state,
        uniqueCodeError: payload,
        uniqueCodeData: null,
        searchUniqueLoading: false,
      };
    case "GET_COUNTRY_STATE_REQUEST":
    case "GET_COUNTRY_PREFIX_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
        data: null,
      };
    case "GET_COUNTRY_STATE_SUCCESS":
    case "GET_COUNTRY_PREFIX_SUCCESS":
      return {
        ...state,
        isLoading: false,
        countryList: payload,
      };

    case "GET_COUNTRY_STATE_FAILURE":
    case "GET_COUNTRY_PREFIX_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_RELEASE_VERSION_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_RELEASE_VERSION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        releaseVersion: payload.releaseVersion,
      };
    case "GET_RELEASE_VERSION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
