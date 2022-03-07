import {
  ORDER_ADD_REQUEST,
  ORDER_ADD_SUCCESS,
  ORDER_ADD_FAIL,
  ORDER_ADD_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
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

export const orderDetialsReducer = (state = {loading: true, order: {cartItems:[{
  "id": 27,
  "name": "Lay's Ketchup Potato Chips 235GM",
  "quantity": 1,
  "img": "https://i5.walmartimages.ca/images/Enlarge/796/821/6000201796821.jpg",
  "price_walmart": "2.490",
  "price_sobeys": "2.270",
  "price_zehrs": "2.990",
  "cart": 28,
  "product": 131
}]}}, action) => {
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
