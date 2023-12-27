import { cn } from '@/lib/utils';
import { Typography } from '@/components/ui/typography';

export interface TaskSectionProps {
  children: React.ReactNode;
  heading: string;
  color: 'purple' | 'cyan' | 'green';
}

export const TasksColumn = ({ children, heading, color }: TaskSectionProps) => {
  const colorClassNameMap = {
    purple: 'bg-violet-400',
    cyan: 'bg-cyan-400',
    green: 'bg-green-400',
  };

  return (
    <section className="min-w-[280px] flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className={cn('w-3 h-3 rounded-full bg-primary', colorClassNameMap[color])}></div>
        <Typography size="heading-s" className="text-medium-grey">
          {heading}
        </Typography>
      </div>
      {children}
    </section>
  );
};

export const NewColumnPlaceholder = () => {
  return (
    <section className="min-w-[280px] group min-h-[60vh] max-h-[80vh] flex items-center justify-center cursor-pointer rounded-lg bg-gradient-to-b from-[#E9EFFA] to-[#e9effa80] dark:from-[#2B2C37] dark:to-[#2B2C3780]">
      <Typography size="heading-xl" className="text-medium-grey group-hover:text-primary">
        + New Column
      </Typography>
    </section>
  );
};
