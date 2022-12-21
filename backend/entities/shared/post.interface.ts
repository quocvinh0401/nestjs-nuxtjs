import { Long } from "bson";
import { Comment } from "./comment.interface";
import { ManageAccessPost } from "./enum";
import { User } from "./user.interface";

export interface Post {
    id: Long
    user: User,
    content: Content,
    interact: Interact,
    comments: Comment[],
    manageAccess: ManageAccessPost
    createdAt: Date
}

export interface Content {
    text?: string,
    image?: string
}

export interface Interact {
    like: Like[],
    comment: Comment[],
    share: Share[]
}

export interface Like {
    action: 'like' | 'heart',
    user: string
}

export interface Share {
    user: string
    createdAt: Date
}