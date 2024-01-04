import { faker } from '@faker-js/faker';

import { Board } from '@kanban-app/core/domain/entities';

export class BoardBuilder {
  static build(board?: Partial<Board>) {
    return Board.create({
      id: board?.id ?? faker.string.uuid(),
      name: board?.name ?? faker.lorem.words({ min: 2, max: 4 }),
      createdAt: board?.createdAt ?? faker.date.recent(),
      columns: board?.columns ?? [],
    });
  }
}
