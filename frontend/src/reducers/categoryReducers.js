import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_DETAIL_FAIL,
} from "../constants/categoryConstants";

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryDetailsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case CATEGORY_DETAIL_REQUEST:
      return { loading: true };
    case CATEGORY_DETAIL_SUCCESS:
      return { loading: false, products: action.payload };
    case CATEGORY_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
