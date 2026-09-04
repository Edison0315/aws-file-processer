export interface SqsMessage {
  messageId: string;
  receiptHandle: string;
  body: string;
  attributes: Record<string, unknown>;
  messageAttributes: Record<string, unknown>;
  md5OfBody: string;
  eventSource: string;
  eventSourceARN: string;
  awsRegion: string;
}

export interface SqsMessageBody {
  event: string;
  key: string;
  originalname: string;
  mimetype: string;
  uploadedAt: string;
}



