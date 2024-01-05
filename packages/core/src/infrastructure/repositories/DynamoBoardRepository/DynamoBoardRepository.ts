import { Table } from 'sst/node/table';

import { DynamoDB, ConditionalCheckFailedException, DynamoDBServiceException } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

import { Board } from '@kanban-app/core/domain/entities';
import { BoardRepository } from '@kanban-app/core/domain/repositories';
import { InvalidInputException } from '@kanban-app/core/domain/types';

export const EntityType = 'BOARD';

export class DynamoBoardRepository implements BoardRepository {
  client: DynamoDBDocumentClient;

  constructor() {
    this.client = DynamoDBDocumentClient.from(new DynamoDB(), { marshallOptions: { convertClassInstanceToMap: true } });
  }

  findBoardById(id: string): Promise<Board> {
    throw new Error('Method not implemented.');
  }
  findBoardsByIds(ids: string[]): Promise<Board[]> {
    throw new Error('Method not implemented.');
  }
  findBoardsByUserId(userId: string): Promise<Board[]> {
    throw new Error('Method not implemented.');
  }
  async create(board: Board): Promise<Board> {
    try {
      const command = new PutCommand({
        TableName: Table.BoardsTable.tableName,
        ConditionExpression: 'attribute_not_exists(PK)',
        Item: {
          PK: `BOARD#${board.id}`,
          SK: `BOARD#${board.id}`,
          EntityType,
          ...board,
        },
      });

      await this.client.send(command);

      return board;
    } catch (error) {
      if (error instanceof ConditionalCheckFailedException) {
        throw new InvalidInputException(`board with id <${board.id}> already exists`);
      } else if (error instanceof DynamoDBServiceException) {
        throw error;
      }

      throw new Error('Could not create board');
    }
  }
}
