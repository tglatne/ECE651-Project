import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actions from '../../constants/productConstants';
import { listProductDetails } from '../productActionCreators';
import { PRODUCT_DETAIL } from '../../mock/mockProductRes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getProductDetail actions', () => {

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });


  it('creates PRODUCT_DETAIL_SUCCESS after successfuly fetching product detail', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: PRODUCT_DETAIL
      });
    });

    const expectedActions = [
      { type: actions.PRODUCT_DETAIL_REQUEST },
      { type: actions.PRODUCT_DETAIL_SUCCESS, payload: PRODUCT_DETAIL },
    ];

    const store = mockStore({ products: {} })

    return store.dispatch(listProductDetails()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});