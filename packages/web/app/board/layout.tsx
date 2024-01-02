import { Suspense } from 'react';
import { DashboardSkeleton } from './_components/dashboard';

type BoardLayoutProps = {
  dialog: React.ReactNode;
  children: React.ReactNode;
};

export default async function Layout(props: BoardLayoutProps) {
  return (
    <>
      <Suspense fallback={<DashboardSkeleton />}>{props.children}</Suspense>
      {props.dialog}
    </>
  );
}
