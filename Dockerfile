# Build stage
FROM node:20.11.0 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve with 'serve' on port 5173
FROM node:20.11.0
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist 

EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]