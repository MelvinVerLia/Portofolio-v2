# Stage 1: Build frontend
FROM node:20-alpine AS frontend
WORKDIR /app/frontend
COPY frontend ./
RUN npm install && npm run build

# Stage 2: Setup backend
FROM node:20-alpine AS backend
WORKDIR /app
COPY backend ./backend
COPY --from=frontend /app/frontend/dist ./frontend_dist
WORKDIR /app/backend
RUN npm install

CMD ["npm", "run", "start"]  # Or whatever starts your backend
