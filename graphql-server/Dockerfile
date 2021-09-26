FROM node:14 AS deps
# Create directory to hold the application code inside the image
WORKDIR /usr/src/app
# Copy the package.json and -lock.json into the workdir of the image
COPY package*.json ./
RUN npm ci --only=production

FROM node:14 AS builder
WORKDIR /usr/src/app
COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN npm run build

FROM node:14-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ ./
# App binds to port 4000. We EXPOSE to have it mapped by the docker daemon
EXPOSE 4000
# We use ENTRYPOINT(instead of CMD) to define a container with a specific executable that can not be overridden
ENTRYPOINT [ "npm", "start" ]