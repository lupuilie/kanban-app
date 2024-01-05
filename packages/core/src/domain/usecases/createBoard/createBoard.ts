import { Board, BoardAccess, BoardAccessRole } from '@kanban-app/core/domain/entities';
import {
  DateGenerator,
  IdentifierGenerator,
  InvalidInputException,
  NotFoundException,
  UseCaseConstructor,
} from '@kanban-app/core/domain/types';
import { BoardAccessRepository, BoardRepository, UserRepository } from '@kanban-app/core/domain/repositories';

type Params = {
  userRepository: UserRepository;
  boardRepository: BoardRepository;
  boardAccessRepository: BoardAccessRepository;
  identifierGenerator: IdentifierGenerator;
  dateGenerator: DateGenerator;
};

type Request = {
  userId: string;
  name: string;
};

export const createBoard: UseCaseConstructor<Params, Request, Board> = (params) => {
  const { boardRepository, userRepository, boardAccessRepository, identifierGenerator, dateGenerator } = params;

  return async (request) => {
    const { userId, name } = request;

    validateRequest(request);
    await validateUser(userId);

    const id = identifierGenerator.generate();
    const createdAt = dateGenerator.now();
    const board = await boardRepository.create({ id, name, createdAt, columns: [] });
    const boardAccess = await boardAccessRepository.create({
      boardId: board.id,
      userId,
      role: BoardAccessRole.CONTRIBUTOR,
      createdAt,
    });

    return board;
  };

  async function validateUser(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  function validateRequest(request: Request) {
    const { userId, name } = request;

    if (!userId) {
      throw new InvalidInputException('userId is required');
    }

    if (!name) {
      throw new InvalidInputException('name is required');
    }
  }
};
