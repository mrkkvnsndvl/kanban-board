export type ProjectTitleState = {
  projectTitle: string;
};

export type ProjectTitleActions = {
  setProjectTitle: (title: string) => void;
};

export type ProjectTitleStore = ProjectTitleState & ProjectTitleActions;
