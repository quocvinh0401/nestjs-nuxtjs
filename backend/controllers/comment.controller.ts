import { Comment } from '@/entities/comment.entity';
import { Query as iQuery } from '@/entities/shared/interface';
import { AuthUser } from '@/security/decorator/auth-user.decorator';
import { CommentService } from '@/services/comment.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common'

@Controller(['comment', 'comments'])
export class CommentController {
  constructor(private service: CommentService) {}

  @Post()
  async create(@Body() dto: any, @AuthUser() user: any): Promise<Comment> {
    return await this.service.create(dto, user)
  }
}
