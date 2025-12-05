// src/redux/slices/commentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentState } from '../types/commentTypes';

const initialState: CommentState = {
  commentsByPost: {}, // { postId: [comments] }
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // This slice can be used for local UI state related to comments in the future,
    // for example, tracking which comment's reply box is open.
    // For now, it is empty as all server state is handled by React Query.
  },
});

export default commentSlice.reducer;