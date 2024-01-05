export class Subtask {
  constructor(
    public id: string,
    public title: string,
    public isCompleted: boolean,
    public createdAt: string,
  ) {}

  static create(subtask: Subtask) {
    return new Subtask(subtask.id, subtask.title, subtask.isCompleted, subtask.createdAt);
  }
}
