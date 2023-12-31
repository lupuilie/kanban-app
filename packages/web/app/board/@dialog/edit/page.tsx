'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTitle, DialogHeader, DialogContent } from '@/components/ui/dialog';

export default function EditBoardDialog() {
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
          <DialogTitle>Edit board</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 pt-6">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="board-name">Board Name</Label>
            <Input id="board-name" type="text" placeholder="e.g. Web Design" />
          </div>
          <div className="grid gap-2">
            <Label>Board Columns</Label>
            <div className="grid gap-3 mt-2">
              <div className="flex gap-4">
                <Input id="board-name" type="text" placeholder="e.g. Todo" />
                <Button variant="icon" size="icon" className="p-0">
                  <X size={20} />
                </Button>
              </div>
              <div className="flex gap-4">
                <Input id="board-name" type="text" placeholder="e.g. Todo" />
                <Button variant="icon" size="icon" className="p-0">
                  <X size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="pt-1 grid gap-6">
            <div>
              <Button variant="secondary" className="w-full">
                + Add New Column
              </Button>
            </div>
            <div>
              <Button className="w-full">Save Changes</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
