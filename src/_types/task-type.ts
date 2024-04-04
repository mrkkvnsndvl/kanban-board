export type TaskStatus = 'backlog' | 'todo' | 'inprogress' | 'done';

export type Task = {
  state: any;
  id: string;
  taskTitle: string;
  taskDescription: string;
  taskStatus: TaskStatus;
};

export type TaskState = {
  tasks: Task[];
  draggedTaskId: string | null;
};

export type TaskActions = {
  createTask: (taskTitle: string, taskDescription: string) => void;
  updateTask: (id: string, taskTitle: string, taskDescription: string) => void;
  deleteTask: (id: string) => void;
  changeTaskStatus: (id: string, taskStatus: TaskStatus) => void;
  dragTask: (id: string | null) => void;
};

export type TaskStore = TaskState & TaskActions;
