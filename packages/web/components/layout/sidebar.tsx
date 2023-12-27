'use client';

import { useTheme } from 'next-themes';
import { useContext, useEffect, useState } from 'react';
import { Eye, EyeOff, MoonStar, Sun } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Typography } from '@/components/ui/typography';
import { Board } from '@kanban-app/core/domain/entities';
import { DashboardContext } from '@/components/providers/dashboard-context';

type SidebarProps = {
  boards: Board[];
};

export const Sidebar = ({ boards }: SidebarProps) => {
  const { sidebarVisible, toggleSidebar, selectedBoardId, setSelectedBoardId } =
    useContext(DashboardContext);

  return (
    <aside
      className={cn(
        'flex fixed h-[calc(100vh-80px)] lg:h-[calc(100vh-96px)] min-w-[256px] lg:min-w-[300px] border-r border-r-border bg-white dark:bg-dark-grey z-10 flex-col justify-between pb-6 transition-transform -translate-x-full',
        sidebarVisible && 'translate-x-0',
      )}
    >
      <div>
        <Typography size="heading-s" className="pl-6 text-medium-grey pb-4">
          ALL BOARDS ({boards.length})
        </Typography>
        <div className="pr-6">
          {boards.map(({ id, name }) => (
            <div key={id}>
              <Button
                size="lg"
                variant={id === selectedBoardId ? 'default' : 'ghost'}
                className="w-full rounded-l-none justify-start pl-6"
                onClick={() => {
                  if (id === selectedBoardId) {
                    return;
                  }

                  setSelectedBoardId(id);
                }}
              >
                <Typography size="heading-m">{name}</Typography>
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>
          <ThemeSwitch />
        </div>
        <div>
          <Button
            size="lg"
            variant="ghost"
            className="w-full rounded-l-none justify-start pl-6 gap-2"
            onClick={toggleSidebar}
          >
            <EyeOff />
            <Typography size="heading-m">Hide Sidebar</Typography>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export const SidebarToggle = () => {
  const { toggleSidebar } = useContext(DashboardContext);
  return (
    <div className="hidden md:block fixed bottom-6 z-0 ">
      <Button className="rounded-l-none px-4" size="lg" onClick={toggleSidebar}>
        <Eye />
      </Button>
    </div>
  );
};

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex gap-4 justify-center bg-light-grey dark:bg-very-dark-grey mx-3 py-3 rounded-lg">
      <Sun className="text-medium-grey" />
      <Switch
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary"
        checked={theme === 'dark'}
        onCheckedChange={(checked) => {
          setTheme(checked ? 'dark' : 'light');
        }}
      />
      <MoonStar className="text-medium-grey" />
    </div>
  );
}
