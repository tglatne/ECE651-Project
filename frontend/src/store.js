import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';
import {
  categoryListReducer,
  categoryDetailsReducer,
} from './reducers/categoryReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

let cartItemsFromStorage = [];
if (localStorage.getItem('cartItems') !== undefined) {
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
