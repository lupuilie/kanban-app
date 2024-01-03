import { HeaderSkeleton } from '@/components/layout/header';
import { SidebarSkeleton } from '@/components/layout/sidebar';
import { BoardContentSkeleton } from './_components/board-content';

export default function DashboardLoading() {
  return (
    <>
      <HeaderSkeleton />
      <main className="flex">
        <SidebarSkeleton />
        <BoardContentSkeleton />
      </main>
    </>
  );
}