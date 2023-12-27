import { Task } from './Task';

export type BoardColumnColor = 'purple' | 'cyan' | 'green';

export class BoardColumn {
  constructor(
    public name: string,
    public createdAt: Date,
    public color: BoardColumnColor,
    public tasks: Task[],
  ) {}

  static create(boardColumn: BoardColumn) {
    return new BoardColumn(
      boardColumn.name,
      boardColumn.createdAt,
      boardColumn.color,
      boardColumn.tasks,
    );
  }
}
