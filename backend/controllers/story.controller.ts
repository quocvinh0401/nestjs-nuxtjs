import { StoryDTO } from "@/dto/story.dto";
import { AuthGuard, AuthUser } from "@/security";
import { StoryService } from "@/services/story.service";
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";

@Controller(['stories','story'])
@UseGuards(AuthGuard)
export class StoryController {
    constructor(private service: StoryService){}

    @Get()
    find(){
        return this.service.find()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.service.findOne(id)
    }

    @Post()
    create(@Body() dto: StoryDTO, @AuthUser() user: any){
        return this.service.create(dto, user)
    }

    @Patch(':id')
    updateView(@AuthUser() user:any, @Body() id: string){
        return this.service.updateView(id, user)
    }
}