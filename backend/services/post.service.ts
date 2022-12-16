import { PostDTO } from "@/dto/post.dto";
import { Post } from "@/entities/post.entity";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MongoEntityRepository, EntityManager} from '@mikro-orm/mongodb'
import { Builder } from "builder-pattern";
import { Service } from "./support/service";

@Injectable()
export class PostService extends Service<any> {

    constructor(
        @InjectRepository(Post)
        protected readonly repository: MongoEntityRepository<Post>,
        protected readonly em: EntityManager
    ){ super(repository, em) }

    async find(){
        const posts = await this.em.find(Post, {})
        return posts
    }

    create(dto: any){
        const post = this.em.create(Post, Builder<Post>().title(dto.content).build())
        this.em.persistAndFlush(post)
    }
}