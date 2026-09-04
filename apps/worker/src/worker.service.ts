import { Injectable } from '@nestjs/common';
import { S3Service } from '@shared/aws/aws-services/s3.service';
import { SqsServiceService } from '@shared/aws/aws-services/sqs-service.service';
import { SqsMessage, SqsMessageBody } from '@shared/aws/interfaces/sqs-body-message.interface';
import { PdfLibService } from '@shared/integrations/pdf-lib/pdf-lib.service';
import axios from 'axios';

@Injectable()
export class WorkerService {

  constructor(
    private readonly s3Service: S3Service,
    private readonly sqsServiceService: SqsServiceService,
    private readonly pdfLibService: PdfLibService,
  ){}

  async processFile(bodyEvent: SqsMessageBody) {

    try {
      // const bodyParseEvent: SqsMessageBody = JSON.parse(bodyEvent)
      const { key:full_file_key } = bodyEvent;

      const originalKey  = full_file_key.split('/').at(1) || 'default';
      const originalname = originalKey.split('-').at(1) || 'default';

      const mimetype     = 'application/pdf'

      const fileBufferWithOutCompress = await this.s3Service.downloadFileAsBuffer(full_file_key)
      
      const fileBufferCompressed      = await this.pdfLibService.compress(fileBufferWithOutCompress)

      const { url, key } = await this.s3Service.getPresignedUploadUrl(originalname.toString(), mimetype, false);

      const { status, statusText } = await axios.put(url, fileBufferCompressed, {
        headers: {
          'Content-Type': 'application/pdf',
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });

      // Publish SQS event
      await this.sqsServiceService.sendMessage({
        event: 'file.processed',
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
      console.log(error);
    }
  }
}
