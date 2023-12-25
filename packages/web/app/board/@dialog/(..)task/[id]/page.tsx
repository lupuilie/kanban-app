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
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function TaskDialog() {
  const router = useRouter();

  const { refetch, isLoading, isRefetching, isFetched } = useQuery({
    queryKey: ['task'],
    queryFn: () => fetchTaskById('1'),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['task'],
    mutationFn: () => updateTask('2', 'new name'),
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

        {isFetched && <TaskDetails />}

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

const TaskDetails = () => {
  const { data } = useQuery({
    queryKey: ['task'],
    queryFn: () => fetchTaskById('1'),
  });
  return (
    <div>
      <div>id: {data?.data.id} </div>
      <div>name: {data?.data.name} </div>
    </div>
  );
};
