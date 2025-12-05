// ==========================================
// src/redux/slices/postSlice.ts
// ==========================================
import { createSlice } from '@reduxjs/toolkit';
import { PostState } from '../types/postTypes';

const initialState: PostState = {
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
    pagination: {
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0,
    },
    hasMore: true,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // This slice can be used for local UI state related to posts in the future.
        // For now, it is empty as all server state is handled by React Query.
    },
});

export default postSlice.reducer;