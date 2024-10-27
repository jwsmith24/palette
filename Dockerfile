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

# generate prisma client
RUN npm run generate

# expose ports for frontend, backend, and postgres
EXPOSE 5173 3000 5432

## start the application in development mode
CMD ["npm", "run", "dev"]