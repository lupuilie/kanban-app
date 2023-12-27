import { Subtask } from './Subtask';

export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: string,
    public subtasks: Subtask[],
    public createdAt: Date,
  ) {}

  static create(task: Task) {
    return new Task(
      task.id,
      task.title,
      task.description,
      task.status,
      task.subtasks,
      task.createdAt,
    );
  }
}
