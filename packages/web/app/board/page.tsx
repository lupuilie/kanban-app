import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { fetchBoards } from '@/services/board';
import { getQueryClient } from '@/lib/getQueryClient';

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
  const queryClient = getQueryClient();

  await queryClient.fetchQuery({
    queryKey: ['boards'],
    queryFn: fetchBoards,
    retry: false,
  });

  const data = dehydrate(queryClient);

  return (
    <HydrationBoundary state={data}>
      <Dashboard />
    </HydrationBoundary>
  );
}
