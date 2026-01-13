import { Task, TaskCreate, TaskUpdate } from '@/types';

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Complete project documentation",
    description: "Write comprehensive README and deployment guides",
    completed: false,
    priority: 8,
    category: "Work",
    due_date: "2026-01-15",
    created_at: "2026-01-12T10:00:00Z",
    updated_at: "2026-01-12T10:00:00Z"
  },
  {
    id: 2,
    title: "Review pull requests",
    description: "Check and approve pending PRs",
    completed: true,
    priority: 6,
    category: "Work",
    due_date: "2026-01-13",
    created_at: "2026-01-11T15:30:00Z",
    updated_at: "2026-01-12T09:00:00Z"
  },
  {
    id: 3,
    title: "Buy groceries",
    description: "Milk, eggs, bread, vegetables",
    completed: false,
    priority: 4,
    category: "Personal",
    due_date: "2026-01-14",
    created_at: "2026-01-10T20:00:00Z",
    updated_at: "2026-01-10T20:00:00Z"
  },
  {
    id: 4,
    title: "Learn TypeScript",
    description: "Complete advanced TypeScript course",
    completed: false,
    priority: 7,
    category: "Learning",
    due_date: "2026-01-20",
    created_at: "2026-01-09T12:00:00Z",
    updated_at: "2026-01-09T12:00:00Z"
  },
  {
    id: 5,
    title: "Gym workout",
    description: "Upper body strength training",
    completed: true,
    priority: 5,
    category: "Personal",
    due_date: "2026-01-12",
    created_at: "2026-01-11T07:00:00Z",
    updated_at: "2026-01-12T18:00:00Z"
  }
];

class MockApiClient {
  private tasks: Task[] = [...mockTasks];

  async getTasks(filters?: any) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.tasks;
  }

  async createTask(taskData: TaskCreate): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newTask: Task = {
      id: Math.max(...this.tasks.map(t => t.id)) + 1,
      title: taskData.title,
      description: taskData.description || undefined,
      completed: false,
      priority: taskData.priority || 5,
      category: taskData.category || undefined,
      due_date: undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.tasks.unshift(newTask);
    return newTask;
  }

  async updateTask(id: number, taskData: TaskUpdate): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...taskData,
      updated_at: new Date().toISOString()
    };
    return this.tasks[taskIndex];
  }

  async deleteTask(id: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  async getCategories(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const categories = [...new Set(this.tasks.map(t => t.category).filter(Boolean))];
    return categories as string[];
  }
}

export const mockApiClient = new MockApiClient();
