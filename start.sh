#!/bin/bash

# Railway deployment script for TodoWebApp
# This script directs Railway to build the backend service

echo "🚀 Starting TodoWebApp backend deployment..."

# Install dependencies and start the server
echo "📦 Installing Python dependencies..."
pip install --no-cache-dir -r requirements.txt

echo "🌐 Starting FastAPI server..."
uvicorn main:app --host 0.0.0.0 --port $PORT
