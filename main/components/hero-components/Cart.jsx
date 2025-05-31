import React from 'react';
import "../../app/styles/hero-page/cart.scss"
import {useSelector,useDispatch} from "react-redux";
import {deleteItem} from "@/app/store/slices/cartSlice";

const Cart = ({ isShown }) => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch()
    console.log(cartItems.map(item => item.spuId));
    const handleDelete = (index) => {
        console.log('Deleting id:', index);
        dispatch(deleteItem(index))

    }

    return (
        <div className={`cart-container ${isShown ? 'activatedd' : ''}`}>
            <div className="cartHeader">Ваша корзина</div>

            {cartItems.length === 0 ? (
                <div className="emptyText">Корзина пуста</div>
            ) : (
                cartItems.map((item,index) => (

                    <div className="cartItem" key={index}>
                        <img src={item.image} alt={item.title} />
                        <div className="info">
                            <div className="name">{item.title}</div>
                            <div className="desc">{item.title}</div>
                            <div className="price">100 ₽</div>
                            <button onClick={() => handleDelete(index)} className="del-btn">

                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="18" y1="6" x2="6" y2="18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                                    <line x1="6" y1="6" x2="18" y2="18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                                </svg>

                            </button>
                        </div>

                    </div>

                ))
            )}
            {cartItems.length === 0 ? null : <div className="amount">
                Итого: {cartItems.length * 100} рубасов епта подолу на соматропинчик
                <button className="purchase-btner">de_dust2</button>
            </div>

            }

        </div>
    );
};

export default Cart;