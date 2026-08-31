import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkerService {
  processFile(body: object): string {
    
    return 'Hello World!';
  }
}
