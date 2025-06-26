# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# ------------------ DEPS STAGE ------------------
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app


COPY package*.json ./

RUN npm ci

# ------------------ BUILD STAGE ------------------
FROM base AS builder
WORKDIR /app


COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

# ------------------ RUNTIME STAGE ------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup app && adduser -S -G app app


COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER app

EXPOSE 5000
ENV PORT=5000

CMD ["node", "server.js"]
