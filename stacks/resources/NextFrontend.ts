import { NextjsSite, Stack } from 'sst/constructs';

import { ApplicationAPI } from '@kanban-app/stacks/resources/ApplicationApi';

export class NextFrontend {
  static resource: NextjsSite;

  private constructor() {}

  static provision(stack: Stack) {
    if (!NextFrontend.resource) {
      const api = ApplicationAPI.provision(stack);

      NextFrontend.resource = new NextjsSite(stack, 'web', {
        path: 'packages/web',
        environment: {
          NEXT_PUBLIC_API_ENDPOINT: api.url,
        },
      });
    }

    return NextFrontend.resource;
  }
}
