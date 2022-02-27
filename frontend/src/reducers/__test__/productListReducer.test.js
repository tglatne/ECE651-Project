import { productListReducer } from "../productReducers";
import * as actions from "../../constants/productConstants";
import { PRODUCT_LIST } from "../../mock/mockProductRes";
import expect from "expect";

describe("productList reducer", () => {
  it("should return the initial state", () => {
    expect(productListReducer(undefined, {})).toEqual({ products: [] });
  });

  it("should handle PRODUCT_LIST_REQUEST", () => {
    const requestAction = {
      type: actions.PRODUCT_LIST_REQUEST,
    };
    expect(productListReducer({}, requestAction)).toEqual({
      loading: true,
      products: [],
    });
  });

  it("should handle PRODUCT_LIST_SUCCESS", () => {
    const successAction = {
      type: actions.PRODUCT_LIST_SUCCESS,
      payload: PRODUCT_LIST,
    };
    expect(productListReducer({}, successAction)).toEqual({
      loading: false,
      products: PRODUCT_LIST,
    });
  });

  it("should handle PRODUCT_LIST_FAIL", () => {
    const failAction = {
      type: actions.PRODUCT_LIST_FAIL,
      payload: { success: false },
    };
    expect(productListReducer({}, failAction)).toEqual({
      loading: false,
      error: { success: false },
    });
  });
});
