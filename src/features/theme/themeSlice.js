import { createSlice } from "@reduxjs/toolkit";

const themeState = JSON.parse(localStorage.getItem("theme"));

const themeSlice = createSlice({
    name:"theme",
    initialState:{
        themeMode:themeState||false,
    },
    reducers:{
        toggleTheme: (state) => {
            state.themeMode = !state.themeMode;
        },
    },
})
export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;