FROM php:8.1-apache

# Actualizar el sistema y obtener las dependencias necesarias
RUN apt-get update && apt-get install -y \
    unzip \
    git

# Habilitar el módulo de Apache para URL rewriting
RUN a2enmod rewrite

# Configurar el DocumentRoot de Apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copiar los archivos de la aplicación Laravel al contenedor
COPY . /var/www/html

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Instalar las dependencias de Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-interaction --optimize-autoloader --no-dev
RUN docker-php-ext-install pdo pdo_mysql
# Establecer los permisos adecuados en los archivos y directorios
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Exponer el puerto 80 para que pueda ser accesible desde el host
EXPOSE 80

# Iniciar el servicio de Apache en el contenedor
CMD ["apache2ctl", "-D", "FOREGROUND"]