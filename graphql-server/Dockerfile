###################################
### STAGE 0 - BUILD FROM SOURCE ###
###################################
FROM node:14

# Create directory to hold the application code inside the image
WORKDIR /usr/src/app

# Copy the package.json and -lock.json into the workdir of the image
COPY package*.json ./

# Production optimized npm install
RUN npm ci --only=production

# Bundle the app's source code inside the docker image
COPY . .

RUN npm run build

#########################################
### STAGE 1 - CREATE PRODUCTION IMAGE ###
#########################################
FROM node:14-alpine

# Create same directory again
WORKDIR /usr/src/app

# Copy from last stage into nem image
COPY --from=0 /usr/src/app/ ./

# App binds to port 4000. We EXPOSE to have it mapped by the docker daemon
EXPOSE 4000

# We use ENTRYPOINT(instead of CMD) to define a container with a specific executable that can not be overridden
ENTRYPOINT [ "npm", "start" ]