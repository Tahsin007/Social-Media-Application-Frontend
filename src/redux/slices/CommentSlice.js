// src/redux/slices/commentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { commentApi } from '../../api/commentApi';
import { toast } from 'react-toastify';

const initialState = {
  commentsByPost: {}, // { postId: [comments] }
  loading: false,
  error: null,
};

// Async thunks
export const fetchCommentsByPost = createAsyncThunk(
  'comments/fetchByPost',
  async (postId, { rejectWithValue }) => {
    try {
      console.log("postId from comment slice : ", postId);
      const comments = await commentApi.getCommentsByPost(postId);
      console.log("comments from comment slice : ", comments);
      return { postId, comments: comments };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createComment = createAsyncThunk(
  'comments/create',
  async ({ postId, commentData }, { rejectWithValue }) => {
    try {
      console.log("commentData and postId : ", postId, commentData);
      const response = await commentApi.createComment(postId, commentData);
      toast.success('Comment added successfully!');
      return { postId: postId, comment: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add comment';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateComment = createAsyncThunk(
  'comments/update',
  async ({ commentId, commentData }, { rejectWithValue }) => {
    try {
      const response = await commentApi.updateComment(commentId, commentData);
      toast.success('Comment updated successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update comment';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      await commentApi.deleteComment(commentId);
      toast.success('Comment deleted successfully!');
      return { postId, commentId };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete comment';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const toggleCommentLike = createAsyncThunk(
  'comments/toggleLike',
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      const response = await commentApi.toggleLike(commentId);
      return { postId, comment: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const replyToComment = createAsyncThunk(
  'comments/reply',
  async ({ postId, parentCommentId: commentId, replyData }, { rejectWithValue }) => {
    try {
      const response = await commentApi.replyToComment(commentId, replyData);
      toast.success('Reply added successfully!');
      return { postId, reply: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add reply';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearComments: (state, action) => {
      if (action.payload) {
        delete state.commentsByPost[action.payload];
      } else {
        state.commentsByPost = {};
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(fetchCommentsByPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, comments } = action.payload;
        state.commentsByPost[postId] = comments;
      })
      .addCase(fetchCommentsByPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, comment } = action.payload;
        if (!state.commentsByPost[postId]) {
          state.commentsByPost[postId] = [];
        }
        state.commentsByPost[postId].push(comment);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update comment
      .addCase(updateComment.fulfilled, (state, action) => {
        const updatedComment = action.payload;
        const postId = updatedComment.postId;

        if (state.commentsByPost[postId]) {
          const updateCommentInList = (comments) => {
            return comments.map(comment => {
              if (comment.id === updatedComment.id) {
                return updatedComment;
              }
              if (comment.replies && comment.replies.length > 0) {
                comment.replies = updateCommentInList(comment.replies);
              }
              return comment;
            });
          };
          state.commentsByPost[postId] = updateCommentInList(state.commentsByPost[postId]);
        }
      })
      // Delete comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;

        if (state.commentsByPost[postId]) {
          const removeCommentFromList = (comments) => {
            return comments.filter(comment => {
              if (comment.id === commentId) {
                return false;
              }
              if (comment.replies && comment.replies.length > 0) {
                comment.replies = removeCommentFromList(comment.replies);
              }
              return true;
            });
          };
          state.commentsByPost[postId] = removeCommentFromList(state.commentsByPost[postId]);
        }
      })
      // Toggle like
      .addCase(toggleCommentLike.fulfilled, (state, action) => {
        const { postId, comment: updatedComment } = action.payload;

        if (state.commentsByPost[postId]) {
          const updateCommentLike = (comments) => {
            return comments.map(comment => {
              if (comment.id === updatedComment.id) {
                return { ...comment, ...updatedComment };
              }
              if (comment.replies && comment.replies.length > 0) {
                comment.replies = updateCommentLike(comment.replies);
              }
              return comment;
            });
          };
          state.commentsByPost[postId] = updateCommentLike(state.commentsByPost[postId]);
        }
      })
      // Reply to comment
      .addCase(replyToComment.fulfilled, (state, action) => {
        const { postId, reply } = action.payload;

        if (state.commentsByPost[postId]) {
          const addReplyToComment = (comments) => {
            return comments.map(comment => {
              if (comment.id === reply.parentCommentId) {
                if (!comment.replies) {
                  comment.replies = [];
                }
                comment.replies.push(reply);
              } else if (comment.replies && comment.replies.length > 0) {
                comment.replies = addReplyToComment(comment.replies);
              }
              return comment;
            });
          };
          state.commentsByPost[postId] = addReplyToComment(state.commentsByPost[postId]);
        }
      });
  },
});

export const { clearError, clearComments } = commentSlice.actions;
export default commentSlice.reducer;