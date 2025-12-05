
// src/components/comment/CommentSection.jsx

import { useMemo } from 'react';
import { useFetchComments } from '../../hooks/useComments';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import './CommentSection.css';

// Helper function to build the comment tree
const buildCommentTree = (comments) => {
    const commentMap = {};
    const rootComments = [];

    // First pass: create a map of all comments by their ID
    comments.forEach(comment => {
        commentMap[comment.id] = { ...comment, replies: [] };
    });

    // Second pass: link replies to their parents
    comments.forEach(comment => {
        if (comment.parentCommentId) {
            const parent = commentMap[comment.parentCommentId];
            if (parent) {
                parent.replies.push(commentMap[comment.id]);
            }
        } else {
            rootComments.push(commentMap[comment.id]);
        }
    });

    return rootComments;
};

const CommentSection = ({ post }) => {
    const { data: commentsResponse, isLoading: loading } = useFetchComments(post.id);
    const flatComments = commentsResponse || [];
    const nestedComments = useMemo(() => buildCommentTree(flatComments), [flatComments]);

    return (
        <div className="comment-section">
            <CommentForm post={post} />
            {loading ? (
                <div className="comments-loading">Loading comments...</div>
            ) : (
                <div className="comments-list">
                    {nestedComments && nestedComments.length > 0 ? (
                        nestedComments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} post={post} />
                        ))
                    ) : (
                        <p className="no-comments">No comments yet. Be the first to comment!</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentSection;