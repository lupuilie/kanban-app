'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export default function Page() {
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Board</DialogTitle>
        </DialogHeader>
        <div>
          <Button variant="secondary" className="w-full">
            + Add New Column
          </Button>
        </div>
        <div>
          <Button className="w-full">Create New Board</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
