# PruebaCodeLabsFront

Aplicación frontend base para **Event Management System** construida con:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Axios
- TanStack Query
- React Hook Form + Zod

## Ejecutar en local

```bash
npm install
npm run dev
```

## Rutas principales

- `/` Home + listado de eventos
- `/events` Listado de eventos
- `/events/:id` Detalle de evento
- `/events/:id/register` Formulario de inscripción (protegida)
- `/login` Inicio de sesión
- `/my-registrations` Mis inscripciones (protegida)
- `/admin` Dashboard administrador (protegida por rol)
- `/admin/events` Gestión de eventos
- `/admin/events/:id/statistics` Estadísticas del evento

## Demo rápida

- Usuario: cualquier correo no admin + contraseña `123456`
- Admin: `admin@demo.com` + contraseña `123456`

> Para conectar a API real, configura `NEXT_PUBLIC_API_URL` y define `NEXT_PUBLIC_USE_MOCK=false`.
