from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, desc, asc
from models import Task
from schemas import TaskCreate, TaskUpdate, TaskQuery
from datetime import datetime, timezone

def get_task(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()

def get_tasks(db: Session, query: TaskQuery = None):
    db_query = db.query(Task)
    
    if query:
        # Search functionality
        if query.search:
            search_term = f"%{query.search}%"
            db_query = db_query.filter(
                or_(
                    Task.title.ilike(search_term),
                    Task.description.ilike(search_term),
                    Task.category.ilike(search_term)
                )
            )
        
        # Status filtering
        if query.status == "completed":
            db_query = db_query.filter(Task.completed == True)
        elif query.status == "pending":
            db_query = db_query.filter(Task.completed == False)
        
        # Category filtering
        if query.category:
            db_query = db_query.filter(Task.category == query.category)
        
        # Sorting
        sort_column = getattr(Task, query.sort_by, Task.created_at)
        if query.sort_order == "asc":
            db_query = db_query.order_by(asc(sort_column))
        else:
            db_query = db_query.order_by(desc(sort_column))
    else:
        db_query = db_query.order_by(desc(Task.created_at))
    
    tasks = db_query.all()
    
    # Convert to response format
    return [
        {
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'completed': task.completed,
            'priority': task.priority,
            'category': task.category,
            'due_date': task.due_date.isoformat() if task.due_date else None,
            'created_at': task.created_at.isoformat(),
            'updated_at': task.updated_at.isoformat()
        }
        for task in tasks
    ]

def create_task(db: Session, task: TaskCreate):
    task_data = task.model_dump()
    
    db_task = Task(**task_data)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    
    # Convert to response format
    return {
        'id': db_task.id,
        'title': db_task.title,
        'description': db_task.description,
        'completed': db_task.completed,
        'priority': db_task.priority,
        'category': db_task.category,
        'due_date': db_task.due_date.isoformat() if db_task.due_date else None,
        'created_at': db_task.created_at.isoformat(),
        'updated_at': db_task.updated_at.isoformat()
    }

def update_task(db: Session, task_id: int, task: TaskUpdate):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task:
        update_data = task.model_dump(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(db_task, field, value)
        db_task.updated_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(db_task)
        
        # Convert to response format
        return {
            'id': db_task.id,
            'title': db_task.title,
            'description': db_task.description,
            'completed': db_task.completed,
            'priority': db_task.priority,
            'category': db_task.category,
            'due_date': db_task.due_date.isoformat() if db_task.due_date else None,
            'created_at': db_task.created_at.isoformat(),
            'updated_at': db_task.updated_at.isoformat()
        }
    return None

def delete_task(db: Session, task_id: int):
    # Use a fresh query to find the task
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task:
        try:
            db.delete(db_task)
            db.commit()
            return db_task
        except Exception as e:
            db.rollback()
            print(f"Error deleting task: {e}")
            return None
    return None

def get_categories(db: Session):
    return db.query(Task.category).filter(Task.category.isnot(None)).distinct().all()
