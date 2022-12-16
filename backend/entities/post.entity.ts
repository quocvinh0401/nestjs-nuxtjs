import { Entity, Property } from '@mikro-orm/core';
import { Interact, Content, Comment } from "@/entities/shared/post.interface";
import { Post as iPost } from "./shared/post.interface";
import { User } from "./shared/user.interface";
import { BaseEntity } from "./support/base.entity";

@Entity()
export class Post extends BaseEntity implements iPost {
    // @Property()
    // user!: User

    @Property()
    title!: string

    // @Property()
    // content!: Content

    // @Property()
    // interact!: Interact

    // @Property()
    // comments!: Comment[]

}