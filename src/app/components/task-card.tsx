import clsx from 'clsx';
import { Ellipsis, GripHorizontal, Pen, Shuffle, Trash } from 'lucide-react';
import { useEffect } from 'react';

import { useLoadingStore } from '@/_stores/loading-store';
import { useTaskStore } from '@/_stores/task-store';
import { TaskStatus } from '@/_types/task-type';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

import TaskSkeleton from './task-skeleton';
import { toast } from 'sonner';

export default function TaskCard({
  id,
  taskTitle,
  taskDescription,
  taskStatus,
}: {
  id: string;
  taskTitle: string;
  taskDescription: string;
  taskStatus: TaskStatus;
}) {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const changeTaskStatus = useTaskStore((state) => state.changeTaskStatus);
  const isLoading = useLoadingStore((state) => state.isLoading);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const dragTask = useTaskStore((state) => state.dragTask);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const { taskTitle, taskDescription } = Object.fromEntries(formData);
    if (typeof taskTitle !== 'string' || typeof taskDescription !== 'string')
      return;
    updateTask(id, taskTitle, taskDescription);
    toast.success('Task updated');
  };

  const handledeleteTask = () => {
    deleteTask(id);
    toast.success('Task deleted');
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [setIsLoading]);

  return isLoading ? (
    <TaskSkeleton />
  ) : (
    <Card
      className={clsx('flex flex-col p-3 mb-3 space-y-2 bg-white border-2', {
        'border-red-500': taskStatus === 'backlog',
        'border-blue-500': taskStatus === 'todo',
        'border-orange-500': taskStatus === 'inprogress',
        'border-green-500': taskStatus === 'done',
      })}
      onDragStart={() => dragTask(id)}
      draggable>
      <div className='flex flex-row items-start justify-between w-full'>
        <span className='font-medium break-all w-[calc(100%-20px)]'>
          {taskTitle}
        </span>
        <GripHorizontal className='w-5 h-5' />
      </div>
      <p className='text-sm break-all'>{taskDescription}</p>
      <CardFooter className='flex justify-end p-0'>
        <Dialog>
          <DialogTrigger asChild>
            <Ellipsis className='w-5 h-5 cursor-pointer' />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className='text-start'>
              <DialogTitle className='break-all w-[calc(100%-20px)]'>
                {taskTitle}
              </DialogTitle>
            </DialogHeader>
            <Separator orientation='horizontal' />
            <div className='flex flex-col items-start justify-between w-full sm:flex-row sm:items-center gap-y-4'>
              <div className='flex flex-row gap-x-2'>
                <Dialog>
                  <DialogTrigger asChild>
                    <span className='flex items-center text-sm cursor-pointer sm:text-base'>
                      <Pen className='w-4 h-4 mr-2' /> Update
                    </span>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className='text-start'>
                      <DialogTitle>Update Task</DialogTitle>
                      <DialogDescription>
                        Change your task title and description here. Click save
                        when you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      className='flex flex-col gap-y-4'
                      id='update-task-form'
                      onSubmit={handleSubmit}>
                      <div className='flex flex-col items-start w-full gap-y-2'>
                        <Label htmlFor='taskTitle'>Task Title</Label>
                        <Input
                          id='taskTitle'
                          name='taskTitle'
                          defaultValue={taskTitle}
                          required
                        />
                      </div>
                      <div className='flex flex-col gap-y-2'>
                        <Label htmlFor='taskDescription'>
                          Task Description
                        </Label>
                        <Textarea
                          id='taskDescription'
                          name='taskDescription'
                          defaultValue={taskDescription}
                          required
                        />
                      </div>
                    </form>
                    <DialogFooter className='gap-y-2'>
                      <DialogClose asChild>
                        <Button variant='outline'>Cancel</Button>
                      </DialogClose>
                      <DialogTrigger asChild>
                        <Button type='submit' form='update-task-form'>
                          Save changes
                        </Button>
                      </DialogTrigger>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Separator orientation='vertical' />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <span className='flex items-center text-sm cursor-pointer sm:text-base'>
                      <Trash className='w-4 h-4 mr-2' />
                      Delete
                    </span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader className='text-start'>
                      <AlertDialogTitle>Delete Task</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this task? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handledeleteTask}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Separator orientation='vertical' />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <span className='flex items-center text-sm cursor-pointer sm:text-base'>
                      <Shuffle className='w-4 h-4 mr-2' />
                      Change status
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                      value={taskStatus}
                      onValueChange={(value) =>
                        changeTaskStatus(id, value as TaskStatus)
                      }>
                      {Object.entries({
                        backlog: 'Backlog',
                        todo: 'To Do',
                        inprogress: 'In Progress',
                        done: 'Done',
                      }).map(([value, label]) => (
                        <DropdownMenuRadioItem
                          key={value}
                          value={value}
                          disabled={taskStatus === value}>
                          {label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Badge
                className={clsx('text-sm', {
                  'bg-red-500': taskStatus === 'backlog',
                  'bg-blue-500': taskStatus === 'todo',
                  'bg-orange-500': taskStatus === 'inprogress',
                  'bg-green-500': taskStatus === 'done',
                })}>
                {taskStatus}
              </Badge>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
