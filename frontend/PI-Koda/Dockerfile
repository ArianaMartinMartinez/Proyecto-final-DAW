# Etapa de construcción
FROM node:latest as build-stage

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json e instala las dependencias
COPY package*.json /app/
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . /app/

# Construye la aplicación de Angular
RUN npm run build --prod

# Etapa de producción
FROM httpd:latest

# Copia los archivos de construcción de la aplicación a la imagen de Apache
COPY --from=build-stage /app/dist/pi-koda /usr/local/apache2/htdocs/