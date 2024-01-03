import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { fetchBoards } from '@/services/board';
import { getQueryClient } from '@/lib/getQueryClient';
import { Dashboard } from '@/app/board/_components/dashboard';

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
