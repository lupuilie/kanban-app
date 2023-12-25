import Image from 'next/image';
import Link from 'next/link';

import { MoreVertical } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

import lightLogo from '@/public/assets/logo-light.svg';
import darkLogo from '@/public/assets/logo-dark.svg';

export const Header = () => {
  const sidebarVisible = true;

  return (
    <header className="w-full flex items-center bg-white dark:bg-dark-grey">
      <div
        className={cn(
          'hidden md:flex items-center h-[96px] border-r border-r-border pl-6 md:h-24 min-w-[256px]',
          !sidebarVisible && 'border-b border-b-border',
          sidebarVisible && 'lg:min-w-[300px]',
        )}
      >
        <Image className="dark:hidden" src={darkLogo} alt={'light logo'} />
        <Image className="hidden dark:block" src={lightLogo} alt={'dark logo'} />
      </div>
      <div
        className={cn(
          'flex items-center w-full h-[96px] justify-between border-b border-b-border px-4',
        )}
      >
        <Typography size="heading-xl">Platform launch</Typography>
        <div className="flex">
          <Button>+ Add new task</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="transparent">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuItem>
                <Link href="#">Edit board</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" className="text-destructive">
                  Delete board
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
