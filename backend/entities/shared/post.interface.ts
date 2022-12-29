import { Comment } from './comment.interface';
import { ManageAccessPost } from './enum';
import { User } from './user.interface';

export interface Post {
  id: string;
  user: User;
  userId: string
  content: Content;
  interact: Interact;
  comments: Comment[];
  manageAccess: ManageAccessPost;
  hideUserList: string[];
  createdAt: Date;
}

export interface Content {
  text?: string;
  image?: string;
}

export interface Interact {
  like: Like[];
  comment: Comment[];
  share: Share[];
}

export interface Like {
  action: 'like' | 'heart' | 'wow' | 'haha' | 'sad' | 'angry';
  user: User;
}

export interface Share {
  user: string;
  createdAt: Date;
}
