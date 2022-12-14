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
            $nin: [user.userId]
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
        $lookup: {
          from: 'user',
          localField: 'userId',
          foreignField: 'userId',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
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
        .userId(user.userId)
        .manageAccess(dto.manageAccess)
        .content(dto.content)
        .interact(Builder<Interact>().like([]).comment([]).share([]).build())
        .comments([])
        .hideUserList([])
        .build(),
    );
    await this.em.persistAndFlush(post);
    post.user = user
    return post
  }

  async like(dto: Like, id: string) {
    const post = await this.repository.findOne(id) as Post
    const _like = post.interact.like
    const index = _like.findIndex(l => l.user.userId == dto.user.userId)
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
    post.hideUserList.push(user.userId)
    await this.em.flush()
  }

  async undoDelete(id: string, user: any){
    const post = await this.repository.findOne(id) as Post
    const index = post.hideUserList.findIndex(u => u == user.userId)
    post.hideUserList.splice(index, 1)
    await this.em.flush()
  }
}
