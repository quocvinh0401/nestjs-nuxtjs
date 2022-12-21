import { Comment } from '@/entities/shared/comment.interface';
import { ManageAccessPost } from '@/entities/shared/enum';
import {
  Content,
  Interact,
  Post as iPost,
} from '@/entities/shared/post.interface';
import { User } from '@/entities/user.entity';
import { Long } from 'bson';

export class PostDTO implements iPost {
  id!: Long;
  user!: User;
  content!: Content;
  interact!: Interact;
  comments!: Comment[];
  manageAccess!: ManageAccessPost;
  createdAt!: Date
}
