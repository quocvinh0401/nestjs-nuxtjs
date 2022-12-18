import { UserStatus } from './enum';
import { DateOfBirth } from './interface';

interface Infomation {
  login: string,
  password: string,
  avatar: string,
  firstName: string,
  lastName: string,
  dateOfBirth: DateOfBirth,
  friends: User[],
  status: UserStatus
}

export interface User extends Infomation {
  createdAt: Date,
  updatedAt: Date,
  createdBy: string,
  updatedBy: string
}
