import { StackContext, Api } from 'sst/constructs';

export function MainStack({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    routes: {
      'GET /status': 'packages/functions/src/handlers/status.handler',
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
