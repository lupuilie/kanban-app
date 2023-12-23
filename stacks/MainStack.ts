import { StackContext, Api, NextjsSite } from 'sst/constructs';

export function MainStack({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    routes: {
      'GET /status': 'packages/functions/src/handlers/status.handler',
    },
  });

  const web = new NextjsSite(stack, 'web', {
    path: 'packages/web',
    environment: {
      NEXT_PUBLIC_API_ENDPOINT: api.url,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebEndpoint: web.url ?? 'http://localhost:3000',
  });
}
