import { Header } from '@/components/layout/header';
import { Sidebar, SidebarToggle } from '@/components/layout/sidebar';

type BoardLayoutProps = {
  dialog: React.ReactNode;
  children: React.ReactNode;
};

export default async function Layout(props: BoardLayoutProps) {
  return (
    <>
      <Header />
      <main className="flex relative">
        <Sidebar />
        {props.children}
      </main>
      <SidebarToggle />
      {props.dialog}
    </>
  );
}
