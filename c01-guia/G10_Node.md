
---

# 📘 Documentación Completa: Node.js

## 1. ¿Qué es Node.js?
- **Node.js** es un entorno de ejecución para **JavaScript** construido sobre el motor **V8 de Google Chrome**.  
- Permite ejecutar JavaScript en el **servidor**, fuera del navegador.  
- Es **asíncrono, orientado a eventos y no bloqueante**, lo que lo hace ideal para aplicaciones escalables y de alto rendimiento.  

👉 En pocas palabras: Node.js convierte a JavaScript en un lenguaje de **backend**.

---

## 2. Características principales
- ⚡ **Single-threaded**: usa un solo hilo principal, pero maneja miles de conexiones concurrentes gracias al *event loop*.  
- 🔄 **Asíncrono y no bloqueante**: las operaciones de I/O (lectura de archivos, consultas a DB, etc.) no detienen la ejecución.  
- 📦 **npm (Node Package Manager)**: gestor de paquetes integrado.  
- 🌍 **Cross-platform**: funciona en Windows, Linux y macOS.  
- 🚀 **Escalable**: ideal para microservicios y APIs REST.  

---

## 3. Arquitectura interna
Node.js se basa en:
- **Motor V8** → ejecuta JavaScript muy rápido.  
- **Libuv** → biblioteca que maneja el *event loop*, I/O asíncrono y multihilo en segundo plano.  
- **Event Loop** → ciclo que gestiona eventos y callbacks.  
- **Módulos internos** → como `fs` (archivos), `http` (servidor web), `path` (rutas de archivos).  

---

## 4. Ejemplo básico: servidor HTTP
```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hola desde Node.js');
});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
```

---

## 5. Módulos en Node.js
Node.js organiza su código en **módulos**.

### Tipos
- **Core modules** (nativos): `fs`, `http`, `path`, `os`.  
- **Local modules**: creados por ti en tu proyecto.  
- **Third-party modules**: instalados con npm (ej. `express`, `mongoose`).  

### Ejemplo con `fs`
```js
const fs = require('fs');

// Escribir archivo
fs.writeFileSync('archivo.txt', 'Contenido inicial');

// Leer archivo
const data = fs.readFileSync('archivo.txt', 'utf8');
console.log(data);
```

---

## 6. Asincronía en Node.js
Node.js usa callbacks, promesas y `async/await`.

### Callback
```js
fs.readFile('archivo.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### Promesa
```js
const fs = require('fs').promises;

fs.readFile('archivo.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Async/Await
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

## 7. npm y package.json
- **npm**: gestor de paquetes de Node.js.  
- **package.json**: archivo que describe tu proyecto y sus dependencias.  

Ejemplo:
```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## 8. Casos de uso de Node.js
- 🌐 **APIs REST** (Express, Fastify).  
- 💬 **Aplicaciones en tiempo real** (chats con WebSockets).  
- 📊 **Microservicios**.  
- 📂 **Scripts de automatización**.  
- ⚙️ **Herramientas CLI**.  
- 🎮 **Backends para juegos online**.  

---

## 9. Dependencias más usadas en Node.js
| Paquete | Uso | Instalación |
|---------|-----|-------------|
| **Express** | Framework web | `npm install express` |
| **Nodemon** | Reinicio automático | `npm install -D nodemon` |
| **dotenv** | Variables de entorno | `npm install dotenv` |
| **mongoose** | ODM para MongoDB | `npm install mongoose` |
| **mysql2** | Cliente MySQL | `npm install mysql2` |
| **pg** | Cliente PostgreSQL | `npm install pg` |
| **jsonwebtoken** | JWT | `npm install jsonwebtoken` |
| **bcryptjs** | Hash de contraseñas | `npm install bcryptjs` |
| **jest** | Testing | `npm install -D jest` |
| **supertest** | Testing de APIs | `npm install -D supertest` |

---

## 10. Buenas prácticas en Node.js
- 📂 **Estructura modular**: separa tu código en controladores, servicios, middlewares y utilidades.  
- 🔒 **Seguridad**: nunca expongas credenciales en el código, usa `dotenv` para variables de entorno.  
- 🧩 **Manejo de errores**: utiliza `try/catch` y un sistema centralizado de logging (ej. Winston).  
- 🚀 **Escalabilidad**: divide tu aplicación en módulos o microservicios.  
- ⚡ **Optimización**: evita operaciones bloqueantes, usa asincronía (`async/await`).  
- 🛠️ **Testing**: integra pruebas con `jest` o `mocha`.  
- 📊 **Monitoreo**: usa herramientas como `pm2` para producción.  
- 🔄 **Versionado**: controla dependencias con `package.json` y bloquea versiones críticas.  

---

## 11. Bibliotecas nativas más usadas en Node.js

### 11.1 `fs` (File System)
Permite trabajar con archivos y directorios.

**Métodos principales:**
- `fs.readFile(path, encoding, callback)` → lee un archivo de forma asíncrona.  
- `fs.writeFile(path, data, callback)` → escribe en un archivo.  
- `fs.appendFile(path, data, callback)` → añade contenido a un archivo.  
- `fs.unlink(path, callback)` → elimina un archivo.  
- `fs.mkdir(path, callback)` → crea un directorio.  

**Ejemplo:**
```js
const fs = require('fs');

fs.writeFile('demo.txt', 'Hola Node.js', (err) => {
  if (err) throw err;
  console.log('Archivo creado');
});
```

---

### 11.2 `path`
Maneja rutas de archivos y directorios.

**Métodos principales:**
- `path.join(...paths)` → une segmentos de ruta.  
- `path.resolve(...paths)` → genera una ruta absoluta.  
- `path.basename(path)` → obtiene el nombre del archivo.  
- `path.dirname(path)` → obtiene el directorio padre.  
- `path.extname(path)` → obtiene la extensión del archivo.  

**Ejemplo:**
```js
const path = require('path');

const ruta = path.join(__dirname, 'carpeta', 'archivo.txt');
console.log(ruta);
```

---

### 11.3 `http`
Permite crear servidores web básicos.

**Métodos principales:**
- `http.createServer(callback)` → crea un servidor.  
- `server.listen(port)` → inicia el servidor en un puerto.  

**Ejemplo:**
```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hola desde Node.js');
});

