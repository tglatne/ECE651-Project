import { productDetailsReducer } from "../productReducers";
import * as actions from "../../constants/productConstants";
import { PRODUCT_DETAIL } from "../../mock/mockProductRes";
import expect from "expect";

describe("productDetail reducer", () => {
  it("should return the initial state", () => {
    expect(productDetailsReducer(undefined, {})).toEqual({ product: {} });
  });

  it("should handle PRODUCT_DETAIL_REQUEST", () => {
    const requestAction = {
      type: actions.PRODUCT_DETAIL_REQUEST,
    };
    expect(productDetailsReducer({}, requestAction)).toEqual({
        loading: true
    });
  });

  it("should handle PRODUCT_DETAIL_SUCCESS", () => {
    const successAction = {
      type: actions.PRODUCT_DETAIL_SUCCESS,
      payload: PRODUCT_DETAIL,
    };
    expect(productDetailsReducer({}, successAction)).toEqual({
      loading: false,
      product: PRODUCT_DETAIL,
    });
  });

  it("should handle PRODUCT_DETAIL_FAIL", () => {
    const failAction = {
      type: actions.PRODUCT_DETAIL_FAIL,
      payload: { success: false },
    };
    expect(productDetailsReducer({}, failAction)).toEqual({
      loading: false,
      error: { success: false },
    });
  });
});
