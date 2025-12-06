// src/hooks/usePosts.js
import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postApi } from '../api/postApi';

/**
 * Hook to fetch posts with infinite scrolling for the main feed.
 */
export const useFetchPosts = () => {
    return useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam = 0 }) => postApi.getAllPosts(pageParam, 10), // 10 posts per page
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            // If lastPage.last is true, there are no more pages.
            return lastPage.last ? undefined : lastPage.number + 1;
        },
        staleTime: 1000 * 60, // 1 minute
    });
};

/**
 * Hook to fetch posts by a specific user with infinite scrolling.
 * @param {string} userId - The ID of the user whose posts are to be fetched.
 */
export const useFetchPostsByUserId = (userId) => {
    return useInfiniteQuery({
        queryKey: ['posts', 'user', userId],
        queryFn: ({ pageParam = 0 }) => postApi.getPostsByUserId(userId, pageParam, 10),
        initialPageParam: 0,
        enabled: !!userId,
        getNextPageParam: (lastPage) => {
            return lastPage.last ? undefined : lastPage.number + 1;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

/**
 * Hook to fetch ALL posts for a specific user without pagination.
 * @param {string} userId - The ID of the user whose posts are to be fetched.
 */
export const useFetchAllPostsByUserId = (userId) => {
    return useQuery({
        queryKey: ['posts', 'user', userId, 'all'],
        queryFn: () => postApi.getAllPostsByUserId(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};


/**
 * Hook to provide mutations for post actions (create, update, delete, like).
 */
export const usePostMutations = () => {
    const queryClient = useQueryClient();

    // Generic success handler to invalidate queries
    const handleSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
    };

    const createPostMutation = useMutation({
        mutationFn: postApi.createPost,
        onSuccess: () => {
            toast.success('Post created successfully!');
            handleSuccess();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to create post');
        },
    });

    const updatePostMutation = useMutation({
        mutationFn: ({ postId, postData }) => postApi.updatePost(postId, postData),
        onSuccess: () => {
            toast.success('Post updated successfully!');
            handleSuccess();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update post');
        },
    });

    const deletePostMutation = useMutation({
        mutationFn: postApi.deletePost,
        onSuccess: () => {
            toast.success('Post deleted successfully!');
            handleSuccess();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to delete post');
        },
    });

    const togglePostLikeMutation = useMutation({
        mutationFn: postApi.toggleLike,
        onSuccess: handleSuccess, // Just refetch, no toast needed for a quick action
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Action failed');
        },
    });

    return {
        createPost: createPostMutation.mutateAsync,
        isCreating: createPostMutation.isPending,
        updatePost: updatePostMutation.mutateAsync,
        isUpdating: updatePostMutation.isPending,
        deletePost: deletePostMutation.mutateAsync,
        isDeleting: deletePostMutation.isPending,
        togglePostLike: togglePostLikeMutation.mutateAsync,
    };
};