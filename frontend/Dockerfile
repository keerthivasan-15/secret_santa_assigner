# Stage 1: Build the frontend
FROM node:20 AS build

WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source files and build the application
COPY . .

RUN npm run build # This will generate the 'dist' folder

# Stage 2: Serve the frontend using Nginx
FROM nginx:stable-alpine

# Copy the build output from the Node.js stage to Nginx's default serving location
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx to serve the built files
CMD ["nginx", "-g", "daemon off;"]
