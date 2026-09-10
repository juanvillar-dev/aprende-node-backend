Perfecto, Juan 🙌. Te armo una **documentación clara y estructurada** sobre los *logs* y *loggers* en Node.js, incluyendo Winston como ejemplo destacado.  

---

# 📘 Documentación: Logs y Loggers en Node.js

## 1. ¿Qué es un log?
Un **log** es un registro de información sobre lo que ocurre en una aplicación. Puede incluir:
- Errores
- Advertencias
- Mensajes informativos
- Datos de depuración

Su propósito es **dar visibilidad** al comportamiento interno de la aplicación, especialmente en producción.

---

## 2. ¿Qué es un logger?
Un **logger** es la herramienta o componente que gestiona esos registros.  
En lugar de usar `console.log`, un logger permite:
- Definir **niveles de severidad** (error, warn, info, debug).
- Enviar logs a **múltiples destinos** (consola, archivos, servicios externos).
- **Formatear** los mensajes con fecha, hora, contexto, etc.
- Mantener un sistema **modular y escalable** para el manejo de trazas.

---

## 3. Dependencias famosas para logging en Node.js

| Librería | Descripción breve |
|----------|------------------|
| **Winston** | La más popular y flexible. Soporta múltiples *transports* y formatos. |
| **Morgan** | Middleware para Express, ideal para registrar peticiones HTTP. |
| **Pino** | Logger muy rápido y eficiente, orientado a alto rendimiento. |
| **Bunyan** | Logger estructurado en JSON, pensado para integraciones con sistemas externos. |
| **Log4js** | Inspirado en Log4j de Java, con soporte para múltiples *appenders*. |

---

## 4. ¿Cómo funciona un logger?
1. **Creación**: defines un objeto logger con configuración inicial (nivel, formato, transportes).
2. **Uso**: llamas métodos como `logger.info()` o `logger.error()` en tu código.
3. **Salida**: el logger envía el mensaje al destino configurado (consola, archivo, etc.).
4. **Escalabilidad**: puedes añadir más transportes sin cambiar tu lógica de negocio.

Ejemplo genérico:
```js
logger.info("Servidor iniciado");
logger.error("Error al conectar con la base de datos");
```

---

## 5. Winston: el logger más usado en Node.js

### Instalación
```bash
npm install winston
```

### Configuración básica
```js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ],
});
```

---

### Métodos principales
- **logger.error(msg)** → Registra errores críticos.
- **logger.warn(msg)** → Advertencias.
- **logger.info(msg)** → Información general.
- **logger.http(msg)** → Mensajes relacionados con HTTP.
- **logger.debug(msg)** → Detalles de depuración.

Ejemplo:
```js
logger.error("No se pudo conectar a la base de datos");
logger.warn("El servicio está tardando más de lo esperado");
logger.info("Servidor escuchando en el puerto 3000");
logger.debug("Variable x tiene valor:", x);
```

---

### Formatos útiles
```js
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});
```

Salida:
```
[2026-02-09T08:04:00.000Z] info: Servidor iniciado
```

---




---

# 🏗️ Ejemplo modular: Winston en Express

## 1. Estructura de carpetas
```
project/
├── src/
│   ├── config/
│   │   └── logger.js
│   ├── controllers/
│   │   └── userController.js
│   ├── services/
│   │   └── userService.js
│   ├── routes/
│   │   └── userRoutes.js
│   └── app.js
└── package.json
```

---

## 2. Configuración del logger (config/logger.js)
```js
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/app.log' })
  ],
});

module.exports = logger;
```

---

## 3. Servicio (services/userService.js)
```js
const logger = require('../config/logger');

function getUsers() {
  logger.info("Obteniendo lista de usuarios desde el servicio");
  // Simulación de datos
  return [{ id: 1, name: "Juan" }, { id: 2, name: "María" }];
}

function getUserById(id) {
  logger.debug(`Buscando usuario con ID: ${id}`);
  if (id === 99) {
    logger.error("Usuario no encontrado");
    throw new Error("Usuario no existe");
  }
  return { id, name: "Usuario demo" };
}

module.exports = { getUsers, getUserById };
```

---

## 4. Controlador (controllers/userController.js)
```js
const userService = require('../services/userService');
const logger = require('../config/logger');

exports.getUsers = (req, res) => {
  try {
    const users = userService.getUsers();
    res.json(users);
  } catch (error) {
    logger.error(`Error en getUsers: ${error.message}`);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.getUserById = (req, res) => {
  try {
    const user = userService.getUserById(parseInt(req.params.id));
    res.json(user);
  } catch (error) {
    logger.error(`Error en getUserById: ${error.message}`);
    res.status(404).json({ error: "Usuario no encontrado" });
  }
};
```

---

## 5. Rutas (routes/userRoutes.js)
```js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);

module.exports = router;
```

---

## 6. App principal (app.js)
```js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const logger = require('./config/logger');

app.use(express.json());
app.use('/api', userRoutes);

app.listen(3000, () => {
  logger.info("Servidor corriendo en http://localhost:3000");
});
```

---

## 🔎 Flujo de Winston en esta arquitectura
1. **Servicio** → registra eventos internos (`info`, `debug`, `error`).  
2. **Controlador** → maneja errores y responde al cliente, dejando trazas con Winston.  
3. **Logger centralizado** → asegura formato y destino uniforme en toda la app.  
