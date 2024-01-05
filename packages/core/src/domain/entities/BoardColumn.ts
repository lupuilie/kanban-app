import { Task } from './Task';

export class BoardColumn {
  constructor(
    public boardId: string,
    public columnId: string,
    public name: string,
    public color: string,
    public position: number,
    public createdAt: Date,
    public tasks: Task[],
  ) {}

  static create(boardColumn: BoardColumn) {
    return new BoardColumn(
      boardColumn.boardId,
      boardColumn.columnId,
      boardColumn.name,
      boardColumn.color,
      boardColumn.position,
      boardColumn.createdAt,
      boardColumn.tasks,
    );
  }
}
