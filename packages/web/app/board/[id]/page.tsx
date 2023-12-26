'use client';

import { useContext } from 'react';

import { DashboardContext } from '@/components/providers/dashboard-context';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

export default function Page() {
  return (
    <ColumnsWrapper>
      <section className="min-w-[280px]">
        <Typography size="heading-s">TODO (4)</Typography>
        <article>Card</article>
        <article>Card</article>
        <article>Card</article>
      </section>
      <section className="min-w-[280px]">
        <Typography size="heading-s">TODO (4)</Typography>
        <article>Card</article>
        <article>Card</article>
        <article>Card</article>
      </section>
      <section className="min-w-[280px]">
        <Typography size="heading-s">TODO (4)</Typography>
        <article>Card</article>
        <article>Card</article>
        <article>Card</article>
      </section>
      <section className="min-w-[280px]">
        <Typography size="heading-s">TODO (4)</Typography>
        <article>Card</article>
        <article>Card</article>
        <article>Card</article>
      </section>
      <section className="min-w-[280px]">
        <Typography size="heading-s">TODO (4)</Typography>
        <article>Card</article>
        <article>Card</article>
        <article>Card</article>
      </section>
    </ColumnsWrapper>
  );
}

const ColumnsWrapper = ({ children }: { children: React.ReactNode }) => {
  const { sidebarVisible } = useContext(DashboardContext);

  return (
    <ScrollArea
      className={cn(
        'h-screen max-h-[calc(100vh-96px)] w-screen transition-transform pt-6 pl-4 lg:pl-6',
        sidebarVisible
          ? 'translate-x-[256px] lg:translate-x-[300px] max-w-[calc(100vw-256px)] lg:max-w-[calc(100vw-300px)]'
          : '',
      )}
    >
      <div className="flex">{children}</div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
