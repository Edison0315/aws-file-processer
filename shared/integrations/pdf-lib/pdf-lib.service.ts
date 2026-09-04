import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';

export type CompressionLevel = 'low' | 'medium' | 'high';

@Injectable()
export class PdfLibService {
  
  async compress(
    input: Buffer,
    level: CompressionLevel = 'high',
  ): Promise<Buffer> {
    const doc = await PDFDocument.load(input, {
      ignoreEncryption: true,
      updateMetadata: false,
    });
    doc.setTitle('');
    doc.setAuthor('');
    doc.setSubject('');
    doc.setKeywords([]);
    doc.setProducer('');
    doc.setCreator('');
    const options: Parameters<typeof doc.save>[0] = {
      useObjectStreams: true,
      addDefaultPage: false,
    };
    if (level === 'high') {
      options.objectsPerTick = 50;
    }
    return Buffer.from(await doc.save(options));
  }
}
