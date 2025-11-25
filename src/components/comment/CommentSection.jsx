
// src/components/comment/CommentSection.jsx

import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsByPost } from '../../redux/slices/CommentSlice';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import './CommentSection.css';

const CommentSection = ({ post }) => {
    const dispatch = useDispatch();
    const { commentsByPost, loading } = useSelector((state) => state.comments);

    const comments = commentsByPost[post.id] || [];

    return (
        <div className="comment-section">
            <CommentForm post={post} />

            {loading && comments.length === 0 ? (
                <div className="comments-loading">Loading comments...</div>
            ) : (
                <div className="comments-list">
                    {comments.length === 0 ? (
                        <p className="no-comments">No comments yet. Be the first to comment!</p>
                    ) : (
                        comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} post={post} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentSection;