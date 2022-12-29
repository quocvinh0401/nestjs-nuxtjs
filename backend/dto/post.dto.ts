import { Comment } from '@/entities/shared/comment.interface';
import { ManageAccessPost } from '@/entities/shared/enum';
import { Content, Interact, Post as iPost } from '@/entities/shared/post.interface';
import { User } from '@/entities/user.entity';

export class PostDTO implements iPost {
  id!: string;
  user!: User;
  userId!: string
  content!: Content;
  interact!: Interact;
  comments!: Comment[];
  manageAccess!: ManageAccessPost;
  hideUserList!: string[];
  createdAt!: Date;
}
