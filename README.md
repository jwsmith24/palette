# Palette :art:

[![Build Checks](https://github.com/jwsmith24/palette/actions/workflows/ci-checks.yml/badge.svg)](https://github.com/jwsmith24/palette/actions/workflows/ci-checks.yml)
![Docker](https://img.shields.io/badge/Docker-Compatible-blue)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)

An interactive rubric builder and grading assistant tool to improve the group project grading experience on Canvas.

## Table of Contents

1. [Requirements](#requirements)
2. [Startup Instructions](#startup-instructions)
   - [Running with Docker](#running-with-docker)
   - [Running without Docker](#running-without-docker)
3. [Shutting Down](#shutting-down)
4. [Troubleshooting](#troubleshooting)

---

## Requirements

Palette runs in a Docker container, providing the necessary Node environment. Make sure you have the following installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

Check your installations with:

```bash
docker --version
docker-compose --version
```

---

## Startup Instructions

### Running with Docker

1. Clone the repository and navigate to the root folder:

   ```bash
   git clone <repository-url>
   cd palette
   ```

2. Run one of the following commands to start the services:

   ```bash
   docker-compose up        # Attached mode
   docker-compose up -d     # Detached mode
   ```

   This will build and start the container, including a **PostgreSQL** database, on any OS.

3. **Stopping the Containers**
   - Use `CTRL + C` if in attached mode or `docker-compose down` if detached.

### Running without Docker

If you have [Node.js](https://nodejs.org/en) (version 18+) and [PostgreSQL](https://www.postgresql.org/) installed:

1. After cloning the repo, run:

   ```bash
   npm install && npm run dev
   ```

2. For local PostgreSQL, create a `.env` file:
   ```bash
   echo "DATABASE_URL=postgres://<username>:<password>@localhost:5432/<database_name>" > backend/.env
   ```

---

## Shutting Down

### Stopping Containers

- To stop services and remove containers:

  ```bash
  docker-compose down
  ```

- **Removing Volumes and Images**  
  For a complete cleanup:

  ```bash
  docker-compose down --volumes --rmi all
  ```

- **Optional:**  
  To remove unused resources:
  ```bash
  docker system prune --all --volumes
  ```

---

## Troubleshooting

1. **Permissions Issues**  
   Ensure Docker is running, and check that your user is in the `docker` group. For persistent issues, run with `sudo`.

2. **Checking Logs**

   ```bash
   docker-compose logs
   ```

3. **Rebuild Containers**  
   After changes:

   ```bash
   docker-compose up --build
   ```

4. **Network Issues**  
   Verify port `5173` is free.

---

## Usage

Once up and running, you can interact with the application on http://localhost:5173. Check out the rubrics builder to add and manage grading rubrics directly within Canvas.
