import { AuthenticationDTO } from '@/dto/authentication.dto';
import { UserDTO } from '@/dto/user.dto';
import { UserService } from '@/services/user.service';
import { Controller } from '@nestjs/common';
import { Body, Get, HttpCode, Patch, Post, Query, Req, Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { Request, Response } from 'express';

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

  @Get(':id')
  async getUser(@Query('id') id: string){
    return await this.service.getUser(id)
  }

  @Post('register')
  create(@Body() dto: UserDTO): Promise<any> {
    return this.service.create(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthenticationDTO, @Res() res: Response, @Req() req: Request): Promise<any> {
    return res.json(await this.service.login(dto));
  }

  @Patch('logout')
  logout(@Body() dto: UserDTO): Promise<void> {
    return this.service.logout(dto)
  }
}
