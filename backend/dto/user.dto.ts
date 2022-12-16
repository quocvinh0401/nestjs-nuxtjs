import { UserStatus } from "@/entities/shared/enum";
import { User as iUser } from "@/entities/shared/user.interface";

export class UserDTO implements iUser {
    avatar!: string;
    firstName!: string;
    lastName!: string;
    fullName!: string;
    friends!: iUser[];
    status!: UserStatus;
}