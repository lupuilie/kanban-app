import { Header } from '@/components/layout/header';

import { Loader } from 'lucide-react';

export const LoadingSkeleton = () => (
  <>
    <Header isLoading />
    <div className="flex flex-col items-center justify-center h-screen text-primary animate-spin-slow">
      <Loader size={64} />
    </div>
  </>
);
