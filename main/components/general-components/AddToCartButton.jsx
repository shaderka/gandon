import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addToCart} from "@/app/store/slices/cartSlice";
const AddToCartButton = ({ item,text }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items)
    const handleAddToCart = () => {
        const cartItem = {
            title: item.title,
            image: item.imagesUrl[0],
            price: item.price,
            quantity: 1
        };
        dispatch(addToCart(cartItem))


        const cartData = localStorage.getItem('cart');
        const existingCart = cartData ? JSON.parse(cartData) : [];


        if (!Array.isArray(existingCart)) {
            console.error('Cart is not an array! Resetting...');
            localStorage.setItem('cart', JSON.stringify([cartItem]));
            return;
        }

        const updatedCart = [...existingCart, cartItem];
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        console.log('Updated cart:', updatedCart);
    };

    return (
        <button onClick={handleAddToCart} >
            {text}
        </button>
    );
};


export default AddToCartButton;