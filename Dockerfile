# Use Node.js 12.22.9 image as base
FROM node:12.22.9-alpine as build

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

# Expose port 3000 (or the port your Node.js server listens on)
EXPOSE 3000

# Start the application using npm start
CMD ["npm", "start"]
