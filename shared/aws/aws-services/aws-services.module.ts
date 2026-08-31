import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsServicesService } from './aws-services.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  providers: [AwsServicesService],
})
export class AwsServicesModule {}
