'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { fetchTaskById, updateTask } from '@/services/task';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type TaskDialogProps = {
  params: { id: string };
};

export default function TaskDialog({ params: { id } }: TaskDialogProps) {
  const router = useRouter();
  const queryKey = `task-${id}`;

  const { refetch, isLoading, isRefetching, isFetched } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchTaskById(queryKey),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [queryKey],
    mutationFn: () => updateTask(queryKey, 'new name'),
    onSuccess: () => {
      refetch();
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
        {(isRefetching || isLoading) && <div>Loading task...</div>}

        {isPending && <div>Updating...</div>}

        {isFetched && <TaskDetails queryKey={queryKey} />}

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

const TaskDetails = ({ queryKey }: { queryKey: string }) => {
  const { data } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchTaskById('1'),
  });
  return (
    <div>
      <div>id: {data?.data.id} </div>
      <div>name: {data?.data.name} </div>
    </div>
  );
};
