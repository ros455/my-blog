import { configureStore } from "@reduxjs/toolkit";
import {postsReducer} from './posts'
import { authReducer } from "./auth";
import  myPostsReducer  from "./myPosts";

export default configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        myposts: myPostsReducer,
    }
})