import { HeaderSkeleton } from '@/components/layout/header';

import { Loader } from 'lucide-react';

export default function DashboardSkeleton() {
  return (
    <>
      <HeaderSkeleton />
      <div className="flex flex-col items-center justify-center text-primary h-full">
        <Loader size={64} className="animate-spin-slow mt-20" />
      </div>
    </>
  );
}
