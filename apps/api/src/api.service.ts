import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { S3Service } from '@shared/aws/aws-services/s3.service';
import { SqsServiceService } from '@shared/aws/aws-services/sqs-service.service';

@Injectable()
export class ApiService {

  constructor(
    private readonly s3Service: S3Service,
    private readonly sqsServiceService: SqsServiceService,
  ){}

  async uploadFile(uploadFile: any) {

    try {

      const { originalname, mimetype, buffer } = uploadFile
      const { url, key } = await this.s3Service.getPresignedUploadUrl(originalname, mimetype);

      const { status, statusText } = await axios.put(url, buffer, {
        headers: {
          'Content-Type': mimetype,
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });

      // Publish SQS event
      await this.sqsServiceService.sendMessage({
        event: 'file.uploaded',
        key,
        originalname,
        mimetype,
        uploadedAt: new Date().toISOString(),
      })
      
      return {
        statusCode: status,
        message: statusText
      }

    } catch (error) {
      throw error;
    }


  }
}

