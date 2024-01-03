'use client';

import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function DeleteBoardDialog() {
  const router = useRouter();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent showCloseButton={false} className="grid gap-6">
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete this board?</DialogTitle>
        </DialogHeader>
        <p className="text-body-l text-medium-grey">
          Are you sure you want to delete the `Platform Launch` board? This action will remove all
          columns and tasks and cannot be reversed.
        </p>
        <DialogFooter className="pb-1 sm:flex sm:flex-row-reverse gap-4">
          <DialogClose asChild className="w-full">
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button variant="destructive" className="w-full">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
