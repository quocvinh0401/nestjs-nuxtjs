import { Long } from "bson";
import { Content, Like } from "./post.interface";
import { User } from "./user.interface";

export interface Comment {
    postId: Long,
    user: User,
    content: Content,
    like: Like[],
    createdAt: Date,
    updatedAt: Date
}