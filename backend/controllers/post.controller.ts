import { PostDTO } from "@/dto/post.dto";
import { PostService } from "@/services/post.service";
import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller(['post', 'posts'])
export class PostController {
    constructor (private service: PostService){}

    @Get()
    async find(){
        return await this.service.find()
    }

    @Post()
    async create(@Body() dto: any){
        return this.service.create(dto)
    }
}