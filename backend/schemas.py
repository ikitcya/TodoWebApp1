from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: int = 5
    category: Optional[str] = None
    due_date: Optional[datetime] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[int] = None
    category: Optional[str] = None
    due_date: Optional[datetime] = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    completed: bool
    priority: int
    category: Optional[str] = None
    due_date: Optional[str] = None
    created_at: str
    updated_at: str

class TaskQuery(BaseModel):
    search: Optional[str] = None
    status: Optional[str] = None  # "all", "completed", "pending"
    category: Optional[str] = None
    sort_by: Optional[str] = "created_at"  # "priority", "created_at", "due_date"
    sort_order: Optional[str] = "desc"  # "asc", "desc"
