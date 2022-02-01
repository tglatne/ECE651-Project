import axios from "axios";

import {
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM
} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product_id: data.id,
            name: data.title,
            image: data.image,
            price: data.price,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    // console.log(getState().cart.cartItems)
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}