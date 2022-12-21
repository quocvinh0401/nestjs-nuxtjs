import { CommentController } from "@/controllers/comment.controller";
import { Comment } from "@/entities/comment.entity";
import { CommentService } from "@/services/comment.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [MikroOrmModule.forFeature([Comment])],
    controllers: [CommentController],
    providers: [CommentService, JwtService]
})

export class CommentModule {}