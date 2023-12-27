import { Board, Task } from '@kanban-app/core/domain/entities';
import { BoardColumn } from '@kanban-app/core/domain/entities/BoardColumn';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchBoards = async () => {
  await delay(2000);

  console.log('fetchBoards');

  const data = [toRawOject(mockPlatformLaunchBoard), toRawOject(mockMarketingPlanBoard)];

  return { data };
};

const mockPlatformLaunchBoard = Board.create({
  id: 'boardId1',
  name: 'Platform launch',
  createdAt: new Date(),
  columns: [
    BoardColumn.create({
      name: 'TODO',
      createdAt: new Date(),
      color: 'cyan',
      tasks: [
        Task.create({
          id: 'id',
          title: 'Build UI for onboarding flow',
          description: 'description',
          status: 'TODO',
          createdAt: new Date(),
          subtasks: [],
        }),
      ],
    }),
  ],
});

const mockMarketingPlanBoard = new Board('boardId2', 'Marketing plan', new Date(), []);

function toRawOject<T>(entity: T): T {
  return JSON.parse(JSON.stringify(entity));
}
