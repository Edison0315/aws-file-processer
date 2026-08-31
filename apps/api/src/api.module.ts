import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { AwsServicesService } from '@shared/aws/aws-services/aws-services.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [ApiController],
  providers: [ApiService, AwsServicesService],
})
export class ApiModule {}
