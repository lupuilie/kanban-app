import { Board } from '../entities';

export abstract class BoardRepository {
  abstract findById(id: string): Promise<Board[]>;
  abstract findByUserId(userId: string): Promise<Board[]>;
}
