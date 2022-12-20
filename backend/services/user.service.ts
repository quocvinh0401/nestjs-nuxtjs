import { UserDTO } from '@/dto/user.dto';
import { UserStatus } from '@/entities/shared/enum';
import { User } from '@/entities/user.entity';
import { EntityManager, MongoEntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { Service } from './support/service';
import { hash, compare } from 'bcrypt';
import { UserMapper } from './mappers/user.mapper';
import { AuthenticationDTO } from '@/dto/authentication.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService extends Service<User, UserDTO> {
  constructor(
    @InjectRepository(User)
    protected readonly repository: MongoEntityRepository<User>,
    protected readonly em: EntityManager,
    protected readonly mapper: UserMapper,
    protected readonly jwtService: JwtService,
  ) {
    super(repository, em);
  }

  async create(dto: UserDTO) {
    console.log('dto----------->>>>>>>>', dto);
    const user = this.em.create(
      User,
      Builder<User>().avatar('').friends([]).status(UserStatus.OFFLINE).build(),
    );
    user.login = dto.login;
    user.password = await hash(dto.password, 10);
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.dateOfBirth = dto.dateOfBirth;
    user.gender = dto.gender;

    await this.em.persistAndFlush(user);
    return this.mapper.toDTO(user);
  }

  async login(dto: AuthenticationDTO): Promise<any> {
    const user = await this.em.findOne(User, { login: dto.login });
    if (user && (await compare(dto.password, user.password))) {
      user.status = UserStatus.ONLINE;
      this.em.flush();
      const payload = Builder<any>().login(user.login).build();
      return [this.jwtService.sign(payload), this.mapper.toDTO(user)];
    } else {
      return false;
    }
  }

  async exist(key: string, value: string): Promise<boolean> {
    const user = await this.em.findOne(User, { login: value });
    if (user) return true;
    return false;
  }

  async logout(dto: UserDTO): Promise<void> {
    const user = await this.em.findOne(User, { login: dto.login });
    if (user) user.status = UserStatus.OFFLINE;

    this.em.flush();
  }
}
