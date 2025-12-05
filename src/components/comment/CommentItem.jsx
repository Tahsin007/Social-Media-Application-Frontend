// src/components/comment/CommentItem.jsx
import { useState } from 'react';
import CommentForm from './CommentForm';
import { formatDistanceToNow } from 'date-fns';
import './CommentItem.css';
import { useCommentMutations, useFetchCommentLikes } from '../../hooks/useComments';
import { useAuth } from '../../hooks/useAuth';

const CommentItem = ({ comment, post, isReply = false }) => {
    const { deleteComment, toggleCommentLike, updateComment } =
        useCommentMutations();
    const { user: currentUser } = useAuth();
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showLikes, setShowLikes] = useState(false);

    const { data: likesData, isLoading: isLoadingLikes } = useFetchCommentLikes(comment.id, { enabled: showLikes });
    const likedBy = likesData?.data || [];
    const isOwnComment = currentUser?.data?.id === comment?.user?.id;

    const handleLike = async () => {
        try {
            await toggleCommentLike({ postId: post.id, commentId: comment.id });
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await deleteComment({ postId: post.id, commentId: comment.id });
            } catch (error) {
                console.error('Failed to delete comment:', error);
            }
        }
    };

    const handleUpdate = async (newContent) => {
        if (!newContent || newContent.trim() === comment.content) return;
        try {
            await updateComment({ postId: post.id, commentId: comment.id, commentData: { content: newContent } });
        } catch (error) {
            console.error('Failed to update comment:', error);
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

                {showLikes && (
                    <div className="comment-likes-list">
                        {isLoadingLikes ? (
                            <p>Loading likes...</p>
                        ) : (
                            <>
                                <p className="likes-title">Liked by:</p>
                                <ul>
                                    {likedBy.map((user) => (
                                        <li key={user.id}>{user.firstName} {user.lastName}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                )}

                {showReplyForm && (
                    <CommentForm
                        post={post}
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
                                post={post}
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