export enum BoardAccessRole {
  CONTRIBUTOR = 'CONTRIBUTOR',
}

export class BoardAccess {
  constructor(
    public userId: string,
    public boardId: string,
    public role: BoardAccessRole,
    public createdAt: Date,
  ) {}

  static create(boardAccess: BoardAccess) {
    return new BoardAccess(boardAccess.userId, boardAccess.boardId, boardAccess.role, boardAccess.createdAt);
  }
}
