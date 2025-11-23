
// src/components/comment/CommentSection.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsByPost } from '../../redux/slices/CommentSlice';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import './CommentSection.css';

const CommentSection = ({ postId }) => {
    const dispatch = useDispatch();
    const { commentsByPost, loading } = useSelector((state) => state.comments);

    const comments = commentsByPost[postId] || [];

    useEffect(() => {
        if (!commentsByPost[postId]) {
            dispatch(fetchCommentsByPost(postId));
        }
    }, [dispatch, postId, commentsByPost]);

    return (
        <div className="comment-section">
            <CommentForm postId={postId} />

            {loading && comments.length === 0 ? (
                <div className="comments-loading">Loading comments...</div>
            ) : (
                <div className="comments-list">
                    {comments.length === 0 ? (
                        <p className="no-comments">No comments yet. Be the first to comment!</p>
                    ) : (
                        comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} postId={postId} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentSection;