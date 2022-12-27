import { AuthGuard as NestAuthGuard } from "@nestjs/passport";

export class AuthGuard extends NestAuthGuard('jwt'){
    
}