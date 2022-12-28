import { PostDTO } from '@/dto/post.dto';
import { Post } from '@/entities/post.entity';
import { Interact, Like } from '@/entities/shared/post.interface';
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

  async find(user: any): Promise<Post[]> {
    const posts = await this.em.aggregate(Post, [
      {
        $match: {
          hideUserList: {
            $nin: [user.login]
          }
        }
      },
      {
        $lookup: {
          from: 'comment',
          localField: '_id',
          foreignField: 'postId',
          as: 'comments',
          pipeline: [
            {
              $sort: {
                createdAt: -1,
              },
            },
          ],
        },
      },
      {
        $addFields: { id: '$_id' }
      },
      {
        $unset: '_id'
      },
      {
        $sort: {
          createdAt: -1
        }
      }
    ]);

    return posts;
  }

  async create(dto: any, user: any) {
    const post = this.em.create(
      Post,
      Builder<Post>()
        .user(
          pick<User, keyof User>(user, [ 'login', 'avatar', 'firstName', 'lastName']))
        .manageAccess(dto.manageAccess)
        .content(dto.content)
        .interact(Builder<Interact>().like([]).comment([]).share([]).build())
        .comments([])
        .hideUserList([])
        .build(),
    );
    await this.em.persistAndFlush(post);
  }

  async like(dto: Like, id: string) {
    const post = await this.repository.findOne(id) as Post
    const _like = post.interact.like
    const index = _like.findIndex(l => l.user.login == dto.user.login)
    if (index == -1) {
      _like.push(dto)
    }
    else {
      if (dto.action) _like[index].action = dto.action
      else _like.splice(index, 1)
    }
    this.em.flush()
  }

  async delete(id: string, user: any){
    const post = await this.repository.findOne(id) as Post
    post.hideUserList.push(user.login)
    await this.em.flush()
  }
}
