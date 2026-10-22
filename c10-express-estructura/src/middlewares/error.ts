import type { ErrorRequestHandler, RequestHandler } from 'express';

/*------------------------------------------------------------------------------------------------------
    MIDDLEWARE | RUTA NO ENCONTRADA
------------------------------------------------------------------------------------------------------*/

export const notFound: RequestHandler = (req, res) => {
    res.status(404).json({
        error: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    });
};

/*------------------------------------------------------------------------------------------------------
    MIDDLEWARE | MANEJO DE ERRORES
    Debe ser el último middleware registrado (Express lo detecta por tener 4 parámetros).
------------------------------------------------------------------------------------------------------*/

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(`Error en ${req.method} ${req.originalUrl}:`, err);

    res.status(500).json({ error: 'Error interno del servidor' });
};
