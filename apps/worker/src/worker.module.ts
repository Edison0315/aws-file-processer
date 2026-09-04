import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { AwsServicesModule } from '@shared/aws/aws-services/aws-services.module';
import { PdfLibService } from '@shared/integrations/pdf-lib/pdf-lib.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AwsServicesModule
  ],
  controllers: [WorkerController],
  providers: [
    WorkerService,
    PdfLibService
  ],
})
export class WorkerModule {}
