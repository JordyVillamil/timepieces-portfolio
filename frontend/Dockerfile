# Fase 1: Build (para optimizar)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Fase 2: Producción (más pequeña y segura)
FROM node:20-alpine AS runner
WORKDIR /app
# Solo necesitamos los archivos de build y node_modules de producción
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Next.js usa el puerto 3000 por defecto
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "start"]