// src/components/post/EditPostModal.jsx
import { useState } from 'react';
import { usePostMutations } from '../../hooks/usePosts';
import './EditPostModal.css';

const EditPostModal = ({ post, onClose }) => {
    const { updatePost, isUpdatingPost } = usePostMutations();
    const [content, setContent] = useState(post.content);
    const [imageUrl, setImageUrl] = useState(post.imageUrl || '');
    const [isPublic, setIsPublic] = useState(post.isPublic);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            return;
        }

        await updatePost({
            postId: post.id,
            postData: {
                content: content.trim(),
                imageUrl: imageUrl.trim() || null,
                isPublic,
            },
        });
        onClose(); // Close the modal on success
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Post</h2>
                <form onSubmit={handleSubmit} className="edit-post-form">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="5"
                        placeholder="What's on your mind?"
                        disabled={isUpdatingPost}
                    />
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Image URL (optional)"
                        disabled={isUpdatingPost}
                    />
                    <div className="post-options">
                        <label className="privacy-toggle">
                            <input
                                type="checkbox"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                                disabled={isUpdatingPost}
                            />
                            <span>Public Post</span>
                        </label>
                        <div className="modal-actions">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={onClose}
                                disabled={isUpdatingPost}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isUpdatingPost || !content.trim()}
                            >
                                {isUpdatingPost ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPostModal;