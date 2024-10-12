#!/bin/bash
echo "Navigating to frontend directory and starting the development server..."
cd frontend || { echo "Failed to start the development server"; exit 1;}
npm run dev
