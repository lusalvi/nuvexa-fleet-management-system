# Imagen base
FROM node:18

# Carpeta de trabajo en el contenedor
WORKDIR /app

# Copiar archivos
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar el microservicio
CMD ["npm", "start"]
