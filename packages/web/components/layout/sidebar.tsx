'use client';

import { useTheme } from 'next-themes';
import { useContext, useEffect, useState } from 'react';
import { Eye, EyeOff, MoonStar, Sun } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DashboardContext } from '@/components/providers/dashboard-context';
import { useQuery } from '@tanstack/react-query';
import { fetchBoards } from '@/services/board';

type SidebarProps = {};

export const Sidebar = () => {
  const { data, isStale, refetch } = useQuery({ queryKey: ['boards'], queryFn: fetchBoards });
  const { sidebarVisible, toggleSidebar, selectedBoardId, setSelectedBoardId } =
    useContext(DashboardContext);

  const boards = data?.data ?? [];

  return (
    <>
      <aside
        className={cn(
          `pb-6 z-10 -translate-x-full min-w-64 min-h-[calc(100vh-5rem)] lg:min-w-[300px]
        fixed hidden md:flex flex-col justify-between bg-white border-r border-r-border dark:bg-dark-grey transition-transform`,
          sidebarVisible && 'translate-x-0',
        )}
      >
        <div>
          <h4 className="text-heading-s pl-6 text-medium-grey pb-4">
            ALL BOARDS ({boards.length})
          </h4>
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
                    if (isStale) {
                      refetch();
                    }
                  }}
                >
                  <h3 className="text-heading-m">{name}</h3>
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
              <span className="text-heading-m">Hide Sidebar</span>
            </Button>
          </div>
        </div>
      </aside>
      <SidebarToggle />
    </>
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
