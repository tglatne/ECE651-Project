import { categoryDetailsReducer } from "../categoryReducers";
import * as actions from "../../constants/categoryConstants";
import { CATEGORY_DETAIL } from "../../mock/mockCategoryRes";
import expect from "expect";

describe("productList reducer", () => {
  it("should return the initial state", () => {
    expect(categoryDetailsReducer(undefined, {})).toEqual({  products: [] });
  });

  it("should handle CATEGORY_DETAIL_REQUEST", () => {
    const requestAction = {
      type: actions.CATEGORY_DETAIL_REQUEST,
    };
    expect(categoryDetailsReducer({}, requestAction)).toEqual({
      loading: true
    });
  });

  it("should handle CATEGORY_DETAIL_SUCCESS", () => {
    const successAction = {
      type: actions.CATEGORY_DETAIL_SUCCESS,
      payload: CATEGORY_DETAIL,
    };
    expect(categoryDetailsReducer({}, successAction)).toEqual({
      loading: false,
      products: CATEGORY_DETAIL,
    });
  });

  it("should handle CATEGORY_DETAIL_FAIL", () => {
    const failAction = {
      type: actions.CATEGORY_DETAIL_FAIL,
      payload: { success: false },
    };
    expect(categoryDetailsReducer({}, failAction)).toEqual({
      loading: false,
      error: { success: false },
    });
  });
});
