import { StoryController } from "@/controllers/story.controller";
import { Story } from "@/entities/story.entity";
import { StoryService } from "@/services/story.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [MikroOrmModule.forFeature([Story])],
    controllers: [StoryController],
    providers: [StoryService, JwtService]
})

export class StoryModule{}