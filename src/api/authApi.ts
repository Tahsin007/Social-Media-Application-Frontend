// src/api/authApi.ts
import axiosInstance from './axios';
import { AuthResponse, User } from '../redux/types/authTypes';

export interface RegisterUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

export const authApi = {
    register: async (userData: RegisterUserData): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/api/auth/register', userData);
        return response.data;
    },

    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/api/auth/login', credentials);
        return response.data;
    },

    logout: async (): Promise<void> => {
        const response = await axiosInstance.post('/api/auth/logout');
        return response.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await axiosInstance.get<User>('/api/auth/me');
        return response.data;
    },

    getUserById: async (userId: string): Promise<User> => {
        const response = await axiosInstance.get<User>(`/api/auth/users/${userId}`);
        return response.data;
    },

    refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
        const response = await axiosInstance.post<RefreshTokenResponse>('/api/auth/refresh', { refreshToken });
        return response.data;
    },
};

export default authApi;