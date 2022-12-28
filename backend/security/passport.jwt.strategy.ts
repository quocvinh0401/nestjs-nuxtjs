import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt'
import { Payload } from './payload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private configService: ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('security.authentication.jwt.secret')
        })
    }

    async validate(payload: Payload, done: VerifiedCallback): Promise<any>{
        return done(null, payload)
    }
}