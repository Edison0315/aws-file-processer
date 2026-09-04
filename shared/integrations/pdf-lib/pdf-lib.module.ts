import { Module } from '@nestjs/common';
import { PdfLibService } from './pdf-lib.service';

@Module({
  providers: [PdfLibService],
  exports: [PdfLibService]
})
export class PdfLibModule {}
