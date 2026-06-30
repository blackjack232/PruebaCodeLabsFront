# Software Design Document (SDD)

# Frontend Specification

## Event Management System

Versión: 1.0

Framework: Next.js 15

React: 19

TypeScript

---

# Tabla de Contenido

1. Introducción

2. Objetivos

3. Alcance

4. Contexto del Negocio

5. Actores

6. Requerimientos Funcionales

7. Requerimientos No Funcionales

8. Arquitectura General

9. Flujo General del Sistema

10. Navegación

11. Pantallas

12. Componentes

13. Features

14. Consumo API

15. Autenticación

16. Roles

17. Seguridad

18. UX/UI

19. Testing

20. Docker

21. CI/CD

22. RoadMap

---

# 1. Introducción

## Objetivo

Este documento describe completamente la arquitectura funcional y técnica del Frontend del sistema **Event Management System**.

Debe servir como especificación para desarrollar la aplicación utilizando:

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

y consumir una API REST desarrollada en .NET 8.

El documento define:

- Qué debe hacer la aplicación.
- Cómo debe comportarse.
- Cómo debe organizarse el código.
- Qué pantallas tendrá.
- Qué componentes utilizará.
- Qué reglas de negocio implementará.
- Cómo interactuará con la API.

---

# 2. Objetivos

El sistema permitirá:

## Usuarios

- Consultar eventos públicos.
- Buscar eventos.
- Filtrar eventos.
- Ver el detalle de un evento.
- Registrarse en un evento mediante un formulario.
- Consultar el estado de su inscripción.
- Iniciar sesión.
- Cerrar sesión.

---

## Administradores

- Iniciar sesión.
- Visualizar todos los eventos.
- Consultar estadísticas por evento.
- Consultar usuarios registrados.
- Crear eventos.
- Editar eventos.
- Eliminar eventos.

---

# 3. Alcance

El frontend será responsable únicamente de:

✔ Mostrar información.

✔ Validar formularios.

✔ Administrar la sesión.

✔ Consumir la API.

✔ Gestionar la navegación.

Toda la lógica del negocio residirá en el Backend.

---

# 4. Contexto del Negocio

La organización realiza eventos.

Cada evento posee:

- Nombre.
- Descripción.
- Fecha.
- Lugar.
- Capacidad.
- Imagen.

Los visitantes podrán consultar libremente los eventos publicados.

Cuando un visitante desee asistir a un evento deberá diligenciar un formulario de inscripción.

Los administradores podrán consultar en tiempo real el estado de las inscripciones de cada evento.

---

# 5. Actores

El sistema tendrá tres tipos de usuarios.

## Invitado

No requiere autenticación.

Puede:

- Ver eventos.
- Buscar eventos.
- Ver detalle.

No puede:

- Inscribirse.
- Ver estadísticas.
- Administrar eventos.

---

## Usuario

Debe autenticarse.

Puede:

- Ver eventos.
- Registrarse.
- Consultar sus registros.

No puede:

- Crear eventos.
- Ver estadísticas.

---

## Administrador

Debe autenticarse.

Puede:

- Crear eventos.
- Editar eventos.
- Eliminar eventos.
- Consultar estadísticas.
- Consultar inscritos.
- Gestionar eventos.

---

# 6. Requerimientos Funcionales

## RF01

Visualizar listado de eventos.

---

## RF02

Buscar eventos.

---

## RF03

Filtrar eventos.

---

## RF04

Visualizar detalle del evento.

---

## RF05

Registrarse a un evento.

---

## RF06

Autenticarse.

---

## RF07

Cerrar sesión.

---

## RF08

Visualizar Dashboard Administrador.

---

## RF09

Consultar estadísticas.

---

## RF10

Consultar inscritos.

---

# 7. Requerimientos No Funcionales

La aplicación debe ser:

Responsive.

Escalable.

Segura.

Accesible.

Mantenible.

Tipada completamente con TypeScript.

