FROM node:20 AS frontend-build

WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

COPY frontend ./
RUN npm run build

FROM node:20 AS backend-run

WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install && npm rebuild bcrypt --build-from-source

COPY --from=frontend-build /app/frontend/dist /app/backend/public

COPY backend ./

EXPOSE 5000
CMD ["node", "server.js"]
