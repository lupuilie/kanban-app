import { describe, expect, it } from 'vitest';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';

import { handler } from './getAll';

describe('getAll', () => {
  const context = {} as Context;

  it('should return status code 200', async () => {
    const event = {} as unknown as APIGatewayProxyEventV2;

    const response = await handler(event, context);

    expect(response.statusCode).toEqual(200);
  });
});