Compatible con dispositivos móviles.

Optimizada para SEO.

---

# 8. Arquitectura General

Se utilizará una arquitectura Feature First.

```text
App

↓

Features

↓

Components

↓

Hooks

↓

Services

↓

API
```

Cada Feature será independiente.

Nunca se compartirá lógica de negocio entre Features.

La comunicación se realizará mediante servicios compartidos.

---

# 9. Flujo General del Sistema

## Usuario

```text
Home

↓

Listado Eventos

↓

Seleccionar Evento

↓

Detalle

↓

Inscribirse

↓

Formulario

↓

Enviar

↓

Confirmación
```

---

## Administrador

```text
Login

↓

Dashboard

↓

Eventos

↓

Seleccionar Evento

↓

Estadísticas

↓

Usuarios Inscritos
```

---

# 10. Navegación

## Público

```text
/

↓

/events

↓

/events/{id}
```

---

## Usuario

```text
/login

↓

/events

↓

/events/{id}

↓

/events/{id}/register

↓

/my-registrations
```

---

## Administrador

```text
/admin

↓

/admin/events

↓

/admin/events/{id}

↓

/admin/events/{id}/statistics
```

---

# 11. Reglas del Negocio

RN01

Un usuario no podrá registrarse dos veces al mismo evento.

RN02

No podrá registrarse cuando el evento alcance su capacidad máxima.

RN03

Solo los eventos publicados serán visibles para invitados.

RN04

Solo los administradores podrán consultar estadísticas.

RN05

Solo administradores podrán crear eventos.

RN06

Solo administradores podrán eliminar eventos.

RN07

Todo usuario autenticado podrá consultar únicamente sus propias inscripciones.

RN08

Si el JWT expira se intentará renovar automáticamente.

RN09

Si el Refresh Token expira se cerrará la sesión.

RN10

Toda acción administrativa requerirá autenticación y autorización.

# 12. Especificación de Pantallas

---

# 12.1 Home

## Objetivo

Permitir que cualquier visitante conozca la plataforma y pueda visualizar los eventos disponibles.

No requiere autenticación.

---

## Ruta

```text
/
```

---

## Componentes

```text
Navbar

Hero

SearchBar

EventFilters

EventGrid

Pagination

Footer
```

---

## Wireframe

```text
+------------------------------------------------------+
| LOGO                       Eventos    Login          |
+------------------------------------------------------+

+------------------------------------------------------+
|             EVENT MANAGEMENT SYSTEM                  |
| Descubre los próximos eventos disponibles            |
|                                                      |
| [ Buscar evento..................... ] [Buscar]      |
+------------------------------------------------------+

+------------------------------------------------------+
| Categoría | Fecha | Ciudad | Estado | [Filtrar]      |
+------------------------------------------------------+

+------------------------------------------------------+
| EventCard | EventCard | EventCard                    |
| EventCard | EventCard | EventCard                    |
+------------------------------------------------------+

                  << Paginación >>

+------------------------------------------------------+
| Footer                                               |
+------------------------------------------------------+
```

---

## Endpoints

```http
GET /api/v1/events
```

---

## DTO

```typescript
EventSummaryDto[]
```

---

## Estados

Loading

Mostrar Skeleton Cards.

---

Empty

"No existen eventos disponibles."

---

Error

"No fue posible consultar los eventos."

Botón

Reintentar

---

Success

Mostrar listado paginado.

---

## Acciones

Buscar.

Filtrar.

Ir al detalle.

Login.

---

# 12.2 Pantalla Detalle Evento

## Objetivo

Mostrar toda la información del evento seleccionado.

---

## Ruta

```text
/events/{id}
```

---

## Componentes

```text
Navbar

Breadcrumb

EventImage

EventInformation

CapacityCard

RegistrationButton

Footer
```

---

## Wireframe

