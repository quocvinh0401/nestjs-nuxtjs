import { PostDTO } from "@/dto/post.dto";
import { PostService } from "@/services/post.service";
import { Body, Controller, Post } from "@nestjs/common";

@Controller(['post', 'posts'])
export class PostController {
    constructor (private service: PostService){}

    @Post()
    create(@Body() dto: any){
        return this.service.create(dto)
    }
}