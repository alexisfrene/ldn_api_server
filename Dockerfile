# Etapa de construcción
FROM node:23.8.0-alpine3.20 AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install 

RUN pnpm config set store-dir /dev/null

RUN apk add --no-cache curl && rm -rf /var/cache/apk/*

COPY . .

RUN pnpm run build || (echo "❌ Error en el build" && exit 1)

FROM node:23.8.0-alpine3.20 

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules  

COPY .env .env

EXPOSE 3001

CMD ["pnpm", "start"]
