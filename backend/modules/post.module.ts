import { PostController } from "@/controllers/post.controller";
import { PostService } from "@/services/post.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [],
    controllers: [PostController],
    providers: [PostService]
})
export class PostModule {}