import {
  ORDER_ADD_REQUEST,
  ORDER_ADD_SUCCESS,
  ORDER_ADD_FAIL,
  ORDER_ADD_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
} from "../constants/orderConstants";

export const orderAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ADD_REQUEST:
      return {
        loading: true,
      };

    case ORDER_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_ADD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_ADD_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDetialsReducer = (state = {loading: true, order: {cartItems:[]}}, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
      case ORDER_LIST_MY_REQUEST:
          return {
              loading: true
          }

      case ORDER_LIST_MY_SUCCESS:
          return {
              loading: false,
              orders: action.payload
          }

      case ORDER_LIST_MY_FAIL:
          return {
              loading: false,
              error: action.payload
          }

      case ORDER_LIST_MY_RESET:
          return {
              orders: []
          }

      default:
          return state
  }
}