```text
-----------------------------------------------------

Evento

-----------------------------------------------------

Imagen

Nombre

Descripción

Fecha

Hora

Lugar

Categoría

Capacidad

Disponibles

-----------------------------------------------------

[ Inscribirse ]

-----------------------------------------------------
```

---

## Endpoint

```http
GET /api/v1/events/{id}
```

---

## DTO

```typescript
EventDetailDto
```

---

## Reglas

Si el usuario no está autenticado

↓

Mostrar

"Inicia sesión para registrarte"

---

Si el evento está lleno

↓

Botón deshabilitado

↓

Mensaje

"Cupos agotados"

---

# 12.3 Login

## Objetivo

Autenticar usuarios.

---

## Ruta

```text
/login
```

---

## Componentes

```text
Logo

LoginForm

RememberMe

ForgotPassword

LoginButton
```

---

## Wireframe

```text
------------------------------------

LOGIN

Correo

_____________________

Contraseña

_____________________

[ ] Recordarme

Ingresar

¿Olvidó su contraseña?

------------------------------------
```

---

## Endpoint

```http
POST /api/v1/auth/login
```

---

## DTO

```typescript
LoginRequest

↓

LoginResponse
```

---

## Validaciones

Correo requerido.

Correo válido.

Contraseña requerida.

---

## Flujo

Usuario

↓

Formulario

↓

POST Login

↓

JWT

↓

Guardar sesión

↓

Redirección

---

# 12.4 Formulario de Inscripción

## Objetivo

Registrar un usuario en un evento.

---

## Ruta

```text
/events/{id}/register
```

---

## Componentes

```text
RegistrationForm

SummaryCard

Buttons
```

---

## Wireframe

```text
--------------------------------------

Nombre

Apellido

Correo

Teléfono

Empresa

Cargo

Observaciones

[ Registrarme ]

--------------------------------------
```

---

## Endpoint

```http
POST /api/v1/registrations
```

---

## DTO

```typescript
RegistrationRequest

↓

RegistrationResponse
```

---

## Validaciones

Todos los campos obligatorios definidos por el negocio.

Email válido.

Longitudes máximas.

No permitir doble envío del formulario.

---

## Estados

Loading

Botón deshabilitado.

---

Success

Toast

"Registro realizado correctamente."

---

Error

Mostrar mensaje devuelto por la API.

---

# 12.5 Mis Inscripciones

## Objetivo

Permitir al usuario consultar los eventos en los que se encuentra registrado.

---

## Ruta

```text
/my-registrations
```

---

## Componentes

```text
RegistrationTable

SearchBar

Pagination
```

---

## Endpoint

```http
GET /api/v1/registrations/me
```

---

## Wireframe

```text
----------------------------------------

Evento

Fecha

Estado

Acciones

----------------------------------------

Congreso IA

12/10/2026

Confirmado

Ver

----------------------------------------
```

---

# 12.6 Dashboard Administrador

## Objetivo

Permitir administrar todos los eventos.

---

## Ruta

```text
/admin
```

---

## Componentes

```text
Sidebar

Header

StatisticsCards

EventsTable
```

---

## Wireframe

```text
--------------------------------------------------

Sidebar

Total Eventos

Total Usuarios

Total Inscritos

--------------------------------------------------

Tabla Eventos

Nombre

Fecha

Capacidad

Disponibles

Acciones

--------------------------------------------------
```

---

## Endpoint

```http
GET /api/v1/admin/events
```

---

## Acciones

Crear.

Editar.

Eliminar.

Ver estadísticas.

---

# 12.7 Estadísticas del Evento

## Objetivo

Visualizar las métricas de un evento específico.

---

## Ruta

```text
/admin/events/{id}/statistics
```

---

## Componentes

```text
StatisticsCards

AttendanceChart

RegistrationChart

ParticipantsTable
```

---

## Wireframe

