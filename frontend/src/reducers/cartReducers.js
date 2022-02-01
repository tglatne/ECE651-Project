import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product_id === item.product_id);
      // console.log(existItem)

      if (existItem) {
        // console.log('existItem')
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product_id === existItem.product_id ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      if (state.cartItems) {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (i) => i.product_id !== action.payload
          ),
        };
      }

    default:
      return state;
  }
};
