import { UserStatus } from './enum';

export interface User {
  avatar: string;
  firstName: string;
  lastName: string;
  fullName: string;
  friends: User[];
  status: UserStatus;
}
