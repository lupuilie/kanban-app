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
import { useRouter } from 'next/navigation';

export const BoardColumns = ({ columns }: { columns: BoardColumn[] }) => {
  const router = useRouter();
  const { sidebarVisible, isBoardEmpty } = useContext(DashboardContext);

  return (
    <div
      className={cn(
        'w-screen transition-[transform, width] h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]',
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
            <NewColumnPlaceholder onClick={() => router.push('/board/add-column')} />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};

const EmptyBoardPlaceholder = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2">
      <h2 className="text-heading-l text-medium-grey text-center">
        This board is empty. Create a new column to get started.
      </h2>
      <Link href="/board/add-column">
        <Button>+ Add new column</Button>
      </Link>
    </div>
  );
};
