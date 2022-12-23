import { Comment as iComment } from '@/entities/shared/comment.interface';
import { Content, Like } from '@/entities/shared/post.interface';
import { User } from '@/entities/shared/user.interface';

export class CommentDTO implements iComment {
  id!: string;
  postId!: string;
  user!: User;
  content!: Content;
  like!: Like[];
  createdAt!: Date;
  updatedAt!: Date;
  createdBy!: string;
  updatedBy!: string;

}
