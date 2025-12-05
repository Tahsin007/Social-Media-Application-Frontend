// ==========================================
// src/api/postApi.ts
// ==========================================
import axiosInstance from './axios';
import { Post, PaginatedResponse, CreatePostData, UpdatePostData } from './AuthTypes';
import { User } from '../redux/types/authTypes';

export const postApi = {
    /**
     * Get all posts with pagination
     */
    getAllPosts: async (page = 0, size = 10): Promise<PaginatedResponse<Post>> => {
        const response = await axiosInstance.get<PaginatedResponse<Post>>('/posts', {
            params: { page, size },
        });
        return response.data;
    },

    /**
     * Get a single post by ID
     */
    getPostById: async (postId: number): Promise<Post> => {
        const response = await axiosInstance.get<Post>(`/posts/${postId}`);
        return response.data;
    },

    /**
     * Create a new post
     */
    createPost: async (postData: CreatePostData): Promise<Post> => {
        const response = await axiosInstance.post<Post>('/posts', postData);
        return response.data;
    },

    /**
     * Update an existing post
     */
    updatePost: async (postId: number, postData: UpdatePostData): Promise<Post> => {
        const response = await axiosInstance.put<Post>(`/posts/${postId}`, postData);
        return response.data;
    },

    /**
     * Delete a post
     */
    deletePost: async (postId: number): Promise<void> => {
        const response = await axiosInstance.delete<void>(`/posts/${postId}`);
        return response.data;
    },

    /**
     * Toggle like/unlike on a post
     */
    toggleLike: async (postId: number): Promise<Post> => {
        const response = await axiosInstance.post<Post>(`/posts/${postId}/like`);
        return response.data;
    },

    /**
     * Get list of users who liked a post
     */
    getPostLikes: async (postId: number): Promise<User[]> => {
        const response = await axiosInstance.get<User[]>(`/posts/${postId}/likes`);
        return response.data;
    },
};

export default postApi;