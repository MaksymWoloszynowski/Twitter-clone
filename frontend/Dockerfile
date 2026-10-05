FROM node:20-alpine AS deps

WORKDIR /opt/app
COPY package*.json ./
RUN npm install

FROM node:20-alpine AS build

WORKDIR /opt/app
COPY --from=deps /opt/app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /opt/app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]