import { MongoEntityRepository, EntityManager} from '@mikro-orm/mongodb'


export abstract class Service<E extends object, D> {
    constructor(
        protected readonly repository: MongoEntityRepository<E>,
        protected readonly em: EntityManager
    ){}
}