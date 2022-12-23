import { CommentDTO } from "@/dto/comment.dto";
import { Comment } from "@/entities/comment.entity";
import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Mapper } from "./support/base.mapper";

@Injectable()
export class CommentMapper extends Mapper<Comment, CommentDTO> {
    toDTO(entity: Comment): CommentDTO {
        return Builder<CommentDTO>()
            .id(entity.id)
            .content(entity.content)
            .like(entity.like)
            .postId(entity.postId)
            .user(entity.user)

            .createdAt(entity.createdAt)
            .createdBy(entity.createdBy)
            .updatedAt(entity.updatedAt)
            .updatedBy(entity.updatedBy)
            .build()
    }

    toEntity(dto: CommentDTO): Comment {
        return Builder<Comment>().build()
    }
}