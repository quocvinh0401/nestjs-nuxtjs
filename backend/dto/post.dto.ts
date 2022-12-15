import { Content, Interact, Comment, Post as iPost } from "@/entities/shared/post.interface";
import { User } from "@/entities/shared/user.interface";

export class PostDTO implements iPost {
    title!: string;
    content!: Content;
    user!: User;
    interact!: Interact;
    comments!: Comment[];
}