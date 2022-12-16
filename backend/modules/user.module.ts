import { UserController } from "@/controllers/user.controller";
import { User } from "@/entities/user.entity";
import { UserService } from "@/services/user.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MikroOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule {}