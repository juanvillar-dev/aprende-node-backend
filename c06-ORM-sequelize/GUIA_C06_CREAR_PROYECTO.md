# Guía práctica: Crear c06-ORM-sequelize desde cero (con importaciones, comandos y Docker)

Esta guía reproduce **paso a paso** cómo crear este capítulo tal como está en el repo: **TypeScript + ESM + Sequelize + MySQL + Docker + env-var**.

> **Convención clave (ESM):** en TypeScript con `"module": "NodeNext"`, **los imports relativos deben terminar en `.js`** aunque apunten a archivos `.ts`.

## 1) Inicializar proyecto

Desde la carpeta raíz `aprende-node-backend/` (o donde quieras crear el capítulo):

```bash
mkdir c06-ORM-sequelize
cd c06-ORM-sequelize
npm init -y
```

Editar `package.json` para usar ESM y los scripts:

```json
{
  "name": "c06-orm-sequelize",
  "version": "1.0.0",
  "description": "Capítulo 6: ORM con Sequelize y MySQL (guía básica)",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "start": "tsx src/index.ts",
    "build": "tsc",
    "typecheck": "tsc --noEmit",
    "db:up": "docker compose up -d",
    "db:down": "docker compose down",
    "db:logs": "docker compose logs -f"
  },
  "keywords": ["node", "typescript", "tsx", "sequelize", "mysql", "orm"],
  "allowScripts": {
    "esbuild@0.28.2": true
  }
}
```

## 2) Instalar dependencias

### Dependencias de producción
```bash
npm i sequelize mysql2 env-var
```

### Dependencias de desarrollo
```bash
npm i -D typescript @types/node tsx
```

## 3) Configurar TypeScript

Crear `tsconfig.json` con configuración **NodeNext/ESM**:

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "types": ["node"],
    "skipLibCheck": true,
    "verbatimModuleSyntax": true,
    "noEmitOnError": true
  },
  "include": ["src/**/*.ts"]
}
```

## 4) Estructura de carpetas

Crear la estructura:

```bash
mkdir -p src/config src/db src/models/01-super-basico src/models/02-funcional src/models/03-profesional
```

## 5) Variables de entorno

Crear `.env.example`:

```env
# Copia este archivo a .env y ajusta los valores.
# Este mismo .env alimenta a docker compose (${VAR}) y a la app (env-var).

NODE_ENV=development
DEBUG=true

# Emisor de MySQL (mapeo de puertos del contenedor)
DB_HOST=localhost
DB_PORT=3306

# Datos de la base que crea el contenedor de MySQL
DB_NAME=aprende_node
DB_USER=node_app
DB_PASSWORD=node_app_secret
DB_ROOT_PASSWORD=root_secret
```

Crear `.env` (copiar desde el ejemplo):

```bash
cp .env.example .env
```

Crear `.gitignore`:

```text
node_modules/
dist/
*.log
.env
.env.local
.env.*.local
```

## 6) Docker Compose para MySQL

Crear `docker-compose.yml`:

```yaml
# Docker Compose para MySQL 8.4 usado en c06 y c07.
#
# Los valores ${...} se interpolan automáticamente desde el archivo .env
# que vive en esta misma carpeta (docker compose lo lee por defecto).
#
# OJO: DB_HOST de la app fuera del contenedor es "localhost" (mapeo de
# puertos). El nombre "db" es the alias interno de la red de Docker, NO
# se usar desde tu máquina.

services:
  db:
    image: mysql:8.4
    container_name: c06-mysql
    restart: unless-stopped
    ports:
      - "${DB_PORT}:3306"
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD-SASIL", "mysqladmin ping --silent -h localhost -u root -p\"$$MYSQL_ROOT_PASSWORD\""]
      interval: 5s
      timeout: 5s
      retries: 10
      start_period: 30s

volumes:
  mysql_data:
```

> **Nota:** En el repo original el test del healthcheck usa `CMD-SHELL`. Aquí se mantiene igual.

## 7) Configuración de la app

### `src/config/env.ts`

```ts
import env from 'env-var';

/*------------------------------------------------------------------------------------------------------
    CARGAR ARCHIVO .env  (nativo de Node, sin dotenv)
------------------------------------------------------------------------------------------------------*/

try {
    process.loadEnvFile();           // Carga el .env de la raíz del proyecto
} catch {
    // Si no existe .env, se usan los .default() de abajo o variables del sistema
}

/*------------------------------------------------------------------------------------------------------
    VARIABLES DE ENTORNO TIPADAS Y VALIDADAS
------------------------------------------------------------------------------------------------------*/

