// src/pages/Feed.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, resetPosts } from '../redux/slices/PostSlice';
import Navbar from '../components/layout/Navbar';
import CreatePost from '../components/post/CreatePost';
import PostList from '../components/post/PostList';
import '../index.css';

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, loading, hasMore, pagination } = useSelector((state) => state.posts);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    // Reset and fetch initial posts
    dispatch(resetPosts());
    dispatch(fetchPosts({ page: 0, size: 10 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchPosts({ page: pagination.page + 1, size: pagination.size }));
    }
  };

  const handlePostCreated = () => {
    // Refresh feed after creating post
    dispatch(resetPosts());
    dispatch(fetchPosts({ page: 0, size: 10 }));
    setShowCreatePost(false);
  };

  return (
    <div className="feed-container">
      <Navbar />
      
      <div className="feed-content">
        <div className="feed-main">
          <div className="create-post-section">
            <button 
              className="create-post-button"
              onClick={() => setShowCreatePost(!showCreatePost)}
            >
              {showCreatePost ? 'Cancel' : "What's on your mind?"}
            </button>
          </div>

          {showCreatePost && (
            <CreatePost 
              onPostCreated={handlePostCreated}
              onCancel={() => setShowCreatePost(false)}
            />
          )}

          <PostList 
            posts={posts}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        </div>
      </div>
    </div>
  );
};

export default Feed;