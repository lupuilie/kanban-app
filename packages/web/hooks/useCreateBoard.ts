import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Board } from '@kanban-app/core/domain/entities';
import { BOARDS_QUERY_KEY } from './useBoards';

async function createBoard() {
  const isError = Math.random() >= 0.5;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (isError) {
    throw new Error('Error creating board');
  }
  return {};
}

const CREATE_BOARD_MUTATION_KEY = 'create-board';

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createBoard,
    mutationKey: [CREATE_BOARD_MUTATION_KEY],
    onSuccess: () => {},
    onError: (error, { name }) => {
      const previousBoards = queryClient.getQueryData([BOARDS_QUERY_KEY]) as { data: Board[] };

      queryClient.setQueryData([BOARDS_QUERY_KEY], {
        data: previousBoards.data.filter((board) => board.name !== name),
      });
    },
    onMutate: async (params: { name: string; columns: string[] }) => {
      const previousBoards = queryClient.getQueryData([BOARDS_QUERY_KEY]) as { data: Board[] };
      const newBoard = new Board(Math.random().toString(), params.name, new Date(), []);

      await queryClient.setQueryData([BOARDS_QUERY_KEY], {
        data: [...previousBoards.data, newBoard],
      });
    },
  });

  return { createBoard: mutate };
};
