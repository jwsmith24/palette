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

2. Ensure you're in the root directory containing the `docker-compose.yml` file.

3. Run one of the following commands to start your services:

```bash
  docker-compose up # run in attached mode (blocks the active shell session)
  docker-compose up -d # run in detached mode (does not block the active shell session)
 ```

_Note: when running in detached mode, stop the container with `docker-compose down`. Follow instructions below for
cleaning up afterward._

This will build and start the container, running the application with all dependencies included on any OS.

## Shutting Down

### Graceful Shutdown:

- To stop the services and remove the containers, run:
   ```bash
   docker-compose down
   ```
- _If running in attached mode, you can shut down the container with `CTRL + C`._

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
    - Docker should automatically add your user account to the docker group
    - If you encounter permission errors, ensure Docker is running and your user has permission to run Docker commands
      (added to the docker group).
    - You can check your current groups by running `groups` in the terminal.
    - For a temporary solution, run with `sudo`.
    - To add your user account to the docker group (permanent fix) run `sudo groupadd docker`.

2. **Check Logs**:
    - To check logs for debugging purposes:
   ```bash
   docker-compose logs
   ```

3. **Rebuilding Containers**:
    - If changes are made, and you need to rebuild the containers:
   ```bash
   docker-compose up --build
   ```

4. **Network Issues**:
    - If the application isn't accessible, ensure port 5173 is not being used by another application.

