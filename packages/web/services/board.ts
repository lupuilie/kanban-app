import { Board } from '@kanban-app/core/domain/entities';

export const fetchBoards = async () => {
  try {
    console.log('fetchBoards');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/boards`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch boards');
    }

    const data = ((await response.json())?.data ?? []) as Board[];

    return { data };
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};
