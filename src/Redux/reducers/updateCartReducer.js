import { setLocalStorage, getLocalStorage } from "../../helpers/frontendHelper";

import { openNotificationWithIcon } from "../../components/Notification/Notification.tsx";

const initialState = {
  updateCartProducts: [],
  updateCartSetMenu: [],
};

export default function (state = initialState, action) {
  const { type, payload, notification } = action;
  let cartData = [...state.updateCartProducts];
  let updateCartSetMenu = [...state.updateCartSetMenu];
  switch (type) {
    case "SET_ITEM_CART_UPDATE":
      cartData = cartData.filter((product) => {
        return product.ProductVariationId !== payload.ProductVariationId;
      });
      cartData.push(payload);
      if (notification !== "off") {
        openNotificationWithIcon("success", "Added to Cart Successfully");
      }
      return {
        ...state,
        updateCartProducts: cartData,
      };
    case "ADD_SET_MENU_CART_UPDATE":
      updateCartSetMenu = updateCartSetMenu.filter((setMenu) => {
        return setMenu.SetMenuId !== payload.SetMenuId;
      });
      updateCartSetMenu.push(payload);
      // openNotificationWithIcon("success", "Added to Cart Successfully");
      return {
        ...state,
        updateCartSetMenu: updateCartSetMenu,
      };
    case "REMOVE_SET_MENU_CART_UPDATE":
      const newSetMenu = [...updateCartSetMenu];
      const indexSetMenu = newSetMenu.indexOf(payload.product);
      newSetMenu[indexSetMenu].isCancelled = true;
      return {
        ...state,
        updateCartSetMenu: newSetMenu,
        deleteSuccess: true,
      };
    case "ADD_QUANTITY_SET_MENU_UPDATE":
      if (
        state.updateCartSetMenu[state.updateCartSetMenu.indexOf(payload)]
          .SetMenuQuantity < payload.StockCount ||
        payload.StockCount == null
      ) {
        updateCartSetMenu[updateCartSetMenu.indexOf(payload)].SetMenuQuantity =
          state.updateCartSetMenu[state.updateCartSetMenu.indexOf(payload)]
            .SetMenuQuantity + 1;
        updateCartSetMenu[
          updateCartSetMenu.indexOf(payload)
        ].TotalSetMenuPrice =
          updateCartSetMenu[updateCartSetMenu.indexOf(payload)]
            .SetMenuQuantity *
          updateCartSetMenu[updateCartSetMenu.indexOf(payload)].SetMenuPrice;
      }
      return {
        ...state,
        updateCartProducts: cartData,
      };
    case "SUBTRACT_QUANTITY_SET_MENU_UPDATE":
      if (
        updateCartSetMenu[updateCartSetMenu.indexOf(payload)].SetMenuQuantity >
        1
      ) {
        updateCartSetMenu[updateCartSetMenu.indexOf(payload)].SetMenuQuantity =
          state.updateCartSetMenu[state.updateCartSetMenu.indexOf(payload)]
            .SetMenuQuantity - 1;
        updateCartSetMenu[
          updateCartSetMenu.indexOf(payload)
        ].TotalSetMenuPrice =
          updateCartSetMenu[updateCartSetMenu.indexOf(payload)]
            .SetMenuQuantity *
          updateCartSetMenu[updateCartSetMenu.indexOf(payload)].SetMenuPrice;
      }
      return {
        ...state,
        updateCartProducts: cartData,
      };
    case "REMOVE_ITEM_CART_UPDATE":
      const newData = [...cartData];
      const index = newData.indexOf(payload.product);
      newData[index].isCancelled = true;
      return {
        ...state,
        updateCartProducts: newData,
        deleteSuccess: true,
      };
    case "ADD_QUANTITY_ITEM_UPDATE":
      if (
        state.updateCartProducts[state.updateCartProducts.indexOf(payload)]
          .Quantity < payload.StockCount ||
        payload.StockCount == null
      ) {
        cartData[cartData.indexOf(payload)].Quantity =
          state.updateCartProducts[state.updateCartProducts.indexOf(payload)]
            .Quantity + 1;
        cartData[cartData.indexOf(payload)].Total =
          cartData[cartData.indexOf(payload)].Quantity *
          cartData[cartData.indexOf(payload)].ProductPrice;
      }
      return {
        ...state,
        updateCartProducts: cartData,
      };
    case "SUBTRACT_QUANTITY_ITEM_UPDATE":
      if (cartData[cartData.indexOf(payload)].Quantity > 1) {
        cartData[cartData.indexOf(payload)].Quantity =
          state.updateCartProducts[state.updateCartProducts.indexOf(payload)]
            .Quantity - 1;
        cartData[cartData.indexOf(payload)].Total =
          cartData[cartData.indexOf(payload)].Quantity *
          cartData[cartData.indexOf(payload)].ProductPrice;
      }
      return {
        ...state,
        updateCartProducts: cartData,
      };
    case "CLEAR_CART_UPDATE":
      return {
        ...state,
        updateCartProducts: [],
        updateCartSetMenu: [],
      };
    default:
      return state;
  }
}
