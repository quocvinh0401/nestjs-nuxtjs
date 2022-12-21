import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./support/base.entity";
import { Comment as iComment } from "./shared/comment.interface";
import { User } from "./shared/user.interface";
import { Content, Like } from "./shared/post.interface";
import { Long } from "bson";

@Entity()
export class Comment extends BaseEntity implements iComment {
    @Property() postId!: Long;
    @Property() user!: User
    @Property() content!: Content;
    @Property() like!: Like[];

}