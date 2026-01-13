'use client';

import { useState } from 'react';
import { TaskCreate, Task } from '@/types';
import { apiClient } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TaskFormProps {
  onTaskCreated: (task: Task) => void;
}

export function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskCreate>({
    title: '',
    description: '',
    priority: undefined,
    category: '',
    due_date: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    try {
      // Clean up the form data - remove empty strings for optional fields
      const cleanedData: TaskCreate = {
        title: formData.title,
        ...(formData.description && { description: formData.description }),
        ...(formData.priority && { priority: formData.priority }),
        ...(formData.category && { category: formData.category }),
        ...(formData.due_date && { due_date: formData.due_date }),
      };
      
      const newTask = await apiClient.createTask(cleanedData);
      onTaskCreated(newTask);
      setFormData({
        title: '',
        description: '',
        priority: undefined,
        category: '',
        due_date: '',
      });
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow border">
      <h3 className="text-lg font-semibold">Add New Task</h3>
      
      <div>
        <Input
          id="task-title"
          name="title"
          placeholder="Task title..."
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="text-lg"
        />
      </div>

      <div>
        <Textarea
          id="task-description"
          name="description"
          placeholder="Description (optional)..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="text-base"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <Input
            id="task-priority"
            name="priority"
            type="number"
            min="1"
            max="10"
            placeholder="Priority (1-10)"
            value={formData.priority || ''}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full text-base h-12"
          />
        </div>

        <div>
          <label htmlFor="task-category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <Input
            id="task-category"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full text-base h-12"
          />
        </div>
      </div>

      <div>
        <label htmlFor="task-due-date" className="block text-sm font-medium text-gray-700 mb-2">
          Due Date & Time
        </label>
        <Input
          id="task-due-date"
          name="due_date"
          type="datetime-local"
          value={formData.due_date || ''}
          onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
          className="w-full text-base h-12"
        />
      </div>

      <Button type="submit" disabled={isSubmitting || !formData.title.trim()} className="w-full h-12 text-lg font-semibold">
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </Button>
    </form>
  );
}
