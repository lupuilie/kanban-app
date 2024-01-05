import { ZodError } from 'zod';
import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb';

export class ApiResponse {
  public readonly headers: Record<string, string>;

  constructor(
    public readonly statusCode: number,
    public readonly body: string,
    headers?: Record<string, string>,
  ) {
    this.headers = {
      'Content-Type': 'application/json',
      ...(headers || {}),
    };
  }
}

export class SuccessResponse extends ApiResponse {
  constructor(body?: unknown, statusCode: number = 200) {
    const responseBody = body ? JSON.stringify(body) : '';
    super(statusCode, responseBody);
  }
}

export class ErrorResponse extends ApiResponse {
  constructor(error?: unknown, statusCode: number = 400) {
    if (error instanceof ZodError) {
      super(statusCode, JSON.stringify({ statusCode, errors: error.issues }));
      return;
    } else if (error instanceof DynamoDBServiceException) {
      super(statusCode, JSON.stringify({ error: { statusCode, name: error.name, message: error.message } }));
      return;
    } else if (error instanceof Error) {
      const { name, message } = error;
      super(statusCode, JSON.stringify({ error: { statusCode, name, message } }));
      return;
    }

    super(500, 'Internal Server Error');
  }
}
