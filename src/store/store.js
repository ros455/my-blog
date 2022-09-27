import { configureStore } from "@reduxjs/toolkit";
import {postsReducer} from './posts'
import { authReducer } from "./auth";
import  myPostsReducer  from "./myPosts";
import urlAddress from './urlAddres'

export default configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        myposts: myPostsReducer,
        url: urlAddress
    }
})