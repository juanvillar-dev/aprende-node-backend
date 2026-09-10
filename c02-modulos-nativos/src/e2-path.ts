import path from 'path';
import { fileURLToPath } from 'url';

const Ruta_Actual = fileURLToPath(import.meta.url);

const datos: any = {
    DIRECTORIO_ACTUAL   : path.dirname(Ruta_Actual),
    NOMBRE_ARCHIVO      : path.basename(Ruta_Actual),
    EXTENSIÓN           : path.extname(Ruta_Actual),
    UNIR_SEGMENTOS      : path.join("desktop", "carpeta", 'archivo.txt'),
    RUTA_CORRECTA       : path.normalize("C://Users//Escritorio//archivo.txt"),
}

const RUTAL_RAIZ = process.cwd();

console.log('=== Módulo nativo path ===');
console.log('Ruta raíz del proyecto: ', RUTAL_RAIZ);
console.log(datos);