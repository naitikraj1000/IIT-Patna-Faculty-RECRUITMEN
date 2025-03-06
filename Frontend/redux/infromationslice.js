import { createSlice } from '@reduxjs/toolkit';




const initialState = {
    isAuth: false,
    user_id: null,
    saveProgress: false,
}


const informationslice = createSlice({
    name: "information",
    initialState,
    reducers: {
        authchange: (state, action) => {
            state.isAuth = action.payload;
        },
        userchange: (state, action) => {
            state.user_id = action.payload;
        },
        saveprogress: (state,action) => {
            state.saveProgress = !state.saveProgress; 
        },


    }
})

export const { authchange, userchange, saveprogress } = informationslice.actions;
export default informationslice.reducer;

