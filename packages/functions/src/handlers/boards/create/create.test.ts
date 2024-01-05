import { describe, expect, it } from 'vitest';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';

import { handler } from './create';
import { createApiGatewayEvent } from '@kanban-app/functions/shared/TestUtils';

describe('create', () => {
  const context = {} as Context;

  it('should return status code 200', async () => {
    const eventBody = JSON.stringify({ name: 'John Doe' });
    const event = createApiGatewayEvent({ body: eventBody });

    const response = await handler(event, context);

    expect(response.statusCode).toEqual(200);
  });
});
