# Base
FROM node:18-alpine AS base

# Nombre del directorio
ENV DIR=/app
WORKDIR ${DIR}

# Development
FROM base AS dev

# Variables de entorno
ENV NODE_ENV=development

# Copia los paquetes de la aplicación
COPY package*.json ${DIR}

# Instala las dependencias dentro del contenedor
RUN npm install

# Copia el resto del código de la aplicación
COPY tsconfig*.json ${DIR}
COPY src ${DIR}/src
COPY prisma ${DIR}/prisma

# Genera el cliente Prisma
RUN npx prisma generate

# Expone el puerto en el que tu app va a correr
EXPOSE ${PORT}

# Comando para ejecutar la app en modo desarroll
CMD ["npm", "run", "start:docker"]