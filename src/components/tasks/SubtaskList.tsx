import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task } from '@/types';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import TaskStatusButton from './TaskStatusButton';

interface SubtaskListProps {
  parentTask: Task;
}

export default function SubtaskList({ parentTask }: SubtaskListProps) {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  const handleAddSubtask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;

    const newSubtask: Omit<Task, 'id'> = {
      title: newSubtaskTitle,
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: parentTask.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      projectId: parentTask.projectId,
      parentTaskId: parentTask.id,
      assignees: parentTask.assignees,
      subtasks: []
    };

    try {
      const updatedSubtasks = [...parentTask.subtasks, { ...newSubtask, id: Date.now().toString() }];
      await updateDoc(doc(db, 'tasks', parentTask.id), {
        subtasks: updatedSubtasks,
        updatedAt: new Date().toISOString()
      });
      setNewSubtaskTitle('');
    } catch (error) {
      console.error('Failed to add subtask:', error);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900">Subtasks</h3>
      
      <form onSubmit={handleAddSubtask} className="flex gap-2">
        <input
          type="text"
          value={newSubtaskTitle}
          onChange={(e) => setNewSubtaskTitle(e.target.value)}
          placeholder="Add a subtask..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
        />
        <button
          type="submit"
          className="p-2 text-gray-400 hover:text-blue-500 rounded-md hover:bg-gray-100"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      <ul className="space-y-2">
        {parentTask.subtasks.map((subtask) => (
          <li key={subtask.id} className="flex items-center gap-2">
            <TaskStatusButton task={subtask} size="sm" />
            <span className="text-sm text-gray-700">{subtask.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}