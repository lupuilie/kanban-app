'use client';

import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchBoards } from '@/services/board';
import { Header } from '@/components/layout/header';
import { Sidebar, SidebarToggle } from '@/components/layout/sidebar';
import { DashboardContext } from '@/components/providers/dashboard-context';

import { BoardColumns } from './board-columns';

export default function Dashboard() {
  const { selectedBoardId, setSelectedBoardId } = useContext(DashboardContext);
  const { data } = useQuery({ queryKey: ['boards'], queryFn: fetchBoards });

  const boards = data?.data ?? [];
  const selectedBoard = boards.find((board) => board.id === selectedBoardId);
  const boardName = selectedBoard?.name ?? '';
  const boardColumns = selectedBoard?.columns ?? [];

  useEffect(() => {
    if (!selectedBoard && boards.length > 0) {
      setSelectedBoardId(boards[0].id);
    }
  }, []);

  return (
    <>
      <Header boardName={boardName} />
      <main className="flex relative">
        <Sidebar boards={boards} />
        <BoardColumns columns={boardColumns} />
        <SidebarToggle />
      </main>
    </>
  );
}
