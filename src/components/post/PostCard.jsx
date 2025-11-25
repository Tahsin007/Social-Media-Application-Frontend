// ==========================================
// src/components/post/PostCard.jsx
// ==========================================
import { useState, useEffect, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { postApi } from '../../api/postApi';
import CommentSection from '../comment/CommentSection';
import '../../index.css';
import { fetchCommentsByPost } from '../../redux/slices/CommentSlice';

const PostCard = ({ post }) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [isLiked, setIsLiked] = useState(post?.isLikedByCurrentUser || false);
    const [likeCount, setLikeCount] = useState(post?.likeCount || 0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLiked(post?.isLikedByCurrentUser || false);
        setLikeCount(post?.likeCount || 0);
    }, [post?.isLikedByCurrentUser, post?.likeCount]);

    if (!post) {
        return null;
    }

    const { author, content, imageUrl, createdAt, isPublic, commentsCount = 0 } = post;

    const handleLike = async () => {
        const originalIsLiked = isLiked;
        const originalLikeCount = likeCount;

        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

        try {
            const response = await postApi.toggleLike(post.id);
            if (response.data) {
                setIsLiked(response.data.isLikedByCurrentUser);
                setLikeCount(response.data.likeCount);
            }
        } catch (error) {
            console.error('Failed to toggle like:', error);
            setIsLiked(originalIsLiked);
            setLikeCount(originalLikeCount);
        }
    };

    const isOwnPost = currentUser && author && currentUser.id === author.id;

    const handleToggleComments = () => {
        const newShowComments = !showComments;
        setShowComments(newShowComments);
        console.log(newShowComments);
        console.log(post.id);
        if (newShowComments) {
            dispatch(fetchCommentsByPost(post.id));
        }
    };

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
            <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
                <div className="_feed_inner_timeline_post_top">
                    <div className="_feed_inner_timeline_post_box">
                        <div className="_feed_inner_timeline_post_box_image">
                            <img src={author?.profilePictureUrl || "/assets/images/post_img.png"} alt={author?.firstName} className="_post_img" />
                        </div>
                        <div className="_feed_inner_timeline_post_box_txt">
                            <h4 className="_feed_inner_timeline_post_box_title">{author ? `${author.firstName} ${author.lastName}` : 'Unknown User'}</h4>
                            <p className="_feed_inner_timeline_post_box_para">
                                {createdAt ? `${formatDistanceToNow(new Date(createdAt))} ago` : ''} · <a href="#0">{isPublic ? 'Public' : 'Private'}</a>
                            </p>
                        </div>
                    </div>
                    {isOwnPost && (
                        <div className="_feed_inner_timeline_post_box_dropdown">
                            <div className="_feed_timeline_post_dropdown">
                                <button onClick={toggleDropdown} href="#0" id="_timeline_show_drop_btn" className="_feed_timeline_post_dropdown_link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                                        <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                                        <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                                        <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                                    </svg>
                                </button>
                            </div>
                            {showDropdown && (
                                <div id="_timeline_drop" className="_feed_timeline_dropdown _timeline_dropdown" style={{ opacity: 1, visibility: 'visible', transform: 'translateY(25px)' }}>
                                    <ul className="_feed_timeline_dropdown_list">
                                        <li className="_feed_timeline_dropdown_item">
                                            <a href="#0" className="_feed_timeline_dropdown_link">Edit Post</a>
                                        </li>
                                        <li className="_feed_timeline_dropdown_item">
                                            <a href="#0" className="_feed_timeline_dropdown_link">Delete Post</a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <h4 className="_feed_inner_timeline_post_title">{content}</h4>
                {imageUrl && (
                    <div className="_feed_inner_timeline_image">
                        <img src={imageUrl} alt="Post content" className="_time_img" />
                    </div>
                )}
            </div>

            <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
                <div className="_feed_inner_timeline_total_reacts_image">
                    <img src="/assets/images/react_img1.png" alt="Image" className="_react_img1" />
                    <img src="/assets/images/react_img2.png" alt="Image" className="_react_img" />
                    <p className="_feed_inner_timeline_total_reacts_para">{likeCount}</p>
                </div>
                <div className="_feed_inner_timeline_total_reacts_txt">
                    <p className="_feed_inner_timeline_total_reacts_para1">
                        <a href="#0" onClick={handleToggleComments}><span>{post.commentCount}</span> Comment</a>
                    </p>
                    <p className="_feed_inner_timeline_total_reacts_para2"><span>0</span> Share</p>
                </div>
            </div>

            <div className="_feed_inner_timeline_reaction">
                <button onClick={handleLike} className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${isLiked ? '_feed_reaction_active' : ''}`}>
                    <span className="_feed_inner_timeline_reaction_link">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
                                <path fill={isLiked ? "#FFCC4D" : "#666"} d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z" />
                                {/* other paths */}
                            </svg>
                            Like
                        </span>
                    </span>
                </button>
                <button onClick={handleToggleComments} className="_feed_inner_timeline_reaction_comment _feed_reaction">
                    <span className="_feed_inner_timeline_reaction_link">
                        <span>
                            <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
                                <path stroke="#000" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z" />
                                <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563" />
                            </svg>
                            Comment
                        </span>
                    </span>
                </button>
                <button className="_feed_inner_timeline_reaction_share _feed_reaction">
                    <span className="_feed_inner_timeline_reaction_link">
                        <span>
                            <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21">
                                <path stroke="#000" strokeLinejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z" />
                            </svg>
                            Share
                        </span>
                    </span>
                </button>
            </div>
            {showComments && <CommentSection post={post} />}
        </div>
    );
};

export default PostCard;