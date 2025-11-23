// ==========================================
// src/api/postApi.js
// ==========================================
import axiosInstance from './axios';

export const postApi = {
  /**
   * Get all posts with pagination
   * @param {number} page - Page number (default: 0)
   * @param {number} size - Page size (default: 10)
   * @returns {Promise} Paginated posts
   */
  getAllPosts: async (page = 0, size = 10) => {
    const response = await axiosInstance.get('/posts', {
      params: { page, size },
    });
    return response.data;
  },

  /**
   * Get a single post by ID
   * @param {number} postId - Post ID
   * @returns {Promise} Post data
   */
  getPostById: async (postId) => {
    const response = await axiosInstance.get(`/posts/${postId}`);
    return response.data;
  },

  /**
   * Create a new post
   * @param {Object} postData - Post data
   * @param {string} postData.content - Post content
   * @param {string} postData.imageUrl - Optional image URL
   * @param {boolean} postData.isPublic - Public/private flag
   * @returns {Promise} Created post
   */
  createPost: async (postData) => {
    const response = await axiosInstance.post('/posts', postData);
    return response.data;
  },

  /**
   * Update an existing post
   * @param {number} postId - Post ID
   * @param {Object} postData - Updated post data
   * @returns {Promise} Updated post
   */
  updatePost: async (postId, postData) => {
    const response = await axiosInstance.put(`/posts/${postId}`, postData);
    return response.data;
  },

  /**
   * Delete a post
   * @param {number} postId - Post ID
   * @returns {Promise} Deletion confirmation
   */
  deletePost: async (postId) => {
    const response = await axiosInstance.delete(`/posts/${postId}`);
    return response.data;
  },

  /**
   * Toggle like/unlike on a post
   * @param {number} postId - Post ID
   * @returns {Promise} Updated post with new like status
   */
  toggleLike: async (postId) => {
    const response = await axiosInstance.post(`/posts/${postId}/like`);
    return response.data;
  },

  /**
   * Get list of users who liked a post
   * @param {number} postId - Post ID
   * @returns {Promise} Array of users
   */
  getPostLikes: async (postId) => {
    const response = await axiosInstance.get(`/posts/${postId}/likes`);
    return response.data;
  },

  /**
   * Get current user's posts
   * @param {number} page - Page number (default: 0)
   * @param {number} size - Page size (default: 10)
   * @returns {Promise} Paginated user posts
   */
  getMyPosts: async (page = 0, size = 10) => {
    const response = await axiosInstance.get('/posts/my-posts', {
      params: { page, size },
    });
    return response.data;
  },
};

export default postApi;