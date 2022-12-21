import { Comment as iComment } from '@/entities/shared/comment.interface';
import { Content, Like } from '@/entities/shared/post.interface';
import { User } from '@/entities/shared/user.interface';
import { Long } from 'bson';

export class CommentDTO implements iComment {
  postId!: Long;
  user!: User;
  content!: Content;
  like!: Like[];
  createdAt!: Date;
  updatedAt!: Date;
}
