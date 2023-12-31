'use client';

import { useEffect } from 'react';
import ErrorPage from './error';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>{ErrorPage({ error: error as Error, reset })}</body>
    </html>
  );
}
