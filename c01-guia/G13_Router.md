
---

# 📘 Documentación: Routers en Express.js

## 1. ¿Qué es un Router?
- Un **Router** en Express es un **mini-aplicativo** que permite organizar rutas de manera modular.  
- Funciona como una instancia independiente de `app`, pero enfocada en agrupar rutas relacionadas.  
- Se usa para **dividir la aplicación en módulos** (usuarios, productos, pedidos, etc.), mejorando la escalabilidad y mantenibilidad.

👉 Piensa en un Router como un **subconjunto de rutas** que luego se conecta a la aplicación principal.

---

## 2. ¿Por qué usar Routers?
- 📂 **Organización**: separa rutas por funcionalidad.  
- 🚀 **Escalabilidad**: facilita proyectos grandes con múltiples módulos.  
- 🔄 **Reutilización**: puedes exportar routers y usarlos en diferentes aplicaciones.  
- 🛠️ **Modularidad**: mantiene el código limpio y fácil de mantener.  

---

## 3. Declaración de un Router
```js
const express = require('express');
const router = express.Router();

// Definir rutas dentro del router
router.get('/users', (req, res) => {
  res.send('Lista de usuarios');
});

router.post('/users', (req, res) => {
  res.send('Usuario creado');
});

module.exports = router;
```

---

## 4. Uso de un Router en la aplicación principal
```js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

// Conectar el router al path /api
app.use('/api', userRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
```

👉 Ahora todas las rutas definidas en `userRoutes` estarán disponibles bajo `/api`.

---

## 5. Ejemplo modular con Routers
### Estructura de carpetas
```
project/
├── src/
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── productRoutes.js
│   └── app.js
```

### `routes/userRoutes.js`
```js
const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.json([{ id: 1, name: "Juan" }]);
});

router.post('/users', (req, res) => {
  res.json({ mensaje: "Usuario creado", data: req.body });
});

module.exports = router;
```

### `routes/productRoutes.js`
```js
const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
  res.json([{ id: 1, name: "Laptop" }]);
});

router.post('/products', (req, res) => {
  res.json({ mensaje: "Producto creado", data: req.body });
});

module.exports = router;
```

### `app.js`
```js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(express.json());

// Conectar routers
app.use('/api', userRoutes);
app.use('/api', productRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
```

---

## 6. Buenas prácticas con Routers
- 📂 **Un router por módulo** (usuarios, productos, pedidos).  
- 🔒 **Aplicar middlewares específicos** dentro de routers (ej. autenticación en rutas de usuarios).  
- 🧩 **Separar lógica**: los routers solo definen rutas, la lógica debe ir en controladores.  
- 🚀 **Prefijos claros**: usa `/api/usuarios`, `/api/productos` para mantener consistencia.  
- ⚡ **Modularidad**: exporta routers y conéctalos en `app.js`.  

---
