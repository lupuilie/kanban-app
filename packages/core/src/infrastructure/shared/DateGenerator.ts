import { DateGenerator as DateGeneratorType } from '@kanban-app/core/domain/types';

export class DateGenerator implements DateGeneratorType {
  now(): Date {
    return new Date();
  }
}