```text
--------------------------------------------------

Nombre Evento

--------------------------------------------------

Total Inscritos

Capacidad

Disponibles

Ocupación %

--------------------------------------------------

Gráfico Inscripciones

--------------------------------------------------

Tabla Participantes

Nombre

Correo

Fecha Registro

Estado

--------------------------------------------------
```

---

## Endpoint

```http
GET /api/v1/admin/events/{id}/statistics
```

---

## DTO

```typescript
EventStatisticsDto
```

---

## Información mostrada

Total inscritos.

Capacidad.

Disponibles.

Porcentaje ocupación.

Últimos inscritos.

Listado participantes.

---

# 13. Mapa de Navegación

## Usuario Invitado

```text
Home

↓

Listado Eventos

↓

Detalle Evento

↓

Login

↓

Registro Evento

↓

Confirmación
```

---

## Usuario Autenticado

```text
Home

↓

Listado Eventos

↓

Detalle

↓

Inscribirse

↓

Mis Inscripciones
```

---

## Administrador

```text
Dashboard

↓

Eventos

↓

Detalle

↓

Estadísticas

↓

Participantes
```

---

# 14. Estados Globales de la Aplicación

Todas las pantallas deberán contemplar los siguientes estados:

## Loading

Utilizar Skeletons.

Nunca mostrar pantallas vacías.

---

## Empty

Mostrar mensaje amigable.

Ejemplo

"No existen registros."

---

## Error

Mostrar mensaje claro.

Permitir reintentar.

---

## Success

Mostrar Toast.

No utilizar alertas del navegador.

---

# 15. Componentes Compartidos

Los siguientes componentes deberán reutilizarse en toda la aplicación.

```text
Button

Input

Select

Textarea

Checkbox

Modal

Toast

Loader

Skeleton

Pagination

SearchBar

DataTable

Card

Badge

Avatar

Navbar

Sidebar

Footer

Breadcrumb

PageHeader

ConfirmDialog

EmptyState

ErrorState
```

Cada componente deberá ser:

- Reutilizable.
- Tipado con TypeScript.
- Documentado.
- Probado mediante pruebas unitarias.
# 16. Arquitectura del Proyecto

## 16.1 Objetivo

El frontend debe construirse utilizando una arquitectura modular, desacoplada y escalable, permitiendo incorporar nuevas funcionalidades sin afectar las existentes.

La arquitectura estará basada en los siguientes principios:

- Clean Architecture (adaptada al Frontend)
- Feature First
- Separation of Concerns (SoC)
- Single Responsibility Principle (SRP)
- Dependency Inversion
- Reutilización de componentes
- Tipado fuerte mediante TypeScript

---

# 16.2 Arquitectura General

```text
                    ┌──────────────────────────┐
                    │       Next.js App        │
                    └─────────────┬────────────┘
                                  │
                        App Router (Pages)
                                  │
                    ┌─────────────▼────────────┐
                    │         Features          │
                    └─────────────┬────────────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
      Components              Hooks                 Services
          │                       │                       │
          └───────────────┬───────┴───────────────┘
                          │
                    Axios Client
                          │
                    .NET 8 REST API
```

Toda la lógica de negocio reside en la API.

El Frontend únicamente orquesta la experiencia de usuario.

---

# 17. Organización del Proyecto

```text
src/

app/

(public)/

(auth)/

(admin)/

features/

auth/

events/

registrations/

dashboard/

statistics/

shared/

components/

layouts/

hooks/

services/

types/

utils/

config/

contexts/

styles/

middleware.ts

tests/
```

---

# 17.1 Organización por Feature

Cada funcionalidad será completamente independiente.

Ejemplo

```text
features/events/

components/

EventCard.tsx

EventGrid.tsx

EventFilters.tsx

EventDetail.tsx

pages/

hooks/

useEvents.ts

useEvent.ts

services/

eventService.ts

queries/

eventQueries.ts

schemas/

eventSchema.ts

types/

event.types.ts

constants/

event.constants.ts

utils/

event.utils.ts
```

