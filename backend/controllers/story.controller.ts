import { StoryDTO } from "@/dto/story.dto";
import { AuthGuard, AuthUser } from "@/security";
import { StoryService } from "@/services/story.service";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

@Controller(['stories','story'])
@UseGuards(AuthGuard)
export class StoryController {
    constructor(private service: StoryService){}

    @Get()
    find(){
        return this.service.find()
    }

    @Post()
    create(@Body() dto: StoryDTO, @AuthUser() user: any){
        return this.service.create(dto, user)
    }
}