# Selecciona una imagen base que contenga Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

COPY package.json .

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos del proyecto al directorio de trabajo
COPY . .

# Compila el proyecto
RUN npm run build

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 5173

# Define el comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
