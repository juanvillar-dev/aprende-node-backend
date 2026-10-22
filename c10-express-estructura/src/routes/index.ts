import { Router } from 'express';
import { productosRouter } from './productos.routes.js';

/*------------------------------------------------------------------------------------------------------
    ROUTER RAÍZ
    Punto único de entrada de todas las rutas de la API.
------------------------------------------------------------------------------------------------------*/

export const routes = Router();

routes.get('/salud', (req, res) => {
    res.json({ mensaje: 'API funcionando' });
});

routes.use('/productos', productosRouter);
