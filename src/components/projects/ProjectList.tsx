import React from 'react';
import { Plus } from 'lucide-react';
import { useProjects } from '@/lib/hooks';
import { useStore } from '@/lib/store';
import ProjectItem from './ProjectItem';
import CreateProjectModal from './CreateProjectModal';

export default function ProjectList() {
  const { projects } = useStore((state) => ({
    projects: state.projects,
  }));
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  // Initialize projects listener
  useProjects();

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Projects</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
          
          {projects.length === 0 && (
            <div className="text-center py-8">
              <h3 className="text-gray-500 font-medium">No projects yet</h3>
              <p className="text-gray-400 text-sm mt-1">
                Create your first project to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateProjectModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
}