Una Feature nunca deberá importar componentes internos de otra Feature.

La comunicación entre Features deberá realizarse mediante:

- shared/
- contexts/
- services comunes

---

# 18. Estructura de Rutas

## Públicas

```text
/

/events

/events/:id

/login
```

---

## Usuario

```text
/events/:id/register

/my-registrations

/profile
```

---

## Administrador

```text
/admin

/admin/events

/admin/events/new

/admin/events/:id

/admin/events/:id/edit

/admin/events/:id/statistics
```

---

# 19. Gestión del Estado

Se utilizarán tres niveles de estado.

## Estado Local

Para elementos de interfaz.

Ejemplos:

- Modal abierto
- Input de búsqueda
- Tabs activas

Herramienta:

useState

---

## Estado Compartido

Para información utilizada por múltiples componentes.

Ejemplos:

- Usuario autenticado
- Tema
- Idioma

Herramienta:

Context API

---

## Estado Remoto

Toda la información proveniente del Backend.

Ejemplos:

- Eventos
- Usuarios
- Estadísticas
- Inscripciones

Herramienta:

TanStack Query

Nunca almacenar datos remotos dentro de Context API.

---

# 20. Consumo de la API

Toda comunicación con el Backend deberá centralizarse mediante Axios.

```text
shared/

services/

http/

axios.ts
```

No se permitirá utilizar `fetch()` directamente desde componentes.

---

# 20.1 Configuración de Axios

El cliente HTTP deberá incluir:

- Base URL
- Timeout configurable
- Encabezados comunes
- Manejo global de errores
- Interceptor de Request
- Interceptor de Response
- Renovación automática del Access Token

---

# 20.2 Interceptor Request

Antes de enviar cada solicitud deberá agregarse:

```text
Authorization: Bearer {AccessToken}

Accept-Language

X-Correlation-Id
```

El CorrelationId permitirá rastrear una solicitud entre el Frontend y el Backend para facilitar la observabilidad.

---

# 20.3 Interceptor Response

Cuando la API responda:

```text
401 Unauthorized
```

El flujo será:

```text
Respuesta 401

↓

POST /auth/refresh

↓

Nuevo Access Token

↓

Actualizar sesión

↓

Reintentar solicitud original
```

Si el Refresh Token es inválido:

- Limpiar sesión
- Redirigir al Login
- Limpiar la caché de TanStack Query

---

# 21. TanStack Query

Toda la información obtenida desde la API utilizará TanStack Query.

Ejemplos:

- Eventos
- Evento por Id
- Estadísticas
- Inscripciones
- Perfil

---

# 21.1 Organización

```text
features/events/

queries/

useEventsQuery.ts

useEventQuery.ts

mutations/

useCreateRegistration.ts
```

---

# 21.2 Convenciones

Separar siempre:

Queries

↓

Obtienen información.

Mutations

↓

Crean, actualizan o eliminan información.

---

# 22. React Hook Form

Todos los formularios utilizarán:

- React Hook Form
- Zod

Aplicará para:

- Login
- Registro al evento
- Crear evento
- Editar evento

---

# 22.1 Validaciones

Las reglas de validación del Frontend deberán coincidir con las reglas implementadas en la API.

No duplicar lógica de negocio.

El Backend será siempre la fuente de verdad.

---

# 23. DTOs

El Frontend nunca trabajará directamente con objetos dinámicos.

Todos los contratos deberán definirse mediante DTOs.

Ejemplo:

```text
LoginRequestDto

LoginResponseDto

EventSummaryDto

EventDetailDto

CreateRegistrationRequestDto

RegistrationResponseDto

EventStatisticsDto

UserProfileDto
```

---

# 24. Servicios

Cada Feature deberá exponer un único servicio responsable de comunicarse con la API.

Ejemplo:

```text
eventService

↓

getEvents()

getEventById()

createEvent()

updateEvent()

deleteEvent()

getStatistics()
```

