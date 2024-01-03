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
import { useDialog } from '@/hooks/useDialog';

export default function DeleteTaskDialog() {
  const { open, onOpenChange } = useDialog({
    initialOpen: true,
    onCloseEnableBodyPointerEvents: true,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="grid gap-6">
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete this task?</DialogTitle>
        </DialogHeader>
        <p className="text-body-l text-medium-grey">
          Are you sure you want to delete the `Build settings UI` task and its subtasks? This action
          cannot be reversed.
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
