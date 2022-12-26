import { PostDTO } from '@/dto/post.dto';
import { Post as PostEntity } from '@/entities/post.entity';
import { AuthUser } from '@/security/decorator/auth-user.decorator';
import { PostService } from '@/services/post.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';

@Controller(['post', 'posts'])
export class PostController {
  constructor(private service: PostService) {}

  @Get()
  async find(): Promise<PostEntity[]> {
    return await this.service.find();
  }

  @Post()
  async create(@Body() dto: PostDTO, @AuthUser() user?: any) {
    return this.service.create(dto, user);
  }

  @Post('like/:id')
  async like(@Body() dto: any, @Param('id') id: string){
    return this.service.like(dto, id)
  }
}
