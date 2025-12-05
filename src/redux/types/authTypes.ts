// src/redux/types/authTypes.ts

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    // Add any other user properties you expect from the API
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null | undefined; // Allow for undefined from rejectWithValue
}

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}