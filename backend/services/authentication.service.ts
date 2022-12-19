import { UserDTO } from "@/dto/user.dto";
import { User } from "@/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { Service } from "./support/service";

@Injectable()
export class AuthenticationService extends Service<User, UserDTO> {
    
}