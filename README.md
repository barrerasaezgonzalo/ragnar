# Ragnar

Ragnar es un espacio de trabajo personal para organizar tareas, pendientes y proyectos utilizando principios de **GTD (Getting Things Done)**.

La idea es mantener en un solo lugar aquello que necesita atención, separar las acciones concretas de los pendientes futuros y reducir la fricción entre capturar algo y convertirlo en una acción.

## ✨ Características

### Tareas

- Captura y gestión de tareas.
- Estados basados en GTD:
  - **Inbox**
  - **Next Actions**
  - **Calendar**
  - **Waiting**
  - **Someday**
  - **Completed**
  - **Archived**
- Tareas destacadas.
- Descripción de tareas.
- Contextos:
  - Digital
  - Casa
  - Trabajo
  - Fuera
- Fechas de vencimiento.
- Indicadores visuales para tareas vencidas y próximas.
- Subtareas con estados pendientes y completadas.

### 🔎 Organización

- Búsqueda de tareas.
- Filtrado por contexto.
- Agrupación por estado.
- Contador de tareas por estado.
- Estados vacíos para mantener clara la interfaz.

### 📅 Calendario

Las tareas que tienen una fecha pueden gestionarse desde el calendario.

Incluye:

- Vista mensual.
- Vista de lista.
- Navegación entre meses.
- Acceso rápido al día actual.
- Visualización de eventos por día.
- Acceso a las tareas de un día desde el calendario.

Las tareas asociadas al calendario se mantienen separadas de la lista principal de acciones.

## 🔐 Autenticación

Ragnar utiliza autenticación mediante **Supabase** y permite iniciar sesión utilizando Google.

La sesión se mantiene mediante Supabase Auth y determina el acceso al espacio de trabajo.

## 🛠️ Tecnologías

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Supabase**
- **Lucide React**

## 📁 Organización

El proyecto está organizado separando componentes, hooks, tipos y lógica de dominio para facilitar su mantenimiento y reutilización.

Una parte importante de la arquitectura es mantener la lógica de negocio dentro de hooks y dejar que los componentes se encarguen principalmente de representar la interfaz.

## 🚀 Instalación

Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd ragnar
```

Instala las dependencias:

```bash
npm install
```

Crea un archivo `.env.local` con las variables necesarias para Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_FERIADOS_API_TOKEN=...
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Luego abre:

```text
http://localhost:3000
```

## 🗄️ Base de datos

Ragnar utiliza Supabase como backend.

Las tareas se almacenan asociadas al usuario autenticado y cuentan con información como:

- Título
- Descripción
- Estado
- Contexto
- Fecha de vencimiento
- Fecha de creación
- Fecha de actualización
- Destacada
- Subtareas

Las tareas están vinculadas al usuario mediante su `user_id`.

## 🎯 Filosofía

Ragnar no pretende ser un dashboard lleno de información.

La intención es que sea un **espacio de trabajo personal**, donde lo importante sea saber:

Más que representar una aplicación genérica de productividad, Ragnar busca ser una herramienta personal que se adapte a la forma en que realmente se trabaja y se organizan las cosas.

## 📌 Estado del proyecto

Ragnar se encuentra en desarrollo activo.

La base de gestión de tareas, organización GTD, calendario, subtareas y autenticación ya está implementada. El proyecto continúa evolucionando a medida que se utiliza en el día a día.

---

**Ragnar**  
Un espacio personal para organizar lo importante.
