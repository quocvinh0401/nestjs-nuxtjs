import { User } from "../user.entity";

export interface Story {
    id: string;
    user: User;
    userId: string;
    createdAt: Date;
    body: string;
}