'use client';

import { useContext } from 'react';

import { BoardColumn } from '@kanban-app/core/domain/entities/BoardColumn';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DashboardContext } from '@/components/providers/dashboard-context';

import { TaskCard } from './task-card';
import { NewColumnPlaceholder, TasksColumn } from './tasks-column';
import Link from '@/components/ui/link';

export const BoardColumns = ({ columns }: { columns: BoardColumn[] }) => {
  const { sidebarVisible } = useContext(DashboardContext);
  const isBoardEmpty = columns.length === 0;

  return (
    <div
      className={cn(
        'w-screen transition-transform h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]',
        sidebarVisible &&
          'translate-x-64 max-w-[calc(100vw-16rem)] lg:translate-x-[300px] lg:max-w-[calc(100vw-300px)]',
      )}
    >
      {isBoardEmpty ? (
        <EmptyBoardPlaceholder />
      ) : (
        <ScrollArea>
          <div className="px-4 py-4 lg:px-6 lg:py-6 flex flex-row gap-4">
            {columns.map((column) => (
              <TasksColumn key={column.name} heading={column.name} color={column.color}>
                {column.tasks.map(({ id, title }) => (
                  <TaskCard key={id} id={id} title={title} />
                ))}
              </TasksColumn>
            ))}
            <NewColumnPlaceholder />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};

const EmptyBoardPlaceholder = () => {
  return (
    <div className="w-full h-full px-4 lg:px-6 flex flex-col justify-center items-center gap-8">
      <h2 className="text-heading-l text-medium-grey text-center">
        This board is empty. Create a new column to get started.
      </h2>
      <Link href="/board/add-column">
        <Button>+ Add new column</Button>
      </Link>
    </div>
  );
};
