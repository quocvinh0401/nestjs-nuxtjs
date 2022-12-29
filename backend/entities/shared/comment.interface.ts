import { Content, Like } from './post.interface';
import { User } from './user.interface';

export interface Comment {
  postId: string;
  user: User;
  userId: string;
  content: Content;
  like: Like[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
