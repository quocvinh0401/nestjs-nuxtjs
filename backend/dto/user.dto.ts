import { UserStatus } from '@/entities/shared/enum';
import { DateOfBirth } from '@/entities/shared/interface';
import { User as iUser } from '@/entities/shared/user.interface';

export class UserDTO implements iUser {
  login!: string;
  password!: string;
  avatar!: string;
  firstName!: string;
  lastName!: string;
  fullName!: string;
  dateOfBirth!: DateOfBirth;
  friends!: iUser[];
  status!: UserStatus;

  createdAt!: Date;
  updatedAt!: Date;
  createdBy!: string;
  updatedBy!: string;
}
