FROM node:20-alpine AS build
WORKDIR /app

COPY site/package.json site/package-lock.json ./
RUN npm ci

COPY site .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine AS runner

COPY compose/prod/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]