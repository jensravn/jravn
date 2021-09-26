FROM node:14-alpine

# Create directory to hold the application code inside the image
WORKDIR /usr/src/app

# Copy the package.json and -lock.json into the workdir of the image
COPY package*.json ./

RUN npm install

# Bundle the app's source code inside the docker image
COPY . .

RUN npm run build

EXPOSE 4000

ENTRYPOINT [ "npm", "start" ]