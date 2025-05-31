import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],

};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.items.push(action.payload);
        },
        clearCart(state) {
            state.items = [];
        },
        deleteItem(state,action) {
            const index = action.payload;
            state.items.splice(index, 1);

        }
    },
});

export const { addToCart,deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;