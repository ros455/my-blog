import { createSlice } from "@reduxjs/toolkit";

export const urlAddress = createSlice({
    name: 'url',
    initialState: {
        url: process.env.REACT_APP_URL
    },
})

export const defaultUrl = state => state.url.url;

export default urlAddress.reducer;