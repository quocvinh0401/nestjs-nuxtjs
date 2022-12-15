import { PostDTO } from "@/dto/post.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PostService {
    create(dto: any){
        console.log('post->>>>>>>>>', dto)
        return 'post'
    }
}