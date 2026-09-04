import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketNameRaw       = process.env.ORIGINALS_BUCKET_NAME;
  private bucketNameProcessed = process.env.PROCESSED_BUCKET_NAME;

  constructor() {
    this.s3Client = new S3Client([
      {
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      }
    ]);
  }

  async getPresignedUploadUrl(fileName: string, fileType: string, isRawBucket = true) {
    
    const bucket = (isRawBucket) ? this.bucketNameRaw : this.bucketNameProcessed ;

    const key = `uploads/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: fileType,
    });

    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: 300
    });

    return { url, key };
  }

  async downloadFileAsBuffer(key: string, isRawBucket = true): Promise<Buffer> {

    const bucket = (isRawBucket) ? this.bucketNameRaw : this.bucketNameProcessed ;

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const response = await this.s3Client.send(command);

    // response.Body is stream (Readable)
    const stream = response.Body as Readable;

    return this.streamToBuffer(stream);
  }

  private streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {

      const chunks: Buffer[] = [];
      
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}
