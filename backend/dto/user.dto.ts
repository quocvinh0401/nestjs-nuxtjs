import { UserGender, UserStatus } from '@/entities/shared/enum';
import { DateOfBirth } from '@/entities/shared/interface';
import { User as iUser } from '@/entities/shared/user.interface';

export class UserDTO implements iUser {
  login!: string;
  userId!: string;
  password!: string;
  avatar!: string;
  background!: string;
  firstName!: string;
  lastName!: string;
  dateOfBirth!: DateOfBirth;
  gender!: UserGender;
  friends!: iUser[];
  status!: UserStatus;

  createdAt!: Date;
  updatedAt!: Date;
  createdBy!: string;
  updatedBy!: string;
}
