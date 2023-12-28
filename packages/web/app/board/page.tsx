import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { fetchBoards } from '@/services/board';
import Dashboard from './_components/dashboard';

export type DashboardParams = {
  boardId: string;
};

export type BoardPageProps = {
  params: DashboardParams;
  searchParams: {
    [key: string]: string;
  };
};

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['boards'],
    queryFn: fetchBoards,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}
