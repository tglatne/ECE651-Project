import axios from "axios";
import { URL } from "../constants/urlConstants";
import {
  ORDER_ADD_REQUEST,
  ORDER_ADD_SUCCESS,
  ORDER_ADD_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL


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

export const getOrderDetails = id  => async (dispatch, getState) => {
  try {
    dispatch({
        type: ORDER_DETAILS_REQUEST
    })

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.tokenn}`
        }
    }

    const { data } = await axios.get(
        `${URL}/api/orders/${id}/`,
        config
    )

    console.log(data)

    dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data
    })


} catch (error) {
    dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
    })
}
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
      dispatch({
          type: ORDER_LIST_MY_REQUEST
      })

      const {
          userLogin: { userInfo },
      } = getState()

      const config = {
          headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${userInfo.tokenn}`
          }
      }

      const { data } = await axios.get(
          `${URL}/api/orders/myorders/`,
          config
      )

      dispatch({
          type: ORDER_LIST_MY_SUCCESS,
          payload: data
      })


  } catch (error) {
      dispatch({
          type: ORDER_LIST_MY_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      })
  }
}