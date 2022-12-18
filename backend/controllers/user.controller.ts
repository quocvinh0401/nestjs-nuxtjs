import { UserDTO } from '@/dto/user.dto';
import { UserService } from '@/services/user.service';
import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';

@Controller('user')
export class UserController {
    constructor(private service: UserService){}

  @Post()
  create(@Body() dto: UserDTO): Promise<any> {
    return this.service.create(dto);
  }
}
