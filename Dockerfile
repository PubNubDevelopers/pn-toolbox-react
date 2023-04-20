# Dockerfile

# Use the official Node.js 12 image as the base image
FROM node:12

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install the application's dependencies
RUN npm install

# Copy the application source code into the working directory
COPY . .

# Expose port 3000 for the application to run on
EXPOSE 3000

# Start the application using the "npm run start" command
CMD ["npm", "run", "start"]

