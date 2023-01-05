import { Story } from "@/entities/shared/story.interface";
import { User } from "@/entities/shared/user.interface";

export class StoryDTO implements Story {
    id!: string;
    user!: User;
    userId!: string;
    body!: string;
    viewers!: string[]
    createdAt!: Date;
}