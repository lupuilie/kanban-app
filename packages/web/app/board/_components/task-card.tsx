import Link from '@/components/ui/link';
import { Typography } from '@/components/ui/typography';

export interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
}

export const TaskCard = ({ id, title }: TaskCardProps) => {
  return (
    <Link href={`/task/${id}`}>
      <article className="flex flex-col gap-2 px-4 py-6 z-10 bg-white dark:bg-dark-grey shadow-md shadow-[#364E7E1A] rounded-lg cursor-pointer">
        <Typography size="heading-m">{title}</Typography>
        <Typography size="body-m" className="text-medium-grey">
          0 of 1 subtasks
        </Typography>
      </article>
    </Link>
  );
};
