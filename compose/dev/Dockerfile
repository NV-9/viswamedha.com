FROM node:20-alpine

WORKDIR /app

COPY site/package.json site/package-lock.json ./
RUN npm ci

EXPOSE 5173
