import { CommentDTO } from '@/dto/comment.dto';
import { Comment } from '@/entities/comment.entity';
import { Query } from '@/entities/shared/interface';
import { User } from '@/entities/user.entity';
import { EntityManager, MongoEntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Builder } from 'builder-pattern';
import { pick } from 'lodash';
import { CommentMapper } from './mappers/comment.mapper';
import { Service } from './support/service';

@Injectable()
export class CommentService extends Service<Comment, CommentDTO> {
  constructor(
    @InjectRepository(Comment)
    protected readonly repository: MongoEntityRepository<Comment>,
    protected readonly em: EntityManager,
    protected readonly jwtService: JwtService,
    protected readonly mapper: CommentMapper
  ) {
    super(repository, em);
  }

  async create(dto: CommentDTO, user: any): Promise<Comment>{
    const _user = this.jwtService.decode(user) as User;
    const comment = this.em.create(Comment, 
      Builder<Comment>()
      .postId(dto.postId)
      .user(pick<User, keyof User>(_user, ['login', 'avatar', 'firstName', 'lastName']))
      .content(dto.content)
      .like([])
      .build())
      console.log('dto---------->>>:', dto)
      console.log('comment --------->>>>>>>>>>',comment)
    await this.em.persistAndFlush(comment)

    const commentAfter = await this.repository.findOne(comment) as Comment
    return this.mapper.toDTO(commentAfter)
  }
}
