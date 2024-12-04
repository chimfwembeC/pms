import { create } from 'zustand';
import { Task, Project, User } from '@/types';

interface AppState {
  currentUser: User | null;
  selectedTask: Task | null;
  selectedProject: Project | null;
  tasks: Task[];
  projects: Project[];
  setCurrentUser: (user: User | null) => void;
  setSelectedTask: (task: Task | null) => void;
  setSelectedProject: (project: Project | null) => void;
  setTasks: (tasks: Task[]) => void;
  setProjects: (projects: Project[]) => void;
}

export const useStore = create<AppState>((set) => ({
  currentUser: null,
  selectedTask: null,
  selectedProject: null,
  tasks: [],
  projects: [],
  setCurrentUser: (user) => set({ currentUser: user }),
  setSelectedTask: (task) => set({ selectedTask: task }),
  setSelectedProject: (project) => set({ selectedProject: project }),
  setTasks: (tasks) => set({ tasks }),
  setProjects: (projects) => set({ projects }),
}));