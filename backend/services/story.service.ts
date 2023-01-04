import { StoryDTO } from "@/dto/story.dto";
import { Story } from "@/entities/story.entity";
import { Story as iStory } from "@/entities/shared/story.interface"
import { EntityManager, MongoEntityRepository } from "@mikro-orm/mongodb";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Service } from "./support/service";
import { JwtService } from "@nestjs/jwt";
import { StoryMapper } from "./mappers/story.mapper";

@Injectable()
export class StoryService extends Service<Story, StoryDTO> {
    constructor(
        @InjectRepository(Story)
        protected readonly repository: MongoEntityRepository<Story>,
        protected readonly em: EntityManager,
        protected readonly jwtService: JwtService,
        protected readonly mapper: StoryMapper
    ){ super(repository, em)}

    async find(){
        const stories = await this.em.aggregate(Story, [
            {
                $lookup: {
                    from: 'user',
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'user',
                }
            },
            {
                $unwind: '$user'
            },
            {
                $set: {
                    id: '$_id'
                }
            },
            {
                $unset: ['user._id', 'user.password', '_id']
            }
        ]) 
        return stories
    }

    async create(dto: StoryDTO, user: any){
        const story = this.em.create(Story, 
            Builder<Story>()
            .body(dto.body)
            .userId(user.userId)
            .build()
            )
        await this.em.persistAndFlush(story)
    }
}