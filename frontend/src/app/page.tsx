'use client';

import { useState, useEffect } from 'react';
import { Task, TaskFilters } from '@/types';
import { apiClient } from '@/lib/api';
import { TaskForm } from '@/components/TaskForm';
import { DraggableTaskList } from '@/components/DraggableTaskList';
import { TaskFilters as TaskFiltersComponent } from '@/components/TaskFilters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, ListTodo } from 'lucide-react';

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    sort_by: 'created_at',
    sort_order: 'desc',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const [tasksData, categoriesData] = await Promise.all([
        apiClient.getTasks(filters),
        apiClient.getCategories(),
      ]);
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // You could add toast notifications here for better UX
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskDeleted = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleTasksReordered = (reorderedTasks: Task[]) => {
    setTasks(reorderedTasks);
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <ListTodo className="w-8 h-8 text-blue-600" />
            Todo App
          </h1>
          <p className="text-gray-600">
            Manage your tasks efficiently with priority, categories, and due dates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Circle className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-gray-600">Pending Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{completedCount}</p>
                  <p className="text-sm text-gray-600">Completed Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <ListTodo className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{tasks.length}</p>
                  <p className="text-sm text-gray-600">Total Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <TaskForm onTaskCreated={handleTaskCreated} />

          <TaskFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
          />

          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">
                  Loading tasks...
                </div>
              ) : (
                <DraggableTaskList
                  tasks={tasks}
                  onTaskUpdated={handleTaskUpdated}
                  onTaskDeleted={handleTaskDeleted}
                  onTasksReordered={handleTasksReordered}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
