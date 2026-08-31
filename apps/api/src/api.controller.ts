import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiService } from './api.service';
@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: any) {
    return this.apiService.uploadFile(file);
  }
}
