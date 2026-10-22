import { createServer as crearServidorHttp } from 'node:http';
import { manejarRuta } from './rutas.js';

/*------------------------------------------------------------------------------------------------------
    CREAR EL SERVIDOR

    createServer(callback) devuelve un servidor que NO escucha todavía.
    Cada petición HTTP entra al callback con (req, res).
------------------------------------------------------------------------------------------------------*/

export function createServer() {
    return crearServidorHttp((req, res) => {
        // El handler es async: se avisa con void para no dejar promesas sueltas
        void manejarRuta(req, res);
    });
}
