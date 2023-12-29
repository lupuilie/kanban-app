'use client';

import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchBoards } from '@/services/board';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { DashboardContext } from '@/components/providers/dashboard-context';

import { BoardColumns } from './board-columns';

export default function Dashboard() {
  const { selectedBoardId, setSelectedBoardId, setIsBoardEmpty } = useContext(DashboardContext);
  const { data } = useQuery({ queryKey: ['boards'], queryFn: fetchBoards });

  const boards = data?.data ?? [];

  const firstBoard = boards?.[0];
  const selectedBoard = boards.find((board) => board.id === selectedBoardId) ?? firstBoard;

  const boardName = selectedBoard?.name ?? '';
  const boardColumns = selectedBoard?.columns ?? [];

  useEffect(() => {
    if (selectedBoard) {
      setSelectedBoardId(selectedBoard.id);
      setIsBoardEmpty(selectedBoard.columns.length === 0);
    }
  }, [selectedBoard]);

  return (
    <>
      <Header boardName={boardName} />
      <Sidebar />
      <main>
        <BoardColumns columns={boardColumns} />
      </main>
    </>
  );
}
