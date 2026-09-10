# 📖 Guía de Node.js

## 1. Definición
**Node.js** es un entorno de ejecución de **JavaScript** basado en el motor **V8 de Google Chrome**.  
Permite ejecutar JavaScript en el **servidor**, no solo en el navegador.  
Se caracteriza por su modelo **asíncrono y orientado a eventos**, lo que lo hace eficiente para aplicaciones en tiempo real y con muchas conexiones simultáneas.  

---

## 2. ¿Para qué sirve?
- Crear **servidores web** sin necesidad de Apache o Nginx.  
- Desarrollar **APIs REST** y **microservicios**.  
- Manejar **I/O intensivo** (archivos, bases de datos, sockets) de forma eficiente.  
- Construir aplicaciones en **tiempo real** (chats, notificaciones, juegos online).  
- Usar el ecosistema **npm** para acceder a millones de librerías.  

---

## 3. Bibliotecas nativas de Node.js
Estas vienen incluidas por defecto y no requieren instalación:

| Biblioteca | Uso principal |
|------------|---------------|
| **fs** | Manejo de archivos (leer, escribir, borrar). |
| **http / https** | Crear servidores web y manejar peticiones. |
| **path** | Manipulación de rutas de archivos y directorios. |
| **os** | Información del sistema operativo (CPU, memoria, etc.). |
| **events** | Crear y manejar eventos personalizados. |
| **crypto** | Funciones de cifrado, hash y seguridad. |
| **stream** | Procesamiento de datos en flujo (archivos grandes, sockets). |
| **url** | Parseo y manejo de URLs. |
| **util** | Funciones de utilidad (herencia, depuración, promisify). |
| **timers** | Manejo de temporizadores (`setTimeout`, `setInterval`). |

---

## 4. Dependencias externas más usadas (npm)
Estas se instalan con `npm install` y amplían las capacidades de Node:

| Dependencia | Uso principal |
|-------------|---------------|
| **Express.js** | Framework para crear APIs y servidores web. |
| **Socket.io** | Comunicación en tiempo real (chat, notificaciones). |
| **Mongoose** | Modelado de datos y conexión con MongoDB. |
| **Sequelize** | ORM para bases SQL (MySQL, PostgreSQL, etc.). |
| **Nodemon** | Reinicio automático del servidor en desarrollo. |
| **dotenv** | Manejo de variables de entorno. |
| **bcrypt** | Encriptación de contraseñas. |
| **Jest / Mocha** | Testing de aplicaciones Node.js. |
| **cors** | Manejo de políticas de acceso entre dominios. |
| **jsonwebtoken (JWT)** | Autenticación basada en tokens. |

---

## 5. Métodos de ejecución en Node.js
### 🔹 Síncronos
- Bloquean la ejecución hasta que la tarea termina.  
- Ejemplo:  
  ```js
  const fs = require('fs');
  const data = fs.readFileSync('archivo.txt', 'utf8');
  console.log(data);
  ```

### 🔹 Asíncronos (callbacks)
- No bloquean el flujo, delegan la tarea y continúan.  
- Ejemplo:  
  ```js
  fs.readFile('archivo.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  ```

### 🔹 Promesas
- Manejan asincronía con `.then()` y `.catch()`.  
- Ejemplo:  
  ```js
  const fs = require('fs').promises;
  fs.readFile('archivo.txt', 'utf8')
    .then(data => console.log(data))
    .catch(err => console.error(err));
  ```

### 🔹 Async/Await
- Sintaxis moderna, más legible.  
- Ejemplo:  
  ```js
  const fs = require('fs').promises;
  async function leerArchivo() {
    try {
      const data = await fs.readFile('archivo.txt', 'utf8');
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
  leerArchivo();
  ```

---

## 6. Estructura general de un proyecto en Node.js
Un proyecto típico se organiza en carpetas para mantener modularidad y claridad:

```
project/
│
├── src/
│   ├── models/        # Definición de esquemas y estructuras de datos
│   ├── controllers/   # Lógica de negocio (qué hacer con los datos)
│   ├── services/      # Funciones reutilizables (validaciones, integraciones)
│   ├── routes/        # Definición de endpoints y conexión con controladores
│   ├── middlewares/   # Funciones que se ejecutan antes de los controladores (auth, logs)
│   └── app.js         # Configuración principal del servidor
│
├── config/            # Configuración (DB, variables de entorno)
├── tests/             # Pruebas unitarias e integración
├── package.json       # Dependencias y scripts
└── .env               # Variables de entorno (claves, puertos, etc.)
```

---

## 🚀 Conclusión
Node.js es un entorno potente porque:  
- Permite trabajar con **asincronía** de forma eficiente.  
- Tiene **bibliotecas nativas** para lo esencial.  
- Se expande con **npm** para cualquier necesidad.  
- Su estructura modular (models, controllers, routers, services) facilita proyectos escalables y mantenibles.  
