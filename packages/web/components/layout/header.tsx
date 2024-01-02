'use client';

import Image from 'next/image';
import { useContext, useState } from 'react';
import { MoreVertical, ChevronDown, Plus } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { BoardsList, ThemeSwitch } from './sidebar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardContext } from '@/components/providers/dashboard-context';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import darkLogo from '@/public/assets/logo-dark.svg';
import lightLogo from '@/public/assets/logo-light.svg';
import logoMobile from '@/public/assets/logo-mobile.svg';
import { useRouter } from 'next/navigation';
import { useBoards } from '@/hooks/useBoards';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

export const Header = () => {
  const router = useRouter();
  const { selectedBoardName, selectedBoardColumns } = useBoards();
  const { sidebarVisible } = useContext(DashboardContext);

  const isBoardEmpty = selectedBoardColumns.length === 0;
  const [isMobileDialogOpen, setIsMobileDialogOpen] = useState(false);

  return (
    <header className="w-full flex items-center bg-white dark:bg-dark-grey">
      <div
        className={cn(
          'hidden pl-6 h-16 min-w-64 md:h-20 md:flex lg:min-w-[300px] items-center border-r border-r-border ',
          !sidebarVisible && 'border-b border-b-border',
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
        <>
          <h1 className="hidden md:block font-bold text-xl lg:text-heading-xl">
            {selectedBoardName}
          </h1>
          <Dialog open={isMobileDialogOpen} onOpenChange={setIsMobileDialogOpen}>
            <DialogTrigger asChild>
              <div className="md:hidden flex items-center cursor-pointer">
                <Image src={logoMobile} alt={'logo mobile'} />
                <h1 className="text-heading-l pl-4 pr-2">{selectedBoardName}</h1>
                <ChevronDown className="text-primary" />
              </div>
            </DialogTrigger>
            <DialogContent
              centered={false}
              className="top-28 left-[50%] translate-x-[-50%] w-[calc(100vw-32px)] max-w-72 rounded-lg px-0 py-4"
            >
              <ScrollArea className="h-80">
                <BoardsList className="flex-1" onClickItem={() => setIsMobileDialogOpen(false)} />
                <ScrollBar orientation="vertical" />
              </ScrollArea>
              <ThemeSwitch />
            </DialogContent>
          </Dialog>
        </>

        <div className="flex">
          <Button disabled={isBoardEmpty} onClick={() => router.push('/board/add-task')}>
            <span className="hidden md:block">+ Add new task</span>
            <Plus className="md:hidden" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-min px-0 pl-2 dark:hover:bg-transparent">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push('/board/edit')}
              >
                Edit board
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push('/board/delete')}
              >
                <span className="text-destructive">Delete board</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export const HeaderSkeleton = () => {
  return (
    <header className="w-full flex items-center bg-white dark:bg-dark-grey">
      <div
        className={cn(
          'hidden pl-6 h-16 min-w-64 md:h-20 md:flex lg:min-w-[300px] items-center border-r border-r-border',
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
        <div className="flex items-center gap-4">
          <Image src={logoMobile} alt={'logo mobile'} className="md:hidden" />
          <Skeleton className="h-[30px] w-72" />
        </div>

        <div className="flex">
          <Button disabled>
            <span className="hidden md:block">+ Add new task</span>
            <Plus className="md:hidden" />
          </Button>
          <Button disabled variant="ghost" className="w-min px-0 pl-2 dark:hover:bg-transparent">
            <MoreVertical />
          </Button>
        </div>
      </div>
    </header>
  );
};
