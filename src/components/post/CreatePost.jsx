
// ==========================================
// src/components/post/CreatePost.jsx
// ==========================================
import { useState } from 'react';
import { usePostMutations } from '../../hooks/usePosts';
import '../../index.css';
import { is } from 'date-fns/locale';

const CreatePost = ({ onPostCreated, onCancel }) => {
  const { createPost, isCreatingPost } = usePostMutations();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      return;
    }
    await createPost({
      content: content.trim(),
      imageUrl: imageUrl.trim() || null,
      isPublic,
    });
    setContent('');
    setImageUrl('');
    setIsPublic(true);
    onPostCreated();
  };

  return (
    <div className="create-post-card">
      <form onSubmit={handleSubmit} className="create-post-form">
        <textarea
          className="post-textarea"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          disabled={loading}
        />

        <input
          type="url"
          className="post-image-input"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          disabled={loading}
        />

        <div className="post-options">
          <label className="privacy-toggle">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              disabled={loading}
            />
            <span>Public Post</span>
          </label>

          <div className="post-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isCreatingPost}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isCreatingPost || !content.trim()}
            >
              {isCreatingPost ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
