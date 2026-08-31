import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { AwsServicesService } from 'shared/aws/aws-services/aws-services.service';

@Injectable()
export class ApiService {

  constructor(
    private readonly awsServicesService: AwsServicesService
  ){}

  async uploadFile(uploadFile: any) {

    try {

      const { originalname, mimetype, buffer } = uploadFile
      const { url } = await this.awsServicesService.getPresignedUploadUrl(originalname, mimetype);

      const { status, statusText } = await axios.put(url, buffer, {
        headers: {
          'Content-Type': mimetype,
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });

      return {
        statusCode: status,
        message: statusText
      }

    } catch (error) {
      throw error;
    }


  }
}

