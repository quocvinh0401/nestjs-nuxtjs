import { UserDTO } from "@/dto/user.dto";
import { User } from "@/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Mapper } from "./support/base.mapper";

@Injectable()
export class UserMapper extends Mapper<User, UserDTO>{
    toDTO(entity: User): UserDTO {
        return Builder<UserDTO>()
            .login(entity.login)
            .firstName(entity.firstName)
            .lastName(entity.lastName)
            .dateOfBirth(entity.dateOfBirth)
            .gender(entity.gender)
            .avatar(entity.avatar)
            .friends(entity.friends)

            .createdAt(entity.createdAt)
            .updatedAt(entity.updatedAt)
            .createdBy(entity.createdBy)
            .updatedBy(entity.updatedBy)
            .build()
    }

    toEntity(dto: UserDTO): User {
        return Builder<User>().build()
    }
}