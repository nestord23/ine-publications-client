# INE Publications Manager — Frontend

Aplicación web para la gestión de publicaciones. Consume una API REST construida con NestJS y MongoDB.

## Tecnologías

- **React 19** con **TypeScript 6**
- **Vite 8** como bundler
- **React Router v7** para el enrutamiento
- **Axios** para peticiones HTTP
- **Inter** (Google Fonts) como tipografía principal
- **React Compiler** habilitado

## Estructura

```
src/
├── components/     # Componentes reutilizables (Navbar)
├── pages/          # ListPage, DetailPage, FormPage
├── services/       # Llamadas a la API (posts.service.ts)
├── types/          # Interfaces compartidas (Post, DTOs)
├── hooks/          # Custom hooks (pendiente)
├── App.tsx         # Router y layout principal
├── App.css         # Estilos base
└── main.tsx        # Punto de entrada
```

## Variables de entorno

Crear un archivo `.env` en la raíz con:

```env
VITE_API_URL=http://localhost:3000
```

## Instalación y ejecución

```bash
npm install
npm run dev          # Desarrollo con HMR en http://localhost:5173
npm run build        # Compilación a producción en dist/
npm run preview      # Vista previa de la compilación
npm run lint         # ESLint
```

## API

La aplicación se conecta al backend de publicaciones. Endpoints consumidos:

| Método | Ruta             | Descripción          |
| ------ | ---------------- | -------------------- |
| GET    | `/posts`         | Listar publicaciones |
| GET    | `/posts/:id`     | Obtener una          |
| POST   | `/posts`         | Crear                |
| PUT    | `/posts/:id`     | Actualizar           |
| DELETE | `/posts/:id`     | Eliminar (soft)      |

El soft delete oculta la publicación de las listas pero no la elimina físicamente.

## Convenciones

- `import type` obligatorio para tipos con `verbatimModuleSyntax`
- Nombres de archivos en PascalCase para componentes (`ListPage.tsx`)
- Nombres en camelCase para servicios y utilidades
- CSS por página/componente en archivo separado

## Contribuciones

1. Hacer fork del repositorio
2. Crear una rama: `git checkout -b feature/nombre`
3. Commit convencional: `feat:`, `fix:`, `refactor:`, `style:`
4. Abrir pull request contra `main`
