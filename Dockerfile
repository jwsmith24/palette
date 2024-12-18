# consolidated project Dockerfile
FROM node:22

# set working directory
WORKDIR /app

# copy package files to install dependencies first (docker build optimization, helps with caching)
COPY package.json ./
COPY package-lock.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

# clean install dependencies
RUN npm ci

# copy the rest of the project files
COPY . .

# expose ports for frontend, backend
EXPOSE 5173 3000
