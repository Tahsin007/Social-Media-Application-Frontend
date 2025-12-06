import axiosInstance from './axios';
import { Post, PaginatedResponse, CreatePostData, UpdatePostData } from './AuthTypes';
import { User } from '../redux/types/authTypes';

export const postApi = {

    getAllPosts: async (page = 0, size = 10): Promise<PaginatedResponse<Post>> => {
        const response = await axiosInstance.get<PaginatedResponse<Post>>('/posts', {
            params: { page, size },
        });
        return response.data;
    },

    getPostById: async (postId: number): Promise<Post> => {
        const response = await axiosInstance.get<Post>(`/posts/${postId}`);
        return response.data;
    },

    getAllPostsByUserId: async (userId: number): Promise<Post[]> => {
        const response = await axiosInstance.get<Post[]>(`/posts/user/${userId}`);
        return response.data;
    },

    createPost: async (postData: CreatePostData): Promise<Post> => {
        const response = await axiosInstance.post<Post>('/posts', postData);
        return response.data;
    },

    updatePost: async (postId: number, postData: UpdatePostData): Promise<Post> => {
        const response = await axiosInstance.put<Post>(`/posts/${postId}`, postData);
        return response.data;
    },

    deletePost: async (postId: number): Promise<void> => {
        const response = await axiosInstance.delete<void>(`/posts/${postId}`);
        return response.data;
    },

    toggleLike: async (postId: number): Promise<Post> => {
        const response = await axiosInstance.post<Post>(`/posts/${postId}/like`);
        return response.data;
    },

    getPostLikes: async (postId: number): Promise<User[]> => {
        const response = await axiosInstance.get<User[]>(`/posts/${postId}/likes`);
        return response.data;
    },
};

export default postApi;