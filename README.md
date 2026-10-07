# Trabajo Práctico Integrador N° II - Frontend de Gestión de Blog Personal

Este proyecto es el frontend desarrollado con React y Vite correspondiente al Trabajo Práctico Integrador N° II. Funciona como la capa de presentación para el Sistema de Gestión de Blog Personal (Trabajo Práctico Integrador N° I), implementando navegación protegida, custom hooks y estilos mediante Tailwind CSS.

##  Repositorio del Backend

**URL del Backend utilizado:** `https://github.com/danycris07/trabajo-practico-integrador-1.git`

---

## Requisitos Previos

- [Node.js](https://nodejs.org/) instalado en el equipo.
- [MySQL](https://www.mysql.com/) instalado y el servicio de base de datos en ejecución.

---

##  1. Cómo levantar el Backend (API REST)

1. Cloná o descargá el repositorio del backend (TP1).
2. Abrí una terminal en la carpeta raíz del backend e instalá las dependencias necesarias:

   ```bash
   npm install
   ```

3. **Configuración del entorno:**
   - Renombrá el archivo `.env.example` a `.env`.
   - Completá las variables con tus credenciales de MySQL (usuario, contraseña, puerto), el nombre de tu base de datos y tu firma secreta para la generación de JWT.
   - Asegurate de tener creada la base de datos en tu gestor MySQL (por ejemplo, `integrador-db`).

4. Levantá el servidor para que Sequelize se conecte a la base de datos y sincronice las tablas automáticamente:

   ```bash
   npm run dev
   ```

> **Nota:** El servidor quedará escuchando en `http://localhost:3000`. Asegurate de que el middleware CORS en tu archivo `app.js` del backend esté configurado con `origin: 'http://localhost:5173'` y `credentials: true` para permitir el intercambio de cookies con el frontend.

---

##  2. Cómo levantar el Frontend (React)

1. Abrí una nueva terminal y ubicate en la carpeta raíz de este proyecto (el frontend creado con Vite).
2. Instalá las dependencias del proyecto ejecutando:

   ```bash
   npm install
   ```

3. **Verificá la configuración de conexión a la API:**
   - La URL base para consumir los endpoints está extraída y definida globalmente en el archivo `src/config/api.js`.
   - Por defecto apunta a `http://localhost:3000/api`. Si tu backend estuviera corriendo en otro puerto, modificalo exclusivamente en ese archivo.

4. Iniciá el servidor de desarrollo de Vite:

   ```bash
   npm run dev
   ```

5. Abrí tu navegador web e ingresá a `http://localhost:5173`.

### Flujo de prueba del sistema:

- Dirigite a la vista de "Registrarse" y creá una cuenta nueva (la contraseña exige al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número).
- Iniciá sesión con la cuenta recién creada. El sistema guardará el acceso exitoso en `localStorage`.
- Accedé a la ruta protegida (`/`) para visualizar el listado de los artículos cargados en la base de datos.

---

##  Tecnologías y Herramientas Utilizadas

**Frontend:**
- React
- Vite
- React Router v8
- Tailwind CSS
- Custom Hooks (`useFetch`, `useForm`)
- Fetch API

**Backend (TP1):**
- Node.js
- Express
- Sequelize
- MySQL
- express-validator
- JSON Web Tokens (JWT)