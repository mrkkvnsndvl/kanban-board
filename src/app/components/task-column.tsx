import { Activity, Backpack, Check, ListTodo } from 'lucide-react';
import { useEffect, useMemo } from 'react';

import { useTaskStore } from '@/_stores/task-store';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import TaskCard from './task-card';
import { TaskStatus } from '@/_types/task-type';

export default function TaskColumn({
  taskTitle,
  tasksStatus,
}: {
  taskTitle: string;
  tasksStatus: string;
}) {
  const tasks = useTaskStore((state) => state.tasks);
  const changeTaskStatus = useTaskStore((state) => state.changeTaskStatus);
  const dragTask = useTaskStore((state) => state.dragTask);
  const draggedTaskId = useTaskStore((state) => state.draggedTaskId);

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.taskStatus === tasksStatus),
    [tasks, tasksStatus],
  );

  useEffect(() => {
    useTaskStore.persist.rehydrate();
  }, []);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTaskId) return;
    changeTaskStatus(draggedTaskId, tasksStatus as TaskStatus);
    dragTask(null);
  };

  return (
    <div
      className='w-full'
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}>
      <div className='flex items-center mb-4'>
        {tasksStatus === 'backlog' ? (
          <Backpack className='w-5 h-5 stroke-zinc-400' />
        ) : tasksStatus === 'todo' ? (
          <ListTodo className='w-5 h-5 stroke-zinc-400' />
        ) : tasksStatus === 'inprogress' ? (
          <Activity className='w-5 h-5 stroke-zinc-400' />
        ) : tasksStatus === 'done' ? (
          <Check className='w-5 h-5 stroke-zinc-400' />
        ) : null}
        <span className='ml-2 font-medium text-zinc-400'>{taskTitle}</span>
      </div>
      <ScrollArea className='p-3 rounded-md bg-zinc-100 h-[calc(100svh-136px)] lg:h-[calc(100svh-176px)]'>
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
        {filteredTasks.length === 0 && tasksStatus === 'backlog' && (
          <div className='flex items-center justify-center h-[calc(100svh-160px)] lg:h-[calc(100svh-200px)]'>
            <span className='font-medium'>Create your first task</span>
          </div>
        )}
        {tasks.length &&
        filteredTasks.length === 0 &&
        tasksStatus !== 'backlog' ? (
          <div className='flex items-center justify-center h-[calc(100svh-160px)] lg:h-[calc(100svh-200px)]'>
            <span className='hidden font-medium md:block'>
              Drag your tasks here
            </span>
            <span className='block font-medium md:hidden'>
              Change status of tasks
            </span>
          </div>
        ) : null}
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </div>
  );
}
