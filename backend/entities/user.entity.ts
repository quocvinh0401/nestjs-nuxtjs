import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseUserEntity } from './support/base.entity';
import { User as iUser } from './shared/user.interface';
import { UserGender, UserStatus } from './shared/enum';
import { DateOfBirth } from './shared/interface';
import { randomUUID } from 'crypto';

@Entity()
export class User extends BaseUserEntity implements iUser {
  @PrimaryKey({ fieldName: '_id' }) login!: string;
  @PrimaryKey({ onCreate: () => randomUUID() }) userId!: string;
  @Property() password!: string;
  @Property() avatar!: string;
  @Property() background!: string;
  @Property() firstName!: string;
  @Property() lastName!: string;
  @Property() dateOfBirth!: DateOfBirth;
  @Property() gender!: UserGender;
  @Property() friends!: User[];
  @Property() status!: UserStatus;
}
