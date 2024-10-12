#!/bin/bash
echo "Navigating to backend module and starting the web server..."
cd backend || { echo "Failed to find directory: backend"; exit 1;}
npm run dev || { echo "Failed to start the server"; exit 1;}
