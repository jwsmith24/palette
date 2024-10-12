#!/bin/bash
echo "Navigating to frontend directory and starting the development server..."
cd frontend || { echo "Failed to start the development server"; exit 1;}
npm run dev &
# let the server start up
sleep 3
# open the Vite dev server in default browser (works for WSL)
cmd.exe /C start http://localhost:5173

