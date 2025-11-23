
// ==========================================
// src/components/post/CreatePost.jsx
// ==========================================
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/slices/PostSlice';
import '../../index.css';

const CreatePost = ({ onPostCreated, onCancel }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      return;
    }

    setLoading(true);
    try {
      await dispatch(createPost({
        content: content.trim(),
        imageUrl: imageUrl.trim() || null,
        isPublic,
      })).unwrap();
      
      setContent('');
      setImageUrl('');
      setIsPublic(true);
      onPostCreated();
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={loading || !content.trim()}
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
