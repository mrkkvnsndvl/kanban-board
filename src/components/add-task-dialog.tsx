import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTaskStore } from '@/_stores/task-store';
import { toast } from 'sonner';

export default function AddTaskDialog() {
  const createTask = useTaskStore((state) => state.createTask);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const { taskTitle, taskDescription } = Object.fromEntries(formData);
    if (typeof taskTitle !== 'string' || typeof taskDescription !== 'string')
      return;
    createTask(taskTitle, taskDescription);
    toast.success('Task created');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Plus className='w-4 h-4 mr-1' />
          Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='text-start'>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Add your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          className='flex flex-col gap-y-4'
          id='add-task-form'
          onSubmit={handleSubmit}>
          <div className='flex flex-col items-start w-full gap-y-2'>
            <Label htmlFor='taskTitle'>Task Title</Label>
            <Input id='taskTitle' name='taskTitle' required />
          </div>
          <div className='flex flex-col gap-y-2'>
            <Label htmlFor='taskDescription'>Task Description</Label>
            <Textarea id='taskDescription' name='taskDescription' />
          </div>
        </form>
        <DialogFooter className='gap-y-2'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <DialogTrigger asChild>
            <Button type='submit' form='add-task-form'>
              Save changes
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
