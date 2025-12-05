// src/redux/types/commentTypes.ts
import { Comment } from '../../api/apiTypes';

export interface CommentState {
    commentsByPost: {
        [postId: number]: Comment[];
    };
    loading: boolean;
    error: unknown | null;
}