# 📘 Documentación: Middlewares en Node.js y Express

## 🔍 Qué es un middleware en Express
- Es **una función** que se ejecuta **entre la llegada del request y el envío del response**.  
- Tiene siempre la misma firma:
  ```js
  (req, res, next) => { ... }
  ```
  - `req` → el objeto de la petición.  
  - `res` → el objeto de la respuesta.  
  - `next` → una función que debes llamar para que Express continúe con el siguiente middleware o ruta.  

---

## 📌 Ejemplo básico
```js
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store'); // nunca guarda en caché
  next(); // pasa al siguiente middleware o ruta
});
```

- Aquí declaraste un middleware que **siempre se ejecuta para cualquier ruta** (porque usaste `app.use` sin especificar un path).  
- Lo que hace es añadir la cabecera `Cache-Control: no-store` a todas las respuestas.  
- Luego llama a `next()` para que Express siga con el siguiente middleware o con la ruta que corresponda.  

---

## 🔧 Cómo se “declara” un middleware
En Express, hay varias formas de usar middlewares:

1. **Globales (para todas las rutas):**
   ```js
   app.use((req, res, next) => { ... });
   ```

2. **Para un path específico:**
   ```js
   app.use('/productos', (req, res, next) => { ... });
   ```

3. **En una ruta concreta:**
   ```js
   app.get('/productos', miMiddleware, (req, res) => { ... });
   ```

4. **Middlewares ya hechos (como `express.json()` o `cors()`):**
   ```js
   app.use(express.json());
   app.use(cors());
   ```

---

## Tipos de middlewares en Express
| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **Aplicación** | Se aplica a todas las rutas | `app.use(miMiddleware)` |
| **Ruta específica** | Solo en ciertas rutas | `app.use('/ruta', miMiddleware)` |
| **Integrados** | Incluidos en Express | `express.json()`, `express.urlencoded()` |
| **De terceros** | Librerías externas | `morgan`, `cors`, `helmet` |
| **De manejo de errores** | Capturan errores | `(err, req, res, next) => { ... }` |

---

## Ejemplos prácticos extra

### Middleware global de logging
```js
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
```

### Middleware de validación
```js
function validarNombre(req, res, next) {
  if (!req.body.nombre) {
    return res.status(400).json({ error: "El campo 'nombre' es obligatorio" });
  }
  next();
}

app.post('/usuarios', validarNombre, (req, res) => {
  res.json({ mensaje: "Usuario creado", data: req.body });
});
```

### Middleware de autenticación
```js
function autenticar(req, res, next) {
  const token = req.headers['authorization'];
  if (token === "secreto123") {
    next();
  } else {
    res.status(401).json({ error: "No autorizado" });
  }
}

app.get('/perfil', autenticar, (req, res) => {
  res.json({ usuario: "Juan", rol: "admin" });
});
```

### Middleware de manejo de errores
```js
app.use((err, req, res, next) => {
  console.error("Error capturado:", err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});
```

---

## Middlewares famosos en Node.js
| Middleware | Uso principal | Instalación |
|------------|---------------|-------------|
| **morgan** | Logs de peticiones HTTP | `npm install morgan` |
| **cors** | Habilitar CORS | `npm install cors` |
| **helmet** | Seguridad HTTP | `npm install helmet` |
| **express-session** | Manejo de sesiones | `npm install express-session` |
| **body-parser** | Parseo de cuerpos (ahora integrado en Express) | `npm install body-parser` |

---

## Consejos prácticos
- Declara **middlewares globales** al inicio de tu `app.js`.  
- Usa **middlewares específicos** en rutas críticas (validación, auth).  
- Siempre incluye un **middleware de errores** al final de la cadena.  
- Organiza tus middlewares en una carpeta `middlewares/` para modularidad.  

---
