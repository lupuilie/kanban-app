import { faker } from '@faker-js/faker';

import { Subtask } from '@kanban-app/core/domain/entities';

export class SubtaskBuilder {
  static build(subtask?: Partial<Subtask>) {
    return Subtask.create({
      id: subtask?.id ?? faker.string.uuid(),
      title: subtask?.title ?? faker.lorem.words({ min: 2, max: 4 }),
      isCompleted: subtask?.isCompleted ?? faker.datatype.boolean(),
      createdAt: subtask?.createdAt ?? faker.date.recent(),
    });
  }
}
