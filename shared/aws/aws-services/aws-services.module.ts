import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SqsServiceService } from './sqs-service.service';
import { S3Service } from './s3.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  providers: [S3Service, SqsServiceService],
  exports: [S3Service, SqsServiceService]
})
export class AwsServicesModule {}
