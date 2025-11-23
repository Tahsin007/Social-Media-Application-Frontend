// ==========================================
// src/components/post/PostCard.jsx
// ==========================================
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import {
    FaHeart,
    FaRegHeart,
    FaComment,
    FaShare,
    FaGlobe,
    FaLock,
    FaEllipsisH,
} from 'react-icons/fa';
import '../../index.css';

const PostCard = ({ post }) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [isLiked, setIsLiked] = useState(false); // Placeholder state

    if (!post) {
        return null;
    }

    const { author, content, imageUrl, createdAt, isPublic, likesCount = 0, commentsCount = 0 } = post;

    const handleLike = () => {
        setIsLiked(!isLiked);
        // In a real app, you would dispatch an action here to update the like status on the server.
    };

    const isOwnPost = currentUser && author && currentUser.id === author.id;

    return (
        <div className="post-card">
            <div className="post-header">
                <div className="author-info">
                    <img
                        src={author?.profilePictureUrl || `https://i.pravatar.cc/40?u=${author?.id}`}
                        alt={author?.firstName}
                        className="author-avatar"
                    />
                    <div className="author-details">
                        <span className="author-name">
                            {author ? `${author.firstName} ${author.lastName}` : 'Unknown User'}
                        </span>
                        <span className="post-meta">
                            {createdAt ? `${formatDistanceToNow(new Date(createdAt))} ago` : ''}
                            &nbsp;·&nbsp;
                            {isPublic ? <FaGlobe title="Public" /> : <FaLock title="Private" />}
                        </span>
                    </div>
                </div>
                {isOwnPost && (
                    <div className="post-menu">
                        <button className="menu-button">
                            <FaEllipsisH />
                        </button>
                        {/* Dropdown menu for edit/delete would go here */}
                    </div>
                )}
            </div>

            <div className="post-content">
                <p>{content}</p>
                {imageUrl && <img src={imageUrl} alt="Post content" className="post-image" />}
            </div>

            <div className="post-stats">
                <span>{isLiked ? likesCount + 1 : likesCount} Likes</span>
                <span>{commentsCount} Comments</span>
            </div>

            <div className="post-actions">
                <button onClick={handleLike} className={`action-button ${isLiked ? 'liked' : ''}`}>
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                    <span>Like</span>
                </button>
                <button className="action-button">
                    <FaComment />
                    <span>Comment</span>
                </button>
                <button className="action-button">
                    <FaShare />
                    <span>Share</span>
                </button>
            </div>
        </div>
    );
};

export default PostCard;