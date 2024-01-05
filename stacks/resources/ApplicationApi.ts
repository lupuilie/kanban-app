import { Api, Stack } from 'sst/constructs';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';

import { BoardsTable } from './BoardsTable';

export class ApplicationAPI {
  static resource: Api;

  private constructor() {}

  static provision(stack: Stack) {
    if (!ApplicationAPI.resource) {
      const role = ApplicationAPI.provisionExecutionRole(stack);
      const boardsTable = BoardsTable.provision(stack);

      const api = new Api(stack, 'api', {
        defaults: {
          function: {
            timeout: '30 seconds',
            role: role,
            bind: [boardsTable],
          },
        },
        routes: {
          'GET /status': 'packages/functions/src/handlers/status.handler',
          'POST /boards': 'packages/functions/src/handlers/boards/create/create.handler',
        },
      });

      ApplicationAPI.resource = api;
    }

    return ApplicationAPI.resource;
  }

  static provisionExecutionRole(stack: Stack) {
    return new Role(stack, 'ApiRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        {
          managedPolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
        },
      ],
    });
  }
}
