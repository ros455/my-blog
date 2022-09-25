import { createSlice } from "@reduxjs/toolkit";

export const myPostSlice = createSlice({
    name: 'counter',
    initialState: {
        items: [],
    },
    reducers: {
        addMyPosts (state, action) {
            state.items = [...action.payload];
        },
    }
})

export const {addMyPosts} = myPostSlice.actions;

export const myPostsReducerSelect = state => state.myposts.items;

export default myPostSlice.reducer;