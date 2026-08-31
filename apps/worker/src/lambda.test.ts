import { handler } from './lambda';
import { SQSEvent, Context } from 'aws-lambda';

const fakeEvent: SQSEvent = {
  Records: [
    {
      messageId: '1',
      receiptHandle: 'fake-handle',
      body: JSON.stringify({ foo: 'bar' }), // acá tu payload real
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

(async() => {

  await handler(fakeEvent, fakeContext, () => {
    console.log('algo...');
  })

})();

// handler(fakeEvent, fakeContext, () => {}).then((res) => {
//   console.log('Resultado:', res);
// });