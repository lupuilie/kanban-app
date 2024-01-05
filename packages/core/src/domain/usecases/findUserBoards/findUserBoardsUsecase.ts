import { Board } from '@kanban-app/core/domain/entities/Board';
import { UseCaseConstructor, NotFoundException } from '@kanban-app/core/domain/types';
import { BoardRepository, UserRepository, BoardAccessRepository } from '@kanban-app/core/domain/repositories';

type Params = {
  boardRepository: BoardRepository;
  boardAccessRepository: BoardAccessRepository;
  userRepository: UserRepository;
};

type Request = {
  userId: string;
};

export const findUserBoardsUsecase: UseCaseConstructor<Params, Request, Board[]> = (params) => {
  const { boardRepository, boardAccessRepository, userRepository } = params;

  return async (request) => {
    const { userId } = request;

    await validateUser(userId);

    const boardAccesses = await getUserBoardAccesses(userId);

    if (boardAccesses.length === 0) {
      return [];
    }

    const boardsIds = boardAccesses.map((boardAccess) => boardAccess.boardId);
    const boards = await getBoards(boardsIds);

    return boards;
  };

  async function validateUser(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`user with id <${userId}> does not exist`);
    }
  }

  async function getUserBoardAccesses(userId: string) {
    return await boardAccessRepository.findByUserId(userId);
  }

  async function getBoards(boardsIds: string[]) {
    return await boardRepository.findBoardsByIds(boardsIds);
  }
};
