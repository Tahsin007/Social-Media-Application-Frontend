import { useState } from 'react';
import { useCommentMutations } from '../../hooks/useComments';
import './CommentForm.css';

const CommentForm = ({
    post,
    parentCommentId = null,
    onCommentSubmitted,
    placeholder = "Write a comment...",
}) => {
    const { createComment, replyToComment, isCreatingComment, isReplyingToComment } =
        useCommentMutations();
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            return;
        }

        try {
            if (parentCommentId) {
                // This is a reply
                await replyToComment({
                    postId: post.id,
                    parentCommentId: parentCommentId,
                    replyData: { content: content.trim() },
                });
            } else {
                // This is a top-level comment
                await createComment({
                    postId: post.id,
                    commentData: { content: content.trim() },
                });
            }

            setContent('');
            if (onCommentSubmitted) {
                onCommentSubmitted();
            }
        } catch (error) {
            console.error('Failed to submit comment:', error);
        } finally {
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
                disabled={isCreatingComment || isReplyingToComment}
            />
            <button
                type="submit"
                className="comment-submit-button"
                disabled={isCreatingComment || isReplyingToComment || !content.trim()}
            >
                {isCreatingComment || isReplyingToComment ? 'Posting...' : 'Post'}
            </button>
        </form>
    );
};

export default CommentForm;