# Capítulo 6: ORM con Sequelize y MySQL

## ¿De qué trata este proyecto?

Este capítulo introduce el uso de **[Sequelize](https://sequelize.org/)** como ORM (Object-Relational Mapping) para interactuar con una base de datos **MySQL 8.4** desde Node.js con TypeScript.

Se trabaja con un modelo relacional **Marca → Producto → Almacén** para mostrar:

- **Conexión a MySQL** con Sequelize y `mysql2`
- **Tres formas distintas** de definir modelos en Sequelize (evolutivas, para aprender)
- **Relaciones** entre entidades (`hasMany`, `belongsTo`) con foreign keys
- **CRUD completo** con sincronización de tablas (`sequelize.sync()`)
- **Eager loading** anidado para traer datos relacionados
- **Tipado estricto con TypeScript** (en la versión profesional)
- **Uso de Docker** para levantar MySQL localmente sin instalarlo en el sistema

> **Nota**: Este proyecto usa **ESM puro** (`"type": "module"`) con TypeScript + `tsx`. Los imports relativos deben terminar con `.js` aunque el archivo fuente sea `.ts`.

## Estructura del proyecto

```text
c06-ORM-sequelize/
├── docker-compose.yml      # Levanta MySQL 8.4
├── package.json            # Dependencias y scripts
├── tsconfig.json           # Configuración TypeScript (NodeNext/ESM)
├── .env                    # Variables de entorno (local, ignorado por git)
├── .env.example            # Plantilla de variables
├── .gitignore
├── src/
│   ├── config/
│   │   └── env.ts          # Carga y validación de variables con env-var
│   ├── db/
│   │   └── connection.ts   # Instancia de Sequelize
│   ├── models/
│   │   ├── 01-super-basico/ # Forma 1: sequelize.define() sin tipado
│   │   ├── 02-funcional/    # Forma 2: class extends Model sin genéricos
│   │   └── 03-profesional/  # Forma 3: tipado estricto con InferAttributes
│   │       ├── Marca.ts
│   │       ├── Producto.ts
│   │       ├── Almacen.ts
│   │       └── relaciones.ts
│   └── index.ts            # Demo CRUD usando modelos 03-profesional
└── dist/                   # Compilado con tsc (gitignored)
```

## Modelo de datos

| Entidad | Descripción | Campos clave |
| --- | --- | --- |
| **Marca** | Fabricante/marca de productos | `id`, `nombre` (único) |
| **Producto** | Producto que pertenece a una marca | `id`, `nombre`, `descripcion`, `marcaId` (FK) |
| **Almacén** | Stock y precio de un producto | `id`, `stock` (default 0), `precio` (DECIMAL), `productoId` (FK) |

**Relaciones:**
- `Marca.hasMany(Producto, { as: 'productos', foreignKey: 'marcaId' })`
- `Producto.belongsTo(Marca, { as: 'marca', foreignKey: 'marcaId' })`
- `Producto.hasMany(Almacen, { as: 'almacenes', foreignKey: 'productoId' })`
- `Almacen.belongsTo(Producto, { as: 'producto', foreignKey: 'productoId' })`

Las foreign keys (`marcaId`, `productoId`) las crea Sequelize automáticamente al registrar las asociaciones.

## Tecnologías utilizadas

| Tecnología | Uso |
| --- | --- |
| [Node.js](https://nodejs.org/) v24+ | Runtime |
| [TypeScript](https://www.typescriptlang.org/) ^7.0.2 | Tipado estático (ESM + NodeNext) |
| [tsx](https://github.com/privatenumber/tsx) ^4.23.13 | Ejecución en desarrollo con watch |
| [Sequelize](https://sequelize.org/) ^6.37.8 | ORM para SQL |
| [mysql2](https://github.com/sidorares/node-mysql2) ^3.24.4 | Driver MySQL |
| [env-var](https://github.com/evanshortiss/env-var) ^7.5.0 | Validación/tipado de variables de entorno |
| [Docker](https://www.docker.com/) + Docker Compose | MySQL 8.4 local |
| `process.loadEnvFile()` | Carga de `.env` nativo de Node.js (sin dotenv) |

## Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores:

```env
NODE_ENV=development
DEBUG=true

# Conexión a MySQL (desde la app en localhost)
DB_HOST=localhost
DB_PORT=3306

# Base de datos creada por el contenedor
DB_NAME=aprende_node
DB_USER=node_app
DB_PASSWORD=node_app_secret
DB_ROOT_PASSWORD=root_secret
```

> Docker Compose usa estas mismas variables para inicializar el contenedor. La app usa `env-var` para leerlas desde `process.env`.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run db:up` | Levanta el contenedor MySQL con `docker compose up -d` |
| `npm run db:down` | Detiene y elimina el contenedor con `docker compose down` |
| `npm run db:logs` | Muestra logs del contenedor MySQL en tiempo real |
| `npm run dev` | Ejecuta `src/index.ts` con `tsx watch` (recarga automática) |
| `npm run start` | Ejecuta `src/index.ts` con `tsx` (una vez) |
| `npm run build` | Compila TypeScript a `dist/` con `tsc` |
| `npm run typecheck` | Verifica tipos sin generar archivos (`tsc --noEmit`) |

## Cómo ejecutar el proyecto

### 1) Instalar dependencias
```bash
npm install
```

### 2) Configurar variables de entorno
```bash
cp .env.example .env
# Edita .env si quieres cambiar puertos/credenciales
```

### 3) Levantar MySQL con Docker
```bash
npm run db:up
# o directamente: docker compose up -d
```

Espera a que el healthcheck esté `healthy`. Puedes comprobarlo con:
```bash
docker compose ps
# o
npm run db:logs
```

### 4) Ejecutar la demo
```bash
npm run dev
# o npm run start
```

La demo hará: `authenticate()` → `sync({ force: true })` → crea marca/productos/stock → consulta con `include` anidado → actualiza → elimina → muestra resumen y cierra conexión.

> `force: true` **borra y recrea** todas las tablas en cada ejecución. Solo para aprendizaje/desarrollo.

## Las tres formas de definir modelos

Este capítulo es intencionalmente didáctico: muestra la evolución del tipado en Sequelize.

| Carpeta | Patrón | Tipado | Notas |
| --- | --- | --- | --- |
| `01-super-basico/` | `sequelize.define()` | Sin clases, **todo `any`** | Muy simple. Útil para entender el concepto. Las relaciones se definen en el mismo archivo. |
| `02-funcional/` | `class extends Model {}` + `Model.init()` | Sin genéricos (`Model<any, any>`) | Muy común en proyectos reales. Pierdes autocompletado/validación en TS. |
| `03-profesional/` | `class extends Model<InferAttributes<...>, InferCreationAttributes<...>>` + `declare` | **Estricto** | Recomendado con TypeScript. Usa `CreationOptional`, `ForeignKey<T>`, `NonAttribute<T>`. Las relaciones van en `relaciones.ts` separado. |

**Para probar otra forma:** cambia las importaciones en `src/index.ts` a la carpeta que quieras. Importa **solo una** a la vez (comparten nombres de modelo/tabla).

```ts
// Usando forma funcional
import { definirRelaciones } from './models/02-funcional/relaciones.js';
// import { Marca } from './models/02-funcional/Marca.js';
// ...
```

## Comandos Docker útiles

```bash
# Levantar
docker compose up -d

# Ver estado
docker compose ps

# Logs
docker compose logs -f db

# Parar sin eliminar volúmen
docker compose stop

# Parar y eliminar contenedor (mantiene datos del volumen)
docker compose down

# Parar y ELIMINAR TODO (contenedor + volumen con datos) — ¡cuidado!
docker compose down -v

# Entrar al contenedor MySQL
docker exec -it c06-mysql mysql -u node_app -p aprende_node
# (pedirá la password: node_app_secret)

# Conectar como root
docker exec -it c06-mysql mysql -u root -p
# (pedirá: root_secret)
```

## Notas importantes

- **ESM + NodeNext**: obliga a usar extensiones `.js` en imports relativos (`./db/connection.js`) aunque el archivo sea `.ts`.
- **`process.loadEnvFile()`**: carga `.env` desde el cwd. En este proyecto se ejecuta desde la raíz de `c06-ORM-sequelize/`.
- **`timestamps: true`**: añade `createdAt` y `updatedAt` automáticamente.
- **`DECIMAL` en MySQL**: Sequelize lo devuelve como `string` por defecto. En el ejemplo se convierte con `Number()` para formatear.
- **Producción**: en lugar de `sync({ force: true })` se usan **migraciones** (ver capítulo `c07`).
- **`dist/` desactualizado**: el `dist/` que viene commiteado tiene modelos de una versión anterior. Con `npm run build` se regenerará desde `src/`.
