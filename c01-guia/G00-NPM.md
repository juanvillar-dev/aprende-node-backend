# 📘 Documentación: npm en Node.js

## 1. ¿Qué es npm?
- **npm** significa *Node Package Manager*.  
- Es el **gestor de paquetes oficial de Node.js**.  
- Permite instalar, actualizar y administrar librerías y dependencias de tu proyecto.  
- También sirve para **publicar tus propios paquetes** en el registro público de npm.  

---

## 2. Propósito
- 📦 **Instalar dependencias** (librerías externas).  
- 🔄 **Actualizar paquetes** fácilmente.  
- 🛠️ **Gestionar scripts** para automatizar tareas.  
- 🌍 **Compartir código** con la comunidad.  

---

## 3. Usos prácticos
- Instalar frameworks como **Express** o **React**.  
- Ejecutar scripts personalizados (`npm run build`, `npm run test`).  
- Controlar versiones de dependencias con `package.json`.  
- Publicar librerías propias en el registro de npm.  

---

## 4. El archivo `package.json`
Es el **corazón del proyecto Node.js**. Contiene:
- 📌 **Nombre y versión** del proyecto.  
- 📦 **Dependencias** y sus versiones.  
- 🛠️ **Scripts** para automatizar tareas.  
- 🔧 Configuración adicional (autores, licencias, etc.).

Ejemplo:
```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest"
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

## 5. Comandos esenciales de npm
| Comando | Descripción |
|---------|-------------|
| `npm init -y` | Crea un `package.json` rápido. |
| `npm install <paquete>` | Instala una dependencia. |
| `npm install -D <paquete>` | Instala como dependencia de desarrollo. |
| `npm uninstall <paquete>` | Elimina una dependencia. |
| `npm update` | Actualiza dependencias. |
| `npm outdated` | Muestra paquetes desactualizados. |
| `npm run <script>` | Ejecuta un script definido en `package.json`. |
| `npm install -g <paquete>` | Instala un paquete global. |
| `npm list` | Lista dependencias instaladas. |

---

## 6. Tips prácticos
- Usa `npm ci` en CI/CD para instalaciones limpias y rápidas.  
- Prefiere versiones específicas (`1.2.3`) en producción para evitar incompatibilidades.  
- Usa `npx` para ejecutar paquetes sin instalarlos globalmente.  
- Mantén separado `dependencies` y `devDependencies`.  

---

## 7. Dependencias más usadas en Node.js

| Paquete | Uso principal | Instalación |
|---------|---------------|-------------|
| **Express** | Framework para servidores web | `npm install express` |
| **Nodemon** | Reinicia servidor automáticamente | `npm install -D nodemon` |
| **dotenv** | Manejo de variables de entorno | `npm install dotenv` |
| **mongoose** | ODM para MongoDB | `npm install mongoose` |
| **mysql2** | Cliente para MySQL | `npm install mysql2` |
| **pg** | Cliente para PostgreSQL | `npm install pg` |
| **cors** | Middleware para habilitar CORS | `npm install cors` |
| **jsonwebtoken** | Manejo de JWT | `npm install jsonwebtoken` |
| **bcryptjs** | Encriptación de contraseñas | `npm install bcryptjs` |
| **jest** | Testing | `npm install -D jest` |
| **supertest** | Testing de APIs | `npm install -D supertest` |

---

## 8. Consejos finales
- 🔒 **Seguridad**: revisa dependencias con `npm audit`.  
- 📌 **Versionado**: usa `^` para actualizaciones menores y `~` para parches.  
- 🚀 **Optimización**: elimina dependencias innecesarias para reducir peso.  
- 🧩 **Modularidad**: cada proyecto debe tener su propio `package.json`.  
