import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    userdata : null
}
const UserInfoSlice = createSlice(
    {
        name : "userinfo",
        initialState,
        reducers : {
            setUser(state,action) {
                state.userdata = action.payload
            }
        }
    }
)
export const {setUser} = UserInfoSlice.actions;
export default UserInfoSlice.reducer