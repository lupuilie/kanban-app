'use client';

import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      checked={theme === 'dark'}
      onCheckedChange={(checked) => {
        setTheme(checked ? 'dark' : 'light');
      }}
    />
  );
}
