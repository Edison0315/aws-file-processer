import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { AwsServicesModule } from '@shared/aws/aws-services/aws-services.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AwsServicesModule,
  ],
  controllers: [ApiController],
  providers: [
    ApiService, 
  ],
})
export class ApiModule {}
