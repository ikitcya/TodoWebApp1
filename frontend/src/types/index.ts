export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: number;
  category?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
  priority?: number;
  category?: string;
  due_date?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: number;
  category?: string;
  due_date?: string;
}

export interface TaskFilters {
  search?: string;
  status?: 'all' | 'completed' | 'pending';
  category?: string;
  sort_by?: 'created_at' | 'priority' | 'due_date';
  sort_order?: 'asc' | 'desc';
}
