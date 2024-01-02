import Link from 'next/link';

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
