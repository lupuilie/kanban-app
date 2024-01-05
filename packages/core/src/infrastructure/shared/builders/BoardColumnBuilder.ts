import { faker } from '@faker-js/faker';

import { BoardColumn } from '@kanban-app/core/domain/entities';

export class BoardColumnBuilder {
  static build(boardColumn: Partial<BoardColumn>) {
    return BoardColumn.create({
      boardId: boardColumn?.boardId ?? faker.string.uuid(),
      columnId: boardColumn?.columnId ?? faker.string.uuid(),
      name: boardColumn?.name ?? faker.lorem.word(),
      color: boardColumn?.color ?? faker.internet.color(),
      position: boardColumn?.position ?? faker.datatype.number(),
      createdAt: boardColumn?.createdAt ?? faker.date.recent(),
    });
  }
}
