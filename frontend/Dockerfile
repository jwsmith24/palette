# use the offical Node.js image
FROM node:22

# working directory inside the docker container
WORKDIR /app

# copy over package.json and package-lock.json to working directory
COPY package*.json ./

# install dependencies
RUN npm install

# copy everything else in the module over
COPY . .

# expost vite's default port
EXPOSE 5173

# run the command to start the vite server
CMD ["npm", "run", "dev", "--host"]

