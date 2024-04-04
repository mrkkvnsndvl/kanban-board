import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ProjectTitleStore } from '@/_types/project-title-type';

export const useProjectTitleStore = create<ProjectTitleStore>()(
  persist<ProjectTitleStore>(
    (set) => ({
      projectTitle: '',
      setProjectTitle: (projectTitle) => set({ projectTitle: projectTitle }),
    }),
    {
      name: 'project-title-store',
      skipHydration: true,
    },
  ),
);
