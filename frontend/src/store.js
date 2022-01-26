import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducers, productDetailsReducers} from './reducers/productReducers';
import { categoryListReducers, categoryDetailsReducers} from './reducers/categoryReducers';

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    categoryList: categoryListReducers,
    categoryDetails: categoryDetailsReducers
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store