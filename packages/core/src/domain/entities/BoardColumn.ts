export class BoardColumn {
  constructor(
    public boardId: string,
    public columnId: string,
    public name: string,
    public color: string,
    public position: number,
    public createdAt: Date,
  ) {}

  static create(boardColumn: BoardColumn) {
    return new BoardColumn(
      boardColumn.boardId,
      boardColumn.columnId,
      boardColumn.name,
      boardColumn.color,
      boardColumn.position,
      boardColumn.createdAt,
    );
  }
}
