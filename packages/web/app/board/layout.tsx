import { Suspense } from 'react';
import { LoadingSkeleton } from './_components/loading-skeleton';

type BoardLayoutProps = {
  dialog: React.ReactNode;
  children: React.ReactNode;
};

export default async function Layout(props: BoardLayoutProps) {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>{props.children}</Suspense>
      {props.dialog}
    </>
  );
}
