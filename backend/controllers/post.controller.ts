import { PostDTO } from "@/dto/post.dto";
import { AuthUser } from "@/security/decorator/auth-user.decorator";
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
    async create(@Body() dto: any, @AuthUser() user?: any){
        console.log('user-------------------->>>>',user)
        return this.service.create(dto)
    }
}