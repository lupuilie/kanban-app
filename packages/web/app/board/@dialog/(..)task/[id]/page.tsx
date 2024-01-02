'use client';

import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Dialog, DialogTitle, DialogHeader, DialogContent } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Subtask } from '@kanban-app/core/domain/entities';
import { CheckedState } from '@radix-ui/react-checkbox';
import { cn } from '@/lib/utils';

type TaskDialogProps = {
  params: { id: string };
};

const initialSubtasks = [
  new Subtask('id1', 'Research competitor pricing and business models', true, new Date()),
  new Subtask('id2', 'Outline a business model that works for our solution', true, new Date()),
  new Subtask(
    'id3',
    'Talk to potential customers about our proposed solution and ask for fair price expectancy',
    false,
    new Date(),
  ),
];

export default function TaskDialog({ params: { id } }: TaskDialogProps) {
  const router = useRouter();

  const [status, setStatus] = useState('todo');
  const [subtasks, setSubtasks] = useState<Subtask[]>(initialSubtasks);

  const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="pr-3">
            Research pricing points of various competitors and trial different business models
          </DialogTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="absolute top-5 right-4">
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-48">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  router.replace(`/task/${id}/edit`);
                }}
              >
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.replace(`/task/${id}/delete`)}
              >
                <span className="text-destructive">Delete Task</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogHeader>
        <div className="grid gap-4 pt-6">
          <p className="text-medium-grey">
            We know what we&apos;re planning to build for version one. Now we need to finalise the
            first pricing model we&apos;ll use. Keep iterating the subtasks until we have a coherent
            proposition.
          </p>
          <div className="grid space-y-4">
            <Label>
              Subtasks ({completedSubtasks.length} of {subtasks.length})
            </Label>
            <div className="grid space-y-2">
              {subtasks.map((subtask) => (
                <div
                  key={`subtask-${subtask.id}`}
                  className={cn(
                    'flex items-center space-x-4 p-4 rounded-lg bg-light-grey dark:bg-popover hover:bg-muted transition-colors',
                  )}
                >
                  <Checkbox
                    id={`subtask-${subtask.id}`}
                    className="bg-card"
                    checked={subtask.isCompleted}
                    onCheckedChange={(checked) => handleSubtaskCheckedChange(subtask, checked)}
                  />
                  <label
                    htmlFor={`subtask-${subtask.id}`}
                    className={cn(
                      'text-body-m leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 cursor-pointer',
                      subtask.isCompleted && 'line-through opacity-50',
                    )}
                  >
                    {subtask.title}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Current status</Label>
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
        </div>
      </DialogContent>
    </Dialog>
  );

  function handleSubtaskCheckedChange(changedSubtask: Subtask, checked: CheckedState) {
    const isCompleted = checked == 'indeterminate' ? false : checked;

    setSubtasks((subtasks) =>
      subtasks.map((subtask) =>
        subtask.id === changedSubtask.id ? { ...subtask, isCompleted } : subtask,
      ),
    );
  }
}
