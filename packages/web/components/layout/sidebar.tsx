'use client';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { DOMAttributes, useContext, useEffect, useState } from 'react';
import { Eye, EyeOff, MoonStar, Sun } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DashboardContext } from '@/components/providers/dashboard-context';
import { fetchBoards } from '@/services/board';
import { BoardIcon } from '@/components/ui/icons';

export const Sidebar = () => {
  const { sidebarVisible, toggleSidebar } = useContext(DashboardContext);

  return (
    <>
      <aside
        className={cn(
          `pb-6 z-10 -translate-x-full min-w-64 min-h-[calc(100vh-5rem)] lg:min-w-[300px] fixed hidden md:flex flex-col justify-between bg-white border-r border-r-border dark:bg-dark-grey transition-transform`,
          sidebarVisible && 'translate-x-0',
        )}
      >
        <BoardsList />
        <div>
          <ThemeSwitch />
          <Button
            size="lg"
            variant="ghost"
            className="w-full flex rounded-l-none justify-start pl-6 gap-2"
            onClick={toggleSidebar}
          >
            <EyeOff />
            <span className="text-heading-m">Hide Sidebar</span>
          </Button>
        </div>
      </aside>
      <SidebarToggle />
    </>
  );
};

export const BoardsList = ({ onClickItem }: { onClickItem?: () => void }) => {
  const router = useRouter();
  const { data, isStale, refetch } = useQuery({ queryKey: ['boards'], queryFn: fetchBoards });
  const { selectedBoardId, setSelectedBoardId, setIsBoardEmpty } = useContext(DashboardContext);

  const boards = data?.data ?? [];

  return (
    <div>
      <h4 className="text-heading-s pl-6 text-medium-grey pb-4">ALL BOARDS ({boards.length})</h4>
      <div className="pr-6">
        {boards.map(({ id, name, columns }) => (
          <div key={id}>
            <SidebarButton
              active={id === selectedBoardId}
              onClick={() => {
                if (id === selectedBoardId) {
                  return;
                }

                setSelectedBoardId(id);
                setIsBoardEmpty(columns.length === 0);
                onClickItem?.();
                if (isStale) {
                  refetch();
                }
              }}
            >
              {name}
            </SidebarButton>
          </div>
        ))}
        <SidebarButton
          onClick={() => {
            onClickItem?.();
            router.push('/board/add');
          }}
        >
          + Create New Board
        </SidebarButton>
      </div>
    </div>
  );
};

export const SidebarButton = ({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  children?: React.ReactNode;
  onClick?: DOMAttributes<HTMLButtonElement>['onClick'];
}) => (
  <Button
    size="lg"
    variant={active ? 'default' : 'ghost'}
    className="w-full rounded-l-none justify-start pl-6 gap-2 group"
    onClick={onClick}
  >
    <BoardIcon
      className={cn(active ? 'fill-white' : 'fill-medium-grey group-hover:fill-primary')}
    />
    <span className="text-heading-m">{children}</span>
  </Button>
);

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
