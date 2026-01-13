#!/bin/bash

# Railway deployment script for TodoWebApp
# This script directs Railway to build backend service

echo "🚀 Starting TodoWebApp backend deployment..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL not set, using SQLite"
    export DATABASE_URL="sqlite:///./todos.db"
fi

echo "📦 Installing Python dependencies..."
pip install --no-cache-dir -r requirements.txt

echo "🌐 Starting FastAPI server..."
echo "🔗 Database URL: ${DATABASE_URL:0:20}..."
uvicorn main:app --host 0.0.0.0 --port $PORT
