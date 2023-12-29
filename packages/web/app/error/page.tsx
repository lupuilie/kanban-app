import Link from '@/components/ui/link';
import { AlertCircle } from 'lucide-react';

export default function ErrorPage() {
  return (
    <div className="h-screen py-4 px-4 lg:px-6 lg:py-6 grid place-content-center">
      <div className="grid justify-items-center gap-4 max-w-screen-sm">
        <AlertCircle size={70} className="text-gray-400" />
        <h1 className="text-3xl font-bold text-gray-700">Server error</h1>
        <p className="text-center text-gray-600">
          An error occured in the application and your page could not be served. If you are the
          application owner, check your logs for details
        </p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go home
        </Link>
      </div>
    </div>
  );
}
