# AgroSmart Web Application

## Project Overview
AgroSmart is a web application designed to help farmers identify nutritional deficiencies in their crops instantly using their smartphones. It provides real-time diagnostics to optimize crop health, along with features for news management, user management, and agricultural statistics.

## Technologies Used

This project is built using a modern web development stack, focusing on performance, scalability, and a rich user experience.

*   **Frontend:**
    *   [React](https://react.dev/): A JavaScript library for building user interfaces.
    *   [Vite](https://vitejs.dev/): A fast build tool that provides a lightning-fast development experience.
    *   [Bootstrap 5](https://getbootstrap.com/): A powerful, feature-packed frontend toolkit for building responsive designs.
*   **Backend/Database:**
    *   [Firebase](https://firebase.google.com/): A platform developed by Google for creating mobile and web applications. Specifically, Firestore is used for the database.

## Features

### News Management
*   Create news articles (with base64 embedded images).
*   List published news.
*   Save news as drafts.
*   Delete news articles.

### User Management
*   Display registered users.
*   Filter users by status.
*   Edit user profiles.
*   Suspend users.
*   Reactivate users.
*   Sort users.
*   Search bar for users.

### Crop Deficiency Diagnosis
*   Real-time diagnosis of nutritional deficiencies using smartphone images.

### User Manual Download
*   Download specific user manuals based on user roles (Agricultor, Administrador, Institución).

## Project Architecture

The project follows a Clean Architecture pattern, separating concerns into distinct layers to improve maintainability, testability, and scalability. It also utilizes a component-based architecture for React, promoting reusability and modularity.

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites
*   Node.js (LTS version recommended)
*   npm (comes with Node.js)

### Setup
1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd AgroSmart-Web
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *Note: The `xlsx` and `file-server` dependencies mentioned previously are likely for specific functionalities. Ensure they are correctly installed if needed.* 
    *   `npm install xlsx file-server`
    *   `npm install firebase`
    *   `npm install bootstrap`

## Running the Project

To run the project in development mode:

```bash
npm run dev
```

This will start the Vite development server, and you can access the application in your browser, usually at `http://localhost:5173`.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

# Aplicación Web AgroSmart

## Resumen del Proyecto
AgroSmart es una aplicación web diseñada para ayudar a los agricultores a identificar deficiencias nutricionales en sus cultivos al instante utilizando sus teléfonos inteligentes. Proporciona diagnósticos en tiempo real para optimizar la salud de los cultivos, junto con funciones para la gestión de noticias, gestión de usuarios y estadísticas agrícolas.

## Tecnologías Utilizadas

Este proyecto está construido utilizando una pila de desarrollo web moderna, centrándose en el rendimiento, la escalabilidad y una rica experiencia de usuario.

*   **Frontend:**
    *   [React](https://react.dev/): Una librería de JavaScript para construir interfaces de usuario.
    *   [Vite](https://vitejs.dev/): Una herramienta de construcción rápida que proporciona una experiencia de desarrollo rapidísima.
    *   [Bootstrap 5](https://getbootstrap.com/): Un potente kit de herramientas frontend con muchas funciones para construir diseños responsivos.
*   **Backend/Base de Datos:**
    *   [Firebase](https://firebase.google.com/): Una plataforma desarrollada por Google para crear aplicaciones móviles y web. Específicamente, Firestore se utiliza para la base de datos.

## Funcionalidades

### Gestión de Noticias
*   Crear artículos de noticias (con imágenes incrustadas en base64).
*   Listar noticias publicadas.
*   Guardar noticias como borradores.
*   Eliminar artículos de noticias.

### Gestión de Usuarios
*   Mostrar usuarios registrados.
*   Filtrar usuarios por estado.
*   Editar perfiles de usuario.e
*   Suspender usuarios.
*   Reactivar usuarios.
*   Ordenar usuarios.
*   Barra de búsqueda para usuarios.

### Diagnóstico de Deficiencias en Cultivos
*   Diagnóstico en tiempo real de deficiencias nutricionales utilizando imágenes de smartphones.

### Descarga de Manual de Usuario
*   Descargar manuales de usuario específicos basados en los roles de usuario (Agricultor, Administrador, Institución).

## Arquitectura del Proyecto

El proyecto sigue un patrón de Arquitectura Limpia (Clean Architecture), separando las preocupaciones en capas distintas para mejorar la mantenibilidad, la capacidad de prueba y la escalabilidad. También utiliza una arquitectura basada en componentes para React, promoviendo la reutilización y la modularidad.

## Instalación

Para obtener una copia local y ponerla en funcionamiento, sigue estos sencillos pasos.

### Prerrequisitos
*   Node.js (se recomienda la versión LTS)
*   npm (viene incluido con Node.js)

### Configuración
1.  **Clonar el repositorio:**
    ```bash
    git clone <url_del_repositorio>
    cd AgroSmart-Web
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
    *Nota: Las dependencias `xlsx` y `file-server` mencionadas anteriormente son probablemente para funcionalidades específicas. Asegúrate de que estén correctamente instaladas si son necesarias.* 
    *   `npm install xlsx file-server`
    *   `npm install firebase`
    *   `npm install bootstrap`

## Ejecutar el Proyecto

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo de Vite, y podrás acceder a la aplicación en tu navegador, normalmente en `http://localhost:5173`.

## Contribución

Las contribuciones son lo que hace de la comunidad de código abierto un lugar tan increíble para aprender, inspirar y crear. Cualquier contribución que realices es **enormemente apreciada**.

1.  Haz un Fork del Proyecto
2.  Crea tu Rama de Característica (`git checkout -b feature/AmazingFeature`)
3.  Confirma tus Cambios (`git commit -m 'Añade alguna Característica Increíble'`)
4.  Sube a la Rama (`git push origin feature/AmazingFeature`)
5.  Abre una Solicitud de Extracción (Pull Request) 

## Licencia

Distribuido bajo la Licencia MIT. Consulta `LICENSE` para más información.
