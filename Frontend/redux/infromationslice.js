import {createSlice} from '@reduxjs/toolkit';




const initialState = {
    isAuth: false,
    user_id: null,
}


const informationslice =createSlice({
    name:"information",
    initialState,
    reducers:{
        authchange: (state, action) => {
            state.isAuth = action.payload;
        },
        userchange: (state, action) => {
            state.user_id = action.payload;
        }
    }
})

export const {authchange, userchange} = informationslice.actions;
export default informationslice.reducer;

