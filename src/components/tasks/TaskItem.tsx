import React from 'react';
import { Task } from '@/types';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import TaskStatusButton from './TaskStatusButton';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { selectedTask, setSelectedTask } = useStore((state) => ({
    selectedTask: state.selectedTask,
    setSelectedTask: state.setSelectedTask,
  }));

  const isSelected = selectedTask?.id === task.id;

  return (
    <div
      onClick={() => setSelectedTask(task)}
      className={cn(
        'p-3 rounded-lg cursor-pointer',
        isSelected ? 'bg-blue-50' : 'hover:bg-gray-100'
      )}
    >
      <div className="flex items-start gap-3">
        <TaskStatusButton task={task} />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate">{task.title}</h4>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-500">
              Due {new Date(task.dueDate).toLocaleDateString()}
            </span>
            {task.assignees.length > 0 && (
              <span className="text-xs text-gray-500">
                • {task.assignees.length} assigned
              </span>
            )}
            {task.subtasks.length > 0 && (
              <span className="text-xs text-gray-500">
                • {task.subtasks.filter(st => st.status === 'completed').length}/{task.subtasks.length} subtasks
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}