
---

# 📘 Guía de Jest para Principiantes

## 1. ¿Qué es Jest?
- Es un **framework de testing en JavaScript** creado por Facebook.  
- Se usa para probar aplicaciones en **Node.js** y en el **frontend (React, Vue, etc.)**.  
- Ventajas:
  - Fácil de configurar (casi plug-and-play).  
  - Tiene su propio runner, assertions (*matchers*) y mocks.  
  - Soporta pruebas síncronas y asíncronas.  

---

## 2. Instalación
1. Inicializa tu proyecto:
   ```bash
   npm init -y
   ```
2. Instala Jest:
   ```bash
   npm install --save-dev jest
   ```
3. En `package.json`, agrega el script:
   ```json
   {
     "scripts": {
       "test": "jest"
     }
   }
   ```
4. Ejecuta pruebas:
   ```bash
   npm test
   ```

---

## 3. Primer ejemplo simple
```js
// suma.js
function suma(a, b) {
  return a + b;
}
module.exports = suma;

// suma.test.js
const suma = require('./suma');

test('suma 2 + 3 = 5', () => {
  expect(suma(2, 3)).toBe(5);
});
```

Ejecuta `npm test` y verás el resultado ✅.

---

## 4. Matchers principales
Los *matchers* son funciones que comparan resultados esperados:

- **Valores básicos**
  - `toBe()` → igualdad estricta.  
  - `toEqual()` → igualdad profunda (objetos/arrays).  
  - `toBeNull()`, `toBeUndefined()`, `toBeTruthy()`, `toBeFalsy()`.  

- **Números**
  - `toBeGreaterThan()`, `toBeLessThan()`.  
  - `toBeCloseTo()` → números decimales.  

- **Strings**
  - `toMatch(/regex/)`.  

- **Arrays y objetos**
  - `toContain()`.  
  - `toMatchObject()`.  
  - `expect.objectContaining({...})`.  

- **Errores**
  - `toThrow()`.  

---

## 5. Hooks (ciclo de vida)
Sirven para preparar y limpiar antes/después de las pruebas:

- `beforeAll()` → una vez antes de todas.  
- `afterAll()` → una vez después de todas.  
- `beforeEach()` → antes de cada prueba.  
- `afterEach()` → después de cada prueba.  

Ejemplo:
```js
let usuarios;

beforeEach(() => {
  usuarios = ['Juan', 'Ana'];
});

test('agregar usuario', () => {
  usuarios.push('Pedro');
  expect(usuarios).toContain('Pedro');
});
```

---

## 6. Pruebas asíncronas
Jest soporta promesas y `async/await`.

```js
const fetchData = () => Promise.resolve('ok');

test('async/await', async () => {
  const data = await fetchData();
  expect(data).toBe('ok');
});

test('resolves', () => {
  return expect(fetchData()).resolves.toBe('ok');
});

test('rejects', () => {
  return expect(Promise.reject('error')).rejects.toBe('error');
});
```

---

## 7. Configuración con `jest.config.js`
Archivo opcional para personalizar Jest.

Ejemplo típico:
```js
// jest.config.js
module.exports = {
  testEnvironment: 'node',              // entorno Node.js
  verbose: true,                        // muestra detalle
  collectCoverage: true,                // activa cobertura
  coverageDirectory: 'coverage',        // carpeta de reportes
  coverageReporters: ['text', 'html'],  // formatos de reporte
  testMatch: ['**/tests/**/*.test.js'], // dónde buscar pruebas
  clearMocks: true,                     // limpia mocks entre pruebas
  testTimeout: 10000                    // máximo 10s por prueba
};
```

---

## 8. Cobertura de código
- Se activa con `collectCoverage: true`.  
- Ejecuta:
  ```bash
  npx jest --coverage
  ```
- Reporta qué porcentaje de tu código está probado:
  - **% Stmts** → sentencias ejecutadas.  
  - **% Branch** → ramas de control (`if/else`).  
  - **% Funcs** → funciones llamadas.  
  - **% Lines** → líneas ejecutadas.  

---

## 9. Conclusión
- Jest es un **framework todo-en-uno** para testing en JS.  
- Empieza con pruebas simples (`test`, `expect`).  
- Usa **matchers** para validar resultados.  
- Usa **hooks** para preparar/limpiar estados.  
- Aprende a manejar **async/await** en pruebas.  
- Configura tu proyecto con **jest.config.js** para personalizar.  
- Usa **cobertura** para medir qué tanto de tu código está probado.  

---
