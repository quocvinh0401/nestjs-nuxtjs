import { UserController } from '@/controllers/user.controller';
import { User } from '@/entities/user.entity';
import { JwtStrategy } from '@/security/passport.jwt.strategy';
import { UserMapper } from '@/services/mappers/user.mapper';
import { UserService } from '@/services/user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('security.authentication.jwt.secret'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [JwtStrategy, UserService, UserMapper],
})
export class UserModule {}
