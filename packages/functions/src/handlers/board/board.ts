import { ApiHandler } from 'sst/node/api';

import { Board, Task } from '@kanban-app/core/domain/entities';
import { BoardColumn } from '@kanban-app/core/domain/entities/BoardColumn';

export const handler = ApiHandler(async (_evt) => {
  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const mockPlatformLaunchBoard = Board.create({
    id: 'boardId1',
    name: 'Platform launch',
    createdAt: currentDate,
    columns: [
      BoardColumn.create({
        name: 'TODO',
        createdAt: currentDate,
        color: 'cyan',
        tasks: [
          Task.create({
            id: 'id',
            title: `Build UI for onboarding flow (${formattedTime})`,
            description: 'description',
            status: 'TODO',
            createdAt: currentDate,
            subtasks: [],
          }),
        ],
      }),
    ],
  });

  const mockMarketingPlanBoard = new Board('boardId2', 'Marketing plan', currentDate, []);

  const data = [mockPlatformLaunchBoard, mockMarketingPlanBoard];

  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
  };
});
