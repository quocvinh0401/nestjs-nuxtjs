import { AuthenticationDTO } from '@/dto/authentication.dto';
import { UserDTO } from '@/dto/user.dto';
import { UserService } from '@/services/user.service';
import { Controller } from '@nestjs/common';
import { Body, Get, Post, Query } from '@nestjs/common/decorators';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get('exist')
  exist(
    @Query('key') key: string,
    @Query('value') value: string,
  ): Promise<boolean> {
    return this.service.exist(key, value);
  }

  @Post('register')
  create(@Body() dto: UserDTO): Promise<any> {
    return this.service.create(dto);
  }

  @Post('login')
  login(@Body() dto: AuthenticationDTO): Promise<any> {
    return this.service.login(dto);
  }
}
