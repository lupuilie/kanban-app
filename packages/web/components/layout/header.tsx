'use client';

import Image from 'next/image';
import { useContext } from 'react';
import { MoreVertical, ChevronDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Link from '@/components/ui/link';
import { ThemeSwitch } from './sidebar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { DashboardContext } from '@/components/providers/dashboard-context';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import darkLogo from '@/public/assets/logo-dark.svg';
import lightLogo from '@/public/assets/logo-light.svg';
import logoMobile from '@/public/assets/logo-mobile.svg';

type HeaderProps = {
  boardName?: string;
  isLoading?: boolean;
};

export const Header = ({ boardName, isLoading = false }: HeaderProps) => {
  const { sidebarVisible } = useContext(DashboardContext);

  return (
    <header className="w-full flex items-center bg-white dark:bg-dark-grey">
      <div
        className={cn(
          'hidden md:flex items-center h-[80px] lg:h-[96px] border-r border-r-border pl-6 min-w-[256px] lg:min-w-[300px]',
          (!sidebarVisible || isLoading) && 'border-b border-b-border',
        )}
      >
        <Image className="dark:hidden" src={darkLogo} alt={'light logo'} />
        <Image className="hidden dark:block" src={lightLogo} alt={'dark logo'} />
      </div>
      <div
        className={cn(
          'flex items-center w-full h-[80px] lg:h-[96px] justify-between border-b border-b-border px-4 lg:px-6',
        )}
      >
        {boardName ? (
          <Typography size="heading-xl" className="hidden md:block">
            {boardName}
          </Typography>
        ) : isLoading ? (
          <Skeleton className="h-[30px] w-72" />
        ) : (
          <div></div>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <div className="md:hidden flex items-center cursor-pointer">
              <Image src={logoMobile} alt={'logo mobile'} />
              <Typography size="heading-xl" className="pl-4 pr-2">
                {boardName}
              </Typography>
              <ChevronDown className="text-primary" />
            </div>
          </DialogTrigger>
          <DialogContent
            centered={false}
            className="top-28 left-[50%] translate-x-[-50%] w-full max-w-[calc(100vw-32px)] rounded-lg"
          >
            <ThemeSwitch />
          </DialogContent>
        </Dialog>

        <div className="flex">
          <Link href="/board/add-task">
            <Button className="hidden sm:block">+ Add new task</Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-auto px-0 pl-2 dark:hover:bg-transparent">
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
