import { BoardColumn } from './BoardColumn';

export class Board {
  constructor(
    public id: string,
    public name: string,
    public createdAt: Date,
    public columns: BoardColumn[],
  ) {}

  static create(board: Board) {
    return new Board(board.id, board.name, board.createdAt, board.columns);
  }
}
