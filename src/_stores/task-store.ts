import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Task, TaskStore } from '@/_types/task-type';

export const useTaskStore = create<TaskStore>()(
  persist<TaskStore>(
    (set) => ({
      tasks: [],
      draggedTaskId: null,
      createTask(taskTitle, taskDescription) {
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: uuidv4(),
              taskTitle: taskTitle,
              taskDescription: taskDescription,
              taskStatus: 'backlog',
            } as Task,
          ],
        }));
      },
      updateTask(id, taskTitle, taskDescription) {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  taskTitle: taskTitle,
                  taskDescription: taskDescription,
                }
              : task,
          ),
        }));
      },
      deleteTask(id) {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      changeTaskStatus(id, taskStatus) {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  taskStatus: taskStatus,
                }
              : task,
          ),
        }));
      },
      dragTask(id: string | null) {
        set({ draggedTaskId: id });
      },
    }),
    {
      name: 'task-store',
      skipHydration: true,
    },
  ),
);
