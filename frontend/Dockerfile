FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the dependency declarations first
COPY package*.json ./

# Copy frontend files
COPY . .

# Install dependencies
RUN npm install --silent

# Build the React app
RUN npm run build

EXPOSE 3000

# Serve the React app using a simple HTTP server
RUN npm install -g serve
CMD ["serve", "-s", "dist"]