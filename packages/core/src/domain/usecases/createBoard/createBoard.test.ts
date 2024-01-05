import { vi, describe, it, expect, Mocked, beforeEach } from 'vitest';

import {
  DateGenerator,
  IdentifierGenerator,
  InvalidInputException,
  NotFoundException,
} from '@kanban-app/core/domain/types';
import { BoardAccessRepository, BoardRepository, UserRepository } from '@kanban-app/core/domain/repositories';
import { BoardBuilder, UserBuilder } from '@kanban-app/core/infrastructure/shared/builders';
import { BoardAccessRole } from '@kanban-app/core/domain/entities';
import { createBoard } from './createBoard';

describe('createBoard', () => {
  const userId = 'userId';
  const boardName = 'board name';
  const user = UserBuilder.build({ id: userId });

  const mockBoardRepository: Mocked<BoardRepository> = {
    create: vi.fn(),
    findBoardById: vi.fn(),
    findBoardsByIds: vi.fn(),
    findBoardsByUserId: vi.fn(),
  };
  const mockUserRepository: Mocked<UserRepository> = {
    findById: vi.fn(),
  };
  const mockBoardAccessRepository: Mocked<BoardAccessRepository> = {
    create: vi.fn(),
    findByUserId: vi.fn(),
  };
  const mockIdentifierGenerator: Mocked<IdentifierGenerator> = {
    generate: vi.fn(),
  };
  const mockDateGenerator: Mocked<DateGenerator> = {
    now: vi.fn(),
  };

  const usecase = createBoard({
    boardRepository: mockBoardRepository,
    userRepository: mockUserRepository,
    boardAccessRepository: mockBoardAccessRepository,
    identifierGenerator: mockIdentifierGenerator,
    dateGenerator: mockDateGenerator,
  });

  const runningTheUsecase = () => usecase({ userId, name: boardName });

  describe('given the userId is empty', () => {
    it('should throw InvalidInputException', async () => {
      await expect(usecase({ userId: '', name: '' })).rejects.toThrow(new InvalidInputException('userId is required'));
    });
  });

  describe('given the user does not exist', () => {
    it('should throw NotFoundException', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(runningTheUsecase()).rejects.toThrow(new NotFoundException('user not found'));
    });
  });

  describe('given the user exists', () => {
    const boardId = 'boardId';
    const currentDate = new Date();
    const board = BoardBuilder.build({ id: boardId, name: boardName, createdAt: currentDate });

    beforeEach(() => {
      mockUserRepository.findById.mockResolvedValue(user);
      mockDateGenerator.now.mockReturnValue(currentDate);
      mockIdentifierGenerator.generate.mockReturnValue(boardId);
      mockBoardRepository.create.mockResolvedValue(board);
    });

    describe('given the board name is empty', () => {
      it('should throw InvalidInputException', async () => {
        await expect(usecase({ userId, name: '' })).rejects.toThrowError(InvalidInputException);
      });
    });

    describe('given the board name is not empty', () => {
      it('should create a board', async () => {
        await runningTheUsecase();

        expect(mockBoardRepository.create).toHaveBeenCalledWith({
          id: boardId,
          name: boardName,
          createdAt: expect.any(Date),
          columns: [],
        });
      });

      it('should create a board access', async () => {
        await runningTheUsecase();

        expect(mockBoardAccessRepository.create).toHaveBeenCalledWith({
          boardId: boardId,
          userId,
          role: BoardAccessRole.CONTRIBUTOR,
          createdAt: currentDate,
        });
      });

      it('should return the created board', async () => {
        mockBoardRepository.create.mockResolvedValue(board);

        const result = await runningTheUsecase();

        expect(result).toEqual(board);
      });
    });
  });
});
