# Stage 1: Build Angular app
FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# nginx procesa automáticamente los templates en /etc/nginx/templates/
# reemplazando variables de entorno (como BACKEND_URL) al iniciar
COPY nginx.conf /etc/nginx/templates/default.conf.template

COPY --from=build /app/dist/jsa-rendicion/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
