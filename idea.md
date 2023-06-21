[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/45dFqHPw)

# Idea de Proyecto Integrado

Mi idea para este proyecto es crear una web de **adopción de animales**.
Será una web para que las protectoras de animales puedan tener más visibilidad y para que las personas que quieran adoptar un animal puedan encontrarlo de forma sencilla.

- Habrá tres **tipos de usuarios**: adoptante, protectora y administrador.

    - Los usuarios **adoptantes** podrán buscar según el tipo de animal, la localización, la raza, la edad y el sexo. Podrán añadir los animales que más les gusten a su página de *favoritos*.

    - Los usuarios **protectora** podrán dar de alta a un nuevo animal, tendrán en su perfil todos los animales dados de alta, podrán dar de baja al que sea adoptado y podrán editar los datos de sus animales.

    - El usuario **administrador** podrá ver todos los animales de todas las protectoras, darlos de baja o editarlos y dar de alta un nuevo animal de cualquier protectora. Además, podrá crear nuevos artículos en la página de *Blog*.

- Lás páginas que tendrá la web serán:

    - **Inicio:** aparecerá un buscador para seleccionar según el tipo de animal y la localización. Más abajo aparecerán cartas recomendando los últimos animales que se han puesto en adopción.

    - **Adoptar:** aparecerá un desplegable con los tipos de animales, una vez se seleccione uno llevará a la misma página que cuando se busca en el buscador de la página de inicio (con los filtros que se hayan seleccionado). Al seleccionar un animal aparecerán las fotos del animal, el nombre, la localización, detalles como la raza, el sexo, la edad, etc., una pequeña descripción y la protectora a la que pertenece.

    - **Protectoras:** aparecerá un listado de cartas de todas las protectoras que se encuentran registradas en la web. Se puede seleccionar una y aparecerán los datos de la protectora y los animales que tienen dados de alta.

    - **Colaborar:** aparecerán distintas opciones para que el usuario pueda apoyar a la protectora que elija. Podrá elegir hacerse socio, voluntario, casa de acogida o hacer un donativo puntual.

    - **Blog:** aparecerán distintos artículos sobre cuidados de los animales, entrenamiento de perros, alimentación, etc.

    - **Quiénes somos:** aparecerá información sobre la web y en qué consiste, preguntas frencuentes, etc.

    - **Log in / Register:** aparecerá un modal con los campos a rellenar para el inicio de sesión o de registro, dependiendo si el usuario es una protectora o un adoptante.

    - **Mi perfil:** aparecerán los datos del usuario como el nombre, el correo electrónico, el teléfono, una imagen de perfil, etc. El usuario podrá editar sus datos y cambiar la contraseña.

    - **Favoritos:** aparecerá un listado de cartas de los animales que el usuario ha seleccionado como favoritos. 

# Tecnologías a usar

Para mi proyecto usaré las siguientes tecnologías:

- **Backend:** PHP con el framework Laravel y MySQL para la base de datos.
- **Frontend:** Typescript con el framework Angular y Bootstrap para el diseño de la web.
- **Despliegue:** Docker y docker-compose.