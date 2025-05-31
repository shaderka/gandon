import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./slices/cartSlice"
import profileSlice from "@/app/store/slices/profileSlice";
import UserInfoSlice from "./slices/userInfo"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        profile : profileSlice,
        userinfo : UserInfoSlice
    },
});