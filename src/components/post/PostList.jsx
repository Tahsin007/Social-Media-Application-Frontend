// ==========================================
// src/components/post/PostList.jsx
// ==========================================
import PostCard from './PostCard';
import '../../index.css';

const PostList = ({ posts, loading, hasMore, onLoadMore }) => {
  if (loading && posts.length === 0) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (!loading && posts.length === 0) {
    return (
      <div className="empty-state">
        <h3>No posts yet</h3>
        <p>Be the first to share something!</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      {posts.filter(post => post).map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasMore && (
        <button
          className="load-more-button"
          onClick={onLoadMore}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="end-message">
          <p>You've reached the end!</p>
        </div>
      )}
    </div>
  );
};

export default PostList;