import { PostController } from "@/controllers/post.controller";
import { PostService } from "@/services/post.service";
import { Module } from "@nestjs/common";
import { MikroOrmModule} from '@mikro-orm/nestjs'
import { Post } from "@/entities/post.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [MikroOrmModule.forFeature([Post])],
    controllers: [PostController],
    providers: [PostService, JwtService]
})
export class PostModule {}