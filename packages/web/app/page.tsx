import { Button } from '@/components/ui/button';
import { ThemeSwitch } from '@/components/theme-switch';

import { Header } from '@/components/layout/header';
import { Sidebar, SidebarToggle } from '@/components/layout/sidebar';

export default function Home() {
  const sidebarVisible = true;

  return (
    <>
      <Header />
      <main className="flex">
        <Sidebar />
        <section className="">
          <Button className="mr-4">Click me</Button>
        </section>
      </main>
      <SidebarToggle />
    </>
  );
}
