import { StoryDTO } from "@/dto/story.dto";
import { Story } from "@/entities/story.entity";
import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Mapper } from "./support/base.mapper";

@Injectable()
export class StoryMapper extends Mapper<Story, StoryDTO> {
    toDTO(entity: Story): StoryDTO {
        return Builder<StoryDTO>()
            .id(entity.id)
            .user(entity.user)
            .body(entity.body)
            .createdAt(entity.createdAt)
            .build()
    }

    toEntity(dto: StoryDTO): Story {
        return Builder<Story>().build()
    }
}