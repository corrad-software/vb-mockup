#!/bin/sh

# Startup script for Coolify deployment
echo "Starting NAS Vibecode Prototype..."

# Initialize database if it doesn't exist
if [ ! -f "./dev.db" ]; then
  echo "Initializing database..."
  npx prisma db push --accept-data-loss || echo "Warning: Database initialization failed, but continuing..."
fi

# Start the development server
echo "Starting Nuxt dev server..."
yarn dev