Los componentes nunca deberán realizar llamadas HTTP directamente.

---

# 25. Hooks

Los Hooks encapsularán la lógica reutilizable.

Ejemplos:

```text
useAuth()

useEvents()

usePagination()

useDebounce()

useCurrentUser()

usePermissions()
```

Los Hooks no deberán contener lógica de presentación.

---

# 26. Contextos Globales

Se crearán únicamente los contextos necesarios.

```text
AuthContext

ThemeContext

NotificationContext
```

Evitar crear Contexts para datos que ya administra TanStack Query.

---

# 27. Flujo de Datos

```text
Usuario

↓

Componente

↓

React Hook Form

↓

Zod

↓

Service

↓

Axios

↓

.NET API

↓

OperationResult

↓

TanStack Query

↓

Componente

↓

Usuario
```

Este flujo deberá mantenerse consistente en toda la aplicación para facilitar el mantenimiento y las pruebas.

---

# 28. Principios de Desarrollo

Todo el equipo deberá seguir las siguientes reglas:

- No utilizar `any`.
- No duplicar componentes.
- No duplicar lógica.
- Componentes pequeños y reutilizables.
- Una responsabilidad por componente.
- Una responsabilidad por Hook.
- Una responsabilidad por Servicio.
- Utilizar composición sobre herencia.
- Mantener separación entre UI y lógica de negocio.
- Toda interacción con la API debe pasar por un servicio.
- Todo formulario debe utilizar React Hook Form + Zod.
- Todo dato remoto debe gestionarse con TanStack Query.
- Todo componente debe ser fácilmente testeable.
# 29. Autenticación y Autorización

## 29.1 Objetivo

Garantizar que únicamente los usuarios autenticados puedan acceder a las funcionalidades protegidas del sistema y que cada usuario solo pueda realizar las acciones permitidas según su rol.

El sistema utilizará:

- JWT Access Token
- Refresh Token
- Roles
- Middleware de Next.js
- Route Guards
- Cookies HttpOnly
- Axios Interceptors

---

# 29.2 Flujo General de Autenticación

```text
                 Login
                   │
                   ▼
      POST /api/v1/auth/login
                   │
                   ▼
        Backend valida credenciales
                   │
        ┌──────────┴───────────┐
        │                      │
        ▼                      ▼
 Access Token          Refresh Token
 (15 minutos)            (7 días)
        │                      │
        ▼                      ▼
 Memoria del SPA      Cookie HttpOnly
        │
        ▼
 Usuario autenticado
```

---

# 29.3 Manejo de Tokens

## Access Token

Características

- JWT
- Duración corta
- Solo en memoria
- Nunca LocalStorage
- Nunca SessionStorage

Responsabilidad

Autorizar cada petición a la API.

---

## Refresh Token

Características

- Cookie HttpOnly
- Secure
- SameSite=Lax o Strict
- Gestionado únicamente por el Backend

Nunca podrá ser leído por JavaScript.

---

# 29.4 Flujo de Renovación

Cuando expire el Access Token:

```text
Petición API

↓

401 Unauthorized

↓

Axios Interceptor

↓

POST /auth/refresh

↓

Nuevo Access Token

↓

Actualizar sesión

↓

Reintentar solicitud original

↓

Continuar
```

Si falla:

```text
Limpiar sesión

↓

Login

↓

Mensaje

"La sesión ha expirado."
```

---

# 29.5 Login

Endpoint

```http
POST /api/v1/auth/login
```

Flujo

```text
Usuario

↓

Formulario

↓

Validaciones

↓

API

↓

JWT

↓

Guardar sesión

↓

Dashboard o Home
```

---

# 29.6 Logout

El cierre de sesión deberá:

1. Invalidar el Refresh Token en Backend.
2. Eliminar Access Token.
3. Limpiar Context.
4. Limpiar TanStack Query.
5. Redireccionar al Login.

Endpoint

```http
POST /api/v1/auth/logout
```

---

