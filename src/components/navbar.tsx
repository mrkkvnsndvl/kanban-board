'use client';
import { Kanban } from 'lucide-react';

import AddTaskDialog from './add-task-dialog';
import ProjectTitleDialog from './project-title-dialog';
import { useEffect } from 'react';
import { useProjectTitleStore } from '@/_stores/project-title-store';

export default function Navbar() {
  useEffect(() => {
    useProjectTitleStore.persist.rehydrate();
  }, []);

  return (
    <header className='flex items-center px-4 lg:px-8 h-[64px] lg:h-[72px] shadow sticky top-0 right-0 z-10 bg-white md:static'>
      <nav className='flex justify-between w-full'>
        <div className='flex items-center'>
          <Kanban className='w-6 h-6' />
          <span className='ml-2 font-medium leading-none'>Kanban Board</span>
        </div>
        <div className='flex items-center gap-x-2'>
          <ProjectTitleDialog />
          <AddTaskDialog />
        </div>
      </nav>
    </header>
  );
}
