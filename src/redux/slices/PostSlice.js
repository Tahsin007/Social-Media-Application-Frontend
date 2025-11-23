// ==========================================
// src/redux/slices/postSlice.js
// ==========================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from '../../api/postApi';
import { toast } from 'react-toastify';

const initialState = {
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

// Async thunks
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const response = await postApi.getAllPosts(page, size);
      return response;
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await postApi.getPostById(postId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await postApi.createPost(postData);
      toast.success('Post created successfully!');
      return response.data;
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message || 'Failed to create post';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const response = await postApi.updatePost(postId, postData);
      toast.success('Post updated successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update post';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      await postApi.deletePost(postId);
      toast.success('Post deleted successfully!');
      return postId;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete post';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const togglePostLike = createAsyncThunk(
  'posts/toggleLike',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await postApi.toggleLike(postId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchPostLikes = createAsyncThunk(
  'posts/fetchLikes',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await postApi.getPostLikes(postId);
      return { postId, likes: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    resetPosts: (state) => {
      state.posts = [];
      state.pagination.page = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        const { content, pageable, totalPages, totalElements, last } = action.payload;

        // If first page, replace; otherwise append
        if (pageable.pageNumber === 0) {
          state.posts = content;
        } else {
          state.posts = [...state.posts, ...content];
        }

        state.pagination = {
          page: pageable.pageNumber,
          size: pageable.pageSize,
          totalPages,
          totalElements,
        };
        state.hasMore = !last;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch post by ID
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload); // Add to beginning
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (state.currentPost?.id === action.payload.id) {
          state.currentPost = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle like
      .addCase(togglePostLike.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (state.currentPost?.id === action.payload.id) {
          state.currentPost = action.payload;
        }
      })
      // Fetch likes
      .addCase(fetchPostLikes.fulfilled, (state, action) => {
        const { postId, likes } = action.payload;
        const index = state.posts.findIndex(post => post.id === postId);
        if (index !== -1) {
          state.posts[index].likedBy = likes;
        }
      });
  },
});

export const { clearError, clearCurrentPost, resetPosts } = postSlice.actions;
export default postSlice.reducer;