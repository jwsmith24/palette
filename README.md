# Palette :art:

An interactive rubric builder and grading assistant tool to improve the group project grading experience on Canvas.

## Table of Contents

1. [Requirements](#requirements)
2. [Startup Instructions](#startup-instructions)
3. [Shutting Down](#shutting-down)
4. [Troubleshooting](#troubleshooting)

## Requirements

The application runs inside a Docker container that provides the necessary Node environment. Make sure you have the
following installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

Check for Docker and Docker Compose with:

```bash
docker --version
docker-compose --version
```

## Startup Instructions

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   cd palette
   ```

2. Run the `start.sh` script to build and run the Docker containers:
   ```bash
   ./start.sh
   ```
   This will:
    - Build the necessary Docker images
    - Start the containers in either detached or attached mode (based on your choice)

3. Once the container is running, open your browser and navigate to:

   > http://localhost:5173

### Alternative Manual Steps:

If you prefer manual steps over the script:

1. Ensure you're in the directory containing your `docker-compose.yml` file.
2. Run one of the following commands to start your services:

```bash
  docker-compose up # run in attached mode
  docker-compose up -d # run in detached mode
 ```

This will build (if needed) and start the containers defined in the `docker-compose.yml` file within the root directory.

## Shutting Down

### Graceful Shutdown:

- To stop the services and remove the containers, run:
   ```bash
   docker-compose down
   ```

### Cleaning Up:

1. If you want to remove the volumes as well, run:
   ```bash
   docker-compose down --volumes
   ```

2. To remove all related images:
   ```bash
   docker-compose down --rmi all
   ```

### Optional Cleanup:

- To remove unused containers, networks, volumes, and images, use:
   ```bash
   docker system prune --all --volumes
   ```

## Troubleshooting

1. **Docker Permissions Issues**:  
   If you encounter permission errors, ensure Docker is running and your user has permission to run Docker commands. Use
   `sudo` if necessary.

2. **Check Logs**:  
   To check logs for debugging purposes:
   ```bash
   docker-compose logs
   ```

3. **Rebuilding Containers**:  
   If changes are made, and you need to rebuild the containers:
   ```bash
   docker-compose up --build
   ```

4. **Network Issues**:  
   If the application isn't accessible, ensure port 5173 is not being used by another application.