server.listen(3000);
```

---

### 11.4 `os`
Proporciona información del sistema operativo.

**Métodos principales:**
- `os.platform()` → sistema operativo.  
- `os.arch()` → arquitectura.  
- `os.cpus()` → información de CPUs.  
- `os.totalmem()` → memoria total.  
- `os.freemem()` → memoria libre.  

**Ejemplo:**
```js
const os = require('os');

console.log("Sistema:", os.platform());
console.log("Memoria libre:", os.freemem());
```

---

### 11.5 `events`
Permite trabajar con el patrón **EventEmitter**.

**Métodos principales:**
- `emitter.on(event, listener)` → escucha un evento.  
- `emitter.emit(event, data)` → dispara un evento.  
- `emitter.removeListener(event, listener)` → elimina un listener.  

**Ejemplo:**
```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('saludo', (nombre) => {
  console.log(`Hola ${nombre}`);
});

emitter.emit('saludo', 'Juan');
```

---

### 11.6 `stream`
Maneja flujos de datos (lectura/escritura eficiente).

**Métodos principales:**
- `fs.createReadStream(path)` → crea un flujo de lectura.  
- `fs.createWriteStream(path)` → crea un flujo de escritura.  
- `stream.pipe(dest)` → conecta flujos.  

**Ejemplo:**
```js
const fs = require('fs');

const lectura = fs.createReadStream('entrada.txt');
const escritura = fs.createWriteStream('salida.txt');

lectura.pipe(escritura);
```

---

### 11.7 `crypto`
Permite cifrado y hashing.

**Métodos principales:**
- `crypto.createHash('sha256')` → crea un hash.  
- `crypto.randomBytes(size)` → genera bytes aleatorios.  
- `crypto.createCipheriv(alg, key, iv)` → cifrado.  
- `crypto.createDecipheriv(alg, key, iv)` → descifrado.  

**Ejemplo:**
```js
const crypto = require('crypto');

const hash = crypto.createHash('sha256').update('password').digest('hex');
console.log(hash);
```

---

## 12. Conclusión
Node.js es un entorno poderoso que combina:
- **JavaScript en el servidor**, lo que permite usar un solo lenguaje en frontend y backend.  
- **Asincronía y event loop**, que lo hacen altamente eficiente para manejar miles de conexiones concurrentes.  
- **Módulos nativos y npm**, que facilitan la construcción de aplicaciones desde simples scripts hasta sistemas complejos.  

👉 En resumen: Node.js es ideal para **APIs REST, aplicaciones en tiempo real, microservicios y herramientas de automatización**.

---