# # Use Node.js 12.22.9 image as base
# FROM node:12.22.9-alpine as build

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application
# COPY . .

# # Build the React app
# RUN npm run build

# # Expose port 3000 (or the port your Node.js server listens on)
# EXPOSE 3000

# # Start the application using npm start
# CMD ["npm", "start"]



# Use Node.js 16.x image for building the application
FROM node:16-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Use Node.js 12.22.9 image for final stage
FROM node:12.22.9-alpine

# Set the working directory
WORKDIR /app

# Copy build artifacts from the build stage
COPY --from=build /app /app

# Expose port 3000 (or the port your Node.js server listens on)
EXPOSE 3000

# Start the application using npm start
CMD ["npm", "start"]
