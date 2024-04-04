export type LoadingState = {
  isLoading: boolean;
};

export type LoadingActions = {
  setIsLoading: (isLoading: boolean) => void;
};

export type LoadingStore = LoadingState & LoadingActions;
