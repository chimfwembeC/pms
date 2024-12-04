import React from 'react';
import { Menu, Search } from 'lucide-react';
import Sidebar from './Sidebar';
import ProjectList from '../projects/ProjectList';
import TaskPanel from '../tasks/TaskPanel';
import DetailPanel from '../tasks/DetailPanel';
import { useStore } from '@/lib/store';

export default function Shell() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const selectedProject = useStore((state) => state.selectedProject);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-14 border-b flex items-center px-4 bg-white">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex-1 px-4">
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search tasks..."
                className="w-full pl-8 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 flex min-w-0">
          {!selectedProject ? (
            <ProjectList />
          ) : (
            <>
              <TaskPanel />
              <DetailPanel />
            </>
          )}
        </main>
      </div>
    </div>
  );
}