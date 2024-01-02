import { Header, HeaderSkeleton } from '@/components/layout/header';
import { Sidebar, SidebarSkeleton } from '@/components/layout/sidebar';

import { BoardContent, BoardContentSkeleton } from './board-content';

export default function Dashboard() {
  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <BoardContent />
      </main>
    </>
  );
}

export const DashboardSkeleton = () => (
  <>
    <HeaderSkeleton />
    <main className="flex">
      <SidebarSkeleton />
      <BoardContentSkeleton />
    </main>
  </>
);
