# Capítulo 10: Express.js con estructura modular

## ¿De qué trata este proyecto?

Este proyecto muestra una **arquitectura en capas** para una API REST con Express.js y TypeScript, siguiendo el patrón recomendado en las guías del curso:

- **`models/`** – Definición de entidades (clases/modelos).
- **`services/`** – Lógica de negocio (sin conocimiento de `req`/`res`).
- **`controllers/`** – Traducción entre HTTP y el servicio.
- **`routes/`** – Declaración de endpoints y conexión con controladores.
- **`middlewares/`** – Funciones reutilizables (`express.json()`, logger, manejo de 404/errores).
- **`config/`** – Configuración tipada con variables de entorno.

## Tecnologías utilizadas

| Tecnología | Uso |
|-------------|-----|
| [Node.js](https://nodejs.org/) | Entorno de ejecución |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Express.js 5](https://expressjs.com/) | Framework web |
| [tsx](https://github.com/privatenumber/tsx) | Desarrollo con hot-reload (`tsx watch`) |
| [env-var](https://github.com/evanshortiss/env-var) | Validación y tipado de variables de entorno |

## Modelo de datos

La API trabaja con la entidad `Producto`:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `number` | Identificador único |
| `nombre` | `string` | Nombre del producto |
| `precio` | `number` | Precio unitario |
| `stock` | `number` | Unidades disponibles |

## Estructura del proyecto

```text
c10-express-estructura/
├── src/
│   ├── app.ts              # Configuración de Express (middlewares, rutas, 404 y errores)
│   ├── index.ts            # Punto de entrada: instancia ServerApp y arranca el servidor
│   ├── config/
│   │   └── env.ts          # Carga y validación de variables de entorno
│   ├── controllers/
│   │   └── productos.controller.ts  # Controlador de productos
│   ├── middlewares/
│   │   ├── error.ts       # Middlewares de 404 y manejo de errores
│   │   └── general.ts     # Middleware global (logging)
│   ├── models/
│   │   └── producto.ts    # Modelo de Producto
│   ├── routes/
│   │   ├── index.ts       # Router raíz (monta /productos)
│   │   └── productos.routes.ts # Rutas de productos
│   └── services/
│       └── productos.service.ts # Lógica de negocio
├── .env                   # Variables de entorno (no commitear)
├── package.json
└── tsconfig.json
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores:

```env
# Entorno de ejecución
NODE_ENV=development

# Servidor
PORT=3000

# Depuración (true/false)
DEBUG=false
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo con `tsx watch` |
| `npm start` | Inicia el servidor con `tsx` |
| `npm run build` | Compila TypeScript a JavaScript en `dist/` |
| `npm run typecheck` | Verifica tipos sin generar archivos |

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/salud` | Comprobación de estado de la API |
| `GET` | `/productos` | Listado de todos los productos |
| `GET` | `/productos/:id` | Obtiene un producto por ID |
| `POST` | `/productos` | Crea un nuevo producto (`nombre`, `precio`, `stock`) |

## Cómo ejecutar el proyecto

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Configurar variables de entorno:

   ```bash
   cp .env.example .env
   ```

3. Iniciar en modo desarrollo:

   ```bash
   npm run dev
   ```

4. Probar la API:

   ```bash
   curl http://localhost:3000/salud
   curl http://localhost:3000/productos
   ```

## Notas importantes

- **Arquitectura modular**: Cada capa tiene una responsabilidad única. El controlador usa métodos como arrow functions para evitar problemas de `this` al pasarlos directamente a Express.
- **ESM + NodeNext**: El proyecto usa `"type": "module"`. Los imports relativos deben terminar en `.js` aunque el archivo sea `.ts`.
- **Middlewares**: Se aplica `express.json()` globalmente, un middleware de logging (`general`), y al final `notFound` y `errorHandler`.
- **Validación básica**: El controlador valida `nombre`, `precio` y `stock` antes de delegar al servicio.
