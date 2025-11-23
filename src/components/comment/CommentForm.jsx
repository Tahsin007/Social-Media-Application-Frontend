import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment, replyToComment } from '../../redux/slices/CommentSlice';
import './CommentForm.css';

const CommentForm = ({
    postId,
    parentCommentId = null,
    onCommentSubmitted,
    placeholder = "Write a comment..."
}) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            return;
        }

        setLoading(true);
        try {
            if (parentCommentId) {
                // This is a reply
                await dispatch(replyToComment({
                    postId,
                    commentId: parentCommentId,
                    replyData: { content: content.trim() },
                })).unwrap();
            } else {
                // This is a top-level comment
                await dispatch(createComment({
                    postId,
                    commentData: { content: content.trim() },
                })).unwrap();
            }

            setContent('');
            if (onCommentSubmitted) {
                onCommentSubmitted();
            }
        } catch (error) {
            console.error('Failed to submit comment:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <textarea
                className="comment-input"
                placeholder={placeholder}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="2"
                disabled={loading}
            />
            <button
                type="submit"
                className="comment-submit-button"
                disabled={loading || !content.trim()}
            >
                {loading ? 'Posting...' : 'Post'}
            </button>
        </form>
    );
};

export default CommentForm;