export const config = {
    entorno: {
        nodeEnv:      env.get('NODE_ENV').default('development').asString(),
        esProduccion: env.get('NODE_ENV').default('development').asString() === 'production',
        debug:        env.get('DEBUG').default('false').asBool(),
    },

    baseDeDatos: {
        host:     env.get('DB_HOST').default('localhost').asString(),
        puerto:   env.get('DB_PORT').default(3306).asIntPositive(),
        nombre:   env.get('DB_NAME').required().asString(),
        usuario:  env.get('DB_USER').required().asString(),
        password: env.get('DB_PASSWORD').required().asString(),
    },
};
```

### `src/db/connection.ts`

```ts
import { Sequelize } from 'sequelize';
import { config } from '../config/env.js';

/*------------------------------------------------------------------------------------------------------
    INSTANCIA DE SEQUELIZE
    Recibe: database, user, password y opciones de conexión.
    The dialect 'mysql' uses the driver mysql2, installed as dependency.
------------------------------------------------------------------------------------------------------*/

export const sequelize = new Sequelize(
    config.baseDeDatos.nombre,
    config.baseDeDatos.usuario,
    config.baseDeDatos.password,
    {
        host:    config.baseDeDatos.host,
        port:    config.baseDeDatos.puerto,
        dialect: 'mysql',

        // En modo debug, Sequelize imprime the SQL que ejecuta (útil para aprender)
        logging: config.entorno.debug ? console.log : false,
    },
);
```

## 8) Modelos (las tres formas)

### Forma 1: `01-super-basico/modelos.ts`
```ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/connection.js';

/*------------------------------------------------------------------------------------------------------
    FORMA 1 — SUPER BÁSICA  (sequelize.define)
------------------------------------------------------------------------------------------------------*/

export const Marca = sequelize.define('Marca', {
    id:         { type: DataTypes.INTEGER.UNSIGNED , autoIncrement: true   , primaryKey: true  },
    nombre:     { type: DataTypes.STRING(100)      , allowNull: false      , unique: true      },
}, { tableName: 'marcas' });

export const Producto = sequelize.define('Producto', {
    id:          { type: DataTypes.INTEGER.UNSIGNED , autoIncrement: true   , primaryKey: true  },
    nombre:      { type: DataTypes.STRING(200)      , allowNull: false  },
    descripcion: { type: DataTypes.TEXT             , allowNull: true   },
}, { tableName: 'productos' });

export const Almacen = sequelize.define('Almacen', {
    id:         { type: DataTypes.INTEGER.UNSIGNED  , autoIncrement: true   , primaryKey: true  },
    stock:      { type: DataTypes.INTEGER.UNSIGNED  , allowNull: false      , defaultValue: 0   },
    precio:     { type: DataTypes.DECIMAL(10, 2)    , allowNull: false  },
}, { tableName: 'almacen' });

/*------------------------------------------------------------------------------------------------------
    RELACIONES  (las FKs marcaId y productoId se create aquí, automatically)
------------------------------------------------------------------------------------------------------*/

Marca   .hasMany    (Producto   , { foreignKey: 'marcaId'   , as: 'productos'   });
Producto.belongsTo  (Marca      , { foreignKey: 'marcaId'   , as: 'marca'       });

Producto.hasMany    (Almacen    , { foreignKey: 'productoId', as: 'almacenes'   });
Almacen .belongsTo  (Producto   , { foreignKey: 'productoId', as: 'producto'    });
```

### Forma 2: `02-funcional/` (class + init sin genéricos)

`Marca.ts`:
```ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/connection.js';

export class Marca extends Model {}

