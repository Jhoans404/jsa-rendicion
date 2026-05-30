# Stage 1: Build
FROM node:alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./
# If pnpm is used, you might need to install it or use npm.
# Based on package.json, npm is present.
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runtime
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts from build stage
# Note: Angular 17+ build output is usually in dist/<project-name>/browser
COPY --from=build /app/dist/jsa-rendicion/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
