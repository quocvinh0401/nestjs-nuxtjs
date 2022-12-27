import { Entity, Property } from '@mikro-orm/core';
import { Interact, Content } from '@/entities/shared/post.interface';
import { Post as iPost } from './shared/post.interface';
import { BaseEntity } from './support/base.entity';
import { ManageAccessPost } from './shared/enum';
import { Comment } from './shared/comment.interface';
import { User } from './shared/user.interface';

@Entity()
export class Post extends BaseEntity implements iPost {
  @Property()
  user!: User;

  @Property()
  content!: Content;

  @Property()
  interact!: Interact;

  @Property()
  comments!: Comment[];

  @Property()
  manageAccess!: ManageAccessPost;

  @Property()
  hideUserList!: User[];
}
