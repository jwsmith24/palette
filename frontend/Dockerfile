# use the offical Node.js image
FROM node:22

# set working directory inside the docker container
WORKDIR /app

# copy frontend module to /app
COPY frontend ./frontend

# change into backend module and install dependencies
WORKDIR /app/frontend
RUN npm ci

# expost vite's default port
EXPOSE 5173

# run the command to start the vite server
CMD ["npm", "run", "dev", "--host"]

