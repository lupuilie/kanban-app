'use client';

import { DashboardContext } from '@/components/providers/dashboard-context';
import Link from '@/components/ui/link';
import { cn } from '@/lib/utils';
import { useContext } from 'react';

export default function Page() {
  const { sidebarVisible } = useContext(DashboardContext);

  return (
    <section
      className={cn(
        'transition-transform pl-4 md:pl-6',
        sidebarVisible ? '' : 'translate-x-[-256px] lg:translate-x-[-300px]',
      )}
    >
      <h1>Board page</h1>
      <div>
        <Link href="/task/123">View</Link>
      </div>
      <div>
        <Link href="/board/add">Add</Link>
      </div>
      <div>
        <Link href="/board/delete">Delete</Link>
      </div>
    </section>
  );
}
