
import { useState } from 'react';
import { usePostMutations } from '../../hooks/usePosts'; // Corrected hook name
import '../../index.css';

const CreatePost = ({ onPostCreated, onCancel }) => {
  const { createPost, isCreating } = usePostMutations();
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
          disabled={isCreating}
        />

        <input
          type="url"
          className="post-image-input"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          disabled={isCreating}
        />

        <div className="post-options">
          <label className="privacy-toggle">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              disabled={isCreating}
            />
            <span>Public Post</span>
          </label>

          <div className="post-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isCreating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isCreating || !content.trim()}
            >
              {isCreating ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
