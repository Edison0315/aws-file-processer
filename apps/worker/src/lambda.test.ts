import { handler } from './lambda';
import { SQSEvent, Context } from 'aws-lambda';

const fakeEvent: SQSEvent = {
  Records: [
    {
      messageId: '1',
      receiptHandle: 'fake-handle',
      body: JSON.stringify({"event":"file.uploaded","key":"uploads/1788172555115-default.pdf","originalname":"default.pdf","mimetype":"application/pdf","uploadedAt":"2026-08-31T10:35:55.374Z"}),
      attributes: {} as any,
      messageAttributes: {},
      md5OfBody: '',
      eventSource: 'aws:sqs',
      eventSourceARN: 'arn:aws:sqs:us-east-1:000000000000:mi-cola',
      awsRegion: 'us-east-1',
    },
  ],
};

const fakeContext = {} as Context;

async function main() {
  const result = await handler(fakeEvent, fakeContext, () => {});
}

main().catch((err) => {
  console.error('Error en la ejecución:', err);
});