import {
  ORDER_ADD_REQUEST,
  ORDER_ADD_SUCCESS,
  ORDER_ADD_FAIL,
  ORDER_ADD_RESET
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
