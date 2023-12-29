'use client';

import Image from 'next/image';
import { useContext } from 'react';
import { MoreVertical, ChevronDown, Plus } from 'lucide-react';

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
import { DashboardContext } from '@/components/providers/dashboard-context';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import darkLogo from '@/public/assets/logo-dark.svg';
import lightLogo from '@/public/assets/logo-light.svg';
import logoMobile from '@/public/assets/logo-mobile.svg';
import { useRouter } from 'next/navigation';

type HeaderProps = {
  boardName?: string;
  isLoading?: boolean;
};

export const Header = ({ boardName, isLoading = false }: HeaderProps) => {
  const router = useRouter();
  const { sidebarVisible } = useContext(DashboardContext);

  return (
    <header className="w-full flex items-center bg-white dark:bg-dark-grey">
      <div
        className={cn(
          'hidden pl-6 h-16 min-w-64 md:h-20 md:flex lg:min-w-[300px] items-center border-r border-r-border ',
          (!sidebarVisible || isLoading) && 'border-b border-b-border',
        )}
      >
        <Image className="dark:hidden" src={darkLogo} alt={'light logo'} />
        <Image className="hidden dark:block" src={lightLogo} alt={'dark logo'} />
      </div>
      <div
        className={cn(
          'w-full h-16 md:h-20 flex items-center justify-between  border-b border-b-border px-4 lg:px-6',
        )}
      >
        {isLoading ? (
          <Skeleton className="h-[30px] w-72" />
        ) : (
          <h1 className="hidden md:block font-bold text-xl lg:text-heading-xl">{boardName}</h1>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <div className="md:hidden flex items-center cursor-pointer">
              <Image src={logoMobile} alt={'logo mobile'} />
              <h1 className="text-heading-l pl-4 pr-2">{boardName}</h1>
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
          <Button disabled={isLoading} onClick={() => router.push('/board/add-task')}>
            <span className="hidden md:block">+ Add new task</span>
            <Plus className="md:hidden" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isLoading}>
              <Button variant="ghost" className="w-min px-0 pl-2 dark:hover:bg-transparent">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuItem>
                <Link href="#">Edit board</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/board/delete" className="text-destructive">
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
