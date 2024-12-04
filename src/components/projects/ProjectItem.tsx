import React from 'react';
import { FolderKanban, Users } from 'lucide-react';
import { Project } from '@/types';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface ProjectItemProps {
  project: Project;
}

export default function ProjectItem({ project }: ProjectItemProps) {
  const { selectedProject, setSelectedProject } = useStore((state) => ({
    selectedProject: state.selectedProject,
    setSelectedProject: state.setSelectedProject,
  }));

  const isSelected = selectedProject?.id === project.id;

  return (
    <div
      onClick={() => setSelectedProject(project)}
      className={cn(
        'p-3 rounded-lg cursor-pointer',
        isSelected ? 'bg-blue-50' : 'hover:bg-gray-100'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <FolderKanban className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate">{project.name}</h4>
          {project.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {project.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">
              {project.members.length} members
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}