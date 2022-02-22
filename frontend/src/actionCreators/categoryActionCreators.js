import axios from "axios";

import {
    CATEGORY_LIST_REQUEST, 
    CATEGORY_LIST_SUCCESS, 
    CATEGORY_LIST_FAIL,

    CATEGORY_DETAIL_REQUEST,
    CATEGORY_DETAIL_SUCCESS,
    CATEGORY_DETAIL_FAIL
} from "../constants/categoryConstants";

import { URL } from "../constants/urlConstants";

export const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    // const { data } = await axios.get(`https://fakestoreapi.com/products/categories`);
    const { data } = await axios.get(`${URL}/api/categories`);

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCategoryDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_DETAIL_REQUEST });
  
      // const { data } = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
      const { data } = await axios.get(`${URL}/api/categories/${id}`);
  
      dispatch({
        type: CATEGORY_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
