'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { fetchTaskById, updateTask } from '@/services/task';

type TaskDialogProps = {
  params: { id: string };
};

export default function TaskDialog({ params: { id } }: TaskDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const queryKey = 'boards';

  const { mutate, isPending } = useMutation({
    mutationKey: [queryKey],
    mutationFn: () => updateTask(queryKey, 'new name'),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [queryKey] });
    },
  });

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
          <DialogTitle>View task dialog</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>

        <TaskDetails taskId={id} />

        <Button
          disabled={isPending}
          onClick={() => {
            mutate();
          }}
        >
          Update task
        </Button>
      </DialogContent>
    </Dialog>
  );
}

const TaskDetails = ({ taskId }: { taskId: string }) => {
  const { data } = useQuery({
    queryKey: ['boards'],
    queryFn: () => fetchTaskById('1'),
  });

  return (
    <div>
      <div>taskId: {taskId} </div>
      <p className="text-body-m">other informations about the task</p>
    </div>
  );
};
