from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List, Optional
from datetime import datetime
import os
from dotenv import load_dotenv
import models
import schemas
import crud

load_dotenv()

app = FastAPI(title="Todo API", version="1.0.0")

# Enable CORS with environment-based configuration
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    try:
        port = os.getenv("PORT", "8000")
        print(f"🚀 Starting Todo API on port {port}...")
        print(f"🔗 Database URL: {os.getenv('DATABASE_URL', 'SQLite')}")
        # Create database tables
        models.Base.metadata.create_all(bind=models.engine)
        print("✅ Database tables created successfully")
        
    except Exception as e:
        print(f"❌ Startup error: {e}")

@app.get("/")
def read_root():
    return {"message": "Todo API is running", "status": "healthy", "port": int(os.getenv("PORT", "8000"))}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "Todo API", "port": int(os.getenv("PORT", "8000"))}

@app.get("/ready")
def readiness_check():
    try:
        if os.getenv('DATABASE_URL'):
            db = models.SessionLocal()
            db.execute(text("SELECT 1"))
            db.close()
            return {"status": "ready", "database": "connected"}
        else:
            return {"status": "ready", "database": "sqlite"}
    except Exception as e:
        return {"status": "not ready", "database": "disconnected", "error": str(e)}

@app.get("/tasks")
def get_tasks(
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    sort_by: Optional[str] = Query("created_at"),
    sort_order: Optional[str] = Query("desc"),
    db: Session = Depends(models.get_db)
):
    query = schemas.TaskQuery(
        search=search,
        status=status,
        category=category,
        sort_by=sort_by,
        sort_order=sort_order
    )
    return crud.get_tasks(db, query)

@app.post("/tasks")
def create_task(task: schemas.TaskCreate, db: Session = Depends(models.get_db)):
    try:
        print(f"Received task: {task}")
        result = crud.create_task(db, task)
        print(f"Created task: {result}")
        return result
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/tasks/{task_id}")
def get_task(task_id: int, db: Session = Depends(models.get_db)):
    db_task = crud.get_task(db, task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@app.put("/tasks/{task_id}")
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(models.get_db)):
    db_task = crud.update_task(db, task_id, task)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(models.get_db)):
    # Create a fresh session for deletion to avoid any caching issues
    from sqlalchemy import create_engine
    from sqlalchemy.orm import sessionmaker
    
    # Use the same engine but create a new session
    fresh_db = models.SessionLocal()
    try:
        db_task = crud.delete_task(fresh_db, task_id)
        if db_task is None:
            fresh_db.close()
            raise HTTPException(status_code=404, detail="Task not found")
        fresh_db.close()
        return {"message": "Task deleted successfully"}
    except Exception as e:
        fresh_db.close()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/categories", response_model=List[str])
def get_categories(db: Session = Depends(models.get_db)):
    categories = crud.get_categories(db)
    return [cat[0] for cat in categories if cat[0]]

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    print(f"🌐 Starting server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
