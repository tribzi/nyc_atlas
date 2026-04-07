#!/bin/bash

# Define the root directory
ROOT_DIR="/home/bahij/projects/nyc_atlas"

echo "Scaffolding project architecture at $ROOT_DIR..."

# 1. Create the root directory and navigate into it
mkdir -p "$ROOT_DIR"
cd "$ROOT_DIR" || exit

# 2. Create root-level files
touch .gitignore README.md

# 3. Create frontend (React/Vite) structure
mkdir -p frontend/public
mkdir -p frontend/src/components
mkdir -p frontend/src/pages
mkdir -p frontend/src/lib
touch frontend/package.json frontend/vite.config.js frontend/src/App.jsx frontend/src/main.jsx

# 4. Create Supabase structure
mkdir -p supabase/migrations
touch supabase/config.toml supabase/migrations/20260407_init.sql supabase/seed.sql

# 5. Create researcher_agent (LangGraph/Python) structure
mkdir -p researcher_agent/output
touch researcher_agent/__init__.py researcher_agent/requirements.txt researcher_agent/.env \
      researcher_agent/state.py researcher_agent/tools.py researcher_agent/graph.py \
      researcher_agent/run.py

# 6. Initialize the Python virtual environment
echo "Initializing Python virtual environment in researcher_agent..."
cd researcher_agent || exit
python3 -m venv venv

echo "✅ Project scaffolding complete!"
