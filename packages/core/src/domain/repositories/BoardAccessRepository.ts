import { BoardAccess } from '../entities';

export abstract class BoardAccessRepository {
  abstract findByUserId(userId: string): Promise<BoardAccess[]>;
  abstract create(boardAccess: BoardAccess): Promise<BoardAccess>;
}
