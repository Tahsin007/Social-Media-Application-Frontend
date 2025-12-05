// src/redux/types/postTypes.ts
import { Post } from '../../api/apiTypes';

export interface PostState {
    posts: Post[];
    currentPost: Post | null;
    loading: boolean;
    error: unknown | null;
    pagination: {
        page: number;
        size: number;
        totalPages: number;
        totalElements: number;
    };
    hasMore: boolean;
}