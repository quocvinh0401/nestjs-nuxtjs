import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('request------->>>>:', request)
    return request.headers.authorization.split(' ')[1];
})