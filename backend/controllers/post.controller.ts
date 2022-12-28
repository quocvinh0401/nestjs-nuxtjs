import { PostDTO } from '@/dto/post.dto';
import { Post as PostEntity } from '@/entities/post.entity';
import { AuthGuard } from '@/security';
import { AuthUser } from '@/security/decorator/auth-user.decorator';
import { PostService } from '@/services/post.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Delete, Param, Patch, UseGuards } from '@nestjs/common/decorators';

@Controller(['post', 'posts'])
@UseGuards(AuthGuard)
export class PostController {
  constructor(private service: PostService) {}

  @Get()
  async find(@AuthUser() user: any): Promise<PostEntity[]> {
    return await this.service.find(user);
  }

  @Post()
  async create(@Body() dto: PostDTO, @AuthUser() user?: any) {
    return this.service.create(dto, user);
  }

  @Post('like/:id')
  async like(@Body() dto: any, @Param('id') id: string){
    return this.service.like(dto, id)
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @AuthUser() user: any){
    return this.service.delete(id, user)
  }

  @Patch('undo/:id')
  async undoDelete(@Param('id') id: string, @AuthUser() user: any){
    return this.service.undoDelete(id, user)
  }
}
