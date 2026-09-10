
---

# 📘 Documentación: Express.js (Base)

## 1. ¿Qué es Express?
- **Express.js** es un framework web minimalista para **Node.js**.  
- Se utiliza para construir aplicaciones web y APIs REST de manera rápida y organizada.  
- Está basado en el módulo `http` de Node.js, pero añade una capa más sencilla y flexible para manejar rutas, peticiones y respuestas.  
- Es **no-opinativo**: no impone una estructura rígida, lo que permite adaptarlo a proyectos pequeños o grandes.

---

## 2. Características principales
- 🚀 **Ligero y rápido**: solo lo esencial para manejar HTTP.  
- 🛠️ **Extensible**: se integra fácilmente con librerías externas (`cors`, `helmet`, `morgan`).  
- 📂 **Modularidad**: permite dividir la aplicación en rutas, controladores y servicios.  
- 🔄 **Compatibilidad**: funciona con middlewares y routers para mayor organización.  
- 🌍 **Ideal para APIs REST** y aplicaciones web modernas.  

---

## 3. Instalación
```bash
npm install express
```

---

## 4. Primer ejemplo
```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola Mundo con Express');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
```

---

## 5. Ruteo básico en Express
Express permite manejar diferentes métodos HTTP de forma sencilla:

```js
app.get('/usuarios', (req, res) => {
  res.send('Lista de usuarios');
});

app.post('/usuarios', (req, res) => {
  res.send('Usuario creado');
});

app.put('/usuarios/:id', (req, res) => {
  res.send(`Usuario ${req.params.id} actualizado`);
});

app.delete('/usuarios/:id', (req, res) => {
  res.send(`Usuario ${req.params.id} eliminado`);
});
```

👉 Aquí aún no usamos Routers, solo rutas básicas con `app`.

---

## 6. Manejo de datos
### JSON
```js
app.use(express.json());

app.post('/data', (req, res) => {
  res.json({ recibido: req.body });
});
```

### Formularios
```js
app.use(express.urlencoded({ extended: true }));
```

---

## 7. Manejo de errores
Express permite definir un middleware especial para capturar errores:

```js
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});
```

---

## 8. Dependencias comunes con Express
| Paquete | Uso | Instalación |
|---------|-----|-------------|
| **morgan** | Logs HTTP | `npm install morgan` |
| **cors** | Habilitar CORS | `npm install cors` |
| **helmet** | Seguridad | `npm install helmet` |
| **express-session** | Manejo de sesiones | `npm install express-session` |
| **cookie-parser** | Manejo de cookies | `npm install cookie-parser` |
| **dotenv** | Variables de entorno | `npm install dotenv` |

---

## 9. Buenas prácticas generales
- 📂 **Estructura modular**: separar rutas, controladores y servicios.  
- 🔒 **Seguridad**: usar `helmet`, `cors` y sanitización de inputs.  
- 🧩 **Middlewares reutilizables**: crear funciones en carpeta `middlewares/`.  
- 🛠️ **Logs y monitoreo**: integrar `morgan` o Winston.  
- 🚀 **Escalabilidad**: usar `express.Router` para dividir módulos (se verá en otro documento).  
- ⚡ **Optimización**: manejar errores y respuestas de forma consistente.  

---
