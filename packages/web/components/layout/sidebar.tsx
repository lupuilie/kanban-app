import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSwitch } from '@/components/theme-switch';

export const Sidebar = () => {
  const sidebarVisible = true;
  return (
    <aside
      className={cn(
        'hidden h-[calc(100vh-96px)] min-w-[256px] lg:min-w-[300px] border-r border-r-border bg-white dark:bg-dark-grey z-10 flex-col justify-between pb-6 pr-6',
        sidebarVisible && 'flex',
      )}
    >
      <div>
        <div>
          <Button className="w-full rounded-l-none justify-start pl-6">a</Button>
        </div>
        <div>
          <Button variant="secondary">a</Button>
        </div>
        <ThemeSwitch />
      </div>
      <Button variant="transparent">hide</Button>
    </aside>
  );
};

export const SidebarToggle = () => {
  return (
    <div className="fixed bottom-6 z-0">
      <Button className="rounded-l-none">
        <Eye />
      </Button>
    </div>
  );
};
