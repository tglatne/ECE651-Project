import axios from "axios";

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

import { URL } from "../constants/urlConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  // const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
  const { data } = await axios.get(`${URL}/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product_id: data.id,
      name: data.product_name,
      image: data.image,
      price_walmart: data.price_walmart,
      price_sobeys: data.price_sobeys,
      price_zehrs: data.price_zehrs,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  // console.log(getState().cart.cartItems)
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