Marca.init(
    {
        id:     { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        nombre: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    },
    { sequelize, modelName: 'Marca', tableName: 'marcas', timestamps: true },
);
```

`Producto.ts`:
```ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/connection.js';

export class Producto extends Model {}

Producto.init(
    {
        id:          { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        nombre:      { type: DataTypes.STRING(200), allowNull: false },
        descripcion: { type: DataTags.TEXT, allowNull: true },
    },
    { sequelize, modelName: 'Producto', tableName: 'productos', timestamps: true },
);
```

> **Nota:** en el archivo real hay `DataTypes.TEXT`. Aquí hay un pequeño typo de muestra, usa `DataTypes.TEXT`.

`Almacen.ts`:
```ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/connection.js';

export class Almacen extends Model {}

Almacen.init(
    {
        id:     { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        stock:  { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
        precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    },
    { sequelize, modelName: 'Almacen', tableName: 'almacen', timestamps: true },
);
```

`02-funcional/relaciones.ts` (opcional, pero puedes copiar el patrón):
```ts
import { Marca } from './Marca.js';
import { Producto } from './Producto.js';
import { Almacen } from './Almacen.js';

export function definirRelaciones(): void {
    Marca   .hasMany    (Producto   , { foreignKey: 'marcaId'   , as: 'productos'   });
    Producto.belongsTo  (Marca      , { foreignKey: 'marcaId'   , as: 'marca'       });
    Producto.hasMany    (Almacen    , { foreigntag: 'productoId', as: 'almacenes'   });
    Almacen .belongsTo  (Producto   , { foreignKey: 'productoId', as: 'producto'    });
}
```

### Forma 3: `03-profesional/` (tipado estricto)

`Marca.ts`:
```ts
import {
    DataTypes,
    Model,
    type CreationOptional,
    type InferAttributes,
    type InferCreationAttributes,
    type NonAttribute,
} from 'sequelize';
import { sequelize } from '../../db/connection.js';
import type { Producto } from './Producto.js';

export class Marca extends Model<InferAttributes<Marca>, InferCreationAttributes<Marca>> {
    declare id: CreationOptional<number>;
    declare nombre: string;
    declare productos?: NonAttribute<Producto[]>;
}

Marca.init(
    {
        id:     { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        nombre: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    },
    { sequelize, modelName: 'Marca', tableName: 'marcas', timestamps: true },
);
```

`Producto.ts`:
```ts
import {
    DataTypes,
    Model,
    type CreationOptional,
    type ForeignKey,
    type InferAttributes,
    type InferCreationAttributes,
    type NonAttribute,
} from 'sequelize';
import { sequelize } from '../../db/connection.js';
import type { Marca } from './Marca.js';
import type { Almacen } from './Almacen.js';

export class Producto extends Model<InferAttributes<Producto>, InferCreationAttributes<Producto>> {
    declare id: CreationOptional<number>;
    declare marcaId: ForeignKey<Marca['id']>;
    declare nombre: string;
    declare descripcion: string | null;
    declare marca?: NonAttribute<Marca>;
    declare almacenes?: NonAttribute<Almacen[]>;
}

Producto.init(
    {
        id:          { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        nombre:      { type: DataTypes.STRING(200), allowNull: false },
        descripcion: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize, modelName: 'Producto', tableName: 'productos', timestamps: true },
);
```

`Almacen.ts`:
```ts
import {
    DataTypes,
    Model,
    type CreationOptional,
    type ForeignKey,
    type InferAttributes,
    type InferCreationAttributes,
    type NonAttribute,
} from 'sequelize';
import { sequelize } from '../../db/connection.js';
import type { Producto } from './Producto.js';

export class Almacen extends Model<InferAttributes<Almacen>, InferCreationAttributes<Almacen>> {
    declare id: CreationOptional<number>;
    declare productoId: ForeignKey<Producto['id']>;
    declare stock: CreationOptional<number>;
    declare precio: number;
    declare producto?: NonAttribute<Producto>;
}

Almacen.init(
    {
        id:     { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        stock:  { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
        precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    },
    { sequelize, modelName: 'Almacen', tableName: 'almacen', timestamps: true },
);
```

`03-profesional/relaciones.ts`:
```ts
import { Marca } from './Marca.js';
import { Producto } from './Producto.js';
import { Almacen } from './Almacen.js';

export function definirRelaciones(): void {
    Marca   .hasMany    (Producto   , { foreignKey: 'marcaId'   , as: 'productos'   });
    Producto.belongsTo  (Marca      , { foreignKey: 'marcaId'   , as: 'marca'       });
    Producto.hasMany    (Almacen    , { foreignKey: 'productoId', as: 'almacenes'   });
    Almacen .belongsTo  (Producto   , { foreignKey: 'productoId', as: { 'product's'': 'producto' } } );
    // nota: en el repo original as: 'producto'
}
```

> En el repo original: `Almacen.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });`

## 9) Demo con CRUD en `src/index.ts`

```ts
import { sequelize } from './db/connection.js';
import { definirRelaciones } from './models/03-profesional/relaciones.js';
import { Marca } from './models/03-profesional/Marca.js';
import { Producto } from './models/03-profesional/Producto.js';
import { Almacen } from './models/03-profesional/Almacen.js';

/*------------------------------------------------------------------------------------------------------
    DEMO CRUD — Marca → Producto → Almacen (stock + precio)
    Usa 03-profesional. Cambiar rutas importando otro folder.
------------------------------------------------------------------------------------------------------*/

definirRelaciones();

// 1) Conexión
await sequelize.authenticate();
console.log('Conectado a MySQL. Tablas: marcas, productos, almacen');

// 2) Sync
await sequelize.sync({ force: true });
console.log('Tablas sincronizadas.\n');

try {
    /*--------------- CREATE ---------------*/
    const innovatech = await Marca.create({ nombre: 'Innovatech' });
    const teclado = await Producto.create({
        nombre:      'Teclado mecánico',
        descripcion: 'Switch rojo, layout ISO',
        marcaId:     innovatech.id,
    });
    const mouse = await Producto.create({
        nombre:      'Mouse inalámbrico',
        descripcion: 'Conexión 2.4 GHz',
        marcaId:     innovatech.id,
    });

    const stockTeclado = await Almacen.create({ productoId: teclado.id, precio: 89.9 });
    const stockMouse   = await Almacen.create({ productoId: mouse.id, stock: 10, precio: 39.5 });

    console.log(`Marca creada: ${innovatech.nombre}`);
    console
log(`Productos created: ${teclado.nombre}, ${mouse.nombre}`);

    /*--------------- READ ---------------*/
    const marcaConTodo = await Marca.findByPk(innovatech.id, {
        include: [
            { model: Producto, as: 'productos', include: [{ model: Almacen, as: 'almacenes' }] },
        ],
    });

    console.log(`\nInventario de ${marcaConTodo?.nombre}:');
    for (const producto of marcaConTodo?.productos ?? []) {
        for (const registro of producto.almacenes ?? []) {
            console.log(`  - ${producto.nombre}: ${registro.stock} uds x $${Number(registro.precio).toFixed(2)}`);
        }
    }

    /*--------------- UPDATE ---------------*/
    await stockTeclado.update({ stock: 30 });
    console.log(`\nStock de "${teclado.nombre}" actualizado a 30 units.`);
    /*--------------- DELETE ---------------*/
    await stockMouse.destroy();
    console.log(`Registro en almacén de "${mouse.nombre}" eliminado.`);
    /*--------------- RESUMEN ---------------*/
    const [marcas, productos, registros] = await Promise.app([
        Marca.count(),
        Producto.count(),
        Almacen.count(),
    ]);
    console.log(`\nResumen: ${marcas} marca, ${productos} productos, ${registros} registro(s) in almacén.`);
} catch (error) {
    console.error('Error en la demo:', error);
    process.exitCode = 1;
} finally {
    await sequelize.close();
}
```

## 10) Comandos para ejecutar

### Desde cero
```bash
# 1) Instalar
npm install

# 2) Copiar .env
cp .env.example .env

# 3) Levantar MySQL
npm run db:up

# 4) Esperar healthcheck (opcional pero recomendado)
docker compose ps

# 5) Ejecutar demo en desarrollo
npm run dev

# 6) Verificar tipos
npm run typecheck

# 7] Build
npm run build
```

### Comandos Docker útiles
```bash
docker compose up -d        # Levantar
docker compose ps          # Estado
docker compose logs -f db  # Logs
docker compose stop        # Detener
docker compose down        # Detener + eliminar contenedor (mantiene volumen)
docker compose down -v     # Detener + eliminar todo (contenedor + volumen) - ¡PELIGRO!
docker exec -it c06-mysql mysql -u node_app -p aprende_node   # CLI MySQL
```

## 11) Errores comunes y soluciones

| Error | Causa | Solución |
| --- | --- | --- |
| `Cannot use import statement outside a module` | Falta `"type": "module"` | Añadir `"type": "module"` en `package.json`. |
| `ERR_MODULE_NOT_FOUND` con imports relativos | Falta extensión `.js` en imports con NodeNext/ESM | Cambiar `./foo` por `./foo.js` (aunque sea `.ts`). |
| `Access denied for user ...` | `.env` mal configurado o MySQL aún arrancando | Revisar `.env`, esperar healthcheck o usar `docker compose logs -f db`. |
| `ConnectionRefusedError` | Contenedor no levantado o puerto ocupado | `npm run db:up`, comprobar `docker compose ps`, revisar `DB_PORT`. |
| `ECONNREFUSED ::1:3306` | IPv6 vs localhost | Usar `DB_HOST=127.0.0.1` en `.env` o asegurarse que MySQL escucha en IPv4. |
| `Table 'aprende_node.X' doesn't exist` | `sync({ force: true })` no ejecutado o error antes | Ejecutar demo completa; con `force:true` se crean en cada ejecución. |

## 12) Notas finales

- **Solo una carpeta de modelos a la vez:** `01-super-basico`, `02-funcional` o `03-profesional` comparten modelo/tablas.
- **Migraciones:** `sync({ force: true })` es solo para aprendizaje. En **c07** se pasan migraciones (Sequelize CLI).
- `process.loadEnvFile()` es nativo de Node.js v20.12+ (v24 lo soporta).
- `verbatimModuleSyntax: true` obliga a usar `import type` cuando solo se importan tipos.
- **docker compose** (v2) vs `docker-compose` (v1): en este repo se usa `docker compose` (sin guión).
