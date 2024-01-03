import { Stack, Table } from 'sst/constructs';

export class BoardsTable {
  static resource: Table;

  private constructor() {}

  static provision(stack: Stack) {
    if (!BoardsTable.resource) {
      BoardsTable.resource = new Table(stack, 'BoardsTable', {
        primaryIndex: {
          partitionKey: 'PK',
          sortKey: 'SK',
        },
        fields: {
          PK: 'string',
          SK: 'string',
          EntityType: 'string',
        },
      });
    }

    return BoardsTable.resource;
  }
}
