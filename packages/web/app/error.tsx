'use client';

import Link from '@/components/ui/link';
import { AlertCircle } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  return (
    <div className="h-screen py-4 px-4 lg:px-6 lg:py-6 overflow-y-auto">
      <div className="grid place-content-center">
        <div className="grid gap-4 max-w-screen-sm">
          <AlertCircle size={70} className="text-gray-400 justify-self-center" />
          <h1 className="text-3xl font-bold text-gray-700 text-center">
            Oops! Something went wrong.
          </h1>
          <p className="text-center text-gray-600">
            An error occured in the application and your page could not be served. If you are the
            application owner, check your logs for details
          </p>
          <div className="rounded-lg border bg-card">
            <h2 className="p-3 text-heading-m">Error details</h2>
            <hr />
            <div className="p-3 text-body-l text-gray-600">
              <p>
                Error name:
                <code className="font-semibold">{error.name}</code>
              </p>
              <p>
                Error message: <code className="font-semibold">{error.message}</code>
              </p>
              <p>
                Error digest: <code className="font-semibold">{error.digest}</code>
              </p>
              {process.env.NODE_ENV === 'development' && <p>Error stack: {error.stack}</p>}
            </div>
          </div>

          <Link href="/" className="text-blue-500 hover:underline text-center">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
