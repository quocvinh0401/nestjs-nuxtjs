import { User } from "@/entities/user.entity";

export type Payload = Pick<User, 'userId' | 'avatar' | 'lastName' | 'firstName' | 'friends'>