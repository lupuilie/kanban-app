'use client';

import { DashboardContext } from '@/components/providers/dashboard-context';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useContext } from 'react';

export const ColumnsWrapper = ({ children }: { children: React.ReactNode }) => {
  const { sidebarVisible } = useContext(DashboardContext);

  return (
    <ScrollArea
      className={cn(
        'h-screen max-h-[calc(100vh-80px)] lg:max-h-[calc(100vh-96px)] w-screen transition-transform',
        sidebarVisible
          ? 'translate-x-[256px] lg:translate-x-[300px] max-w-[calc(100vw-256px)] lg:max-w-[calc(100vw-300px)]'
          : '',
      )}
    >
      <div className="px-4 py-4 flex gap-4">{children}</div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
