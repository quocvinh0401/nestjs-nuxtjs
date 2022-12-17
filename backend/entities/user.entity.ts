import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseUserEntity } from './support/base.entity';
import { User as iUser } from './shared/user.interface';
import { UserStatus } from './shared/enum';

@Entity()
export class User extends BaseUserEntity implements iUser {
  @PrimaryKey({ type: String, fieldName: '_id' })
  login!: string;

  @Property()
  password!: string

  @Property()
  avatar!: string;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  fullName!: string;

  @Property()
  friends!: User[];

  @Property()
  status!: UserStatus;
}
