'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogTitle, DialogHeader, DialogContent } from '@/components/ui/dialog';

export default function Page() {
  const router = useRouter();
  const [columnInputNames, setColumnInputNames] = useState<string[]>(['Todo', 'Doing', 'Done']);

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
        <div className="grid gap-4 pt-6">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="board-name">Board Name</Label>
            <Input id="board-name" type="text" placeholder="e.g. Web Design" />
          </div>
          <div className="grid gap-2">
            <Label>Board Columns</Label>
            <div className="grid gap-3 mt-2">
              {columnInputNames.map((value, index) => (
                <div key={index} className="flex gap-4">
                  <Input
                    id="board-name"
                    type="text"
                    placeholder="e.g. Todo"
                    value={value}
                    onChange={(event) => updateColumnName(index, event.target.value)}
                  />
                  <Button
                    variant="icon"
                    size="icon"
                    className="p-0"
                    onClick={() => removeColumn(index)}
                  >
                    <X size={20} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-1 grid gap-6">
            <div>
              <Button variant="secondary" className="w-full" onClick={addColumn}>
                + Add New Column
              </Button>
            </div>
            <div>
              <Button className="w-full" onClick={createBoard}>
                Create New Board
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  function addColumn() {
    setColumnInputNames((columnInputNames) => [...columnInputNames, '']);
  }

  function removeColumn(index: number) {
    setColumnInputNames((columnInputNames) => {
      if (columnInputNames.length === 1) return [''];

      return columnInputNames.filter((_, i) => i !== index);
    });
  }

  function updateColumnName(index: number, value: string) {
    setColumnInputNames((columnInputNames) =>
      columnInputNames.map((name, i) => (i === index ? value : name)),
    );
  }

  function createBoard() {
    console.log('create board ', columnInputNames);
  }
}
