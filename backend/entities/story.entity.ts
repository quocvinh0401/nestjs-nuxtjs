import { Entity, Property } from "@mikro-orm/core";
import { Story as iStory} from '@/entities/shared/story.interface'
import { BaseEntity } from "./support/base.entity";
import { User } from "./user.entity";

@Entity()
export class Story extends BaseEntity implements iStory {
    @Property() user!: User;
    @Property() userId!: string;
    @Property() body!: string;
    @Property() viewers!: string[];
}