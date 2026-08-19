# Gestión de Acuerdos

Proyecto que incluye un frontend y un backend para gestionar acuerdos. El sistema maneja autenticación y roles de usuario, donde existen distintos permisos: lectura(leer_acuerdos) y escritura(crear_acuerdos).

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- `backend/`: API desarrollada en Node.js, Express y MySQL. 
- `front/`: Interfaz de usuario básica desarrollada con HTML, Bootstrap  y JavaScript .

## Requisitos Previos

- Node.js y npm instalados.
- XAMPP o cualquier servidor MySQL local.
- Base de datos MySQL encendida.

## Instalación y Configuración

### 1. Base de Datos
1. Abre el gestor de base de datos MySQL (phpMyAdmin desde XAMPP u otro).
2. Importa o ejecuta `backend/Database/schema.sql`.
   - Este script creará la base de datos "api_acuerdos"

### 2. Backend
1. Abre una terminal y navega a la carpeta backend
   
2. Instala las dependencias:
   npm i
   
3. Configura las variables de entorno si es necesario (archivo `.env` para JWT y configuración de base de datos).
4. Inicia el servidor de desarrollo:
   
   npm run dev
   
   Aqui se ejecuta el back `http://localhost:3000`.

### 3. Frontend
El frontend no requiere instalación de dependencias, ya que está hecho con HTML/JS y usa Bootstrap vía CDN.
Para poder usarlo:
1. Coloca el proyecto completo dentro de la carpeta `htdocs` de XAMPP (ej. `d:/xampp8/htdocs/proyectos/prueba/`).
2. Enciende el servidor Apache desde el Panel de Control de XAMPP.
3. Abre tu navegador y navega a la siguiente ruta para acceder al sistema:
   "http://localhost/proyectos/prueba/front/index.html"

## Usuarios de Prueba 

- Lector (Rol 1, Solo Lectura)
  - Usuario: `john.lector@ejemplo.com`
  - Contraseña: `123456`
  
- Editor (Rol 2, Lectura y Escritura)
  - Usuario: `lis.editora@ejemplo.com`
  - Contraseña: `123456`

## Uso y Características

- Login: El sistema valida las credenciales y el backend devuelve un token JWT con la información del usuario 

- Vista de Acuerdos: Dependiendo del `role_id`, la interfaz mostrará distintas opciones:
  - Si es Lector, solo verás la lista de acuerdos (tablero principal).
  - Si es Editor, verá la lista de acuerdos,  cambiar su estado desde un menú desplegable, y tendrá acceso al formulario para crear nuevos acuerdos.
- REST API:
  - `POST /api/auth/login`: Autenticación.
  - `GET /api/acuerdos`: Obtener la lista de acuerdos (Requiere permisos).
  - `POST /api/acuerdos`: Crear un nuevo acuerdo (Solo Editor).
  - `PATCH /api/acuerdos/:id/estado`: Cambiar el estado de un acuerdo (Solo Editor).

##A mejorar
-Guardar contraseña encriptada
-Mostrar indicadores de carga o proceso
-Usar paginación
-Mejora de estructura de archivos en back y frontend
-Mejora de notificaciones en toast
