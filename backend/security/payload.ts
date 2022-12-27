import { User } from "@/entities/user.entity";

export type Payload = Pick<User, 'login' | 'avatar' | 'lastName' | 'firstName' | 'friends'>