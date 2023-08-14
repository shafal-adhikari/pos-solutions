import { setLocalStorage, getLocalStorage } from "../../helpers/frontendHelper";

import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";

const initialState = {
  cartProducts:
    getLocalStorage("cartData") || getLocalStorage("cartData") !== undefined
      ? getLocalStorage("cartData")
      : [],
  cartSetMenu:
    getLocalStorage("cartSetMenu") ||
    getLocalStorage("cartSetMenu") !== undefined
      ? getLocalStorage("cartSetMenu")
      : [],
};

export default function (state = initialState, action) {
  const { type, payload, notification } = action;
  let cartData = [...state.cartProducts];
  let cartSetMenu = [...state.cartSetMenu];
  switch (type) {
    case "SET_ITEM_CART":
      cartData = cartData.filter((product) => {
        return product.ProductVariationId !== payload.ProductVariationId;
      });
      cartData.push(payload);
      setLocalStorage("cartData", cartData);
      if (notification !== "off") {
        openNotificationWithIcon("success", "Added to Cart Successfully");
      }
      return {
        ...state,
        cartProducts: cartData,
      };
    case "ADD_SET_MENU_CART":
      cartSetMenu = cartSetMenu.filter((setMenu) => {
        return setMenu.SetMenuId !== payload.SetMenuId;
      });
      cartSetMenu.push(payload);
      setLocalStorage("cartSetMenu", cartSetMenu);
      openNotificationWithIcon("success", "Added to Cart Successfully");
      return {
        ...state,
        cartSetMenu: cartSetMenu,
      };
    case "REMOVE_SET_MENU_CART":
      const newSetMenu = cartSetMenu.filter(
        (setMenu) => setMenu.SetMenuId != payload.SetMenuId
      );
      setLocalStorage("cartSetMenu", newSetMenu);
      return {
        ...state,
        cartSetMenu: newSetMenu,
      };
    case "ADD_QUANTITY_SET_MENU":
      if (
        state.cartSetMenu[state.cartSetMenu.indexOf(payload)].SetMenuQuantity <
          payload.StockCount ||
        payload.StockCount == null
      ) {
        cartSetMenu[cartSetMenu.indexOf(payload)].SetMenuQuantity =
          state.cartSetMenu[state.cartSetMenu.indexOf(payload)]
            .SetMenuQuantity + 1;
        cartSetMenu[cartSetMenu.indexOf(payload)].TotalSetMenuPrice =
          cartSetMenu[cartSetMenu.indexOf(payload)].SetMenuQuantity *
          cartSetMenu[cartSetMenu.indexOf(payload)].SetMenuPrice;
      }
      setLocalStorage("cartSetMenu", cartSetMenu);
      return {
        ...state,
        cartProducts: cartData,
      };
    case "SUBTRACT_QUANTITY_SET_MENU":
      if (cartSetMenu[cartSetMenu.indexOf(payload)].SetMenuQuantity > 1) {
        cartSetMenu[cartSetMenu.indexOf(payload)].SetMenuQuantity =
          state.cartSetMenu[state.cartSetMenu.indexOf(payload)]
            .SetMenuQuantity - 1;
        cartSetMenu[cartSetMenu.indexOf(payload)].TotalSetMenuPrice =
          cartSetMenu[cartSetMenu.indexOf(payload)].SetMenuQuantity *
          cartSetMenu[cartSetMenu.indexOf(payload)].SetMenuPrice;
      }
      setLocalStorage("cartData", cartData);
      return {
        ...state,
        cartProducts: cartData,
      };
    case "REMOVE_ITEM_CART":
      const newData = cartData.filter(
        (cartItem) => cartItem.ProductVariationId != payload.ProductVariationId
      );
      setLocalStorage("cartData", newData);
      return {
        ...state,
        cartProducts: newData,
      };
    case "ADD_QUANTITY_ITEM":
      if (
        state.cartProducts[state.cartProducts.indexOf(payload)].Quantity <
          payload.StockCount ||
        payload.StockCount == null
      ) {
        cartData[cartData.indexOf(payload)].Quantity =
          state.cartProducts[state.cartProducts.indexOf(payload)].Quantity + 1;
        cartData[cartData.indexOf(payload)].Total =
          cartData[cartData.indexOf(payload)].Quantity *
          cartData[cartData.indexOf(payload)].ProductPrice;
      }
      setLocalStorage("cartData", cartData);
      return {
        ...state,
        cartProducts: cartData,
      };
    case "SUBTRACT_QUANTITY_ITEM":
      if (cartData[cartData.indexOf(payload)].Quantity > 1) {
        cartData[cartData.indexOf(payload)].Quantity =
          state.cartProducts[state.cartProducts.indexOf(payload)].Quantity - 1;
        cartData[cartData.indexOf(payload)].Total =
          cartData[cartData.indexOf(payload)].Quantity *
          cartData[cartData.indexOf(payload)].ProductPrice;
      }
      setLocalStorage("cartData", cartData);
      return {
        ...state,
        cartProducts: cartData,
      };
    case "CLEAR_CART":
      localStorage.removeItem("cartData");
      localStorage.removeItem("cartSetMenu");
      return {
        ...state,
        cartProducts: [],
        cartSetMenu: [],
      };
    default:
      return state;
  }
}
