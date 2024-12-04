export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  teams: string[];
  role: 'admin' | 'manager' | 'user';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  projectId?: string;
  parentTaskId?: string;
  assignees: string[];
  subtasks: Task[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  members: string[];
}