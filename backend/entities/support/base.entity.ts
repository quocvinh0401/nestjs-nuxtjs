import { Property, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';

export class BaseEntity {
  @PrimaryKey({ type: String, fieldName: '_id', onCreate: () => v4() })
  id!: string;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onUpdate: () => new Date() })
  updatedAt!: Date;

  @Property()
  createdBy!: string;

  @Property()
  updatedBy!: string;
}

export class BaseUserEntity {
  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onUpdate: () => new Date() })
  updatedAt!: Date;

  @Property()
  createdBy!: string;

  @Property()
  updatedBy!: string;
}
