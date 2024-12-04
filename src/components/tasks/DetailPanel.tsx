import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { useStore } from '@/lib/store';
import { format } from 'date-fns';
import TaskStatusButton from './TaskStatusButton';
import SubtaskList from './SubtaskList';

export default function DetailPanel() {
  const { selectedTask } = useStore((state) => ({
    selectedTask: state.selectedTask,
  }));

  if (!selectedTask) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="h-full flex items-center justify-center bg-gray-50">
          <div className="text-center p-6 max-w-sm mx-auto">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No task selected
              </h3>
              <p className="text-gray-500">Select a task to view its details</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <TaskStatusButton task={selectedTask} />
                <h2 className="text-2xl font-semibold text-gray-900">
                  {selectedTask.title}
                </h2>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedTask.priority === 'high'
                    ? 'bg-red-100 text-red-800'
                    : selectedTask.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {selectedTask.priority}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-5 h-5" />
                <span>
                  Due {format(new Date(selectedTask.dueDate), 'MMM d, yyyy')}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-5 h-5" />
                <span>
                  Created{' '}
                  {format(new Date(selectedTask.createdAt), 'MMM d, yyyy')}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <Users className="w-5 h-5" />
                <span>{selectedTask.assignees.length} assignees</span>
              </div>
            </div>

            {selectedTask.description && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Description</h3>
                <p className="mt-2 text-gray-500">{selectedTask.description}</p>
              </div>
            )}

            <div className="mt-6">
              <SubtaskList parentTask={selectedTask} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}