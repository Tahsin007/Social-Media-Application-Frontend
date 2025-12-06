// src/pages/ProfilePage.jsx
import { useParams } from 'react-router-dom';

import UserProfile from './UserProfile';
import PostList from '../components/post/PostList';
import Navbar from '../components/layout/Navbar';
import { useAuth } from '../hooks/useAuth';
import { useFetchAllPostsByUserId } from '../hooks/usePosts';
import { useUser } from '../hooks/useUser';
import '../index.css';

const ProfilePage = () => {
    const { id: userId } = useParams(); // Renaming to avoid conflict and be clear
    const { user: currentUser } = useAuth();

    const isOwnProfile = currentUser?.id === userId;

    // Fetch user profile data
    const { data: profileUser, isLoading: isLoadingUser, error: userError } = useUser(userId, {
        enabled: !isOwnProfile,
    });

    // Fetch all of the user's posts without pagination
    const {
        data: posts = [], // Default to an empty array
        isLoading: isLoadingPosts,
        error: postsError,
    } = useFetchAllPostsByUserId(userId);

    console.log("posts", posts);

    // Determine which user object to display
    const user = isOwnProfile ? currentUser : profileUser;

    if (isLoadingUser) {
        return <div className="loading-container"><div className="spinner"></div><p>Loading profile...</p></div>;
    }

    if (userError) {
        return (
            <div className="empty-state">
                <h3>Could not load profile.</h3>
                <p>{userError.message}</p>
            </div>
        );
    }

    return (
        <div className="feed-container">
            <Navbar />
            {user && (
                <div className="feed-content">
                    <UserProfile user={user} postCount={posts?.length || 0} />
                    {postsError ? (
                        <div className="empty-state"><p>Could not load posts.</p></div>
                    ) : (
                        <PostList posts={posts} loading={isLoadingPosts} />
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;