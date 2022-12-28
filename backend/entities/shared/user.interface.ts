import { UserGender, UserStatus } from './enum';
import { DateOfBirth } from './interface';

interface Infomation {
  login: string;
  userId: string;
  password: string;
  avatar: string;
  background: string;
  firstName: string;
  lastName: string;
  dateOfBirth: DateOfBirth;
  gender: UserGender;
  friends: User[];
  status: UserStatus;
}

export interface User extends Infomation {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
