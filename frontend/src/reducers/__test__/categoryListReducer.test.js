import { categoryListReducer } from "../categoryReducers";
import * as actions from "../../constants/categoryConstants";
import { CATEGORY_LIST } from "../../mock/mockCategoryRes";
import expect from "expect";

describe("productList reducer", () => {
  it("should return the initial state", () => {
    expect(categoryListReducer(undefined, {})).toEqual({ categories: [] });
  });

  it("should handle CATEGORY_LIST_REQUEST", () => {
    const requestAction = {
      type: actions.CATEGORY_LIST_REQUEST,
    };
    expect(categoryListReducer({}, requestAction)).toEqual({
      loading: true,
      categories: [],
    });
  });

  it("should handle CATEGORY_LIST_SUCCESS", () => {
    const successAction = {
      type: actions.CATEGORY_LIST_SUCCESS,
      payload: CATEGORY_LIST,
    };
    expect(categoryListReducer({}, successAction)).toEqual({
      loading: false,
      categories: CATEGORY_LIST,
    });
  });

  it("should handle CATEGORY_LIST_FAIL", () => {
    const failAction = {
      type: actions.CATEGORY_LIST_FAIL,
      payload: { success: false },
    };
    expect(categoryListReducer({}, failAction)).toEqual({
      loading: false,
      error: { success: false },
    });
  });
});
