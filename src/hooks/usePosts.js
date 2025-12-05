// src/hooks/usePosts.js
import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postApi } from '../api/postApi';

/**
 * Hook to fetch posts for the feed using infinite scrolling.
 */
export const useFetchPosts = () => {
    return useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam = 0 }) => postApi.getAllPosts(pageParam, 10),
        getNextPageParam: (lastPage) => {
            // If 'last' is true, there are no more pages.
            if (lastPage.last) {
                return undefined;
            }
            // Otherwise, return the next page number.
            return lastPage.pageable.pageNumber + 1;
        },
        initialPageParam: 0,
    });
};

/**
 * Hook to fetch a single post by its ID.
 * @param {number} postId - The ID of the post to fetch.
 */
export const useFetchPostById = (postId) => {
    return useQuery({
        queryKey: ['post', postId],
        queryFn: () => postApi.getPostById(postId),
        enabled: !!postId, // Only run if postId is provided
    });
};

/**
 * Hook to provide mutations for post actions (create, update, delete, etc.).
 */
export const usePostMutations = () => {
    const queryClient = useQueryClient();

    // Helper to invalidate queries and refetch data after a mutation
    const invalidatePostQueries = () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
    };

    // Mutation for creating a new post
    const createPostMutation = useMutation({
        mutationFn: ({ postData }) => postApi.createPost(postData),
        onSuccess: () => {
            toast.success('Post created successfully!');
            // Invalidate the infinite query to show the new post at the top
            invalidatePostQueries();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to create post');
        },
    });

    // Mutation for updating a post
    const updatePostMutation = useMutation({
        mutationFn: ({ postId, postData }) => postApi.updatePost(postId, postData),
        onSuccess: (response) => {
            const updatedPost = response.data;
            toast.success('Post updated successfully!');
            // Invalidate the main posts query
            invalidatePostQueries();
            // Also update the specific post query if it's cached
            queryClient.setQueryData(['post', updatedPost.id], response);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update post');
        },
    });

    // Mutation for deleting a post
    const deletePostMutation = useMutation({
        mutationFn: postApi.deletePost,
        onSuccess: () => {
            toast.success('Post deleted successfully!');
            invalidatePostQueries();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to delete post');
        },
    });

    // Mutation for toggling a like on a post
    const togglePostLikeMutation = useMutation({
        mutationFn: postApi.toggleLike,
        onSuccess: (updatedPost) => {
            // Invalidate to refetch all posts and update the like count/status
            invalidatePostQueries();
            // Also update the specific post query if it's cached
            queryClient.setQueryData(['post', updatedPost.id], updatedPost);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to toggle like');
        },
    });

    return {
        createPost: createPostMutation.mutateAsync,
        isCreatingPost: createPostMutation.isPending,
        updatePost: updatePostMutation.mutateAsync,
        isUpdatingPost: updatePostMutation.isPending,
        deletePost: deletePostMutation.mutateAsync,
        isDeletingPost: deletePostMutation.isPending,
        togglePostLike: togglePostLikeMutation.mutateAsync,
    };
};