import { createSlice } from "@reduxjs/toolkit";

export const urlAddress = createSlice({
    name: 'url',
    initialState: {
        url: 'http://localhost:5555/'
    },
})

export const defaultUrl = state => state.url.url;

export default urlAddress.reducer;