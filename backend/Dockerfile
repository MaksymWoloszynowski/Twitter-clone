FROM node:24-alpine AS deps 

WORKDIR /opt/app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:24-alpine AS prod

WORKDIR /opt/app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=deps /opt/app/node_modules ./node_modules
COPY package.json .
COPY src ./src

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["npm", "start"]