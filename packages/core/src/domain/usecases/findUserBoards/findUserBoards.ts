import { BoardRepository } from '@kanban-app/core/domain/repositories/BoardRepository';
import { Board } from '@kanban-app/core/domain/entities/Board';
import { UseCaseConstructor } from '@kanban-app/core/domain/types/Usecase';

type Params = {
  boardRepository: BoardRepository;
};

type Request = {
  userId: string;
};

export const findUserBoards: UseCaseConstructor<Params, Request, Board[]> = (params) => {
  const { boardRepository } = params;

  return async (request) => {
    const { userId } = request;

    const boards = await boardRepository.findByUserId(userId);

    return boards;
  };
};
