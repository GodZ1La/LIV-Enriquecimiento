# Stage 1: Build Stage
FROM node:alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production Stage
FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose the default NGINX port
EXPOSE 80 

# Configure NGINX to serve built Vue files (adjust if needed)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]