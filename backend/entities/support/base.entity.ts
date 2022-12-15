import { Property } from "@mikro-orm/core";

export class BaseEntity {
    @Property({ onCreate: () => new Date() })
    createdAt!: Date

    @Property({ onUpdate: () => new Date()})
    updatedAt!: Date

    @Property()
    createdBy!: string
    
    @Property()
    updatedBy!: string;
}