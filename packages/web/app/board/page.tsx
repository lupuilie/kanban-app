import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <h1>Board page</h1>
      <div>
        <Link href="/task/123">View</Link>
      </div>
      <div>
        <Link href="/board/add">Add</Link>
      </div>
      <div>
        <Link href="/board/delete">Delete</Link>
      </div>
    </div>
  );
}
