@echo off
echo Navigating to frontend directory and starting development server...

cd frontend/

if errorlevel 1 (
    echo Directory frontend directory not found.
    exit /b 1
)

npm run dev

if errorlevel 1 (
    echo Failed to start the development server.
    exit /b 1
)
