import { AuthenticationService } from '@/services/authentication.service';
import { Controller, Post } from '@nestjs/common';

@Controller('authentication')
export class AuthenticationController {
  constructor(private service: AuthenticationService) {}
}
