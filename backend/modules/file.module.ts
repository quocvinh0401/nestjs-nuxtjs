import { FileController } from "@/controllers/file.controller";
import { User } from "@/entities/user.entity";
import { FileService } from "@/services/file.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

@Module({
    imports: [MikroOrmModule.forFeature([User])],
    controllers: [FileController],
    providers: [FileService,]
})

export class FileModule{}