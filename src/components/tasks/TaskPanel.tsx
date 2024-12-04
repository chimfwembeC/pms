import React, { useState } from 'react';
import { Plus, List } from 'lucide-react';
import { useTasks } from '@/lib/hooks';
import { useStore } from '@/lib/store';
import TaskItem from './TaskItem';
import CreateTaskModal from './CreateTaskModal';

export default function TaskPanel() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'my'>('all');
  const { selectedProject, tasks, currentUser } = useStore((state) => ({
    selectedProject: state.selectedProject,
    tasks: state.tasks,
    currentUser: state.currentUser,
  }));

  // Initialize tasks listener
  useTasks(selectedProject?.id);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'my' && currentUser) {
      return task.assignees.includes(currentUser.id);
    }
    return true;
  });

  return (
    <div className="w-96 border-r flex flex-col bg-gray-50">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              filter === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100'
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setFilter('my')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              filter === 'my'
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100'
            }`}
          >
            My Tasks
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-2">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          ) : (
            <div className="text-center py-8">
              <List className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-gray-500 font-medium">No tasks yet</h3>
              <p className="text-gray-400 text-sm mt-1">
                Create your first task to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateTaskModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
}