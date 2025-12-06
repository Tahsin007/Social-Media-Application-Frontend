// src/components/profile/UserProfile.jsx
import '../index.css';

const UserProfile = ({ user, postCount }) => {
    if (!user) return null;

    return (
        <div className="user-profile-card">
            <div className="user-profile-avatar">
                <img src={user.profilePictureUrl || '/assets/images/post_img.png'} alt={`${user.firstName} ${user.lastName}`} />
            </div>
            <div className="user-profile-info">
                <h2>{user.firstName} {user.lastName}</h2>
                <p className="user-profile-email">{user.email}</p>
                <div className="user-profile-stats">
                    <span><strong>{postCount}</strong> Posts</span>
                    {/* You can add more stats like followers/following here */}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;