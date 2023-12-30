import Link from '@/components/ui/link';

export default function Home() {
  return (
    <>
      <main>
        <Link href="/board">
          Go to <span className="text-primary">/board</span>
        </Link>
      </main>
    </>
  );
}
