# PruebaCodeLabsFront

Frontend del Event Management System construido con Next.js 16 (App Router), React 19 y TypeScript.

## Stack

- Next.js 16.2.9
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- Axios
- TanStack Query
- React Hook Form + Zod

## Requisitos

- Node.js 20+
- npm 10+
- API backend disponible (si no se usa modo mock)

## Configuracion de entorno

Crear un archivo .env en la raiz:

NEXT_PUBLIC_API_URL=https://localhost:3443/api
NEXT_PUBLIC_USE_MOCK=false

Variables:

- NEXT_PUBLIC_API_URL: URL base del backend.
- NEXT_PUBLIC_USE_MOCK:
  - false: usa API real.
  - cualquier otro valor (o vacio): usa datos mock en servicios de features.

## Instalacion

1. Instalar dependencias:
	npm install
2. Ejecutar en desarrollo:
	npm run dev
3. Abrir en navegador:
	http://localhost:3001

## Scripts disponibles

- npm run dev: inicia servidor de desarrollo en puerto 3001.
- npm run build: genera build de produccion.
- npm run start: levanta la app en modo produccion.
- npm run lint: ejecuta ESLint.

## Rutas de la aplicacion

Publicas:

- /
- /events
- /events/:id
- /login

Protegidas por autenticacion:

- /my-registrations
- /events/:id/register

Protegidas por rol Admin:

- /admin
- /admin/events
- /admin/events/:id
- /admin/events/:id/statistics

## Arquitectura

Se usa una organizacion feature-first dentro de src:

- src/app: rutas y handlers API de Next.js.
- src/features/auth: login y servicios de autenticacion.
- src/features/events: listado, detalle, estadisticas y consumo de eventos.
- src/features/registrations: registro a eventos y mis inscripciones.
- src/shared: componentes comunes, provider de Query y utilidades.

## Autenticacion y sesiones

La app maneja autenticacion mediante cookies httpOnly:

- ems_access_token
- ems_refresh_token
- ems_authenticated
- ems_role

Flujo principal:

1. Login en /api/auth/login.
2. El servidor guarda cookies httpOnly.
3. Las llamadas de cliente van a /api/backend/*.
4. Ese proxy agrega Authorization con el access token.
5. Si el backend responde 401, intenta refresh token.
6. Si el refresh falla, limpia cookies de sesion.

Nota importante:

Las cookies httpOnly no se pueden leer con document.cookie en el navegador. El estado de autenticacion debe resolverse en servidor o via endpoint de sesion.

## Guardas de ruta

La proteccion de rutas se implementa en src/proxy.ts con estas reglas:

- Redirecciona a /login si se accede sin sesion a rutas protegidas.
- Restringe /admin a usuarios con cookie ems_role igual a Admin.

## Cliente HTTP

Axios se configura con baseURL /api/backend para evitar exponer tokens en cliente.

Adicionalmente:

- Agrega headers Accept-Language y X-Correlation-Id.
- Maneja 401 para cerrar sesion en cliente cuando corresponde.

## Solucion de problemas

Error ECONNREFUSED en /api/backend/*:

- Verifica que el backend este levantado.
- Confirma que NEXT_PUBLIC_API_URL apunte al puerto correcto.
- Reinicia Next.js despues de cambiar .env.
- Prueba el endpoint backend directamente en navegador o Postman.

Advertencia NODE_TLS_REJECT_UNAUTHORIZED=0 en desarrollo:

- Se habilita en desarrollo para certificados locales no confiables.
- No debe usarse en produccion.

## Estado actual del proyecto

- Arquitectura base implementada.
- Flujo de login/logout y guardas de acceso activos.
- Pantallas de eventos, registros y modulo admin disponibles.
- Integracion preparada para backend real y modo mock.
