import { Injectable } from "@nestjs/common";
import { Service } from "./support/service";
import { v2 as cloudinary } from 'cloudinary'
import { EntityManager, MongoEntityRepository } from "@mikro-orm/mongodb";
import { User } from "@/entities/user.entity";
import { InjectRepository } from "@mikro-orm/nestjs";
import { UserDTO } from "@/dto/user.dto";

@Injectable()
export class FileService extends Service<User, UserDTO>{
    constructor(
        @InjectRepository(User)
        protected readonly repository: MongoEntityRepository<User>,
        protected readonly em: EntityManager,
    ){ super(repository, em)}

    async setAvatar(file: any, user: any){
        const _user = await this.repository.findOne({userId: user.userId}) as User
        const res = await cloudinary.uploader.upload(file.path, {
            public_id: `${_user.userId}`,
            resource_type: 'auto',
            folder: 'social-media/image'
        })

        _user.avatar = res.url
        await this.em.persistAndFlush(_user)
        return res
    }
}