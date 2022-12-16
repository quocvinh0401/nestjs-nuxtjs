import { Property, PrimaryKey } from "@mikro-orm/core";
import {Long} from 'bson'

export class BaseEntity {
    @PrimaryKey({type: Long, fieldName: '_id'})
    id!: Long

    @Property({ onCreate: () => new Date() })
    createdAt!: Date

    @Property({ onUpdate: () => new Date()})
    updatedAt!: Date

    @Property()
    createdBy!: string
    
    @Property()
    updatedBy!: string;
}