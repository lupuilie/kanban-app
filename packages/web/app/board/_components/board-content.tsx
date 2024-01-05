'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

import { BoardColumn } from '@kanban-app/core/domain/entities/BoardColumn';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DashboardContext } from '@/components/providers/dashboard-context';

import { TaskCard, TaskCardSkeleton } from './task-card';
import { useBoards } from '@/hooks/useBoards';
import { Skeleton } from '@/components/ui/skeleton';

export const BoardContent = () => {
  const router = useRouter();
  const { selectedBoardColumns } = useBoards();

  const { sidebarVisible } = useContext(DashboardContext);

  return (
    <div
      className={cn(
        'w-screen transition-[transform, width] h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]',
        sidebarVisible &&
          'translate-x-64 max-w-[calc(100vw-16rem)] lg:translate-x-[300px] lg:max-w-[calc(100vw-300px)]',
      )}
    >
      {selectedBoardColumns.length === 0 ? (
        <EmptyBoardPlaceholder />
      ) : (
        <ScrollArea>
          <div className="px-4 py-4 lg:px-6 lg:py-6 flex flex-row gap-4">
            {selectedBoardColumns.map((column) => (
              <TasksColumn key={`column-${column.name}`} heading={column.name} color="cyan">
                {column.tasks.map(({ id, title }) => (
                  <TaskCard key={`task-card-${id}`} id={id} title={title} />
                ))}
              </TasksColumn>
            ))}
            <NewColumnPlaceholder onClick={() => router.push('/board/edit')} />
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
      <Link href="/board/edit">
        <Button>+ Add new column</Button>
      </Link>
    </div>
  );
};

interface TaskColumnProps {
  children: React.ReactNode;
  heading: string;
  color: 'purple' | 'cyan' | 'green';
}

export const TasksColumn = ({ children, heading, color }: TaskColumnProps) => {
  const colorClassNameMap = {
    purple: 'bg-violet-400',
    cyan: 'bg-cyan-400',
    green: 'bg-green-400',
  };

  return (
    <section className="min-w-[280px] flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className={cn('w-3 h-3 rounded-full bg-primary', colorClassNameMap[color])}></div>
        <h4 className="text-heading-s text-medium-grey">{heading}</h4>
      </div>
      {children}
    </section>
  );
};

export const NewColumnPlaceholder = ({ onClick }: { onClick: () => void }) => {
  return (
    <section
      onClick={onClick}
      className="min-w-[280px] group min-h-[60vh] max-h-[80vh] flex items-center justify-center cursor-pointer rounded-lg bg-gradient-to-b from-[#E9EFFA] to-[#e9effa80] dark:from-[#2B2C3780] dark:to-[#2B2C3740]"
    >
      <h1 className="text-heading-xl text-medium-grey group-hover:text-primary">+ New Column</h1>
    </section>
  );
};

export const BoardContentSkeleton = () => {
  return (
    <div className="w-screen lg:max-w-[calc(100vw-16rem)]">
      <ScrollArea>
        <div className="px-4 py-4 lg:px-6 lg:py-6 flex flex-row gap-4">
          <section className="min-w-[280px] flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20" />
            </div>
            <TaskCardSkeleton />
            <TaskCardSkeleton className="h-24" />
            <TaskCardSkeleton />
            <TaskCardSkeleton />
          </section>
          <section className="min-w-[280px] flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
            </div>
            <TaskCardSkeleton className="h-24" />
            <TaskCardSkeleton />
            <TaskCardSkeleton className="h-24" />
          </section>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
