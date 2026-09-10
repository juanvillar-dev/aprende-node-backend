import fs from "node:fs/promises";
import path from "node:path";

const RUTA_RAIZ = process.cwd();




/*------------------------------------------------------------------------------------------------------
    OBTENER INFORMACION DE ARCHIVO
------------------------------------------------------------------------------------------------------*/

async function informacion(){
    const ruta = path.join(RUTA_RAIZ, "data", "mensaje.txt");
    
    const stats = await fs.stat(ruta);                  // Obtener información del archivo

    console.log('=== Información del archivo ===');
    console.log('Tamaño: ', stats.size);
    console.log('Fecha de creación: ', stats.birthtime);
    console.log('Fecha de modificación: ', stats.mtime);
    console.log('Es un archivo?: ', stats.isFile());
}



/*------------------------------------------------------------------------------------------------------
    LECTURA DE ARCHIVOS
------------------------------------------------------------------------------------------------------*/

async function leer(){
    const ruta = path.join(RUTA_RAIZ, "data", "mensaje.txt");

    const contenido = await fs.readFile(ruta, "utf8");  // Leer el contenido del archivo como texto
    
    console.log('=== Contenido del archivo ===');
    console.log(contenido);
}



/*------------------------------------------------------------------------------------------------------
    ESCRITURA DE ARCHIVOS
------------------------------------------------------------------------------------------------------*/

async function escribir(){
    const ruta = path.join(RUTA_RAIZ, "data", "nuevo.txt");
    const data = "Este es un nuevo archivo creado desde Node.js";

    await fs.writeFile(ruta, data, "utf8");  // Escribir el contenido en el archivo
}



/*------------------------------------------------------------------------------------------------------
    RENOMBRAR Y REUBICAR
------------------------------------------------------------------------------------------------------*/

async function reubicar() {
    const original  = path.join(RUTA_RAIZ, "data", "nuevo.txt");
    const nueva     = path.join(RUTA_RAIZ, "data", "reubicado", "reubicado.txt");

    await fs.rename(original, nueva);
}



/*------------------------------------------------------------------------------------------------------
    ELIMINAR
------------------------------------------------------------------------------------------------------*/

async function eliminar() {
    const ruta      = path.join(RUTA_RAIZ, "data", "reubicado", "reubicado.txt");

    await fs.unlink(ruta);
}



/*------------------------------------------------------------------------------------------------------
    COPIAR
------------------------------------------------------------------------------------------------------*/

async function copiar() {
    const original  = path.join(RUTA_RAIZ, "data", "mensaje.txt");
    const copia     = path.join(RUTA_RAIZ, "data", "copia.txt");

    await fs.copyFile(original, copia);
}



/*------------------------------------------------------------------------------------------------------
    CREAR CARPETA
------------------------------------------------------------------------------------------------------*/
async function crearCarpeta() {
    const ruta = path.join(RUTA_RAIZ, "data", "carpetaDemo");

    await fs.mkdir(ruta);
}



/*------------------------------------------------------------------------------------------------------
    ELIMINAR CARPETA
------------------------------------------------------------------------------------------------------*/
async function eliminarCarpeta() {
    const ruta = path.join(RUTA_RAIZ, "data", "carpetaDemo");
    
    await fs.rmdir(ruta);                               // SOLO PARA CARPETAS VACIAS
    await fs.rm(ruta, {recursive: true, force: true});  // PARA CARPETA CON CONTENIDO
}



/*------------------------------------------------------------------------------------------------------
    LISTAR ARCHIVOS DE UNA CARPETA
------------------------------------------------------------------------------------------------------*/
async function listar() {
    const files = await fs.readdir(RUTA_RAIZ);
    
    console.log(files);
}



async function recorrerDirectorio() {
    const dir = await fs.opendir(RUTA_RAIZ);
    
    for await (const dirent of dir){
        console.log(dirent.name, dirent.isDirectory() ? "📁" : "📄");
    }
}






