#!/bin/bash

# Define color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &>/dev/null; then
    echo -e "${RED}Docker is not installed. Please install before trying again.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &>/dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Navigate to the frontend directory
echo -e "${YELLOW}Navigating to frontend...${NC}"
if [ -d "frontend" ]; then
    cd frontend || { echo -e "${RED}Failed to enter the frontend directory.${NC}"; exit 1; }
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}Failed to find the frontend directory.${NC}"
    exit 1
fi

# Build the Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
if sudo docker build -t vite-app .; then
    echo -e "${GREEN}Docker image built successfully.${NC}"
else
    echo -e "${RED}Docker build failed.${NC}"
    exit 1
fi

# Run the container
echo -e "${YELLOW}Running docker compose...${NC}"

# Trap SIGINT signal (Ctrl+C) and exit the program gracefully!
trap 'echo -e "${GREEN}\nContainer stopped by user.${NC}"; exit 0' SIGINT

# Start the container
sudo docker-compose up

# If you reach here, it means docker-compose exited
echo -e "${GREEN}The Docker container has been stopped successfully. Have a wonderful day!${NC}"
