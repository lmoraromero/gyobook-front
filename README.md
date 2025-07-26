# Gyobook Frontend 📚✨

<p align="center">
  <img src="./public/Gyobook.png" alt="Gyobook Logo" width="150" />
</p>


## 1. Introducción ✍️

Gyobook Frontend es una aplicación web desarrollada con **React** y **Vite** diseñada para ofrecer a los usuarios una plataforma donde descubrir libros, leer y escribir reseñas, y compartir experiencias literarias. Está diseñada para consumir la API REST de Gyobook, ofreciendo una interfaz intuitiva, responsive y segura para interactuar con la plataforma. 

Este frontend incluye funcionalidades como autenticación de usuarios, creación y búsqueda de libros y publicación de reseñas.

---

## 2. Características principales 🔍

- Navegación intuitiva y fluida entre las páginas clave: Inicio, Login, Registro, Perfil, Libros y Reseñas.
- Autenticación segura mediante tokens JWT para proteger rutas.
- Formularios completos para gestionar usuarios, crear fichas de libros y redactar reseñas.
- Visualización de libros con opciones de búsqueda.
- Gestión eficiente del estado global utilizando React Context.
- Diseño accesible, limpio y adaptado a diferentes dispositivos (responsive básico).
- Manejo adecuado de errores y mensajes para mejorar la experiencia del usuario.

---

## 3. Herramientas utilizadas 🛠️

- ⚛️ **React** — Biblioteca principal para construir la interfaz de usuario.
- ⚡ **Vite** — Empaquetador ultrarrápido para desarrollo y build.
- 🎨 **CSS** — Estilos personalizados y diseño responsive.
- 🌐 **React Router DOM** — Navegación entre rutas del frontend.
- 🧠 **React Context** — Manejo global del estado de autenticación y datos.
- 📦 **Fetch API** — Comunicación con la API REST del backend.
- ☁️ **Cloudinary** — Servicio de alojamiento de imágenes para mostrar portadas de libros.
- 🗂️ **Multer** (a través del backend) — Encargado de subir imágenes desde el frontend al servidor.

---

## 4. Estructura de carpetas 🗂️

```plaintext
gyobook-front/
├── public/                   # Archivos públicos (favicon, gif de error)
├── src/
│   ├── assets/              # Imágenes y recursos multimedia (logo)
│   ├── pages/             # Páginas principales del sitio
│   │   ├── CrearLibro.jsx
│   │   ├── Error404.css
│   │   ├── Error404.jsx    # Página de error para rutas no válidas
│   │   ├── Inicio.jsx
│   │   ├── Libros.jsx
│   │   ├── Login.jsx
│   │   ├── Navegacion.jsx
│   │   ├── Perfil.jsx
│   │   ├── Registro.jsx
│   │   ├── Reviews.jsx
│   │   ├── ReviewsCrear.jsx
│   │   └── ReviewsLibro.jsx     
│   ├── App.jsx              # Estructura general de la aplicación y rutas
│   ├── Contexto.jsx         # Contexto global de la app
│   ├── main.jsx             # Punto de entrada principal
│   └── style.css            # Estilos globales
├── package.json             # Dependencias y scripts
├── vite.config.js           # Configuración de Vite
└── README.md       
```

---

## 5. Flujo general del usuario 🤠

1. El usuario se registra o inicia sesión.
2. Una vez autenticado, puede acceder a su perfil (desde donde cierra sesión), ver libros disponibles (y buscar algún libro) o añadir libros nuevos.
3. Desde cada libro puede leer o añadir reseñas.
4. El usuario también puede buscar libros por título, autor o género.
5. Si accede a una ruta inexistente, verá una página 404 personalizada.

---

## 6. Gestión de estado y autenticación 🔐

- La aplicación usa **React Context** para almacenar información del usuario autenticado.
- El token JWT se guarda en `localStorage` y se incluye automáticamente en las peticiones a la API para acceder a recursos protegidos.

---

## 7. Diseño 🎨

- Diseño limpio, accesible y sencillo, que facilita la lectura y navegación. 
- Se ha aplicado una paleta de colores basada en tonos lila y rosa pastel para aportar una sensación cálida y agradable. 
- El diseño se adapta a distintos tamaños de pantalla (responsive básico implementado con CSS).

---

## 8. Next Steps 💡💫

- ✍️ Posibilidad de editar y eliminar reseñas.  
- 🔍 Filtros de búsqueda más avanzados para encontrar tus libros favoritos fácilmente.  
- ❤️‍🔥 Añadir reacciones y comentarios para interactuar con la comunidad.  
- 📚 Integración de clubs de lectura para compartir y debatir con otros lectores.  
- 🖼️👤 Posibilidad de cambiar la foto de perfil y añadir más detalles personales.  
- 🌙🎨 Implementar modo oscuro y temas de colores personalizables.  
- 🛠️ Mejoras en la gestión de errores y formularios para una experiencia más fluida.


---

## 9. Acceso a la web y a la API🌐

Puedes acceder a la web de Gyobook en la siguiente URL:

[https://gyobook.onrender.com/](https://gyobook.onrender.com/)

Repositorio GitHub de la API:  
[https://github.com/lmoraromero/gyobook-API](https://github.com/lmoraromero/gyobook-API)

---

## 10. Contacto ✉️

Si quieres saber más sobre el proyecto o contactarme, puedes encontrarme en:

- [LinkedIn](www.linkedin.com/in/laura-mora-romero) : www.linkedin.com/in/laura-mora-romero
- [GitHub](https://github.com/lmoraromero)
