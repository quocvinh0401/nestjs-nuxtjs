import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./support/base.entity";
import { Comment as iComment } from "./shared/comment.interface";
import { User } from "./shared/user.interface";
import { Content, Like } from "./shared/post.interface";

@Entity()
export class Comment extends BaseEntity implements iComment {
    @Property() postId!: string;
    @Property() user!: User;
    @Property() userId!: string;
    @Property() content!: Content;
    @Property() like!: Like[];
}