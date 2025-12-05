// src/api/apiTypes.ts
import { User } from '../redux/types/authTypes';

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface PaginatedResponse<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface Post {
    id: number;
    content: string;
    imageUrl?: string;
    isPublic: boolean;
    user: User;
    likedBy: User[];
    isLikedByCurrentUser: boolean;
    likeCount: number;
    commentCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface Comment {
    id: number;
    content: string;
    user: User;
    postId: number;
    parentCommentId?: number;
    replies: Comment[];
    likedBy: User[];
    likeCount: number;
    isLikedByCurrentUser: boolean;
    createdAt: string;
    updatedAt: string;
}

export type CreatePostData = Omit<Post, 'id' | 'author' | 'likedBy' | 'createdAt' | 'updatedAt'>;
export type UpdatePostData = Partial<CreatePostData>;
export type CreateCommentData = { content: string; parentCommentId?: number };