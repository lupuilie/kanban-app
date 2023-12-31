import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';

import { BoardContent } from './board-content';

export const Dashboard = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <BoardContent />
      </main>
    </>
  );
};
