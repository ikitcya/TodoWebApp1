import sys
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add the root directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from main import app
    logger.info("Successfully imported FastAPI app")
except Exception as e:
    logger.error(f"Failed to import FastAPI app: {e}")
    raise

# Vercel serverless function handler
handler = app
