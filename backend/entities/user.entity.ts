import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './support/base.entity';
import { User as iUser } from './shared/user.interface';
import { UserStatus } from './shared/enum';

@Entity()
export class User extends BaseEntity implements iUser {
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
