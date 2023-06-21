# Proyecto Integrado Desarrollo de Aplicaciones Web
#### Curso 22/23
#### Ariana Martín Martínez

## KODA

Koda es una plataforma de adopción de animales diseñada especialmente para que las protectoras de cualquier parte de España puedan publicar sus animales y que tengan más visibilidad. Así, las personas adoptantes que busquen un animal lo pueden encontrar de forma sencilla.

Mi web está diseñada de la siguiente manera:

### Tipos de usuarios

- **Adoptante:** puede ver animales y protectoras; además puede añadir los animales que más le guste a su página de *favoritos* y editar su perfil.

- **Protectora:** puede ver animales y protectoras, añadir animales a su página de *favoritos*, editar su perfil, editar su protectora y lo más importante: añadir, editar y eliminar sus animales.

- **Administrador:** puede hacer todo lo anteriormente descrito a nivel general, es decir, puede añadir, editar y eliminar animales que pertenezcan a cualquier protectora.

### Enlace a la aplicación
http://51.38.36.183/

    NOTA:
    Mi aplicación está diseñada para que el usuario tenga que iniciar sesión o registrarse
    para poder acceder a la página web; por lo que aquí indico un usuario de cada tipo existentes
    en la base de datos para poder probar su funcionamiento:

    - Usuario adoptante:
        - Correo electrónico: adopter@example.com
        - Contraseña: adopter
    - Usuario protectora:
        - Correo electrónico: shelter@example.com
        - Contraseña: shelter
    - Usuario administrador:
        - Correo electrónico: admin@example.com
        - Contraseña: admin

### Instalación

##### Frontend

Una vez clonado el proyecto desde el repositorio de GitHub hay que seguir varios pasos:

- Instalar las dependencias definidas en el archivo *package.json* usando el comando ***npm install***. 

- Ejecutar la aplicación en local utilizando el comando ***npm start***.

##### Backend

Una vez clonado el proyecto desde el repositorio de GitHub hay que seguir varios pasos:

- Instalar las dependecias definidas en el archivo *composer.json* usando el comando ***composer install***.

- Configurar el archivo *.env*. 
    - Primero debemos ejecutar el comando ***cp .env.example .env*** para poder configurar las variables de entorno.

    - Luego debemos cambiar las variables de entorno para poder ejecutar la página web. Para ello simplemente hay que poner lo siguiente:

            DB_CONNECTION=mysql
            DB_HOST=51.38.36.183
            DB_PORT=3306
            DB_DATABASE=pi_koda
            DB_USERNAME=root
            DB_PASSWORD=ariana
    
    Esta es la configuración para utilizar la base de datos existente en mi VPS; sin embargo, para utilizar una base de datos en local simplemente habría que cambiar *DB_HOST* y poner *localhost*. Luego ejecutar el comando *php artisan migrate* para que se ejecuten las migraciones y por último usar el comando *php artisan db:seed* para rellenar de datos la base de datos.

- Generar una clave de aplicación para que Laravel asegure los datos encriptados usando el comando ***php artisan key:generate***.

- Iniciar el servidor en local utilizando el comando ***php artisan serve***.

### Páginas

- **Inicio de sesión y registro:** en esta página el usuario puede iniciar sesión con su correo electrónico y contraseña, o registrarse tanto como adoptante o como protectora. Al registrarse un usuario aparecerá un mensaje y tendrá que iniciar sesión para acceder a la web. Si el usuario se registra como protectora, introduce los datos del administrador de esta, y una vez inicia sesión deberá editar los datos de una protectora creada por defecto en la página *Mi protectora* para adaptarlos a sus datos.

    ![Página de inicio de sesión y registro](docs/capturas%20web/01-Koda_login.PNG)

- **Inicio:** en esta página se puede ver un pequeño banner con el lema de la página web y cartas de los últimos animales que se han puesto en adopción.

    ![Página de inicio](docs/capturas%20web/02-Koda_inicio.PNG)

- **Adopta:** aparece un buscador de animales según el tipo de animal *(perro, gato, ave o roedor)*, el género, la localización y la raza. Además se puede ver un listado con todos los animales ordenados y páginados según la fecha en la que se dieron de alta. El usuario puede añadir a su página de *favoritos* el animal que desee dándole al corazón que aparece en la carta del animal.

    ![Página adopta](docs/capturas%20web/03-Koda_adopta.PNG)

    En esta página además, si el usuario le da al botón de "Más información", se pueden ver más detalles del animal seleccionado, como la raza, la fecha de nacimiento, el género, una descripción y la protectora a la que pertenece.

    ![Página detalle animal](docs/capturas%20web/04-Koda_animal_detalle.PNG)

