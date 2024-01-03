import { describe, expect, it } from 'vitest';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';

import { handler } from './board';

describe('board', () => {
  const context = {} as Context;

  it('should return a board', async () => {
    const event = {} as unknown as APIGatewayProxyEventV2;

    const response = await handler(event, context);

    expect(response.statusCode).toEqual(200);
  });
});