# 30. Roles

El sistema tendrá dos roles principales.

## Usuario

Permisos:

- Ver eventos.
- Buscar eventos.
- Filtrar eventos.
- Ver detalle.
- Registrarse.
- Consultar sus inscripciones.

No puede:

- Crear eventos.
- Editar eventos.
- Eliminar eventos.
- Ver estadísticas.

---

## Administrador

Permisos:

- Crear eventos.
- Editar eventos.
- Eliminar eventos.
- Consultar inscritos.
- Consultar estadísticas.
- Gestionar eventos.

---

# 31. Middleware

Se utilizará el Middleware de Next.js.

Archivo

```text
middleware.ts
```

Responsabilidades:

- Verificar autenticación.
- Verificar permisos.
- Redireccionar usuarios.
- Proteger rutas.

---

## Rutas Públicas

```text
/

/events

/events/:id

/login
```

---

## Rutas Protegidas

```text
/events/:id/register

/my-registrations
```

---

## Rutas Administrativas

```text
/admin

/admin/events

/admin/events/new

/admin/events/:id

/admin/events/:id/statistics
```

---

# 32. Guards

Se implementarán componentes reutilizables.

## AuthGuard

Permite únicamente usuarios autenticados.

---

## GuestGuard

Permite únicamente invitados.

---

## RoleGuard

Valida el rol.

Ejemplo

```tsx
<RoleGuard roles={["Admin"]}>
    <AdminDashboard />
</RoleGuard>
```

---

# 33. Seguridad Frontend

## Principios

El Frontend complementa la seguridad del Backend.

Nunca reemplaza las validaciones del servidor.

---

# 33.1 OWASP Top 10

El proyecto deberá prevenir:

- Broken Access Control
- Cryptographic Failures
- Injection
- Insecure Design
- Security Misconfiguration
- Vulnerable Components
- Authentication Failures
- Software Integrity Failures
- Logging Failures
- SSRF

---

# 33.2 XSS

Nunca utilizar:

```tsx
dangerouslySetInnerHTML
```

salvo casos excepcionales.

Todo HTML externo deberá sanitizarse.

---

# 33.3 CSRF

Al utilizar Refresh Token en Cookies:

- HttpOnly
- SameSite
- Secure

La validación CSRF será responsabilidad del Backend.

---

# 33.4 Variables de Entorno

Toda configuración deberá almacenarse mediante variables de entorno.

Ejemplo

```text
NEXT_PUBLIC_API_URL

NEXT_PUBLIC_APP_NAME

NEXT_PUBLIC_ENVIRONMENT
```

Nunca almacenar secretos en el Frontend.

---

# 34. UX

## Estados

Toda pantalla deberá contemplar:

Loading

↓

Skeleton

---

Empty

↓

"No existen registros."

---

Error

↓

Mensaje amigable.

↓

Botón Reintentar.

---

Success

↓

Toast.

Nunca alert().

---

# 34.1 Confirmaciones

Toda acción destructiva deberá solicitar confirmación.

Ejemplo

Eliminar Evento.

Cancelar inscripción.

---

# 34.2 Feedback

Cada acción deberá generar una respuesta visual.

Ejemplos

Evento creado.

Evento eliminado.

Registro exitoso.

Login exitoso.

---

# 35. Accesibilidad

Cumplir WCAG 2.1 AA.

Requisitos:

- Navegación por teclado.
- Labels asociados.
- aria-label cuando sea necesario.
- Contraste adecuado.
- Manejo correcto del foco.

---

# 36. Responsive Design

El Frontend deberá funcionar correctamente en:

- Mobile
- Tablet
- Laptop
- Desktop

Breakpoints recomendados

```text
sm

md

lg

xl

2xl
```

---

# 37. Estrategia de Testing

## Unit Testing

Herramientas

- Jest
- React Testing Library

Cobertura mínima

80%

---

## Integration Testing

Escenarios

