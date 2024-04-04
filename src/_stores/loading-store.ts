import { create } from 'zustand';

import { LoadingStore } from '@/_types/loading-type';

export const useLoadingStore = create<LoadingStore>()((set) => ({
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
}));
