import { Handler, Context, SQSEvent, SQSBatchResponse, SQSRecord } from 'aws-lambda';

import { NestFactory } from '@nestjs/core';

import { WorkerModule } from './worker.module';
import { WorkerService } from './worker.service';

// cached to enhance cold start
let appContextPromise: ReturnType<typeof NestFactory.createApplicationContext> | null = null;

async function getAppContext() {
  if (!appContextPromise) {
    appContextPromise = NestFactory.createApplicationContext(WorkerModule, {
      logger: ['error', 'warn'], // clean logs
    });
  }
  return appContextPromise;
}

export const handler: Handler<SQSEvent, SQSBatchResponse> = async (
  event: SQSEvent,
  context: Context,
) => {
  const appContext = await getAppContext();
  const workerService = appContext.get(WorkerService);

  const batchItemFailures: { itemIdentifier: string }[] = [];

  for (const record of event.Records) {
    try {
      await processRecord(record, workerService);
    } catch (err) {
      console.error(`Error procesando mensaje ${record.messageId}`, err);
      batchItemFailures.push({ itemIdentifier: record.messageId });
    }
  }

  // return to DLQ failures
  return { batchItemFailures };
};

async function processRecord(record: SQSRecord, workerService: WorkerService) {
  const body = JSON.parse(record.body);

  // Tu lógica X acá
  await workerService.processFile(body);
}