- Login.
- Registro.
- Dashboard.
- Formulario de inscripción.

---

## End-to-End

Herramienta

Playwright

Escenarios

- Login
- Registro Evento
- Dashboard
- Estadísticas
- Logout

---

# 38. Calidad de Código

El proyecto deberá utilizar:

- ESLint
- Prettier
- Husky
- lint-staged

Todos los Pull Requests deberán cumplir:

- Sin errores de lint.
- Sin errores de compilación.
- Pruebas exitosas.

---

# 39. Docker

El Frontend deberá incluir:

Dockerfile

docker-compose.yml

Variables de entorno.

Configuración para desarrollo y producción.

---

# 40. CI/CD

Cada Pull Request ejecutará:

1. Instalación de dependencias.
2. Lint.
3. Build.
4. Unit Tests.
5. Integration Tests.
6. Publicación (si aplica).

---

# 41. Monitoreo

Registrar:

- Errores JavaScript.
- Errores HTTP.
- Tiempo de carga.
- Navegación.
- Errores inesperados.

La solución deberá permitir integrarse con plataformas como Azure Application Insights o Sentry.

---

# 42. Checklist Final

## Funcional

- [ ] Usuario puede consultar eventos.
- [ ] Usuario puede buscar eventos.
- [ ] Usuario puede filtrar eventos.
- [ ] Usuario puede ver el detalle.
- [ ] Usuario puede registrarse.
- [ ] Usuario puede consultar sus registros.
- [ ] Administrador puede iniciar sesión.
- [ ] Administrador puede crear eventos.
- [ ] Administrador puede editar eventos.
- [ ] Administrador puede eliminar eventos.
- [ ] Administrador puede consultar estadísticas.
- [ ] Administrador puede consultar inscritos.

---

## Arquitectura

- [ ] Feature First.
- [ ] TypeScript Strict.
- [ ] Axios centralizado.
- [ ] TanStack Query.
- [ ] React Hook Form.
- [ ] Zod.
- [ ] DTOs.
- [ ] Servicios desacoplados.
- [ ] Componentes reutilizables.

---

## Seguridad

- [ ] JWT.
- [ ] Refresh Token.
- [ ] Middleware.
- [ ] Role Guards.
- [ ] Auth Guards.
- [ ] Protección XSS.
- [ ] Protección CSRF.
- [ ] Variables de entorno.

---

## Calidad

- [ ] ESLint.
- [ ] Prettier.
- [ ] Husky.
- [ ] Jest.
- [ ] Playwright.
- [ ] Docker.
- [ ] CI/CD.

---

# 43. Roadmap

La arquitectura deberá permitir incorporar nuevas funcionalidades sin afectar las existentes.

Evoluciones previstas:

- Gestión de categorías de eventos.
- Notificaciones por correo electrónico.
- Notificaciones en tiempo real.
- Exportación de participantes (Excel/PDF).
- Escaneo de QR para control de asistencia.
- Panel de métricas avanzado.
- Integración con calendarios (Google Calendar, Outlook).
- Gestión de organizadores.
- Historial de eventos finalizados.
- Sistema de comentarios y valoraciones de eventos.

---

# 44. Conclusiones

La arquitectura definida en este documento establece un estándar de desarrollo para el Frontend del **Event Management System**, garantizando:

- Escalabilidad mediante arquitectura Feature First.
- Separación clara entre presentación, lógica de negocio y acceso a datos.
- Integración consistente con la API REST desarrollada en .NET 8.
- Seguridad basada en JWT, Refresh Token y control de acceso por roles.
- Componentes reutilizables y fácilmente testeables.
- Experiencia de usuario consistente, accesible y responsive.
- Preparación para crecimiento futuro sin necesidad de rediseños importantes.

Este documento servirá como la especificación oficial para el desarrollo del Frontend y como referencia para equipos de desarrollo y herramientas de Inteligencia Artificial encargadas de generar o mantener el proyecto.
