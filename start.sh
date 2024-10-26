#!/bin/bash

# Define color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No color (to reset)

# Check if Docker is installed
if ! command -v docker &>/dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker and try again!${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &>/dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose and try again!${NC}"
    exit 1
fi

# Prompt user if they want to run in detached mode
read -p "Do you want to run containers in detached mode? (recommended) (y/n): " run_detached

# Decide whether to run in detached or attached mode
if [[ "$run_detached" =~ ^[Yy]$ ]]; then
    COMPOSE_CMD="docker-compose up -d"
    echo -e "${YELLOW}Running containers in detached mode...${NC}"
    echo -e "Run ${BLUE}docker-compose down${NC} to stop"
else
    COMPOSE_CMD="docker-compose up"
    echo -e "${YELLOW}Running containers in attached mode...${NC}"
fi

# Trap SIGINT signal (Ctrl+C) and exit the program gracefully
trap 'echo -e "${GREEN}Containers stopped by user. Have a wonderful day!${NC}"; exit 0' SIGINT

# Orchestrate containers
if $COMPOSE_CMD; then
    echo -e "${GREEN}Containers built successfully.${NC}"
else
    if [ $? -ne 130 ]; then  # 130 is the exit code for SIGINT (Ctrl+C)
        echo -e "${RED}Docker build failed.${NC}"
        exit 1
    fi
fi

