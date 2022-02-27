import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actions from '../../constants/productConstants';
import { listProducts } from '../productActionCreators';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getProductList actions', () => {

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  const mockResponse = [
    { id: 1, productName: 'Bread', category: 'Bakery' },
    { id: 2, productName: 'Chicken', category: 'Meat' }
]

  it('creates PRODUCT_LIST_SUCCESS after successfuly fetching products', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockResponse
      });
    });

    const expectedActions = [
      { type: actions.PRODUCT_LIST_REQUEST },
      { type: actions.PRODUCT_LIST_SUCCESS, payload: mockResponse },
    ];

    const store = mockStore({ products: {} })

    return store.dispatch(listProducts()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});