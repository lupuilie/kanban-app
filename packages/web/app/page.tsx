import { Button } from '@/components/ui/button';

import { Header } from '@/components/layout/header';
import { Sidebar, SidebarToggle } from '@/components/layout/sidebar';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex">
        <Sidebar />
      </main>
      <SidebarToggle />
    </>
  );
}
