import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";
const initialState = {
  allLoading: false,
  isLoading: false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_SUBSCRIPTION_PLAN_REQUEST":
      return {
        ...state,
        allLoading: true,
      };
    case "GET_ALL_SUBSCRIPTION_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ALL_SUBSCRIPTION_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allCards: payload.cardDetailsViewModels,
        subscriptionPlan: payload.subscriptionPlanDetails,
        isTrialExpired: payload.isTrialExpired,
      };
    case "GET_ALL_SUBSCRIPTION_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case "GET_ALL_SUBSCRIPTION_PLAN_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allSubscriptionPlan: payload,
      };
    case "GET_ALL_SUBSCRIPTION_PLAN_FAILURE":
      return {
        ...state,
        allLoading: false,
        error: payload,
      };
    case "NEW_SUBSCRIPTION_REQUEST":
      return {
        ...state,
        newSubscriptionLoading: true,
      };
    case "NEW_SUBSCRIPTION_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        newSubscriptionLoading: false,
        subscriptionSuccess: payload,
      };
    case "NEW_SUBSCRIPTION_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        newSubscriptionLoading: false,
        error: payload,
      };
    case "CHANGE_SUBSCRIPTION_PLAN_REQUEST":
      return {
        ...state,
        changeSubscriptionLoading: true,
      };
    case "CHANGE_SUBSCRIPTION_PLAN_SUCCESS":
      openNotificationWithIcon("success", payload.message[0].message);
      return {
        ...state,
        changeSubscriptionLoading: false,
        subscriptionSuccess: payload,
      };
    case "CHANGE_SUBSCRIPTION_PLAN_FAILURE":
      openNotificationWithIcon("error", payload);
      return {
        ...state,
        changeSubscriptionLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
