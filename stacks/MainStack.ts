import { StackContext } from 'sst/constructs';

import { ApplicationAPI } from '@kanban-app/stacks/resources/ApplicationApi';
import { NextFrontend } from '@kanban-app/stacks/resources/NextFrontend';

export function MainStack({ stack }: StackContext) {
  const api = ApplicationAPI.provision(stack);
  const web = NextFrontend.provision(stack);

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebEndpoint: web.url ?? 'http://localhost:3000',
  });
}
