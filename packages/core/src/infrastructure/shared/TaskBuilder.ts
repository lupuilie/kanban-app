import { faker } from '@faker-js/faker';

import { Task } from '@kanban-app/core/domain/entities';

export class TaskBuilder {
  static build(task: Partial<Task>) {
    return Task.create({
      id: task?.id ?? faker.string.uuid(),
      title: task?.title ?? faker.lorem.words({ min: 2, max: 4 }),
      description: task?.description ?? faker.lorem.words({ min: 10, max: 20 }),
      columnId: task?.columnId ?? faker.string.uuid(),
      position: task?.position ?? faker.number.int({ min: 0, max: 100 }),
      status: task?.status ?? faker.helpers.arrayElement(['todo', 'in-progress', 'done']),
      createdAt: task?.createdAt ?? faker.date.recent(),
      subtasks: task?.subtasks ?? [],
    });
  }
}
