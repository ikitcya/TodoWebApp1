'use client';

import { Task } from '@/types';
import { apiClient } from '@/lib/api';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Tag, GripVertical, Trash2, Calendar, Clock } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted?: (taskId: number) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function TaskItem({ task, onTaskUpdated, onTaskDeleted, dragHandleProps }: TaskItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed;

  const handleToggleComplete = async () => {
    try {
      const updatedTask = await apiClient.updateTask(task.id, {
        completed: !task.completed,
      });
      onTaskUpdated(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await apiClient.deleteTask(task.id);
        onTaskDeleted?.(task.id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <Card className={`p-4 ${task.completed ? 'opacity-50 border-gray-200' : ''}`}>
      <div className="flex items-start gap-3">
        <div {...dragHandleProps} className="cursor-move">
          <GripVertical className="w-4 h-4 text-gray-400 mt-1" />
        </div>
        
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleToggleComplete}
        />
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium border ${task.completed ? 'border-gray-300 text-gray-400' : 'border-gray-300 text-gray-600'}`}>
              Priority {task.priority}
            </span>
            
            {task.category && (
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${task.completed ? 'bg-blue-100 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                <Tag className="w-3 h-3" />
                {task.category}
              </span>
            )}
            
            {task.due_date && (
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${isOverdue ? 'bg-red-100 text-red-600' : task.completed ? 'bg-gray-100 text-gray-400' : 'bg-green-50 text-green-600'}`}>
                <Calendar className="w-3 h-3" />
                {formatDate(task.due_date)}
              </span>
            )}
            
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${task.completed ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
              <Clock className="w-3 h-3" />
              Created {formatDate(task.created_at)}
            </span>
            
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
