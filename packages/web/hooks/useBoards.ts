import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchBoards } from '@/services/board';
import { DashboardContext } from '@/components/providers/dashboard-context';

export const BOARDS_QUERY_KEY = 'boards';

export const useBoards = () => {
  const { setSelectedBoardId, selectedBoardId } = useContext(DashboardContext);
  const { data, isLoading, refetch, isStale } = useQuery({
    queryKey: [BOARDS_QUERY_KEY],
    queryFn: fetchBoards,
  });

  const boards = data?.data ?? [];
  const selectedBoard = selectedBoardId
    ? boards.find((board) => board.id === selectedBoardId)
    : boards?.[0];

  const selectedBoardName = selectedBoard?.name ?? '';
  const selectedBoardColumns = selectedBoard?.columns ?? [];

  useEffect(() => {
    if (selectedBoard) {
      setSelectedBoardId(selectedBoard.id);
    }
  }, [selectedBoard, setSelectedBoardId]);

  return {
    isLoading,
    boards,
    selectedBoardName,
    selectedBoardColumns,
    selectedBoardId,
    refetchIfNeeded,
  };

  function refetchIfNeeded() {
    if (isStale) {
      refetch();
    }
  }
};