- **Protectoras:** también se puede ver un buscador como en la página *Adopta*, solo que aquí se puede buscar según el nombre de la protectora y/o la localidad. Además aparece un listado con todas las protectoras ordenadas y páginadas según la fecha en la que se registraron.

    ![Página protectoras](docs/capturas%20web/07-Koda_protectoras.PNG)

    En esta página también se puede entrar a ver más detalles de una protectora seleccionada; pudiendo observar el correo electrónico de contacto de la protectora, una descripción y los animales pertenecientes a esa protectora.

    ![Página detalle protectora](docs/capturas%20web/08-Koda_protectora_detalle.PNG)

- **Colabora:** en esta página podemos ver las diferentes acciones que puede realizar un usuario *(socio, voluntario, casa de acogida, donativo puntual)* y la protectora a la que quiere enviar dicha acción.

    ![Página colabora](docs/capturas%20web/09-Koda_colabora.PNG)

- **Blog:** en esta página se observa un listado con los distintos artículos que tiene la web, como por ejemplo cuidado del pelo de los perros, alimentación de los gatos, vacunación, etc.

    ![Página blog](docs/capturas%20web/10-Koda_blog.PNG)

    Además se puede entrar a ver el artículo completo al darle al botón "Más información".

    ![Página detalle blog](docs/capturas%20web/11-Koda_art%C3%ADculo.PNG)

- **Nosotros:** en esta página podemos ver la información correspondiente a la web y en qué consiste.

    ![Página nosotros](docs/capturas%20web/12-Koda_nosotros.PNG)

*A las siguientes páginas se puede acceder haciendo click en el usuario; aparecerá un dropdown con las distintas opciones. La página Mi protectora solamente está disponible para los usuarios con el rol "protectora".*

<p align="center">
  <img src="docs/capturas%20web/16-Koda_dropdown.PNG">
</p>

- **Mi perfil:** aparece el nombre y el correo electrónico del usuario que ha iniciado sesión, pudiendo editarlos.

    ![Página mi perfil](docs/capturas%20web/13-Koda_mi_perfil.PNG)

- **Mis favoritos:** aparece un listado de los animales que el usuario ha marcado como favoritos.

    ![Página mis favoritos](docs/capturas%20web/14-Koda_favoritos.PNG)

- **Mi protectora:** esta última página solamente la pueden ver los usuarios que tiene el rol "protectora". Se pueden ver los datos de la protectora correspondiente al usuario, pudiendo editarlos, además de un listado con los animales pertenecientes a esa protectora. Si no se especifica una foto para la protectora se le asigna una por defecto.

    ![Página mi protectora](docs/capturas%20web/15-Koda_mi_protectora.PNG)

### Funcionalidad

Como he explicado anteriormente, los usuarios con el rol "protectora" pueden *añadir, editar o eliminar* sus animales; sin embargo, el usuario con el rol "administrador" puede realizar estas acciones sobre cualquier animal perteneciente a cualquier protectora.

Los usuarios "protectora" pueden añadir animales a través de su página *Mi protectora* y el usuario "administrador" a través de la página *Protectoras*; entrando al detalle de la protectora a la que desee añadir un animal. Ambos roles pueden editar o eliminar un animal entrando al detalle de este.

- **Añadir:** al añadir un animal aparecerá un modal en pantalla con un formulario con los campos a rellenar, apareciendo mensajes en rojo debajo de cada campo si no es correcto lo que desea introducir el usuario. Si no se especifica una foto para el animal, se le asigna una por defecto.

    ![Modal añadir](docs/capturas%20web/18-Koda_anyadir.PNG)

- **Editar:** al editar un animal a través de su página de detalle se abrirá un modal en pantalla con un formulario con los campos rellenos con los datos del animal para poder editarlos; apareciendo mensajes en rojo debajo de cada campo si no es correcto lo que desea introducir el usuario.

    ![Editar animal](docs/capturas%20web/05-Koda_animal_detalle_editar.PNG)

- **Eliminar:** al eliminar un animal a través de su página de detalle aparecerá un pequeño modal para que el usuario se asegure de que quiere eliminar definitivamente el animal.

    ![Eliminar animal](docs/capturas%20web/06-Koda_animal_detalle_borrar.PNG)