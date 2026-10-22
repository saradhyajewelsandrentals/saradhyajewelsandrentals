# Production Dockerfile for Saradhya Jewels & Rentals Backend on GCP Cloud Run
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy application source
COPY . .

# Cloud Run default port is 8080
ENV PORT=8080
EXPOSE 8080

# Start server
CMD ["node", "server.js"]
