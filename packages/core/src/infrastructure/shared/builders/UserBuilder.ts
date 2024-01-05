import { faker } from '@faker-js/faker';

import { User } from '@kanban-app/core/domain/entities';

export class UserBuilder {
  static build(user?: Partial<User>) {
    return new User(user?.id ?? faker.string.uuid(), user?.name ?? faker.person.fullName());
  }
}
