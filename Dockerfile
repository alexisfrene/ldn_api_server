# Etapa de construcción
FROM node:23.8.0-alpine3.20 AS builder

WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Copiar archivos esenciales para la instalación de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias sin modificar el lockfile
RUN pnpm install --frozen-lockfile --strict-peer-dependencies=false

# Configurar el almacenamiento de pnpm
RUN pnpm config set store-dir /dev/null

# Instalar curl (opcional) y limpiar caché
RUN apk add --no-cache curl && rm -rf /var/cache/apk/*

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN pnpm run build || (echo "❌ Error en el build" && exit 1)

# Etapa de ejecución
FROM node:23.8.0-alpine3.20 

WORKDIR /app

# Instalar pnpm nuevamente en la etapa final
RUN npm install -g pnpm

# Copiar archivos esenciales desde la etapa de construcción
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules  

# Copiar el archivo .env si existe
COPY .env .env

# Exponer el puerto de la aplicación
EXPOSE 3001

# Comando de inicio
CMD ["pnpm", "start"]
