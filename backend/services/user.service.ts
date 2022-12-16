import { User } from "@/entities/user.entity";
import { EntityManager, MongoEntityRepository } from "@mikro-orm/mongodb";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Service } from "./support/service";

@Injectable()
export class UserService extends Service<User> {
    constructor(
        @InjectRepository(User)
        protected readonly repository: MongoEntityRepository<User>,
        protected readonly em: EntityManager
    ){
        super( repository, em)
    }
}