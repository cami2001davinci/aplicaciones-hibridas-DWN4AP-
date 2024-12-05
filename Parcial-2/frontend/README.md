# Mini Red Social 

Este proyecto está dividido en dos partes: el backend y el frontend. A continuación se detallan los pasos para levantar cada una de las partes.

## Requisitos previos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior) o yarn (versión 1.22 o superior)
- MongoDB en ejecución, ya sea local o en un servicio como MongoDB Atlas.

## Clonar el repositorio

1. Clona el repositorio desde GitHub:

    ```sh
    git clone https://github.com/cami2001davinci/aplicaciones-hibridas-DWN4AP-.git
    ```

2. Navega al directorio del proyecto:

    ```sh
    cd aplicaciones-hibridas-DWN4AP-

    ```

## Backend

### Instalación

1. Navega al directorio del backend:

    ```sh
    cd blog
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

### Configuración

1. Crea un archivo `.env` en el directorio `blog` y agrega las variables de entorno. Un ejemplo de archivo `.env` podría ser:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/f1-enciclopedia
    JWT_SECRET=your_jwt_secret
    ```

### Ejecución

1. Para iniciar el servidor en modo desarrollo:

    ```sh
    npm run dev
    ```

2. Para iniciar el servidor en modo producción:

    ```sh
    npm start
    ```

## Frontend

### Instalación

1. Navega al directorio del frontend:

    ```sh
    cd frontend
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

### Ejecución

1. Para iniciar el servidor de desarrollo:

    ```sh
    npm run dev
    ```

2. Para construir la aplicación para producción:

    ```sh
    npm run build
    ```

3. Para previsualizar la aplicación construida:

    ```sh
    npm run preview
    ```

## Notas adicionales

- Asegúrate de que el servidor de MongoDB esté corriendo y accesible desde la URI especificada en el archivo `.env`.


Con esto deberías poder levantar tanto el backend como el frontend del proyecto.