import { Typography } from '@/components/ui/typography';
import { ColumnsWrapper } from './_components/columns-wrapper';
import Link from '@/components/ui/link';

export default function Page() {
  return (
    <ColumnsWrapper>
      <section className="min-w-[280px] flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
          <Typography size="heading-s" className="text-medium-grey">
            TODO (4)
          </Typography>
        </div>
        <TaskCard />
        <TaskCard />
      </section>
      <section className="min-w-[280px] flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-violet-400"></div>
          <Typography size="heading-s" className="text-medium-grey">
            DOING (4)
          </Typography>
        </div>
        <TaskCard />
        <TaskCard />
      </section>
      <section className="min-w-[280px] flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <Typography size="heading-s" className="text-medium-grey">
            DONE (4)
          </Typography>
        </div>
        <TaskCard />
        <TaskCard />
      </section>
    </ColumnsWrapper>
  );
}

export interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement> {}
const TaskCard = () => {
  const rand = (Math.random() * 1000).toFixed(0);
  return (
    <Link href={`/task/${rand}`}>
      <article className="bg-white dark:bg-dark-grey px-4 py-6 flex flex-col gap-2 rounded-lg shadow-lg z-10 cursor-pointer">
        <Typography size="heading-m">Build UI for onboarding flow</Typography>
        <Typography size="body-m">0 of 1 subtasks</Typography>
      </article>
    </Link>
  );
};
