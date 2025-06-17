# Imagen base de Node.js
FROM node:18

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y lock (si lo tenés)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar el microservicio
CMD ["node", "src/index.js"]
