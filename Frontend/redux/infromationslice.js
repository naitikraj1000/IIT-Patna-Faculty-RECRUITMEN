import { createSlice } from '@reduxjs/toolkit';




const initialState = {
    isAuth: false,
    user_id: null,
    saveProgress: false,
    Application1progresspercent: 0,
    Application2progresspercent: 0,
    Application3progresspercent: 0,
    Application4progresspercent: 0,
    Application5progresspercent: 0,
    Application6progresspercent: 0,
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
        Application1progresspercent: (state, action) => {
            state.Application1progresspercent = action.payload;
        },
        Application2progresspercent: (state, action) => {
            state.Application2progresspercent = action.payload;
        },
        Application3progresspercent: (state, action) => {
            state.Application3progresspercent = action.payload;
        },
        Application4progresspercent: (state, action) => {
            state.Application4progresspercent = action.payload;
        },
        Application5progresspercent: (state, action) => {
            state.Application5progresspercent = action.payload;
        },
        Application6progresspercent: (state, action) => {
            state.Application6progresspercent = action.payload;
        },
    }
})

export const { authchange, userchange, saveprogress,Application1progresspercent,Application2progresspercent,Application3progresspercent,Application4progresspercent,Application5progresspercent,Application6progresspercent } = informationslice.actions;
export default informationslice.reducer;

