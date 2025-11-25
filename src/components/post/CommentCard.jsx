import { formatDistanceToNow } from 'date-fns';

const CommentCard = ({ comment }) => {
    if (!comment) {
        return null;
    }

    const { author, content, createdAt } = comment;

    return (
        <div className="_feed_inner_timeline_all_comment_box">
            <div className="_feed_inner_timeline_all_comment_box_image">
                <img
                    src={author?.profilePictureUrl || "/assets/images/post_img.png"}
                    alt={author?.firstName}
                    className="_post_img"
                />
            </div>
            <div className="_feed_inner_timeline_all_comment_box_txt">
                <h4 className="_feed_inner_timeline_all_comment_box_title">
                    {author ? `${author.firstName} ${author.lastName}` : 'Unknown User'}
                </h4>
                <p className="_feed_inner_timeline_all_comment_box_para">{content}</p>
                <p className="_feed_inner_timeline_all_comment_box_para2">
                    {createdAt ? `${formatDistanceToNow(new Date(createdAt))} ago` : ''}
                </p>
            </div>
        </div>
    );
};

export default CommentCard;