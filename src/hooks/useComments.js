// src/hooks/useComments.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { commentApi } from '../api/commentApi';

/**
 * Hook to fetch comments for a specific post.
 * @param {number} postId - The ID of the post to fetch comments for.
 */
export const useFetchComments = (postId) => {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => commentApi.getCommentsByPost(postId),
        enabled: !!postId, // Only run the query if postId is provided
        staleTime: 1000 * 60 * 5, // Comments can be considered fresh for 5 minutes
    });
};

/**
 * Hook to fetch likes for a specific comment.
 * @param {number} commentId - The ID of the comment.
 * @param {object} options - React Query options, like `enabled`.
 */
export const useFetchCommentLikes = (commentId, options = {}) => {
    return useQuery({
        queryKey: ['commentLikes', commentId],
        queryFn: () => commentApi.getCommentLikes(commentId),
        enabled: !!commentId && (options.enabled ?? false), // Only run if commentId is provided and it's enabled
        staleTime: 1000 * 60 * 5, // Likes can be considered fresh for 5 minutes
        ...options,
    });
};

/**
 * Hook to provide mutations for comment actions (create, update, delete, etc.).
 */
export const useCommentMutations = () => {
    const queryClient = useQueryClient();

    const handleMutationSuccess = (postId) => {
        // Invalidate the comments query for the specific post to refetch and update the UI
        queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        // Also invalidate the main posts query to update the comment count on the post card
        queryClient.invalidateQueries({ queryKey: ['posts'] });
    };

    // Mutation for creating a new comment
    const createCommentMutation = useMutation({
        mutationFn: ({ postId, commentData }) => commentApi.createComment(postId, commentData),
        onSuccess: (data, variables) => {
            toast.success('Comment added successfully!');
            handleMutationSuccess(variables.postId);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to add comment');
        },
    });

    // Mutation for replying to a comment
    const replyToCommentMutation = useMutation({
        mutationFn: ({ postId, parentCommentId, replyData }) => commentApi.createComment(postId, { ...replyData, parentId: parentCommentId }),
        onSuccess: (data, variables) => {
            toast.success('Reply posted successfully!');
            handleMutationSuccess(variables.postId);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to post reply');
        },
    });

    // Mutation for updating a comment
    const updateCommentMutation = useMutation({
        mutationFn: ({ commentId, commentData }) => commentApi.updateComment(commentId, commentData),
        onSuccess: (updatedComment, { postId }) => {
            toast.success('Comment updated successfully!');
            handleMutationSuccess(postId);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update comment');
        },
    });

    // Mutation for deleting a comment
    const deleteCommentMutation = useMutation({
        mutationFn: ({ commentId }) => commentApi.deleteComment(commentId),
        // We need postId to invalidate the cache. We pass it through the component.
        onSuccess: (data, { postId }) => {
            toast.success('Comment deleted successfully!');
            handleMutationSuccess(postId);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to delete comment');
        },
    });

    // Mutation for toggling a like on a comment
    const toggleCommentLikeMutation = useMutation({
        mutationFn: ({ commentId }) => commentApi.toggleLike(commentId),
        onSuccess: (updatedComment, { postId }) => {
            // No toast notification for a quick action like this, just update the UI.
            handleMutationSuccess(postId);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to toggle like');
        },
    });

    return {
        createComment: createCommentMutation.mutateAsync,
        isCreatingComment: createCommentMutation.isPending,
        replyToComment: replyToCommentMutation.mutateAsync,
        isReplyingToComment: replyToCommentMutation.isPending,
        updateComment: updateCommentMutation.mutateAsync,
        isUpdatingComment: updateCommentMutation.isPending,
        deleteComment: deleteCommentMutation.mutateAsync,
        isDeletingComment: deleteCommentMutation.isPending,
        toggleCommentLike: toggleCommentLikeMutation.mutateAsync,
    };
};