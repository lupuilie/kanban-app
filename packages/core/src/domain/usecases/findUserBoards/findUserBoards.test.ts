import { describe, expect, it, vi, Mocked, afterEach } from 'vitest';

import { BoardRepository } from '@kanban-app/core/domain/repositories';

import { findUserBoards } from './findUserBoards';

describe('findUserBoards', () => {
  const mockBoardRepository: Mocked<BoardRepository> = {
    findById: vi.fn(),
    findByUserId: vi.fn(),
  };

  afterEach(() => {
    vi.resetAllMocks();
  });

  const runningUsecase = findUserBoards({ boardRepository: mockBoardRepository });

  describe("given the user doesn't have any boards", () => {
    const userId = 'user-id';

    it('should return an empty array', async () => {
      mockBoardRepository.findByUserId.mockResolvedValueOnce([]);

      const boards = await runningUsecase({ userId });

      expect(boards).toEqual([]);
    });
  });
});
