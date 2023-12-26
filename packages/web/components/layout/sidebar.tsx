'use client';

import { useContext, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { Switch } from '@/components/ui/switch';
import { DashboardContext } from '@/components/providers/dashboard-context';

export const Sidebar = () => {
  const { sidebarVisible, toggleSidebar } = useContext(DashboardContext);

  return (
    <aside
      className={cn(
        'flex h-[calc(100vh-96px)] min-w-[256px] lg:min-w-[300px] border-r border-r-border bg-white dark:bg-dark-grey z-10 flex-col justify-between pb-6 pr-6 transition-transform -translate-x-full',
        sidebarVisible && 'translate-x-0',
      )}
    >
      <div>
        <Typography size="heading-s" className="pl-6 text-medium-grey pb-4">
          ALL BOARDS (3)
        </Typography>
        <div>
          <Button size="lg" className="w-full rounded-l-none justify-start pl-6">
            <Typography size="heading-m">Platform launch</Typography>
          </Button>
        </div>
        <div>
          <Button size="lg" variant="ghost" className="w-full rounded-l-none justify-start pl-6">
            <Typography size="heading-m">Roadmap</Typography>
          </Button>
        </div>
        <div>
          <Button size="lg" variant="ghost" className="w-full rounded-l-none justify-start pl-6">
            <Typography size="heading-m">Marketing</Typography>
          </Button>
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
            className="w-full rounded-l-none justify-start pl-6"
            onClick={toggleSidebar}
          >
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
    <div className="hidden md:block fixed bottom-6 z-0">
      <Button className="rounded-l-none" onClick={toggleSidebar}>
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
    return <Switch />;
  }

  return (
    <Switch
      checked={theme === 'dark'}
      onCheckedChange={(checked) => {
        setTheme(checked ? 'dark' : 'light');
      }}
    />
  );
}
