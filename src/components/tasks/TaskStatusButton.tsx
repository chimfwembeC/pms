import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { Task } from '@/types';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface TaskStatusButtonProps {
  task: Task;
  size?: 'sm' | 'md';
}

export default function TaskStatusButton({ task, size = 'md' }: TaskStatusButtonProps) {
  const handleStatusChange = async () => {
    const statuses: Record<string, string> = {
      'todo': 'in-progress',
      'in-progress': 'completed',
      'completed': 'todo'
    };

    const newStatus = statuses[task.status];
    
    try {
      await updateDoc(doc(db, 'tasks', task.id), {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  
  return (
    <button
      onClick={handleStatusChange}
      className="text-gray-400 hover:text-blue-500 transition-colors"
    >
      {task.status === 'completed' ? (
        <CheckCircle2 className={iconSize} />
      ) : task.status === 'in-progress' ? (
        <Clock className={iconSize} />
      ) : (
        <Circle className={iconSize} />
      )}
    </button>
  );
}