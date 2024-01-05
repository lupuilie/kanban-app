import crypto from 'crypto';

import { IdentifierGenerator } from '@kanban-app/core/domain/types';

export class UuidGenerator implements IdentifierGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
