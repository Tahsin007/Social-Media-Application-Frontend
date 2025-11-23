// ==========================================
// src/api/commentApi.js
// ==========================================
import axiosInstance from './axios';

export const commentApi = {
  /**
   * Get all comments for a post
   * @param {number} postId - Post ID
   * @returns {Promise} Array of comments with replies
   */
  getCommentsByPost: async (postId) => {
    const response = await axiosInstance.get(`/posts/${postId}/comments`);
    return response.data;
  },

  /**
   * Create a comment on a post
   * @param {number} postId - Post ID
   * @param {Object} commentData - Comment data
   * @param {string} commentData.content - Comment content
   * @param {number} commentData.parentCommentId - Optional parent comment ID for replies
   * @returns {Promise} Created comment
   */
  createComment: async (postId, commentData) => {
    const response = await axiosInstance.post(`/posts/${postId}/comments`, commentData);
    return response.data;
  },

  /**
   * Get a single comment by ID
   * @param {number} commentId - Comment ID
   * @returns {Promise} Comment data
   */
  getCommentById: async (commentId) => {
    const response = await axiosInstance.get(`/comments/${commentId}`);
    return response.data;
  },

  /**
   * Update a comment
   * @param {number} commentId - Comment ID
   * @param {Object} commentData - Updated comment data
   * @param {string} commentData.content - Updated content
   * @returns {Promise} Updated comment
   */
  updateComment: async (commentId, commentData) => {
    const response = await axiosInstance.put(`/comments/${commentId}`, commentData);
    return response.data;
  },

  /**
   * Delete a comment
   * @param {number} commentId - Comment ID
   * @returns {Promise} Deletion confirmation
   */
  deleteComment: async (commentId) => {
    const response = await axiosInstance.delete(`/comments/${commentId}`);
    return response.data;
  },

  /**
   * Toggle like/unlike on a comment
   * @param {number} commentId - Comment ID
   * @returns {Promise} Updated comment with new like status
   */
  toggleLike: async (commentId) => {
    const response = await axiosInstance.post(`/comments/${commentId}/like`);
    return response.data;
  },

  /**
   * Get list of users who liked a comment
   * @param {number} commentId - Comment ID
   * @returns {Promise} Array of users
   */
  getCommentLikes: async (commentId) => {
    const response = await axiosInstance.get(`/comments/${commentId}/likes`);
    return response.data;
  },

  /**
   * Reply to a comment
   * @param {number} commentId - Parent comment ID
   * @param {Object} replyData - Reply data
   * @param {string} replyData.content - Reply content
   * @returns {Promise} Created reply
   */
  replyToComment: async (commentId, replyData) => {
    const response = await axiosInstance.post(`/comments/${commentId}/reply`, replyData);
    return response.data;
  },

  /**
   * Get replies to a comment
   * @param {number} commentId - Comment ID
   * @returns {Promise} Array of replies
   */
  getReplies: async (commentId) => {
    const response = await axiosInstance.get(`/comments/${commentId}/replies`);
    return response.data;
  },
};

export default commentApi;