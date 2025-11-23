// ==========================================
// src/redux/store.js
// ==========================================
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import postReducer from './slices/PostSlice';
import commentReducer from './slices/CommentSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
        comments: commentReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;