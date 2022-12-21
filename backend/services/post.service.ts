import { PostDTO } from '@/dto/post.dto';
import { Post } from '@/entities/post.entity';
import { Interact } from '@/entities/shared/post.interface'
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { MongoEntityRepository, EntityManager } from '@mikro-orm/mongodb';
import { Builder } from 'builder-pattern';
import { Service } from './support/service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/entities/user.entity';
import { pick } from 'lodash';

@Injectable()
export class PostService extends Service<Post, PostDTO> {
  constructor(
    @InjectRepository(Post)
    protected readonly repository: MongoEntityRepository<Post>,
    protected readonly em: EntityManager,
    protected readonly jwtService: JwtService,
  ) {
    super(repository, em);
  }

  async find(): Promise<Post[]> {
    const posts = await this.em.find(Post, {}, { orderBy: { createdAt: 'desc' } });
    return posts;
  }

  create(dto: any, user: any) {
    const _user = this.jwtService.decode(user) as User;
    const post = this.em.create(Post, 
        Builder<Post>()
        .user(pick<User, keyof User>(_user, ['login', 'avatar', 'firstName', 'lastName']))
        .manageAccess(dto.manageAccess)
        .content(dto.content)
        .interact(Builder<Interact>().like([]).comment([]).share([]).build())
        .comments([])
        .build()
        )
    this.em.persistAndFlush(post)
  }
}
