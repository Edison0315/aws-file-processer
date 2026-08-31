import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SqsServiceService {
  private sqsClient: SQSClient;
  private queueUrl = process.env.SQS_QUEUE_URL;

  constructor() {
    this.sqsClient = new SQSClient([
      {
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      }
    ]);
  }

  async sendMessage(payload: Record<string, any>) {
    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(payload),
    });

    const response = await this.sqsClient.send(command);
    return response.MessageId;
  }
}
