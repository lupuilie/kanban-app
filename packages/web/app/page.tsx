import { Header } from '@/components/layout/header';
import { SidebarToggle } from '@/components/layout/sidebar';
import Link from '@/components/ui/link';

export default function Home() {
  return (
    <>
      <main className="flex">
        <Link href="/board">
          Go to <span className="text-primary">/board</span>
        </Link>
      </main>
    </>
  );
}
