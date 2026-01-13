#!/bin/bash

echo "🚀 Starting TodoWebApp backend deployment..."

# Show environment info
echo "🔧 Environment variables:"
echo "PORT: $PORT"
echo "DATABASE_URL: ${DATABASE_URL:0:30}..."

# Install dependencies
echo "📦 Installing Python dependencies..."
pip install --no-cache-dir -r requirements.txt

# Start FastAPI server
echo "🌐 Starting FastAPI server on port $PORT..."
exec uvicorn main:app --host 0.0.0.0 --port $PORT --log-level info
