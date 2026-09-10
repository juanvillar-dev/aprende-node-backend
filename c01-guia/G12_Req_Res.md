
---

# 📘 Documentación: `req` y `res` en Express.js

## 1. Objeto `req` (Request)
El objeto `req` representa la **petición HTTP** que llega al servidor. Contiene información enviada por el cliente.

### Propiedades más usadas
| Propiedad | Descripción | Ejemplo |
|-----------|-------------|---------|
| `req.params` | Parámetros de la URL definidos en la ruta | `/users/:id` → `req.params.id` |
| `req.query` | Parámetros de consulta en la URL | `/users?name=Juan` → `req.query.name` |
| `req.body` | Datos enviados en el cuerpo de la petición (JSON, formularios) | `{ "nombre": "Juan" }` → `req.body.nombre` |
| `req.headers` | Cabeceras HTTP enviadas por el cliente | `req.headers['authorization']` |
| `req.method` | Método HTTP de la petición | `GET`, `POST`, `PUT`, `DELETE` |
| `req.url` | URL completa de la petición | `/users/123?active=true` |
| `req.path` | Ruta sin query string | `/users/123` |
| `req.ip` | IP del cliente | `192.168.0.1` |
| `req.cookies` | Cookies enviadas (si usas `cookie-parser`) | `req.cookies.sessionId` |

---

## 2. Objeto `res` (Response)
El objeto `res` representa la **respuesta HTTP** que envía el servidor al cliente.

### Métodos más usados
| Método | Descripción | Ejemplo |
|--------|-------------|---------|
| `res.send()` | Envía texto o HTML | `res.send('Hola Mundo')` |
| `res.json()` | Envía un objeto JSON | `res.json({ mensaje: 'OK' })` |
| `res.status()` | Define el código de estado HTTP | `res.status(404).send('No encontrado')` |
| `res.end()` | Finaliza la respuesta sin contenido adicional | `res.end()` |
| `res.redirect()` | Redirige a otra URL | `res.redirect('/login')` |
| `res.set()` | Define cabeceras HTTP | `res.set('Cache-Control', 'no-store')` |
| `res.cookie()` | Envía una cookie al cliente | `res.cookie('token', 'abc123')` |
| `res.clearCookie()` | Elimina una cookie | `res.clearCookie('token')` |

---

## 3. Ejemplos prácticos

### Parámetros en la URL (`req.params`)
```js
app.get('/users/:id', (req, res) => {
  res.send(`Usuario con ID: ${req.params.id}`);
});
```

### Query strings (`req.query`)
```js
app.get('/search', (req, res) => {
  res.send(`Buscando: ${req.query.q}`);
});
```

### Cuerpo de la petición (`req.body`)
```js
app.use(express.json());

app.post('/users', (req, res) => {
  res.json({ mensaje: "Usuario creado", data: req.body });
});
```

### Cabeceras (`req.headers`)
```js
app.get('/secure', (req, res) => {
  const token = req.headers['authorization'];
  if (token === 'secreto123') {
    res.send('Acceso permitido');
  } else {
    res.status(401).send('No autorizado');
  }
});
```

### Respuestas con JSON y status
```js
app.get('/error', (req, res) => {
  res.status(500).json({ error: "Error interno del servidor" });
});
```

---

## 4. Flujo típico de `req` y `res`
```
Cliente → Request (req) → Middleware → Router → Controller → Response (res) → Cliente
```

---

## 5. Buenas prácticas
- Usa `req.params` para **identificadores únicos** (ej. `/users/:id`).  
- Usa `req.query` para **filtros y búsquedas** (ej. `/users?active=true`).  
- Usa `req.body` para **datos enviados en POST/PUT**.  
- Siempre define un **código de estado** con `res.status()`.  
- Prefiere `res.json()` para APIs REST, en lugar de `res.send()`.  
- Centraliza cabeceras comunes con middlewares (`res.set`).  

---
