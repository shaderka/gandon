import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    choice : ""
}
const profileSlice = createSlice(
    {
        name : "profile",
        initialState,
        reducers : {
            setChoice(state,action) {
                state.choice = action.payload
            }
        }
    }
)
export const { setChoice } = profileSlice.actions;
export default profileSlice.reducer;