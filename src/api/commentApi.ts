// ==========================================
// src/api/commentApi.ts
// ==========================================
import axiosInstance from './axios';
import { Comment, CreateCommentData } from './AuthTypes';
import { User } from '../redux/types/authTypes';

export const commentApi = {
    /**
     * Get all comments for a post
     */
    getCommentsByPost: async (postId: number): Promise<Comment[]> => {
        const response = await axiosInstance.get<Comment[]>(`/posts/${postId}/comments`);
        return response.data;
    },

    /**
     * Create a comment on a post
     */
    createComment: async (postId: number, commentData: CreateCommentData): Promise<Comment> => {
        const response = await axiosInstance.post<Comment>(`/posts/${postId}/comments`, commentData);
        return response.data;
    },

    /**
     * Get a single comment by ID
     */
    getCommentById: async (commentId: number): Promise<Comment> => {
        const response = await axiosInstance.get<Comment>(`/comments/${commentId}`);
        return response.data;
    },

    /**
     * Update a comment
     */
    updateComment: async (commentId: number, commentData: { content: string }): Promise<Comment> => {
        const response = await axiosInstance.put<Comment>(`/comments/${commentId}`, commentData);
        return response.data;
    },

    /**
     * Delete a comment
     */
    deleteComment: async (commentId: number): Promise<void> => {
        const response = await axiosInstance.delete<void>(`/comments/${commentId}`);
        return response.data;
    },

    /**
     * Toggle like/unlike on a comment
     */
    toggleLike: async (commentId: number): Promise<Comment> => {
        const response = await axiosInstance.post<Comment>(`/comments/${commentId}/like`);
        return response.data;
    },

    /**
     * Get list of users who liked a comment
     */
    getCommentLikes: async (commentId: number): Promise<User[]> => {
        const response = await axiosInstance.get<User[]>(`/comments/${commentId}/likes`);
        return response.data;
    },
};

export default commentApi;