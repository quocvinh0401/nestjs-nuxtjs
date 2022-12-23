import { Property, PrimaryKey } from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { random } from 'lodash';
export class BaseEntity {
  @PrimaryKey({ type: String, fieldName: '_id', onCreate: () => randomUUID() })
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
