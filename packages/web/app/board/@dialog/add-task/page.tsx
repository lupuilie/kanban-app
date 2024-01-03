'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTitle, DialogHeader, DialogContent } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

export default function Page() {
  const router = useRouter();
  const [status, setStatus] = useState('todo');

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
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 pt-6">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="board-name">Title</Label>
            <Input id="board-name" type="text" placeholder="e.g. Take coffee break" />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              placeholder="e.g. It`s always good to take a break. This 15 minute break will recharge the batteries a little."
              rows={4}
            />
          </div>
          <div className="grid gap-2">
            <Label>Subtasks</Label>
            <div className="grid gap-3">
              <div className="flex gap-4">
                <Input id="board-name" type="text" placeholder="e.g. Make coffee" />
                <Button variant="icon" size="icon" className="p-0">
                  <X size={20} />
                </Button>
              </div>
              <div className="flex gap-4">
                <Input id="board-name" type="text" placeholder="e.g. Drink coffee & smile" />
                <Button variant="icon" size="icon" className="p-0">
                  <X size={20} />
                </Button>
              </div>
            </div>
            <div className="pt-2">
              <Button variant="secondary" className="w-full">
                + Add New Subtask
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">Todo</SelectItem>
                <SelectItem value="doing">Doing</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-1 grid gap-6">
            <div>
              <Button className="w-full">Create Task</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
