import { FileService } from "@/services/file.service";
import { Body, Controller, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express'
import { Multer } from 'multer'
import { storage } from "@/config/cloudinary.config";
import { AuthGuard, AuthUser } from "@/security";

@Controller('file')
@UseGuards(AuthGuard)
export class FileController {
    constructor( private service: FileService){}

    @Post('avatar')
    @UseInterceptors(FileInterceptor('file', { storage: storage}))
    async avatar(@UploadedFile() file: Express.Multer.File, @AuthUser() user: any){
        return await this.service.setAvatar(file, user)
    }
}