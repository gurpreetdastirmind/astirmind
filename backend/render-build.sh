#!/bin/bash

echo "Starting build process..."

# Install Python dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput

echo "Build completed successfully!"
