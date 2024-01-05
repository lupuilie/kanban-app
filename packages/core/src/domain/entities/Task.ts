import { Subtask } from './Subtask';

export class Task {
  constructor(
    public id: string,
    public columnId: string,
    public title: string,
    public description: string,
    public status: string,
    public position: number,
    public subtasks: Subtask[],
    public createdAt: Date,
  ) {}

  static create(task: Task) {
    return new Task(
      task.id,
      task.columnId,
      task.title,
      task.description,
      task.status,
      task.position,
      task.subtasks,
      task.createdAt,
    );
  }
}
