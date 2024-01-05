import { vi, describe, it, expect, Mocked, afterEach } from 'vitest';

import { findUserBoards } from './findUserBoards';
import { NotFoundException } from '@kanban-app/core/domain/types';
import { UserBuilder, BoardBuilder, BoardAccessBuilder } from '@kanban-app/core/infrastructure/shared/builders';
import { BoardAccessRepository, BoardRepository, UserRepository } from '@kanban-app/core/domain/repositories';

describe('findUserBoards', () => {
  const user = UserBuilder.build();
  const userId = user.id;

  const mockUserRepository: Mocked<UserRepository> = {
    findById: vi.fn(),
  };
  const mockBoardRepository: Mocked<BoardRepository> = {
    findBoardById: vi.fn(),
    findBoardsByIds: vi.fn(),
    findBoardsByUserId: vi.fn(),
    create: vi.fn(),
  };
  const mockBoardAccessRepository: Mocked<BoardAccessRepository> = {
    findByUserId: vi.fn(),
    create: vi.fn(),
  };

  afterEach(() => {
    vi.resetAllMocks();
  });

  const usecase = findUserBoards({
    userRepository: mockUserRepository,
    boardRepository: mockBoardRepository,
    boardAccessRepository: mockBoardAccessRepository,
  });

  const runningTheUsecase = () => usecase({ userId });

  describe('given the user does not exist', () => {
    it('should throw NotFoundException', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(runningTheUsecase()).rejects.toThrow(
        new NotFoundException(`user with id <${userId}> does not exist`),
      );
    });
  });

  describe('given the user does not have access to any board', () => {
    it('should return an empty array', async () => {
      mockUserRepository.findById.mockResolvedValue(user);
      mockBoardAccessRepository.findByUserId.mockResolvedValue([]);

      const result = await runningTheUsecase();

      expect(result).toEqual([]);
    });
  });

  describe('given the user has access to one board', () => {
    it('should return an array with one board', async () => {
      const board = BoardBuilder.build();
      const boardAccess = BoardAccessBuilder.build({ userId, boardId: board.id });

      mockUserRepository.findById.mockResolvedValue(user);
      mockBoardAccessRepository.findByUserId.mockResolvedValue([boardAccess]);
      mockBoardRepository.findBoardsByIds.mockResolvedValue([board]);

      const result = await runningTheUsecase();

      expect(result).toEqual([board]);
    });
  });
});
