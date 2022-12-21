import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers.authorization.split(' ')[1];
})