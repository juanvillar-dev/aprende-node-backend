**Node Version Manager (NVM)** es una herramienta que permite instalar, administrar y cambiar entre múltiples versiones de **Node.js** en un mismo sistema.  

### 🔑 Funciones principales
- **Instalar múltiples versiones de Node.js** sin conflictos.  
- **Cambiar fácilmente de versión** según el proyecto (`nvm use <versión>`).  
- **Definir versiones por proyecto** usando archivos `.nvmrc`.  
- **Desinstalar versiones** que ya no necesites.  
- **Mantener compatibilidad** entre proyectos que requieren diferentes versiones de Node.js.  

### 📌 Ejemplo práctico
Supongamos que tienes dos proyectos:  
- Proyecto A requiere Node.js **v10.0.0**  
- Proyecto B requiere Node.js **v12.0.0**  

Con NVM puedes instalar ambas versiones y alternar entre ellas sin tener que reinstalar Node manualmente.  

```bash
# Instalar una versión específica
nvm install 12.0.0

# Usar esa versión
nvm use 12.0.0

# Ver todas las versiones instaladas
nvm ls
```

### 🚀 Ventajas
- Evita errores de compatibilidad entre proyectos.  
- Simplifica el flujo de trabajo de desarrollo.  
- Es multiplataforma (funciona en Linux, macOS y Windows con adaptaciones).  

---



### 🛠 Pasos para instalar NVM en Windows
1. **Desinstala Node.js si ya lo tienes instalado**  
   NVM maneja las versiones, así que no debe haber una instalación previa de Node.js en tu sistema.  

2. **Descarga el instalador oficial**  
   - Ve al repositorio de GitHub: nvm-windows [(github.com in Bing)](https://www.bing.com/search?q="https%3A%2F%2Fgithub.com%2Fcoreybutler%2Fnvm-windows")  
   - Descarga el archivo `nvm-setup.exe` desde la sección *Releases*.  

3. **Instala NVM**  
   - Ejecuta el instalador y sigue los pasos.  
   - Durante la instalación, define la carpeta donde se guardarán las versiones de Node.js.  

4. **Verifica la instalación**  
   Abre **PowerShell** o **CMD** y escribe:  
   ```bash
   nvm version
   ```
   Si aparece un número de versión, NVM está correctamente instalado.  

5. **Instala y usa versiones de Node.js**  
   ```bash
   # Instalar una versión específica
   nvm install 18.17.0

   # Cambiar a esa versión
   nvm use 18.17.0

   # Ver todas las versiones instaladas
   nvm ls
   ```

### ⚠️ Consideraciones importantes
- NVM en Windows funciona mejor en **PowerShell** o **CMD**, no en WSL (aunque puedes usar el NVM clásico en WSL).  
- Si instalas una versión de Node.js con NVM, también se instala automáticamente **npm**.  
- Puedes crear un archivo `.nvmrc` en tu proyecto con la versión requerida, y luego usar `nvm use` para que se configure automáticamente.  

