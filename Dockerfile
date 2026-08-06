# Build stage — runs in CI (or a one-time local/VPS build), never per-request.
FROM node:20.11.1 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage — tiny nginx, no Node process serving files.
FROM nginx:alpine
COPY deploy/docker-nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 5173
