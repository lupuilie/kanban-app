import { faker } from '@faker-js/faker';

import { BoardAccess, BoardAccessRole } from '@kanban-app/core/domain/entities';

export class BoardAccessBuilder {
  static build(boardAccess: Partial<BoardAccess>) {
    return BoardAccess.create({
      userId: boardAccess?.userId ?? faker.string.uuid(),
      boardId: boardAccess?.boardId ?? faker.string.uuid(),
      role: boardAccess?.role ?? BoardAccessRole.CONTRIBUTOR,
      createdAt: boardAccess?.createdAt ?? faker.date.recent(),
    });
  }
}
