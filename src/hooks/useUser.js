// src/hooks/useUser.js
import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api/authApi';

/**
 * Hook to fetch a user's profile by their ID.
 * @param {number} userId - The ID of the user to fetch.
 * @param {object} options - React Query options.
 */
export const useUser = (userId, options = {}) => {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => authApi.getUserById(userId),
        enabled: !!userId, // Only run if userId is provided
        staleTime: 1000 * 60 * 5, // User profile data can be cached for 5 minutes
        ...options, // Allow overriding default options
    });
};

// You would also add other user-related hooks here, e.g., for following/unfollowing.