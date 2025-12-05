// src/hooks/useAuth.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { authApi } from '../api/authApi';
import { setCredentials, clearCredentials } from '../redux/slices/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Query to get the current user
    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['currentUser'],
        queryFn: authApi.getCurrentUser,
        enabled: !!localStorage.getItem('accessToken'), // Only run if a token exists
        retry: 1,
        staleTime: Infinity, // This data is stable, no need to refetch automatically
        onSuccess: (data) => {
            // On successful fetch, we can update parts of our Redux store if needed,
            // but for now, we'll just use the data from the query directly.
            // If the user object in Redux needs to be the source of truth, dispatch here.
        },
        // Let the axios interceptor handle 401 errors globally.
        // A 500 error here shouldn't immediately log the user out.
    });

    // Mutation for logging in
    const { mutate: login, isPending: isLoggingIn, error: loginError, isError: isLoginError } = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            // The actual credentials are in the nested 'data' property of the response
            const credentials = data.data;
            dispatch(setCredentials(credentials));
            toast.success('Login successful!');
            queryClient.setQueryData(['currentUser'], credentials.user); // Pre-populate the currentUser query
            navigate('/feed');
        },
        onError: (error) => {
            // The toast is now handled in the component to have more control
            // toast.error(error.response?.data?.message || 'Login failed');
            console.error("Login failed:", error);
        }
    });

    // Mutation for registering
    const { mutate: register, isPending: isRegistering, error: registerError, isError: isRegisterError } = useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            // The actual credentials are in the nested 'data' property of the response
            const credentials = data.data;
            dispatch(setCredentials(credentials));
            toast.success('Registration successful! Welcome!');
            queryClient.setQueryData(['currentUser'], credentials.user); // Pre-populate the currentUser query
            navigate('/feed');
        },
        onError: (error) => {
            console.error("Registration failed:", error);
        }
    });

    // Logout function
    const logout = () => {
        dispatch(clearCredentials());
        // Remove the cached user data
        queryClient.removeQueries(['currentUser']);
        navigate('/login');
    };

    return {
        user,
        isLoadingUser: isLoading,
        isUserError: isError,
        login,
        isLoggingIn,
        loginError,
        isLoginError,
        register,
        isRegistering,
        registerError,
        isRegisterError,
        logout,
    };
};