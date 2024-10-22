# use node v22 as the base image
FROM node:22

# set the working directory
WORKDIR /app

#copy backend files into working directoy
COPY backend ./backend

# change into backend module and install dependencies
WORKDIR /app/backend
RUN npm ci

# expose the backend port
EXPOSE 3000

# start the express server
CMD ["npm", "start"]