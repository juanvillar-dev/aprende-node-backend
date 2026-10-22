import type { IncomingMessage, ServerResponse } from 'node:http';

/*------------------------------------------------------------------------------------------------------
    RUTAS DEL SERVIDOR  (capítulo 8: sin Express, todo con el módulo nativo 'http')

    Cada petición entra por aquí: se mira método + URL y se responde.
    Esto es exactamente lo que Express hará en el capítulo 9, pero a mano.
------------------------------------------------------------------------------------------------------*/

export async function manejarRuta(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const metodo = req.method ?? 'GET';
    const url    = req.url ?? '/';

    try {
        /*--------------- GET / → texto plano ---------------*/
        if (metodo === 'GET' && url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Hola mundo desde Node.js');
            return;
        }

        /*--------------- GET /api/saludo → JSON ---------------*/
        if (metodo === 'GET' && url === '/api/saludo') {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                mensaje: 'Hola mundo',
                hora:    new Date().toISOString(),
            }));
            return;
        }

        /*--------------- POST /api/echo → devuelve el cuerpo recibido ---------------*/
        if (metodo === 'POST' && url === '/api/echo') {
            const cuerpo = await leerCuerpo(req);

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ recibido: cuerpo }));
            return;
        }

        /*--------------- 404 → ruta no encontrada ---------------*/
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    } catch (error) {
        console.error('Error al procesar la petición:', error);

        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Error interno del servidor' }));
    }
}

/*------------------------------------------------------------------------------------------------------
    LEER EL CUERPO DE LA PETICIÓN (req)

    Los 'data' van llegando por trozos (chunks): se concatenan hasta el evento 'end'.
------------------------------------------------------------------------------------------------------*/

function leerCuerpo(req: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        let datos = '';

        req.on('data', (chunk: Buffer) => { datos += chunk.toString(); });
        req.on('end',   () => resolve(datos));
        req.on('error', (error) => reject(error));
    });
}
