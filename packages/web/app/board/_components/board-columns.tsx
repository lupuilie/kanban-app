'use client';

import { useContext } from 'react';

import { BoardColumn } from '@kanban-app/core/domain/entities/BoardColumn';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DashboardContext } from '@/components/providers/dashboard-context';

import { TaskCard } from './task-card';
import { NewColumnPlaceholder, TasksColumn } from './tasks-column';

export const BoardColumns = ({ columns }: { columns: BoardColumn[] }) => {
  const { sidebarVisible } = useContext(DashboardContext);
  const isBoardEmpty = columns.length === 0;

  return (
    <div
      className={cn(
        'h-screen max-h-[calc(100vh-80px)] lg:max-h-[calc(100vh-96px)] w-screen transition-transform',
        sidebarVisible &&
          'translate-x-[256px] lg:translate-x-[300px] max-w-[calc(100vw-256px)] lg:max-w-[calc(100vw-300px)]',
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
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <Typography size="heading-l" className="text-medium-grey">
        This board is empty. Create a new column to get started.
      </Typography>
      <Button>+ Add new column</Button>
    </div>
  );
};
