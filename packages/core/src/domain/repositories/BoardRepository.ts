import { Board } from '../entities';

export abstract class BoardRepository {
  abstract findBoardById(id: string): Promise<Board>;
  abstract findBoardsByIds(ids: string[]): Promise<Board[]>;
  abstract findBoardsByUserId(userId: string): Promise<Board[]>;
}
