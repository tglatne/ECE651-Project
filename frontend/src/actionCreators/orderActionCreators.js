import axios from "axios";
import { URL } from "../constants/urlConstants";
import {
  ORDER_ADD_REQUEST,
  ORDER_ADD_SUCCESS,
  ORDER_ADD_FAIL,
} from "../constants/orderConstants";

import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_ADD_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.tokenn}`,
      },
    };

    const { data } = await axios.post(`${URL}/api/orders/add/`, order, config);

    dispatch({
      type: ORDER_ADD_SUCCESS,
      payload: data,
    });

    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });

    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
