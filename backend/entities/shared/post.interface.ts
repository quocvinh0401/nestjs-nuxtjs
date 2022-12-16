import { User } from "./user.interface";

export interface Post {
    // user: User,
    title: string,
    // content: Content,
    // interact: Interact,
    // comments: Comment[]
}

export interface Content {
    text?: string,
    image?: string
}

export interface Interact {
    countLikes: number,
    countComments: number,
    countShares: number
}

export interface Comment {
    user: User,
    content: Content
}