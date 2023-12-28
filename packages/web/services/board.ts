import { Board } from '@kanban-app/core/domain/entities';

export const fetchBoards = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/boards`);

  if (!response.ok) {
    throw new Error('Failed to fetch boards');
  }

  const data = ((await response.json())?.data ?? []) as Board[];

  return { data };
};
