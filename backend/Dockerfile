# Production Dockerfile for InAmigos Backend API Service
FROM node:20-alpine AS builder

WORKDIR /app

# Disable npm audit and fund to reduce memory overhead
ENV NPM_CONFIG_AUDIT=false
ENV NPM_CONFIG_FUND=false
ENV NODE_OPTIONS="--max-old-space-size=1024"

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --prefer-offline --no-audit --no-fund

COPY tsconfig.json ./
COPY src ./src

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NPM_CONFIG_AUDIT=false
ENV NPM_CONFIG_FUND=false

COPY package*.json ./
RUN npm ci --omit=dev --prefer-offline --no-audit --no-fund

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/prisma ./prisma

EXPOSE 5000

CMD ["node", "dist/server.js"]

