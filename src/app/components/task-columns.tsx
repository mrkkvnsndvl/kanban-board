import TaskColumn from './task-column';

export default function TaskColumns() {
  return (
    <section className='grid grid-cols-1 gap-4 px-4 py-4 md:grid-cols-4 lg:px-8 lg:py-8'>
      <TaskColumn taskTitle='Backlog' tasksStatus='backlog' />
      <TaskColumn taskTitle='To Do' tasksStatus='todo' />
      <TaskColumn taskTitle='In Progress' tasksStatus='inprogress' />
      <TaskColumn taskTitle='Done' tasksStatus='done' />
    </section>
  );
}
