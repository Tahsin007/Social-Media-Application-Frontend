// src/components/comment/CommentItem.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCommentLike, deleteComment } from '../../redux/slices/CommentSlice';
import CommentForm from './CommentForm';
import { formatDistanceToNow } from 'date-fns';
import './CommentItem.css';

const CommentItem = ({ comment, postId, isReply = false }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showLikes, setShowLikes] = useState(false);

    const isOwnComment = user?.id === comment.user.id;

    const handleLike = async () => {
        try {
            await dispatch(toggleCommentLike({ postId, commentId: comment.id })).unwrap();
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await dispatch(deleteComment({ postId, commentId: comment.id })).unwrap();
            } catch (error) {
                console.error('Failed to delete comment:', error);
            }
        }
    };

    const handleReplySubmitted = () => {
        setShowReplyForm(false);
    };

    return (
        <div className={`comment-item ${isReply ? 'reply' : ''}`}>
            <div className="comment-avatar">
                {comment.user.firstName.charAt(0)}{comment.user.lastName.charAt(0)}
            </div>

            <div className="comment-body">
                <div className="comment-header">
                    <div className="comment-author">
                        <span className="author-name">
                            {comment.user.firstName} {comment.user.lastName}
                        </span>
                        <span className="comment-time">
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                    </div>
                    {isOwnComment && (
                        <button className="comment-delete-button" onClick={handleDelete}>
                            Delete
                        </button>
                    )}
                </div>

                <div className="comment-content">
                    <p>{comment.content}</p>
                </div>

                <div className="comment-actions">
                    <button
                        className={`comment-action-button ${comment.isLikedByCurrentUser ? 'liked' : ''}`}
                        onClick={handleLike}
                    >
                        👍 {comment.isLikedByCurrentUser ? 'Liked' : 'Like'}
                        {comment.likeCount > 0 && ` (${comment.likeCount})`}
                    </button>

                    {!isReply && (
                        <button
                            className="comment-action-button"
                            onClick={() => setShowReplyForm(!showReplyForm)}
                        >
                            💬 Reply
                        </button>
                    )}

                    {comment.likeCount > 0 && (
                        <button
                            className="comment-action-button"
                            onClick={() => setShowLikes(!showLikes)}
                        >
                            See Likes
                        </button>
                    )}
                </div>

                {showLikes && comment.likedBy && comment.likedBy.length > 0 && (
                    <div className="comment-likes-list">
                        <p className="likes-title">Liked by:</p>
                        <ul>
                            {comment.likedBy.map((user) => (
                                <li key={user.id}>
                                    {user.firstName} {user.lastName}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {showReplyForm && (
                    <CommentForm
                        postId={postId}
                        parentCommentId={comment.id}
                        onCommentSubmitted={handleReplySubmitted}
                        placeholder="Write a reply..."
                    />
                )}

                {comment.replies && comment.replies.length > 0 && (
                    <div className="comment-replies">
                        {comment.replies.map((reply) => (
                            <CommentItem
                                key={reply.id}
                                comment={reply}
                                postId={postId}
                                isReply={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentItem;