import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  productAddReducer,
  productEditReducer,
  productDeleteReducer,
} from './reducers/productReducers';
import {
  categoryListReducer,
  categoryDetailsReducer,
} from './reducers/categoryReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { orderAddReducer, orderDetialsReducer, orderListMyReducer} from './reducers/orderReducers';
// import { pageReducer } from './reducers/pageReducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productAdd: productAddReducer,
  productEdit: productEditReducer,
  productDelete: productDeleteReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  orderAdd: orderAddReducer,
  orderDetails: orderDetialsReducer,
  orderListMy: orderListMyReducer
  // page: pageReducer
});

let cartItemsFromStorage = [];
if (localStorage.getItem('cartItems') !== null) {
  cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems'));
}

let userInfoFromStorage = null;
if (localStorage.getItem('userInfo') !== undefined) {
  userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'));
}

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
