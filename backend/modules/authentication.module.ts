import { AuthenticationController } from "@/controllers/authentication.controller";
import { AuthenticationService } from "@/services/authentication.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [],
    controllers: [AuthenticationController],
    providers: [AuthenticationService]
})
export class AuthenticationModule {}