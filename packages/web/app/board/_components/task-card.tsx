import Link from 'next/link';

export interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
}

export const TaskCard = ({ id, title }: TaskCardProps) => {
  return (
    <Link href={`/task/${id}`}>
      <article className="flex flex-col gap-2 px-4 py-6 z-10 bg-card shadow-md shadow-[#364E7E1A] rounded-lg cursor-pointer">
        <h3 className="text-heading-m">{title}</h3>
        <p className="text-body-m text-medium-grey">0 of 1 subtasks</p>
      </article>
    </Link>
  );
};
